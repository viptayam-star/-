# منصة عنوان — لوحة تحكم الإدارة (Next.js)

إعادة بناء لوحة تحكم الإدارة كتطبيق **Next.js 16 (App Router + TypeScript)** بتصميم **Neubrutalism**
(المصدر: [designmd.app/library/neubrutalism](https://designmd.app/library/neubrutalism)).

## التشغيل

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

> على سيرفر البناء: استخدم `PATH="/usr/local/bin:$PATH"` (Node 22).

## الوظائف

- **نشر رسالة عامة** — تظهر فورًا في شريط الإعلانات أعلى الصفحة (تُحفظ في `localStorage: anwan_global_announcement`).
- **إدارة المدرسين** — إضافة مدرس (اسم/مادة/رابط Slug)، إيقاف/تشغيل الحساب، حذف بتأكيد
  (تُحفظ في `localStorage: anwan_admin_teachers` — نفس مفاتيح النسخة القديمة).

## البنية

| المسار | الوصف |
|---|---|
| `src/app/layout.tsx` | RTL + خطوط Cairo / JetBrains Mono + Metadata |
| `src/components/AdminDashboard.tsx` | الحالة والمنطق (Client island) |
| `src/components/dashboard/*` | مكونات الواجهة (شريط الإعلان، الهيدر، الجدول، المودالات، التوستات) |
| `src/components/ui/NbButton.tsx` | زر Neubrutalism (بوردر تخين + ظل صلب + تأثير ضغط) |
| `tailwind.config.ts` | توكنز الديزاين (ألوان nb + ظلال nb) |

## ملاحظات التصميم (Neubrutalism)

- بوردرز سودا 3px + ظلال صلبة (`4px 4px 0`) — مفيش أي gradients أو blurs.
- ألوان مسطحة: أصفر `#FFEB3B` / أحمر `#FF5252` / أزرق `#2196F3` + أخضر وظيفي `#22C55E`.
- أوف-بلاك `#111111` بدل الأسود النقي، وخلفية كريمي `#FBF7EA`.
- أيقونات [Lucide](https://lucide.dev) — مفيش إيموجي.
- حركة: fade + translateY(16px) بـ 420ms ease-out، وتأثير ضغط على الأزرار.
- z-index: nav 100 / modal 300 / toast 500.
