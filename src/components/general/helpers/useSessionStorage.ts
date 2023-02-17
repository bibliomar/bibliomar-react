import { useState } from "react";
import { hasStorage } from "./generalFunctions";

function useSessionStorage<T>(key: string, initialValue: T) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined" || initialValue == undefined) {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.sessionStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to sessionStorage.
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function, so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            // Save to local storage
            if (typeof window !== "undefined" && valueToStore != null) {
                window.sessionStorage.setItem(
                    key,
                    JSON.stringify(valueToStore)
                );
            } else if (typeof window !== "undefined" && valueToStore == null) {
                window.sessionStorage.removeItem(key);
            }
            console.log(window.sessionStorage.getItem(key));

            // Save state
            setStoredValue(valueToStore);
        } catch (error: unknown) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue] as const;
}

export default useSessionStorage;
