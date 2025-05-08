import Browser from "webextension-polyfill";
import LocalStorage from "@/core/storage/types";

export default async function initializeStorage() {
  const storage: Record<string, unknown> = {
    siteTimes: [],
    statistics: {},
  } satisfies LocalStorage;

  await Browser.storage.local.set(storage);
}