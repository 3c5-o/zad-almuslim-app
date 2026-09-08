const shortcuts = [
  ['القرآن الكريم', 'القراءة والتلاوة'],
  ['الأذكار', 'الصباح والمساء'],
  ['مواقيت الصلاة', 'حسب موقعك'],
  ['القبلة', 'تحديد الاتجاه'],
  ['السبحة', 'تسبيح يومي'],
  ['الأدعية', 'أدعية مختارة'],
]

export default function App() {
  return (
    <main className="app-shell">
      <section className="phone-app">
        <header className="topbar">
          <div>
            <span className="eyebrow">زاد المسلم</span>
            <h1>السلام عليكم</h1>
          </div>
          <button className="icon-btn" aria-label="الإشعارات">◌</button>
        </header>

        <section className="hero-card">
          <div>
            <span>الصلاة القادمة</span>
            <strong>الفجر</strong>
            <small>سيتم ربط المواقيت بالموقع</small>
          </div>
          <div className="hero-mark">ز</div>
        </section>

        <section className="section-head">
          <h2>الخدمات</h2>
          <span>كل ما تحتاجه في مكان واحد</span>
        </section>

        <section className="services-grid">
          {shortcuts.map(([title, subtitle]) => (
            <button className="service-card" key={title}>
              <span className="service-icon">✦</span>
              <strong>{title}</strong>
              <small>{subtitle}</small>
            </button>
          ))}
        </section>

        <section className="daily-card">
          <span>المحتوى اليومي</span>
          <h2>آية اليوم · حديث اليوم · ذكر اليوم</h2>
          <p>سيظهر هنا المحتوى الذي تختاره لوحة الإدارة.</p>
        </section>

        <nav className="bottom-nav" aria-label="التنقل الرئيسي">
          <button className="active">الرئيسية</button>
          <button>القرآن</button>
          <button>الأذكار</button>
          <button>العبادات</button>
          <button>المزيد</button>
        </nav>
      </section>
    </main>
  )
}
