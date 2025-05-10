import { getLocalStorageByParams } from "@/core/storage/helper";
import { StatisticsItem } from "@/core/storage/types";
import { ActiveTab } from "../tab";
import { getTabById } from "@/core/functions/tab";

export class StatisticsItemStorage {
  #url: string;
  #exist: boolean;
  #item: StatisticsItem;

  constructor (url: string) {
    this.#url = url;
    this.#exist = false;
    this.#item = {
      sessionCount: 0,
      timeCount: 0,
    };
  }

  async init() {
    const statistics = await getLocalStorageByParams("statistics");
    const existingStatItem = statistics[this.#url];
    if (existingStatItem) {
      this.#item = existingStatItem;
      this.#exist = true;
    };
    this.#item.faviconUrl = (await getTabById(ActiveTab.getInstance().tabId)).favIconUrl;
    return this;
  }
  
  getItem() {
    return this.#item;
  }

  get exist() {
    return this.#exist;
  }
  
  get timeCount() {
    return this.#item.timeCount;
  }

  set timeCount(value: number) {
    if (!value) return;
    this.#item.timeCount = value;
  }

  get sessionCount() {
    return this.#item.sessionCount;
  }

  set sessionCount(value: number) {
    if (!value) return;
    this.#item.sessionCount = value;
  }
}