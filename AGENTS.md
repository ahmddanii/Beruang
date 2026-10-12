# Agent & Vibe Coding Guidelines

## Mandatory Skills & Principles
AI Agent **WAJIB SELALU** menerapkan prinsip dari 5 skill utama ini pada setiap respons dan modifikasi:
1. **`ponytail`**: Selalu pilih solusi paling ringkas, efisien, dan minimal (YAGNI). Gunakan native platform dan stdlib sebelum dependencies, reusable code yang sudah ada sebelum membuat baru.
2. **`ai-anti-slop`**: Dilarang membuat antarmuka generik atau template AI murahan. Setiap UI harus memiliki *creative thesis*, intensional, dan berkarakter kuat sesuai DNA proyek.
3. **`better-ui`**: Eksekusi detail visual tingkat tinggi — transisi halus, micro-interactions, states lengkap (hover/active/focus/empty/loading), dan motion restraint.
4. **`taste skills` (`design-taste-frontend`, `gpt-taste`, `minimalist-ui`, `high-end-visual-design`)**: Standar estetika agensi premium, kontras tipografi berkelas, bento grid taktis, dan sentuhan visual mahal.
5. **`color-architecture-60-30-10`**: Arsitektur warna DOM 60% kanvas dominan, 30% struktural cards/borders/text, 10% aksen pemicu interaksi, WCAG AA priority.

## Structure
- `.agents/skills/` - Active execution skills (`ponytail`, `ai-anti-slop`, `better-ui`, `design-taste-frontend`, `gpt-taste`, `minimalist-ui`, `high-end-visual-design`, `better-typography`, `council`, `ui-ux-pro-max`, `frontend-design`, `color-architecture-60-30-10`, dll).
- `.agents/rules/` - Design & code rules ([DESIGN.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/DESIGN.md), [DESIGN-apple.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/DESIGN-apple.md), [PWA-DESIGN-RULES.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/PWA-DESIGN-RULES.md), [AGENT.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/AGENT.md)).
- `docs/` - Product specs ([PRD.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/PRD.md)), architecture ([ARCHITECTURE.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/ARCHITECTURE.md)), and developer guidelines ([guidelines/](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/guidelines)).
- `public/` - Brand assets ([logo.svg](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/public/logo.svg), [fonts/Satoshi-Variable.ttf](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/public/fonts/Satoshi-Variable.ttf)).

## Vibe Coding Rules
1. **Design First & 60-30-10 Rule**: Strict adherence to 60-30-10 Color Architecture: 60% Canvas dominan, 30% Struktur/Surface/Cards/Teks, 10% Aksen interaktif (CTA/active/badge).
2. **Minimal Diff**: Write minimal working code. Stdlib and native platform over heavy dependencies.
3. **Typography & Brand**: Seluruh antarmuka dan teks menggunakan font konsisten **`Poppins`** dengan spacing normal (`letter-spacing: normal`) dan kelas `tabular-nums` untuk perataan angka metrik/finansial.
4. **Icons & Animations**: Hugeicons (filled style), Chart.js untuk seluruh grafik data, GSAP untuk micro-interactions dan transisi halus.
5. **Fast Iteration**: Build working prototype first, refine interactively.
