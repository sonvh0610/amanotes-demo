export function monthKeyFromDate(value = new Date()) {
  const y = value.getUTCFullYear();
  const m = String(value.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}
