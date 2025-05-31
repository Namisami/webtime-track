import Browser from "webextension-polyfill";

export default async function removeCurrentTab() {
  const tabs = await Browser.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  if (currentTab && currentTab.id) {
    await Browser.tabs.remove(currentTab.id);
  }
}
