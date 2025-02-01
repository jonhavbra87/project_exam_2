/**
 * Saves a key-value pair to localStorage after stringifying the value.
 *
 * This function ensures the key is valid and prevents saving `undefined` or `null` values.
 * If successful, it stores the value under the specified key in `localStorage`.
 *
 * @function save
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {T} value - The value to be saved, which is stringified before saving.
 * @returns {void}
 *
 * @example
 * save("userProfile", { name: "John", age: 30 });
 */

export function save<T>(key: string, value: T): void {
  try {
    if (!key) {
      console.warn('Save failed: Key is empty.');
      return;
    }

    if (value === undefined || value === null) {
      console.warn(`Save failed: Invalid value for key "${key}".`);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
    console.log(`✅ Saved "${key}" to localStorage:`, value);
  } catch (error) {
    console.error(`Error saving "${key}" to localStorage:`, error);
  }
}
