import { useCallback, useState } from "react";
import { Timeout } from "types/common";

type UseDebounceProps<T extends unknown[]> = {
  callback: (...args: T) => void;
  timeout: number;
};

export const useDebounce = <T extends unknown[]>(props: UseDebounceProps<T>) => {
  const { callback, timeout } = props;
  const [debounceTimeoutId, setDebounceTimeoutId] = useState<Timeout>();

  const initiateCallback = useCallback(
    (...params: T) => {
      if (debounceTimeoutId) {
        clearTimeout(debounceTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        callback(...params);
      }, timeout);

      setDebounceTimeoutId(timeoutId);
    },
    [callback, debounceTimeoutId, timeout],
  );

  return [initiateCallback];
};
