/**
 * Loads and parses a value from localStorage based on the given key.
 */
export function load<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return null;
  }
}
