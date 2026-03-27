import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/api';

interface PresignResponse {
  uploadUrl: string;
  mediaAsset: {
    id: string;
    mediaType: 'image' | 'video';
  };
}

function mediaTypeForFile(file: File): 'image' | 'video' {
  return file.type.startsWith('image/') ? 'image' : 'video';
}

export default function SendKudos() {
  const navigate = useNavigate();
  const [receiverId, setReceiverId] = useState('');
  const [points, setPoints] = useState(25);
  const [description, setDescription] = useState('');
  const [coreValue, setCoreValue] = useState('Teamwork');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateFile = (file: File) => {
    if (file.type.startsWith('image/') && file.size > 1024 * 1024) {
      throw new Error('Image file size must be <= 1MB');
    }
    if (file.type.startsWith('video/') && file.size > 120 * 1024 * 1024) {
      throw new Error('Video file appears too large for demo constraints');
    }
  };

  const uploadMedia = async (file: File) => {
    validateFile(file);
    const mediaType = mediaTypeForFile(file);
    const presign = await apiRequest<PresignResponse>('/uploads/presign', {
      method: 'POST',
      body: {
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        fileSizeBytes: file.size,
        mediaType,
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
      throw new Error('Media upload failed');
    }

    await apiRequest('/uploads/complete', {
      method: 'POST',
      body: {
        mediaAssetId: presign.mediaAsset.id,
      },
    });

    return presign.mediaAsset.id;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const mediaAssetId = mediaFile ? await uploadMedia(mediaFile) : undefined;
      await apiRequest('/kudos', {
        method: 'POST',
        body: {
          receiverId,
          points,
          description,
          coreValue,
          mediaAssetId,
          taggedUserIds: [],
        },
      });
      navigate('/feed');
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Cannot send kudo'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">Send Kudos</h1>
      <p className="mt-2 text-sm text-slate-600">
        Reward teammates with 10-50 points and optional media.
      </p>
      <form className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-sm" onSubmit={onSubmit}>
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="Receiver user ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          required
        />
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="Core value (e.g. Teamwork)"
          value={coreValue}
          onChange={(e) => setCoreValue(e.target.value)}
          required
        />
        <textarea
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="Why this person deserves kudos"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="block text-sm font-medium text-slate-700">
          Points: {points}
          <input
            className="mt-2 w-full"
            min={10}
            max={50}
            step={5}
            type="range"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Media (optional)
          <input
            className="mt-2 block w-full text-sm"
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setMediaFile(e.target.files?.[0] ?? null)}
          />
          <span className="mt-1 block text-xs text-slate-500">
            Image max 1MB. Video max 3 minutes (validated asynchronously).
          </span>
        </label>
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Kudo'}
        </button>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </div>
  );
}
