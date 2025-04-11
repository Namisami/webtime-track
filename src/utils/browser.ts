import Browser, { Tabs } from "webextension-polyfill";

export function getURLByTab(tab: Tabs.Tab) {
  return tab?.url;
}

export async function getTabById(id: number) {
  const tab = await Browser.tabs.get(id);
  return tab;
}
