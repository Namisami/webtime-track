import Browser from "webextension-polyfill";

export default async function getTabById(id: number) {
  return await Browser.tabs.get(id);
}
