const storage = window.sessionStorage;

export const getStorage = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch(e) {
    console.error(e);
    return defaultValue;
  }
}

export const updateStorage = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
}
