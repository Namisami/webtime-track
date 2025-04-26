import { ArrayKeys } from "@/types/helper";

export interface SiteTime {
  url: string;
  startTime: number;
  endTime: number;
};

export default interface LocalStorage {
  siteTimes: SiteTime[];
};

export type LocalStorageKeys = keyof LocalStorage;
export type LocalStorageArrayKeys = ArrayKeys<LocalStorage>;
