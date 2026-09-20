import { useState, useEffect } from "react";

/**
 * Hook untuk menunda pembaruan nilai hingga periode waktu tertentu terlewati.
 * Sangat berguna untuk input pencarian UMKM atau debounce kalkulasi finansial.
 */
export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
