import { ArrayKeys, ObjectKeys } from "@/core/types/helper";

export interface SiteTime {
  url: string;
  startTime: number;
  endTime: number;
  date: string;
  faviconUrl?: string;
};

export type StatisticsItem = {
  period_date: string;
  timeCount: number;
  sessionCount: number;
  faviconUrl?: string;
}

// Record<url, StatisticsItem>
export interface Statistics {
  [url: string]: StatisticsItem;
};

export interface CommonStorageParams {
  date: string;
}

export default interface LocalStorage extends CommonStorageParams {
  siteTimes: SiteTime[];
  statistics: Statistics;
};

export type LocalStorageKeys = keyof LocalStorage;
export type LocalStorageArrayKeys = ArrayKeys<LocalStorage>;
export type LocalStorageObjectKeys = ObjectKeys<LocalStorage>;
