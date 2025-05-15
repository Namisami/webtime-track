import axiosInstance from "@/api";
import { GetSiteTimesResponse, SendSiteTimesRequest, SendSiteTimesResponse } from "@/api/siteTimes/types";

export async function fetchSiteTimes() {
  const { data } = await axiosInstance.get<GetSiteTimesResponse>("intervals/");
  return data;
}

export async function sendSiteTimes(intervals: SendSiteTimesRequest["intervals"]) {
  const { data } = await axiosInstance.post<SendSiteTimesResponse>("create_intervals/", {
    intervals,
  });
  return data;
}
