/**
 * Safe storage utilities that handle browser restrictions (Safari private mode, disabled cookies, etc.)
 */

function isStorageAvailable(storage: Storage | null): boolean {
  if (!storage) return false;
  try {
    const testKey = "__storage_test__";
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

const localStorageAvailable = typeof window !== "undefined" && isStorageAvailable(window.localStorage);
const sessionStorageAvailable = typeof window !== "undefined" && isStorageAvailable(window.sessionStorage);

// In-memory fallback for when storage is unavailable
const memoryStorage: Record<string, string> = {};

export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      if (localStorageAvailable) {
        return localStorage.getItem(key);
      }
      return memoryStorage[`local_${key}`] ?? null;
    } catch (e) {
      console.warn("[safeStorage] Failed to get localStorage item:", key);
      return memoryStorage[`local_${key}`] ?? null;
    }
  },

  setItem(key: string, value: string): void {
    try {
      if (localStorageAvailable) {
        localStorage.setItem(key, value);
      } else {
        memoryStorage[`local_${key}`] = value;
      }
    } catch (e) {
      console.warn("[safeStorage] Failed to set localStorage item:", key);
      memoryStorage[`local_${key}`] = value;
    }
  },

  removeItem(key: string): void {
    try {
      if (localStorageAvailable) {
        localStorage.removeItem(key);
      }
      delete memoryStorage[`local_${key}`];
    } catch (e) {
      console.warn("[safeStorage] Failed to remove localStorage item:", key);
      delete memoryStorage[`local_${key}`];
    }
  },
};

export const safeSessionStorage = {
  getItem(key: string): string | null {
    try {
      if (sessionStorageAvailable) {
        return sessionStorage.getItem(key);
      }
      return memoryStorage[`session_${key}`] ?? null;
    } catch (e) {
      console.warn("[safeStorage] Failed to get sessionStorage item:", key);
      return memoryStorage[`session_${key}`] ?? null;
    }
  },

  setItem(key: string, value: string): void {
    try {
      if (sessionStorageAvailable) {
        sessionStorage.setItem(key, value);
      } else {
        memoryStorage[`session_${key}`] = value;
      }
    } catch (e) {
      console.warn("[safeStorage] Failed to set sessionStorage item:", key);
      memoryStorage[`session_${key}`] = value;
    }
  },

  removeItem(key: string): void {
    try {
      if (sessionStorageAvailable) {
        sessionStorage.removeItem(key);
      }
      delete memoryStorage[`session_${key}`];
    } catch (e) {
      console.warn("[safeStorage] Failed to remove sessionStorage item:", key);
      delete memoryStorage[`session_${key}`];
    }
  },
};

/**
 * Safely parse JSON with fallback
 */
export function safeJsonParse<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    console.warn("[safeStorage] Failed to parse JSON:", e);
    return fallback;
  }
}
