interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

const ONE_HOUR_MS = 60 * 60 * 1000;

export function getCachedData<T>(key: string, ttlMs: number = ONE_HOUR_MS): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    const isExpired = Date.now() - entry.fetchedAt > ttlMs;
    return isExpired ? null : entry;
  } catch {
    return null;
  }
}

export function getStaleData<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCachedData<T>(key: string, data: T): CacheEntry<T> {
  const entry: CacheEntry<T> = { data, fetchedAt: Date.now() };
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage pode falhar (modo privado, quota cheia) — segue sem cache
  }
  return entry;
}