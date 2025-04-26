import Browser from 'webextension-polyfill';

export default async function getCurrentTab() {
  const tabs = await Browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}
