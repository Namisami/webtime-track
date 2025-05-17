import { useEffect, useState } from "react";
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
    let statistics: StatisticsWithURL;
    if (period_date_start === period_date_end) {
      statistics = objectToArray(await getStorage(), "url") as StatisticsWithURL;
    } else {
      statistics = (await fetchStatistics({ period_date_start, period_date_end })).results;
    }
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