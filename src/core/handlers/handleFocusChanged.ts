import { windows } from "webextension-polyfill";
import { ActiveTab, Tab } from "@/core/entities/tab";
import { getActiveTab } from "@/core/functions/tab";

const { WINDOW_ID_NONE } = windows;

export default async function handleFocusChanged(windowId: number) {
  console.log("FOCUS CHANGED", windowId);
  if (windowId === WINDOW_ID_NONE) {
    await ActiveTab.stopActiveTimer();
  } else if (ActiveTab.getInstance() && windowId === ActiveTab.getInstance().windowId) {
    await ActiveTab.startActiveTimer();
  } else if (ActiveTab.getInstance() && windowId !== ActiveTab.getInstance().windowId) {
    await ActiveTab.stopActiveTimer();
    const tab = await getActiveTab();
    ActiveTab.setInstance(new Tab(tab));
    await ActiveTab.startActiveTimer();
  }
}
