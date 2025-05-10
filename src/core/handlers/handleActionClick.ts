import Browser, { Tabs } from "webextension-polyfill";
import { ActiveTab } from "@/core/entities/tab";

export default async function handleActionClick(tab: Tabs.Tab) {
  console.log("ACTION CLICKED", tab);
  await ActiveTab.stopActiveTimer();

  await Browser.action.setPopup({ popup: "index.html" });
  await Browser.action.openPopup();
  await Browser.action.setPopup({ popup: "" });
}
