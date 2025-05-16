import axiosInstance from "@/api";
import { GetStatisticsResponse  } from "@/api/statistics/types";

type FetchStatisticsParams = {
  period_date_start: string;
  period_date_end: string;
}

export async function fetchStatistics(params: FetchStatisticsParams) {
  const { data } = await axiosInstance.get<GetStatisticsResponse>("statistics/", { params });
  return data;
}
