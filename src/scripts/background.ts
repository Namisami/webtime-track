import browser from "webextension-polyfill";

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
