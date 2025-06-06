import { Tabs } from "webextension-polyfill";
import dayjs from "@/plugins/dayjs";
import { sendSiteTimes } from "@/api/siteTimes";
import { getActiveTab } from "@/core/functions/tab";
import { appendLocalStorage, getLocalStorageByParams, setLocalStorageByParam } from "@/core/storage/helper";

export class ActiveTab {
  static instance: Tab;

  constructor() {}

  static getInstance() {
    return ActiveTab.instance;
  }

  static setInstance(tab: Tab) {
    ActiveTab.instance = tab;
  }

  static async startActiveTimer() {
    ActiveTab.getInstance().startTimer();
  }

  static async stopActiveTimer() {
    const tab = ActiveTab.getInstance();
    if (tab && !tab.endTime) {
      await ActiveTab.getInstance().stopTimer();
    }
  }

  static async reactivateTimer() {
    const tab = await getActiveTab();
    if (ActiveTab.getInstance()) {
      await ActiveTab.getInstance().stopTimer();
    }
    ActiveTab.setInstance(new Tab(tab));
    ActiveTab.getInstance().startTimer();
  }
}

export class Tab {
  tabId: number;
  windowId: number;
  url: string;
  startTime: number | null;
  endTime: number | null;
  faviconUrl?: string;

  constructor({ 
    id: tabId,
    favIconUrl,
    windowId,
    url, 
  }: Tabs.Tab) {
    if (!url || !tabId || !windowId) throw new Error("Вкладка не валидна");
    this.url = url;
    this.tabId = tabId;
    this.faviconUrl = favIconUrl;
    this.windowId = windowId;
    this.startTime = null;
    this.endTime = null;
  }

  startTimer() {
    this.startTime = Date.now();
    this.endTime = null;
  }

  async stopTimer() {
    if (!this.startTime) throw new Error("Нельзя остановить не запущенный таймер");
    this.endTime = Date.now();
    await this.save();
  }

  async save() {
    if (!this.url || !this.endTime || !this.startTime) throw new Error("Ошибка при сохранении интервала");

    const today = dayjs().formatServer();
    const storageDate = await getLocalStorageByParams("date");
    if (today !== storageDate) {
      const intervals = await getLocalStorageByParams("siteTimes");
      const response = await sendSiteTimes(intervals)
      await setLocalStorageByParam("date", today);
      if (!response?.error) {
        await setLocalStorageByParam("siteTimes", []);
        await setLocalStorageByParam("statistics", {});
      }
    }
    
    // Исключаем сайты, на которых пользователь провел меньше секунды
    if (this.endTime - this.startTime > 1000) {
      await appendLocalStorage("siteTimes", [{ 
        url: this.url,
        startTime: Math.floor(this.startTime / 1000),
        endTime: Math.floor(this.endTime / 1000),
        faviconUrl: this.faviconUrl,
        date: today,
      }]);
    }
  }
}
