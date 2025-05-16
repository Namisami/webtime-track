import Browser from "webextension-polyfill";
import LocalStorage from "@/core/storage/types";
import dayjs from "@/plugins/dayjs";

export default async function initializeStorage() {
  const storage: Record<string, unknown> = {
    siteTimes: [],
    statistics: {},
    date: dayjs().formatServer(),
  } satisfies LocalStorage;

  await Browser.storage.local.set(storage);
}