import { SiteTime } from "@/core/storage/types";
import { Paginated } from "../types";

export type GetSiteTimesResponse = Paginated<SiteTime[]>;

export type SendSiteTimesResponse = {
  'status'?: 'success', 
  'processed'?: number,
  'duplicates'?: number,
  'error'?: string;
};

export type SendSiteTimesRequest = {
  intervals: SiteTime[];
};
