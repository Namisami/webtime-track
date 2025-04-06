import browser, { Tabs } from "webextension-polyfill";

export function getURLByTab(tab: Tabs.Tab) {
  return tab?.url;
}

export async function getTabById(id: number) {
  const tab = await browser.tabs.get(id);
  return tab;
}
