import { ActiveTab, Tab } from "@/core/entities/tab";
import { Tabs } from "webextension-polyfill";
import { getTabById } from "@/core/functions/tab";

export default async function handleUpdate(
  tabId: number, 
  changeInfo: Tabs.OnUpdatedChangeInfoType, 
) {
  if (changeInfo.status && changeInfo.status === "complete") {
    console.log("UPDATE TAB ID", tabId);
    const tab = await getTabById(tabId);
    // Проверка есть ли уже трекаемая вкладка
    if (ActiveTab.getInstance()) {
      await ActiveTab.getInstance().stopTimer();
      ActiveTab.setInstance(new Tab(tab));
    } else {
      ActiveTab.setInstance(new Tab(tab));
    }
    ActiveTab.getInstance().startTimer();
  }
};
