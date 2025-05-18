import Browser from "webextension-polyfill";

export default async function createTab(url: string) {
  await Browser.tabs.create({ url });
}
