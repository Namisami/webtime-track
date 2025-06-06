import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppExtension from '@/AppExtension'
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppExtension />
  </StrictMode>,
)
