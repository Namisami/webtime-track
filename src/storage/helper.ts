import LocalStorage, { LocalStorageArrayKeys, LocalStorageKeys } from "@/storage/types";
import Browser from "webextension-polyfill";

export async function getLocalStorageByParams<T extends LocalStorageKeys>(
  keys: T
): Promise<LocalStorage[T]>;

export async function getLocalStorageByParams<T extends LocalStorageKeys[]>(
  keys: T
): Promise<Pick<LocalStorage, T[number]>>;

export async function getLocalStorageByParams<
  T extends LocalStorageKeys[] | LocalStorageKeys
>(keys: T) {
  if (!keys || (keys && !keys.length)) return;

  const params = await Browser.storage.local.get(keys);
  if (Array.isArray(keys)) return params;
  return params[keys as LocalStorageKeys];
}

export async function setLocalStorage<
  T extends Partial<Record<LocalStorageKeys, LocalStorage[LocalStorageKeys]>>
>(entries: T) {
  await Browser.storage.local.set(entries);
}

export async function appendLocalStorage<
  K extends LocalStorageArrayKeys,
  T extends LocalStorage[K]
>(key: K, value: T) {
  const existing = (await Browser.storage.local.get(key))[key];
  if (!Array.isArray(existing)) throw new Error('Метод appendLocalStorage работает только с типом Array');
  const appended = { [key]: [...existing, ...value] };
  await Browser.storage.local.set(appended);
}
