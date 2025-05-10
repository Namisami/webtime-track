import { getActiveTab } from "@/core/functions/tab";
import { appendLocalStorage } from "@/core/storage/helper";
import { Tabs } from "webextension-polyfill";

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
    console.log(ActiveTab.getInstance());
    if (ActiveTab.getInstance()) {
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

  constructor({ 
    id: tabId,
    windowId,
    url, 
  }: Tabs.Tab) {
    if (!url || !tabId || !windowId) throw new Error("Вкладка не валидна");
    this.url = url;
    this.tabId = tabId;
    this.windowId = windowId;
    this.startTime = null;
    this.endTime = null;
  }

  startTimer() {
    this.startTime = Date.now();
  }

  async stopTimer() {
    if (!this.startTime) throw new Error("Нельзя остановить не запущенный таймер");
    this.endTime = Date.now();
    await this.save();
  }

  async save() {
    if (!this.url || !this.endTime || !this.startTime) throw new Error("Ошибка при сохранении интервала");
    
    // Исключаем сайты, на которых пользователь провел меньше секунды
    if (this.endTime - this.startTime > 1000) {
      await appendLocalStorage("siteTimes", [{ 
        url: this.url,
        startTime: this.startTime,
        endTime: this.endTime,
      }]);
    }
  }
}
