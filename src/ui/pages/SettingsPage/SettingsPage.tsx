import Box from '@/ui/components/common/Box/Box';
import InputNumber from '@/ui/components/common/InputNumber/InputNumber';
import { useLocalStorage } from '@/ui/hooks/useLocalStorage';
import { useCallback, useEffect, useState } from 'react';
import { PomodoroSettings } from '@/core/storage/types';
import './SettingsPage.css';

export default function SettingsPage() {
  const [getSettings, setSettings] = useLocalStorage("pomodoro");

  const [state, setState] = useState<PomodoroSettings>();

  const getCurrentSettings = useCallback(async () => {
    const settings = await getSettings();
    setState({
      ...settings,
      workDuration: settings.workDuration / 60,
      shortBreak: settings.shortBreak / 60,
      longBreak: settings.longBreak / 60,
    });
  }, [setState, getSettings]);

  const handleSaveSettings = async () => {
    const settings = await getSettings();
    if (state) {
      await setSettings({
        ...settings,
        ...state,
        longBreak: state.longBreak * 60,
        shortBreak: state.shortBreak * 60,
        workDuration: state.workDuration * 60,
      });
    }
  };

  const handleInputChange = (name: string, value?: number) => {
    if (name && value && state) {
      setState({...state, [name]: value});
    }
  };

  useEffect(() => { getCurrentSettings() }, [getCurrentSettings]);

  return (
    <Box className='settings'>
      <h2 className='settings__title'>Pomodoro</h2>
      <div className="settings__pomodoro">
        <InputNumber 
          label='Длительность долгого перерыва (минуты)'
          name='longBreak'
          value={state?.longBreak}
          onChange={handleInputChange}
          className='settings__field'
        />
        <InputNumber 
          label='Длительность короткого перерыва (минуты)'
          name='shortBreak'
          value={state?.shortBreak}
          onChange={handleInputChange}
          className='settings__field'
        />
        <InputNumber 
          label='Длительность работы (минуты)'
          name='workDuration'
          value={state?.workDuration}
          onChange={handleInputChange}
          className='settings__field'
        />
        <InputNumber 
          label='Количество интервалов'
          name='repeats'
          value={state?.repeats}
          onChange={handleInputChange}
          className='settings__field'
        />
      </div>
      <div className='settings__actions'>
        <button 
          className='settings__save'
          onClick={handleSaveSettings}
        >
          Сохранить
        </button>
      </div>
    </Box>
  )
}