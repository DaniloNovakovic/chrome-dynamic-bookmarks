import { useEffect, useRef } from "react";

import useCallbackRef from "./useCallbackRef";

export type DebouncedCallback<TArgs extends unknown[]> = (
  ...args: TArgs
) => void;

const useDebouncedCallback = <TArgs extends unknown[]>(
  callback?: (...args: TArgs) => unknown,
  delayMs = 500
): DebouncedCallback<TArgs> => {
  const timeoutRef = useRef<number>();

  useEffect(() => {
    // Clear timeout on unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return useCallbackRef((...args: TArgs) => {
    const later = (): void => {
      clearTimeout(timeoutRef.current);

      if (callback) {
        callback(...args);
      }
    };

    clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(later, delayMs);
  });
};

export default useDebouncedCallback;
