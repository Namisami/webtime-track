import Box from '@/ui/components/common/Box/Box';
import './SettingsPage.css';

export default function SettingsPage() {
  return (
    <Box className='settings'>
      <h2>Pomodoro</h2>
      <div className="settings__pomodoro">
        <div className='settings__field'>
          <label className='settings__label' htmlFor="longBreak">Длительность долгого перерыва (минуты)</label>
          <input className='settings__input' id="longBreak" name='longBreak' type="number" />
        </div>
        <div className='settings__field'>
          <label className='settings__label' htmlFor="shortBreak">Длительность короткого перерыва (минуты)</label>
          <input className='settings__input' id="shortBreak" name='shortBreak' type="number" />
        </div>
        <div className='settings__field'>
          <label className='settings__label' htmlFor="workDuration">Длительность работы (минуты)</label>
          <input className='settings__input' id="workDuration" name='workDuration' type="number" />
        </div>
        <div className='settings__field'>
          <label className='settings__label' htmlFor="repeats">Количество интервалов</label>
          <input className='settings__input' id="repeats" name='repeats' type="number" />
        </div>
      </div>
    </Box>
  )
}