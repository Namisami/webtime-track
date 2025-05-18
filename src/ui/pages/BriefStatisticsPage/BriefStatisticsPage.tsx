import { useEffect, useState } from "react";
import { omit } from "lodash";
import { StatisticsWithURL } from "@/core/storage/types";
import Box from "@/ui/components/common/Box/Box";
import PieChart from "@/ui/components/statistics/PieChart/PieChart";
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

  const getStatistics = async () => {
    const dayStats = await getStorage();

    if (period_date_start !== period_date_end) {
      const periodStats = (await fetchStatistics({ period_date_start, period_date_end })).results;
      periodStats.forEach((stat) => {
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
      <PieChart data={state} />
      <StatList items={state} />
    </Box>
  )
}