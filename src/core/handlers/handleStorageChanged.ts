import Browser from "webextension-polyfill";
import { updateLocalStorage } from "@/core/storage/helper";
import LocalStorage, { LocalStorageArrayKeys } from "@/core/storage/types";
import { ArrayElement } from "@/core/types/helper";
import { StatisticsItemStorage } from "../entities/storage/statisticsItem";

// Действует только для массивов
function extractLastChanges<T extends LocalStorageArrayKeys>(
  changes: Record<string, Browser.Storage.StorageChange>, 
  keys: T[],
): { [K in T]: ArrayElement<LocalStorage[K]> | undefined } {
  console.log(changes);
  return keys.reduce((acc, key) => {
    acc[key] = (changes[key]?.newValue as ArrayElement<LocalStorage[T]>[])?.at(-1);
    return acc;
  }, {} as {[K in T]: ArrayElement<LocalStorage[K]> | undefined});
}

export default async function handleStorageChanged(
  changes: Record<string, Browser.Storage.StorageChange>, 
  areaName: string
) {
  const {
    siteTimes,
  } = extractLastChanges(changes, ["siteTimes"]);
  console.log("STORAGE CHANGED", changes, areaName);
  if (siteTimes) await handleSiteTimesChanged(siteTimes);
}

async function handleSiteTimesChanged({ 
  url, 
  startTime, 
  endTime
}: LocalStorage["siteTimes"][number]) {
  const updatedSite = await (new StatisticsItemStorage(url).init());
  if (updatedSite.exist) {
    updatedSite.sessionCount += 1;
    updatedSite.timeCount += endTime - startTime;
  }
  await updateLocalStorage("statistics", { [url]: updatedSite.getItem() });
};
