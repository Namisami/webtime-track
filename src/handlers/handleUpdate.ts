import { ActiveTab, Tab } from "@/entities/tab";
import { Tabs } from "webextension-polyfill";

export default async function handleUpdate(
  tabId: number, 
  changeInfo: Tabs.OnUpdatedChangeInfoType, 
  tab: Tabs.Tab,
) {
  if (changeInfo.url && tab.active && tab.url) {
    if (ActiveTab.getInstance()) {
      await ActiveTab.getInstance().stopTimer();
      ActiveTab.setInstance(new Tab(tab.url));
    } else {
      ActiveTab.setInstance(new Tab(tab.url));
    }
    ActiveTab.getInstance().startTimer();
  }
};
