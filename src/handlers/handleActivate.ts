import { ActiveTab, Tab } from "@/entities/tab";
import { getTabById } from "@/functions/tab";
import { Tabs } from "webextension-polyfill";

export default async function handleActivate(activeInfo: Tabs.OnActivatedActiveInfoType) {
  console.log("ACTIVATE TAB ID", activeInfo.tabId);
  const tab = await getTabById(activeInfo.tabId);
  if (!tab.url) return;
  
  if (ActiveTab.getInstance()) {
    await ActiveTab.getInstance().stopTimer();
    ActiveTab.setInstance(new Tab(tab.url));
  } else {
    ActiveTab.setInstance(new Tab(tab.url));
  }
  ActiveTab.getInstance().startTimer();
};
