/**
 * Removes a key-value pair from localStorage based on the given key.
 */
export function remove(key: string): void {
  if (localStorage.getItem(key) !== null) {
    localStorage.removeItem(key);
  } else {
    console.warn(`Key "${key}" does not exist in localStorage.`);
  }
}
