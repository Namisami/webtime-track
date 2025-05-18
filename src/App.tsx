import { useEffect, useState } from 'react';
import Tabs, { TabsProps } from '@/ui/components/common/Tabs/Tabs';
import BriefStatisticsPage from '@/ui/pages/BriefStatisticsPage/BriefStatisticsPage';
import dayjs from '@/plugins/dayjs';
import { POMODORO_STATUSES, PomodoroAlarm } from '@/core/entities/alarms/PomodoroAlarm';
import { useLocalStorage } from '@/ui/hooks/useLocalStorage';
import { createTab } from '@/core/functions/tab';
import './App.css'

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

function App() {
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [getPomodoro, setPomodoro] = useLocalStorage("pomodoro");

  const handlePomodoroActivate = async () => {    
    const pomodoroSettings = await getPomodoro();
    if (!isPomodoroActive) {
      await PomodoroAlarm.start(POMODORO_STATUSES.WORK, 1);
      setIsPomodoroActive(true);
      setPomodoro({...pomodoroSettings, on: true});
    } else {
      await PomodoroAlarm.stop();
      setIsPomodoroActive(false);
      setPomodoro({...pomodoroSettings, on: false});
    }
  };

  const handleSettingsClick = async () => {
    createTab("extension-page.html");
  };

  useEffect(() => {
    const handlePomodoroActivation = async () => {
      const pomodoroSettings = await getPomodoro();
      setIsPomodoroActive(pomodoroSettings.on);
    }

    handlePomodoroActivation();
  }, [getPomodoro])
  
  return (
    <>
      <div className='app__header'>
        <h1>WebTime Scrobbler</h1>
        <div className='app__actions'>
          <button className='app__icon' onClick={handlePomodoroActivate}>
            <img width={30} height={30} src={isPomodoroActive ? '/images/pomodoro-enabled.svg' : '/images/pomodoro-disabled.svg'} />
          </button>
          <button className='app__icon' onClick={handleSettingsClick}>
            <img width={30} height={30} src='/images/settings.svg' />
          </button>
        </div>
      </div>
      <Tabs items={ items }/>
    </>
  )
}

export default App
