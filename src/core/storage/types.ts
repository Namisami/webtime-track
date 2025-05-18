import { ArrayKeys, ObjectKeys } from "@/core/types/helper";

export interface SiteTime {
  url: string;
  startTime: number;
  endTime: number;
  date: string;
  faviconUrl?: string;
};

export type PomodoroSettings = {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  repeats: number;
  on: boolean;
}

export type StatisticsItem = {
  period_date: string;
  timeCount: number;
  sessionCount: number;
  faviconUrl?: string;
}

// Record<url, StatisticsItem>
export type Statistics = {
  [url: string]: StatisticsItem;
};

export type StatisticsWithURL = (StatisticsItem & {
  url: string;
})[];

export type CommonStorageParams = {
  date: string;
}

type LocalStorage = {
  siteTimes: SiteTime[];
  statistics: Statistics;
  pomodoro: PomodoroSettings
} & CommonStorageParams;

export default LocalStorage;

export type LocalStorageKeys = keyof LocalStorage;
export type LocalStorageArrayKeys = ArrayKeys<LocalStorage>;
export type LocalStorageObjectKeys = ObjectKeys<LocalStorage>;
