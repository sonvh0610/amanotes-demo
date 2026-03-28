import { apiRequest, apiUrl } from './api';

interface PresignResponse {
  uploadUrl: string;
  mediaAsset: {
    id: string;
    mediaType: 'image' | 'video';
    publicUrl?: string | null;
  };
}

function mediaTypeForFile(file: File): 'image' | 'video' {
  return file.type.startsWith('image/') ? 'image' : 'video';
}

const MAX_VIDEO_DURATION_SECONDS = 180;

export function validateFile(file: File) {
  if (file.type.startsWith('image/') && file.size > 1024 * 1024) {
    throw new Error('Image file size must be <= 1MB');
  }
}

async function getVideoDurationSeconds(file: File): Promise<number> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const duration = await new Promise<number>((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        resolve(video.duration);
      };
      video.onerror = () => {
        reject(new Error('Unable to read video metadata'));
      };
      video.src = objectUrl;
    });
    return duration;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function parseUploadFailure(response: Response): Promise<string> {
  const fallback = `Media upload failed (${response.status})`;
  try {
    const body = await response.text();
    if (!body) {
      return fallback;
    }

    const codeMatch = body.match(/<Code>([^<]+)<\/Code>/i);
    const messageMatch = body.match(/<Message>([^<]+)<\/Message>/i);
    if (codeMatch || messageMatch) {
      const parts = [codeMatch?.[1], messageMatch?.[1]].filter(Boolean);
      return parts.length > 0 ? parts.join(': ') : fallback;
    }

    return `${fallback}: ${body.slice(0, 160)}`;
  } catch {
    return fallback;
  }
}

async function uploadMediaViaApiFallback(input: {
  file: File;
  mediaAssetId: string;
  durationSeconds?: number;
}) {
  const formData = new FormData();
  formData.append('mediaAssetId', input.mediaAssetId);
  if (typeof input.durationSeconds === 'number') {
    formData.append('durationSeconds', String(input.durationSeconds));
  }
  formData.append('file', input.file, input.file.name);

  await apiRequest('/uploads/proxy', {
    method: 'POST',
    body: formData,
  });
}

export async function uploadMedia(file: File): Promise<string> {
  validateFile(file);
  const mediaType = mediaTypeForFile(file);
  const durationSeconds =
    mediaType === 'video' ? await getVideoDurationSeconds(file) : undefined;

  if (
    typeof durationSeconds === 'number' &&
    durationSeconds > MAX_VIDEO_DURATION_SECONDS
  ) {
    throw new Error('Video duration must be 3 minutes or less');
  }

  const presign = await apiRequest<PresignResponse>('/uploads/presign', {
    method: 'POST',
    body: {
      fileName: file.name,
      mimeType: file.type || 'application/octet-stream',
      fileSizeBytes: file.size,
      mediaType,
      durationSeconds,
    },
  });

  const uploaded = await fetch(presign.uploadUrl, {
    method: 'PUT',
    headers: {
      'content-type': file.type || 'application/octet-stream',
    },
    body: file,
  });
  if (!uploaded.ok) {
    await uploadMediaViaApiFallback({
      file,
      mediaAssetId: presign.mediaAsset.id,
      durationSeconds,
    }).catch(async () => {
      throw new Error(await parseUploadFailure(uploaded));
    });
  }

  await apiRequest('/uploads/complete', {
    method: 'POST',
    body: {
      mediaAssetId: presign.mediaAsset.id,
    },
  });

  return presign.mediaAsset.id;
}

export async function uploadManyMedia(files: File[]): Promise<string[]> {
  if (files.length > 5) {
    throw new Error('Maximum 5 media files per kudo');
  }

  const ids: string[] = [];
  for (const file of files) {
    const id = await uploadMedia(file);
    ids.push(id);
  }
  return ids;
}

export async function uploadImageAndGetPublicUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are supported for reward thumbnails');
  }

  validateFile(file);

  const presign = await apiRequest<PresignResponse>('/uploads/presign', {
    method: 'POST',
    body: {
      fileName: file.name,
      mimeType: file.type || 'application/octet-stream',
      fileSizeBytes: file.size,
      mediaType: 'image',
    },
  });

  const uploaded = await fetch(presign.uploadUrl, {
    method: 'PUT',
    headers: {
      'content-type': file.type || 'application/octet-stream',
    },
    body: file,
  });
  if (!uploaded.ok) {
    await uploadMediaViaApiFallback({
      file,
      mediaAssetId: presign.mediaAsset.id,
    }).catch(async () => {
      throw new Error(await parseUploadFailure(uploaded));
    });
  }

  await apiRequest('/uploads/complete', {
    method: 'POST',
    body: {
      mediaAssetId: presign.mediaAsset.id,
    },
  });

  return apiUrl(`/uploads/media/${presign.mediaAsset.id}/view`);
}
