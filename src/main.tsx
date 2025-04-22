import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { extendDayjsPlugin } from '@/plugins/dayjs'
import App from '@/App.tsx'
import '@/index.css'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(extendDayjsPlugin);
dayjs.tz.setDefault("Europe/Moscow");


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
