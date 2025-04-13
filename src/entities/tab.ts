import { appendLocalStorage } from "@/storage/helper";
// import Browser from "webextension-polyfill";

export class ActiveTab {
  static instance: Tab;

  constructor() {}

  static getInstance() {
    return ActiveTab.instance;
  }

  static setInstance(tab: Tab) {
    ActiveTab.instance = tab;
  }
}

export class Tab {
  url: string;
  startTime: number | null;
  endTime: number | null;

  constructor(url?: string) {
    if (!url) throw new Error("У вкладки должен быть URL");
    this.url = url;
    this.startTime = null;
    this.endTime = null;
  }

  startTimer() {
    if (!this.url) throw new Error("Нельзя запустить таймер в вкладке без URL");
    this.startTime = Date.now();
  }

  async stopTimer() {
    if (!this.startTime) throw new Error("Нельзя остановить не запущенный таймер");
    this.endTime = Date.now();
    await this.save();
  }

  async save() {
    if (!this.url || !this.endTime || !this.startTime) throw new Error("Ошибка при сохранении интервала");

    await appendLocalStorage("siteTimes", [{ 
      url: this.url,
      startTime: this.startTime,
      endTime: this.endTime,
    }]);
  }
}
