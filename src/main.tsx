import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import dayjs from 'dayjs'
import { extendDayjsPlugin } from '@/plugins/dayjs'
import App from '@/App.tsx'
import '@/index.css'

dayjs.extend(extendDayjsPlugin);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
