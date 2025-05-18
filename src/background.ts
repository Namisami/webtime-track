import Browser from 'webextension-polyfill';
import handleActivate from '@/core/handlers/handleActivate';
import handleFocusChanged from '@/core/handlers/handleFocusChanged';
import handleStateChanged from '@/core/handlers/handleStateChanged';
import handleSuspend from '@/core/handlers/handleSuspend';
import handleUpdate from '@/core/handlers/handleUpdate';
import handleInstall from '@/core/handlers/handleInstall';
import handleStorageChanged from '@/core/handlers/handleStorageChanged';
import handleActionClick from '@/core/handlers/handleActionClick';
import handleAlarm from '@/core/handlers/handleAlarm';

function init() {
  try {
    Browser.runtime.onInstalled.addListener(handleInstall);
    
    Browser.tabs.onActivated.addListener(handleActivate);
    Browser.tabs.onUpdated.addListener(handleUpdate);
  
    Browser.runtime.onSuspend.addListener(handleSuspend)
  
    Browser.windows.onFocusChanged.addListener(handleFocusChanged);
  
    Browser.idle.onStateChanged.addListener(handleStateChanged);
    
    Browser.storage.onChanged.addListener(handleStorageChanged);
  
    Browser.action.onClicked.addListener(handleActionClick);

    Browser.alarms.onAlarm.addListener(handleAlarm)
  } catch (err) {
    console.error("UNEXPECTED ERROR", err);
  }
}

init();
