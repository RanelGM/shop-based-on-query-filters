import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { AppDispatch, AsyncActionResult } from "store/store";
import { setError } from "store/ui/actions";

type Status = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: null | unknown;
};

type Props<T extends unknown[]> = {
  onLoad: (...params: T) => AsyncActionResult;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  isLoadImmediate?: boolean;
};

type Result<T extends unknown[]> = [
  status: Status,
  load: ((...params: T) => Promise<void>) | (() => Promise<void>),
  resetStatus: () => void,
];

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
};

// Дженерик T - требуется, чтобы возвращаемая функция требовала те же параметры, что и thunk async action функция
export const useAsyncDispatch = <T extends unknown[]>(props: Props<T>): Result<T> => {
  // Используется для асинхронной загрузки данных и управлением состоянием загрузки
  // Принимает thunk async функцию для загрузки из store, коллбэки на успешную/неуспешную загрузку и параметр для моментальной загрузки
  // Возвращает массив из статуса загрузки, функцию для старта загрузки, сброса статуса

  const { onLoad, onSuccess, onError, isLoadImmediate } = props;
  const [status, setStatus] = useState<Status>(initialState);
  const dispatch = useDispatch<AppDispatch>();
  const isComponentMountedRef = useRef(false);
  const isFirstLoadRef = useRef(true);

  const resetStatus = useCallback(() => {
    // Сброс статуса для повторной загрузки
    // Для избежания двойной загрузки при isLoadImmediate - проверка на isFirstLoad

    if (!isFirstLoadRef.current) {
      setStatus(initialState);
    }
  }, []);

  const load = useCallback(
    async (...params: T) => {
      setStatus({ ...initialState, isLoading: true });

      try {
        await dispatch(onLoad(...params));

        if (onSuccess) {
          // Опциональный параметр, вызывается при успешной загрузке, если передан
          onSuccess();
        }

        if (isComponentMountedRef.current) {
          setStatus({ ...initialState, isSuccess: true });
        }
      } catch (error) {
        setStatus({ ...initialState, isError: true, error: error });

        if (onError) {
          // Опциональный параметр, вызывается при неуспешной загрузке, если передан
          onError(error);
          return;
        }

        // Если не передан, то по умолчанию открывается модальное окно с ошибкой
        dispatch(setError(error as AxiosError));
      } finally {
        isFirstLoadRef.current = false;
      }
    },
    [dispatch, onLoad, onSuccess, onError],
  );

  useEffect(() => {
    // Используется для случаев, когда происходит редирект во время успешной загрузки (переданный в onSuccess)
    isComponentMountedRef.current = true;

    return () => {
      isComponentMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Используется для загрузки данных при рендере компонента, если передан параметр isLoadImmediate
    // В таком случае вызывается коллбэк без аргументов

    if (!isLoadImmediate || status.isLoading || status.isError || status.isSuccess) {
      return;
    }

    (load as () => void)();
  }, [status, load, isLoadImmediate]);

  return [status, load, resetStatus];
};
