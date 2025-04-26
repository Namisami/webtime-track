import { ActiveTab, Tab } from "@/core/entities/tab";
import { Tabs } from "webextension-polyfill";

export default async function handleUpdate(
  tabId: number, 
  changeInfo: Tabs.OnUpdatedChangeInfoType, 
  tab: Tabs.Tab,
) {
  if (changeInfo.url && tab.active && tab.url) {
    console.log("UPDATE TAB ID", tab.id);
    // Проверка есть ли уже трекаемая вкладка
    if (ActiveTab.getInstance()) {
      await ActiveTab.getInstance().stopTimer();
      ActiveTab.setInstance(new Tab(tab.url));
    } else {
      ActiveTab.setInstance(new Tab(tab.url));
    }
    ActiveTab.getInstance().startTimer();
  }
};
