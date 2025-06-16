import { useEffect, useMemo, useState } from "react";
import { omit } from "lodash";
import { StatisticsWithURL } from "@/core/storage/types";
import Box from "@/ui/components/common/Box/Box";
import PieChart, { PieChartProps } from "@/ui/components/statistics/PieChart/PieChart";
import StatList from "@/ui/components/statistics/StatList/StatList";
import { objectToArray } from "@/utils/objects";
import { useLocalStorage } from "@/ui/hooks/useLocalStorage";
import { fetchStatistics } from "@/api/statistics";
import './BriefStatisticsPage.css';

type BriefStatisticsPageProps = {
  period_date_start: string;
  period_date_end: string;
};

export default function BriefStatisticsPage({
  period_date_start,
  period_date_end,
}: BriefStatisticsPageProps) {
  const [getStorage] = useLocalStorage("statistics");
  const [state, setState] = useState<StatisticsWithURL>([]);

  const pieChartData = useMemo(() => {
    const sortedState = state.sort((a, b) => b.timeCount - a.timeCount);
    const restStats: PieChartProps["data"][number] = {
      url: "Другое",
      timeCount: 0
    };
    const showStats: PieChartProps["data"] = [];
    sortedState.forEach((stat, idx) => {
      if (idx < 10) {
        showStats.push(stat);
      } else {
        restStats.timeCount += stat.timeCount;
      }
    })
    return [...showStats, restStats];
  }, [state]);

  const getStatistics = async () => {
    const dayStats = await getStorage();

    if (period_date_start !== period_date_end) {
      const periodStats = (await fetchStatistics({ period_date_start, period_date_end }));
      periodStats?.forEach((stat) => {
        if (stat.url in dayStats) {
          dayStats[stat.url] = {
            ...stat,
            sessionCount: dayStats[stat.url].sessionCount + stat.sessionCount,
            timeCount: dayStats[stat.url].timeCount + stat.timeCount,
          }
        } else {
          dayStats[stat.url] = omit(stat, "url");
        }
      })
    }

    const statistics = objectToArray(dayStats, "url");
    setState(statistics);
  }

  useEffect(() => {
    getStatistics();
  }, [period_date_start, period_date_end]);
  
  return (
    <Box className="brief-statistics-page">
      <PieChart data={pieChartData} />
      <StatList items={state} />
    </Box>
  )
}