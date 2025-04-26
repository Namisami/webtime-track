import { ActiveTab } from "@/core/entities/tab";
import { getTabById } from "@/core/functions/tab";
import { Tabs } from "webextension-polyfill";

export default async function handleActivate(activeInfo: Tabs.OnActivatedActiveInfoType) {
  console.log("ACTIVATE TAB ID", activeInfo.tabId);
  const tab = await getTabById(activeInfo.tabId);
  if (!tab.url) return;
  
  await ActiveTab.reactivateTimer();
};
