import { memo } from "react";
import { reverse, sortBy } from "lodash";
import dayjs from "dayjs";
import { URLFacade } from "@/utils/urls";
import Progressbar from "@/ui/components/common/Progressbar/Progressbar";
import Box from "@/ui/components/common/Box/Box";
import { SiteTime } from "@/core/storage/types";
import "./StatList.css";

export type StatListProps = {
  items: SiteTime[];
};

const StatList = memo(({ items }: StatListProps) => {
  const sortedItems = reverse(sortBy(items, [function (o) { return o.endTime - o.startTime }]));
  const summaryTime = sortedItems.reduce((acc, item) => acc += (item.endTime - item.startTime), 0);

  return (
    <Box className="stat-list">
      <ul className="stat-list__list">
        { sortedItems.map((item) => <StatItem {...{ summaryTime, ...item }} />)}
      </ul>
    </Box>
  )
});


export type StatItemProps = {
  url: string;
  summaryTime: number;
  startTime: number;
  endTime: number;
}

export const StatItem = memo(({
  url,
  summaryTime,
  startTime,
  endTime,
}: StatItemProps) => {
  const hostname = URLFacade(url).hostname;
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const msSpend = end.diff(start);
  const timeSpend = dayjs(msSpend).toTime();
  
  return (
    <li className="stat-item">
      <div className="stat-item__container">
        {/* <img className="stat-item__icon"></img> */}
        <div className="stat-item__header">
          <span className="stat-item__hostname">{hostname}</span>
          <span className="stat-item__interval">{timeSpend}</span>
        </div>
        <Progressbar 
          className="stat-item__progressbar" 
          value={msSpend}
          max={summaryTime}
        />
      </div>
    </li>
  )  
});

export default StatList;
