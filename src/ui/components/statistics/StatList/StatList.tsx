import { memo } from "react";
import { reverse, sortBy } from "lodash";
import dayjs from "dayjs";
import Progressbar from "@/ui/components/common/Progressbar/Progressbar";
import Box from "@/ui/components/common/Box/Box";
import { Statistics, StatisticsItem } from "@/core/storage/types";
import { objectToArray } from "@/utils/objects";
import "./StatList.css";

export type StatListProps = {
  items: Statistics;
};

const StatList = memo(({ items }: StatListProps) => {
  const itemsWithUrl = objectToArray(items, "url"); 
  const sortedItems = reverse(sortBy(itemsWithUrl, "timeCount"));
  const summaryTime = sortedItems.reduce((acc, item) => acc += item.timeCount, 0);

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
} & StatisticsItem;

export const StatItem = memo(({
  url,
  summaryTime,
  faviconUrl,
  timeCount,
  sessionCount,
}: StatItemProps) => {
  const timeSpend = dayjs(timeCount * 1000).toTime();
  
  return (
    <li className="stat-item">
      <div className="stat-item__container">
        { faviconUrl && <img className="stat-item__icon" src={faviconUrl} /> }
        <div className="stat-item__content">
          <div className="stat-item__header">
            <span className="stat-item__hostname">{url}</span>
            <span className="stat-item__interval">{timeSpend} ({sessionCount})</span>
          </div>
          <Progressbar 
            className="stat-item__progressbar" 
            value={timeCount}
            max={summaryTime}
          />
        </div>
      </div>
    </li>
  )  
});

export default StatList;
