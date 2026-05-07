import { DependencyList, useCallback, useEffect, useRef } from "react";

const useCallbackRef = <TArgs extends unknown[], TReturn>(
  callback: (...args: TArgs) => TReturn,
  deps: DependencyList = [],
): ((...args: TArgs) => TReturn | undefined) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return (): void => {
      callbackRef.current = undefined;
    };
  }, []);

  return useCallback(
    ((...args) => {
      return callbackRef.current?.(...args);
    }) as (...args: TArgs) => TReturn | undefined,
    deps,
  );
};

export default useCallbackRef;
