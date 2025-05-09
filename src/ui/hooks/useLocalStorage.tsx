import LocalStorage, { LocalStorageKeys } from "@/core/storage/types";
import { getLocalStorageByParams, setLocalStorage } from "@/core/storage/helper";
import { useCallback } from "react";

export function useLocalStorage<T extends LocalStorageKeys>(
  key: T
): [
  () => Promise<LocalStorage[T]>,
  (value: LocalStorage[T]) => Promise<void>
];

export function useLocalStorage<T extends readonly LocalStorageKeys[]>(
  keys: T
): [
  () => Promise<Pick<LocalStorage, T[number]>>,
  (values: Partial<LocalStorage>) => Promise<void>
];

export function useLocalStorage<T extends LocalStorageKeys | readonly LocalStorageKeys[]>(
  keys: T
) {
  const get = useCallback(async () => {
    if (Array.isArray(keys)) {
      return getLocalStorageByParams(keys as unknown as LocalStorageKeys[]);
    }
    return getLocalStorageByParams(keys as LocalStorageKeys);
  }, [keys]);

  const set = useCallback(async (values: Partial<LocalStorage>) => {
    await setLocalStorage(values);
  }, [keys]);

  return [get, set];
}