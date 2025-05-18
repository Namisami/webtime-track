import LocalStorage, { LocalStorageKeys } from "@/core/storage/types";
import { getLocalStorageByParams, setLocalStorageByParam } from "@/core/storage/helper";
import { useCallback } from "react";

export function useLocalStorage<T extends LocalStorageKeys>(
  key: T
): [
  () => Promise<LocalStorage[T]>,
  (value: LocalStorage[T]) => Promise<void>
];

export function useLocalStorage<T extends LocalStorageKeys>(
  keys: T
) {
  const get = useCallback(async () => {
    return await getLocalStorageByParams(keys);
  }, [keys]);

  const set = useCallback(async (values: LocalStorage[T]) => {
    return await setLocalStorageByParam(keys, values);
  }, [keys]);

  return [get, set];
}