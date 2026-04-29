import { DependencyList, useCallback, useEffect, useRef } from "react";

const useCallbackRef = <TArgs extends unknown[], TReturn>(
  callback: (...args: TArgs) => TReturn,
  deps: DependencyList = []
): ((...args: TArgs) => TReturn | undefined) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
    return (): void => {
      callbackRef.current = undefined;
    };
  }, [callback]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    ((...args) => {
      return callbackRef.current?.(...args);
    }) as (...args: TArgs) => TReturn | undefined,
    deps
  );
};

export default useCallbackRef;
