import LocalStorage, { LocalStorageKeys } from "@/storage/types";
import { getLocalStorageByParams, setLocalStorage } from "@/storage/helper";

export function useSyncLocalStorage<T extends LocalStorageKeys[]>(keys: T) {
  const get = () => getLocalStorageByParams(keys);
  const set = (entries: Record<T[number], LocalStorage[T[number]]>) => setLocalStorage(entries);
  return [get, set];
}