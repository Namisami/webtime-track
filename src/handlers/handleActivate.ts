import { ActiveTab } from "@/entities/tab";
import { getTabById } from "@/functions/tab";
import { Tabs } from "webextension-polyfill";

export default async function handleActivate(activeInfo: Tabs.OnActivatedActiveInfoType) {
  console.log("ACTIVATE TAB ID", activeInfo.tabId);
  const tab = await getTabById(activeInfo.tabId);
  if (!tab.url) return;
  
  await ActiveTab.reactivateTimer();
};
