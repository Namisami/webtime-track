import LocalStorage, { LocalStorageKeys } from "@/storage/types";
import { getLocalStorageByParams, setLocalStorage } from "@/storage/helper";

// Перегрузки для разных сценариев
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
  const get = async () => {
    if (Array.isArray(keys)) {
      return getLocalStorageByParams(keys as unknown as LocalStorageKeys[]);
    }
    return getLocalStorageByParams(keys as LocalStorageKeys);
  };

  const set = async (values: Partial<LocalStorage>) => {
    await setLocalStorage(values);
  };

  return [get, set];
}