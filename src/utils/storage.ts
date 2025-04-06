import browser from "webextension-polyfill";

export async function setLocalStorage(options: Record<string, unknown>) {
  await browser.storage.local.set(options);
}
