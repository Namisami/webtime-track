import { useEffect, useState } from 'react';
import Tabs from '@/ui/components/common/Tabs/Tabs';
import { POMODORO_STATUSES, PomodoroAlarm } from '@/core/entities/alarms/PomodoroAlarm';
import { useLocalStorage } from '@/ui/hooks/useLocalStorage';
import { createTab } from '@/core/functions/tab';
import { briefStatisticsPageItems } from '@/const';
import './App.css'

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
      <Tabs items={ briefStatisticsPageItems }/>
    </>
  )
}

export default App
