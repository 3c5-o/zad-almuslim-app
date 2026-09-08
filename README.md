# زاد المسلم — Zad Al-Muslim

تطبيق ويب ديني Mobile-first بواجهة عربية RTL، مبني باستخدام React + Vite ومربوط بـ Supabase.

## الحالة الحالية
- مخطط قاعدة البيانات الأساسي جاهز في Supabase.
- RLS مفعّل على جداول المستخدم والمحتوى.
- الهيكل الأولي لتطبيق المستخدم جاهز.
- Quran Foundation سيتم ربطه عبر Supabase Edge Function حتى لا يظهر Client Secret في المتصفح.

## التشغيل
```bash
npm install
cp .env.example .env
npm run dev
```

ضع مفتاح Supabase القابل للنشر فقط في `.env`. لا تضع Client Secret أو Service Role Key في الواجهة أو GitHub.
