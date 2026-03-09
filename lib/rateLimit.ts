const attempts = new Map<string, { count: number; time: number }>();

export function checkRateLimit(ip: string) {
  const now = Date.now();
  const window = 5 * 60 * 1000; // 5 minutes
  const limit = 5;

  const entry = attempts.get(ip);

  if (!entry) {
    attempts.set(ip, { count: 1, time: now });
    return true;
  }

  if (now - entry.time > window) {
    attempts.set(ip, { count: 1, time: now });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}