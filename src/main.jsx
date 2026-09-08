import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './styles/app.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  document.body.innerHTML = '<main style="min-height:100vh;display:grid;place-items:center;background:#021f1b;color:#f8f3df;font-family:Tahoma,Arial,sans-serif;direction:rtl;padding:24px"><h1>تعذر العثور على عنصر تشغيل التطبيق.</h1></main>'
  throw new Error('Missing #root element')
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
