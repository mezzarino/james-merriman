export function isWithinLast24Hours(date?: Date): boolean {
  if (!date) return false;

  const now = Date.now();
  const time = date.getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  // ✅ Must not be in the future
  if (time > now) return false;

  return now - time <= twentyFourHours;
}
