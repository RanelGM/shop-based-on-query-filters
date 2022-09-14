import { useCallback, useState } from "react";
import { Timeout } from "types/common";

type UseDebounceProps<T extends unknown[]> = {
  callback: (...args: T) => void;
  timeout: number;
};

type Result<T extends unknown[]> = [callback: (...args: T) => void, resetDebounce: () => void];

export const useDebounce = <T extends unknown[]>(props: UseDebounceProps<T>): Result<T> => {
  const { callback, timeout } = props;
  const [debounceTimeoutId, setDebounceTimeoutId] = useState<Timeout>();

  const resetDebounce = useCallback(() => {
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
    }
  }, [debounceTimeoutId]);

  const initiateCallback = useCallback(
    (...params: T) => {
      resetDebounce();

      const timeoutId = setTimeout(() => {
        callback(...params);
      }, timeout);

      setDebounceTimeoutId(timeoutId);
    },
    [callback, resetDebounce, timeout],
  );

  return [initiateCallback, resetDebounce];
};
