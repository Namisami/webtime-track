import handleUpdate from '@/handlers/handleUpdate';
import { getLocalStorageByParams } from '@/storage/helper';
import browser from 'webextension-polyfill';

try {

  // Инициализация хранилища при установке
  browser.runtime.onInstalled.addListener(() => {
    browser.storage.local.set({ siteTimes: [] });
  });
  
  browser.tabs.onActivated.addListener(async (activeInfo) => {
    await updateTimeForPreviousUrl();
    const tab = await browser.tabs.get(activeInfo.tabId);
    await setNewActiveUrl(tab.url);
  });
  
  // browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  //   if (changeInfo.url && tab.active) {
  //     await updateTimeForPreviousUrl();
  //     await setNewActiveUrl(changeInfo.url);
  //   }
  // });
  browser.tabs.onUpdated.addListener(handleUpdate);
  
  // Периодическое обновление времени каждую минуту
  browser.alarms.create('updateTime', { periodInMinutes: 1 });
  browser.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'updateTime') {
      await updateCurrentUrlTime();
    }
  });
  
  async function updateTimeForPreviousUrl(): Promise<void> {
    const data = await getLocalStorageByParams(['activeUrl', 'startTime']);
    const previousUrl = data.activeUrl;
    const previousStartTime = data.startTime;
  
    if (previousUrl && previousStartTime) {
      const timeSpent = Math.floor((Date.now() - previousStartTime) / 1000);
      const existingData = (await browser.storage.local.get('siteTimes')).siteTimes || [];
      const index = existingData.findIndex(entry => entry.url === previousUrl);
  
      if (index !== -1) {
        existingData[index].time += timeSpent;
      } else {
        existingData.push({ url: previousUrl, time: timeSpent });
      }
  
      await browser.storage.local.set({ siteTimes: existingData });
    }
  }
  
  async function setNewActiveUrl(url: string | undefined): Promise<void> {
    if (!url) return;
    await browser.storage.local.set({
      activeUrl: url,
      startTime: Date.now()
    });
  }
  
  async function updateCurrentUrlTime(): Promise<void> {
    const data = await browser.storage.local.get(['activeUrl', 'startTime']);
    
    const currentUrl = data.activeUrl;
    const currentStartTime = data.startTime;
  
    if (currentUrl && currentStartTime) {
      const timeSpent = Math.floor((Date.now() - currentStartTime) / 1000);
      const existingData = (await browser.storage.local.get('siteTimes')).siteTimes || [];
      const index = existingData.findIndex(entry => entry.url === currentUrl);
  
      if (index !== -1) {
        existingData[index].time += timeSpent;
      } else {
        existingData.push({ url: currentUrl, time: timeSpent });
      }
  
      await browser.storage.local.set({
        siteTimes: existingData,
        startTime: Date.now()
      });
    }
  }
} catch (err) {
  console.error("UNEXPECTED ERROR", err);
}