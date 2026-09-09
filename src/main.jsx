import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/app.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    console.error('Zad Al-Muslim UI error:', error)
  }

  render() {
    if (this.state.error) {
      return (
        <main className="fatal">
          <div className="card">
            <h1>تعذر تشغيل التطبيق</h1>
            <p>حدث خطأ غير متوقع. حدّث الصفحة أو أعد المحاولة.</p>
            <button onClick={() => location.reload()}>إعادة المحاولة</button>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)

if ('serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}))
}
