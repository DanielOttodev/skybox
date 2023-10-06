import { useState } from "react";

// This hook is responsible for syncing the user state in React with  Local Storage
// If token is not available within LocalStorage, React will not be able to track state on refresh.

export const useLocalStorage = (keyName : string, defaultValue : string | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue : string) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
        // do something with error here if needed
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};