import Tabs, { TabsProps } from '@/ui/components/common/Tabs/Tabs';
import BriefStatisticsPage from '@/ui/pages/BriefStatisticsPage/BriefStatisticsPage';
import dayjs from '@/plugins/dayjs';
import './App.css'

function App() {
  const today = dayjs();

  const items: TabsProps["items"] = {
    "day": <BriefStatisticsPage 
    period_date_start={today.formatServer()} 
    period_date_end={today.formatServer()} 
    />,
    "week": <BriefStatisticsPage 
      period_date_start={today.add(-7, 'day').formatServer()} 
      period_date_end={today.formatServer()}
    />,
  }
  
  return (
    <>
      <h1>Статистика времени, проведенного на сайтах</h1>
      <Tabs items={ items }/>
    </>
  )
}

export default App
