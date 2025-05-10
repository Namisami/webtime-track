import { ArrayKeys, ObjectKeys } from "@/core/types/helper";

export interface SiteTime {
  url: string;
  startTime: number;
  endTime: number;
};

export type StatisticsItem = {
  faviconUrl?: string;
  timeCount: number;
  sessionCount: number;
}

// Record<url, StatisticsItem>
export interface Statistics {
  [url: string]: StatisticsItem;
};

export default interface LocalStorage {
  siteTimes: SiteTime[];
  statistics: Statistics;
};

export type LocalStorageKeys = keyof LocalStorage;
export type LocalStorageArrayKeys = ArrayKeys<LocalStorage>;
export type LocalStorageObjectKeys = ObjectKeys<LocalStorage>;
