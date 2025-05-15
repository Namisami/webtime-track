import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import initDayjsLoad from '@/plugins/dayjs'
import App from '@/App.tsx'
import '@/index.css'

initDayjsLoad();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
