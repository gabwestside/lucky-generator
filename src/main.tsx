import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position='top-center' theme='system' richColors closeButton />
    <App />
  </>
)
