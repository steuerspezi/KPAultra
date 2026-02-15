import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { KpaProvider } from './context/KpaContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KpaProvider>
      <App />
    </KpaProvider>
  </StrictMode>,
)
