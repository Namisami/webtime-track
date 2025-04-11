import Browser from "webextension-polyfill";

export async function setLocalStorage(options: Record<string, unknown>) {
  await Browser.storage.local.set(options);
}
