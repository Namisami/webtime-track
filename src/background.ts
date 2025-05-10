// import { getActiveTab } from '@/functions/tab';
import Browser from 'webextension-polyfill';
import handleActivate from '@/core/handlers/handleActivate';
import handleFocusChanged from '@/core/handlers/handleFocusChanged';
import handleStateChanged from '@/core/handlers/handleStateChanged';
import handleSuspend from '@/core/handlers/handleSuspend';
import handleUpdate from '@/core/handlers/handleUpdate';
import handleInstall from '@/core/handlers/handleInstall';
import handleStorageChanged from '@/core/handlers/handleStorageChanged';
import handleActionClick from '@/core/handlers/handleActionClick';

// async function trackTime() {
//   console.log(await getActiveTab());
// }

function init() {
  try {
    // setInterval(trackTime, 1000)
    // Инициализация хранилища при установке
    Browser.runtime.onInstalled.addListener(handleInstall);
    
    Browser.tabs.onActivated.addListener(handleActivate);
    Browser.tabs.onUpdated.addListener(handleUpdate);
  
    Browser.runtime.onSuspend.addListener(handleSuspend)
  
    Browser.windows.onFocusChanged.addListener(handleFocusChanged);
  
    Browser.idle.onStateChanged.addListener(handleStateChanged);
    
    Browser.storage.onChanged.addListener(handleStorageChanged);
  
    Browser.action.onClicked.addListener(handleActionClick);
  
    // Browser.tabs.onActivated.addListener(async (activeInfo) => {
    //   await updateTimeForPreviousUrl();
    //   const tab = await Browser.tabs.get(activeInfo.tabId);
    //   await setNewActiveUrl(tab.url);
    // });
    
    // Browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    //   if (changeInfo.url && tab.active) {
    //     await updateTimeForPreviousUrl();
    //     await setNewActiveUrl(changeInfo.url);
    //   }
    // });
    
    // async function updateTimeForPreviousUrl(): Promise<void> {
    //   const data = await getLocalStorageByParams(['activeUrl', 'startTime']);
    //   const previousUrl = data.activeUrl;
    //   const previousStartTime = data.startTime;
    
    //   if (previousUrl && previousStartTime) {
    //     const timeSpent = Math.floor((Date.now() - previousStartTime) / 1000);
    //     const existingData = (await Browser.storage.local.get('siteTimes')).siteTimes || [];
    //     const index = existingData.findIndex(entry => entry.url === previousUrl);
    
    //     if (index !== -1) {
    //       existingData[index].time += timeSpent;
    //     } else {
    //       existingData.push({ url: previousUrl, time: timeSpent });
    //     }
    
    //     await Browser.storage.local.set({ siteTimes: existingData });
    //   }
    // }
    
    // async function setNewActiveUrl(url: string | undefined): Promise<void> {
    //   if (!url) return;
    //   await Browser.storage.local.set({
    //     activeUrl: url,
    //     startTime: Date.now()
    //   });
    // }
    
     // Периодическое обновление времени каждую минуту
    // Browser.alarms.create('updateTime', { periodInMinutes: 1 });
    // Browser.alarms.onAlarm.addListener(async (alarm) => {
    //   if (alarm.name === 'updateTime') {
    //     await updateCurrentUrlTime();
    //   }
    // });
  
  //   async function updateCurrentUrlTime(): Promise<void> {
  //     const data = await Browser.storage.local.get(['activeUrl', 'startTime']);
      
  //     const currentUrl = data.activeUrl;
  //     const currentStartTime = data.startTime;
    
  //     if (currentUrl && currentStartTime) {
  //       const timeSpent = Math.floor((Date.now() - currentStartTime) / 1000);
  //       const existingData = (await Browser.storage.local.get('siteTimes')).siteTimes || [];
  //       const index = existingData.findIndex(entry => entry.url === currentUrl);
    
  //       if (index !== -1) {
  //         existingData[index].time += timeSpent;
  //       } else {
  //         existingData.push({ url: currentUrl, time: timeSpent });
  //       }
    
  //       await Browser.storage.local.set({
  //         siteTimes: existingData,
  //         startTime: Date.now()
  //       });
  //     }
  //   }
  } catch (err) {
    console.error("UNEXPECTED ERROR", err);
  }
}

init();
