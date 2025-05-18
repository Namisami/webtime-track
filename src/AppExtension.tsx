import Tabs, { TabsProps } from '@/ui/components/common/Tabs/Tabs';
import BriefStatisticsPage from '@/ui/pages/BriefStatisticsPage/BriefStatisticsPage';
import dayjs from '@/plugins/dayjs';

const today = dayjs();

const items: TabsProps["items"] = {
  "day": {
    title: "Сегодня",
    render: () => <BriefStatisticsPage 
      period_date_start={today.formatServer()} 
      period_date_end={today.formatServer()} 
    />
  },
  "week": {
    title: "Неделя",
    render: () => <BriefStatisticsPage 
      period_date_start={today.add(-7, 'day').formatServer()} 
      period_date_end={today.formatServer()}
    />
  },
  "month": {
    title: "Месяц",
    render: () => <BriefStatisticsPage 
      period_date_start={today.add(-1, 'month').formatServer()} 
      period_date_end={today.formatServer()}
    />
  },
  "all": {
    title: "Все время",
    render: () => <BriefStatisticsPage 
      period_date_start={today.add(-20, 'year').formatServer()} 
      period_date_end={today.formatServer()}
    />
  },
}

function AppExtension() {
  return (
    <>
      <Tabs items={ items }/>
    </>
  )
}

export default AppExtension
