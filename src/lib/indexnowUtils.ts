export function isWithinLast24Hours(date?: Date): boolean {
  if (!date) return false;

  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  return now - date.getTime() <= twentyFourHours;
}
