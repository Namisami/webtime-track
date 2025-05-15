import Browser from "webextension-polyfill";
import { updateLocalStorage } from "@/core/storage/helper";
import LocalStorage, { LocalStorageArrayKeys, LocalStorageKeys } from "@/core/storage/types";
import { ArrayElement } from "@/core/types/helper";
import { StatisticsItemStorage } from "@/core/entities/storage/statisticsItem";
import { intersection } from "lodash";

const WATCH_KEYS: LocalStorageKeys[] = ["siteTimes"];

// Действует только для массивов
function extractLastChanges<T extends LocalStorageArrayKeys>(
  changes: Record<string, Browser.Storage.StorageChange>, 
  keys: T[],
): { [K in T]: ArrayElement<LocalStorage[K]> | undefined } {
  return keys.reduce((acc, key) => {
    acc[key] = (changes[key]?.newValue as ArrayElement<LocalStorage[T]>[])?.at(-1);
    return acc;
  }, {} as {[K in T]: ArrayElement<LocalStorage[K]> | undefined});
}

export default async function handleStorageChanged(
  changes: Record<string, Browser.Storage.StorageChange>, 
  areaName: string
) {
  if (!(intersection(Object.keys(changes), WATCH_KEYS).length)) return;

  console.log("STORAGE CHANGED", changes, areaName);
  const {
    siteTimes,
  } = extractLastChanges(changes, ["siteTimes"]);
  if (siteTimes) await handleSiteTimesChanged(siteTimes);
}

async function handleSiteTimesChanged({ 
  url, 
  startTime, 
  endTime,
  faviconUrl,
}: LocalStorage["siteTimes"][number]) {
  const updatedSite = await (new StatisticsItemStorage(url, faviconUrl).init());
  updatedSite.sessionCount += 1;
  updatedSite.timeCount += endTime - startTime;
  await updateLocalStorage("statistics", { [url]: updatedSite.getItem() });
};
