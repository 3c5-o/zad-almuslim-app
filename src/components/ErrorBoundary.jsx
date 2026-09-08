import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'حدث خطأ غير متوقع' }
  }

  componentDidCatch(error, info) {
    console.error('Zad Al-Muslim runtime error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#021f1b', color: '#f8f3df', direction: 'rtl', fontFamily: 'Tahoma, Arial, sans-serif' }}>
          <section style={{ width: 'min(100%, 430px)', padding: 24, borderRadius: 24, border: '1px solid rgba(216,177,92,.35)', background: '#07372f', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚠</div>
            <h1 style={{ margin: '0 0 10px' }}>تعذر تشغيل زاد المسلم</h1>
            <p style={{ margin: 0, lineHeight: 1.8, color: '#c8d7cc' }}>حدث خطأ أثناء تحميل الواجهة. تم إظهار هذه الرسالة بدل الشاشة البيضاء حتى يمكن تشخيص المشكلة.</p>
            <small style={{ display: 'block', marginTop: 14, color: '#e5c77d', wordBreak: 'break-word' }}>{this.state.message}</small>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}
