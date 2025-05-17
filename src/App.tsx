import Tabs, { TabsProps } from '@/ui/components/common/Tabs/Tabs';
import BriefStatisticsPage from '@/ui/pages/BriefStatisticsPage/BriefStatisticsPage';
import dayjs from '@/plugins/dayjs';
import './App.css'

function App() {
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
  }
  
  return (
    <>
      <Tabs items={ items }/>
    </>
  )
}

export default App
