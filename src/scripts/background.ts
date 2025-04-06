import browser from "webextension-polyfill";
import { getTabById } from "@/utils/browser";

console.log(1231)
browser.runtime.onConnect.addListener(async (message) => {
  console.log(message);
})

browser.runtime.onMessage.addListener(async (message: unknown) => {
  console.log(message);
})

browser.action.onClicked.addListener(async (tab) => {
  console.log(tab)
});

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  const currentTab = await getTabById(tabId);
  console.log(currentTab);
});

browser.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  const url = info.url;
  console.log("URL", url);
  if (url) {
    const options = {
      [url]: 0,
    }
    console.log("URL", url, options);
    await browser.storage.local.set(options);
  }
  console.log(tabId, info, tab)
})
