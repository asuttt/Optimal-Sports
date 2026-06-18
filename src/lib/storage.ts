export function getStorageItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return null;
  }
}

export function setStorageItem(key: string, value: unknown) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key: string) {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(key);
}
