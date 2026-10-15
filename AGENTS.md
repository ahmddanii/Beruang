# Agent & Vibe Coding Guidelines

## Mandatory Skills & Principles
AI Agent **WAJIB SELALU** menerapkan prinsip dari 5 skill utama ini pada setiap respons dan modifikasi:
1. **`ponytail`**: Selalu pilih solusi paling ringkas, efisien, dan minimal (YAGNI). Gunakan native platform dan stdlib sebelum dependencies, reusable code yang sudah ada sebelum membuat baru.
2. **`ai-anti-slop`**: Dilarang membuat antarmuka generik atau template AI murahan. Setiap UI harus memiliki *creative thesis*, intensional, dan berkarakter kuat sesuai DNA proyek.
3. **`better-ui`**: Eksekusi detail visual tingkat tinggi — transisi halus, micro-interactions, states lengkap (hover/active/focus/empty/loading), dan motion restraint.
4. **`taste skills` (`design-taste-frontend`, `gpt-taste`, `minimalist-ui`, `high-end-visual-design`)**: Standar estetika agensi premium, kontras tipografi berkelas, bento grid taktis, dan sentuhan visual mahal.
5. **`color-architecture-60-30-10`**: Arsitektur warna DOM 60% kanvas dominan, 30% struktural cards/borders/text, 10% aksen pemicu interaksi, WCAG AA priority.
6. **`copywriter-beruang`**: Standar copywriting baku antarmuka Beruang — B2B kredibel, ramah UMKM, bebas jargon rumit (larang: Omzet/HPP/Laba/Audit/Real-time), dan berstandar institusi investor.

## Structure
- `.agents/skills/` - Active execution skills (`ponytail`, `ai-anti-slop`, `better-ui`, `copywriter-beruang`, `design-taste-frontend`, `gpt-taste`, `minimalist-ui`, `high-end-visual-design`, `better-typography`, `council`, `ui-ux-pro-max`, `frontend-design`, `color-architecture-60-30-10`, dll).
- `.agents/rules/` - Design & code rules ([DESIGN.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/DESIGN.md), [DESIGN-apple.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/DESIGN-apple.md), [PWA-DESIGN-RULES.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/PWA-DESIGN-RULES.md), [AGENT.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/.agents/rules/AGENT.md)).
- `docs/` - Product specs ([PRD.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/PRD.md)), architecture ([ARCHITECTURE.md](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/ARCHITECTURE.md)), and developer guidelines ([guidelines/](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/guidelines)).
- `public/` - Brand assets ([logo.svg](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/public/logo.svg), [fonts/Satoshi-Variable.ttf](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/public/fonts/Satoshi-Variable.ttf)).

## Vibe Coding Rules
1. **Design First & 60-30-10 Rule (GoPay Edition)**: 
   - **60% Dominan (Biru)**: Kanvas desktop ice-blue (`#F3F8FC` / dark `#0C121D`), header baris bento, dan struktur pembungkus.
   - **30% Sekunder (Hijau)**: Indikator pertumbuhan omzet, untung bersih, status audit terverifikasi, kartu kesiapan pendanaan, dan badge pill "Baru".
   - **10% Aksen Interaktif (3D Button)**: Tombol taktil berkilau (3D embossed/glassmorphic) untuk aksi transaksional penting (misal: "Catat Kas", "Perkuat Kesiapan", "Kerjakan").
2. **Motivational & Friendly Copywriting**: Mengadopsi gaya komunikasi ramah, hangat, dan mendorong aksi nyata ala GoPay yang disesuaikan dengan konteks UMKM (*"80% → Dikit lagi lolos pendanaan! Yok bisa yok."*, *"Kesehatan kas tokomu terlindungi"*).
3. **Typography & Brand**: Seluruh antarmuka dan teks menggunakan font konsisten **`Poppins`** dengan spacing normal (`letter-spacing: normal !important`) dan kelas `tabular-nums` untuk perataan angka metrik/finansial.
4. **Icons & Animations**: Hugeicons (filled/outline style konsisten), Chart.js untuk seluruh grafik data, GSAP untuk micro-interactions dan transisi halus.
5. **Minimal Diff & Fast Iteration**: Stdlib dan native platform over heavy dependencies. Build working prototype first, refine interactively.
6. **Tactile Cards & Containers (`.card-tactile-gopay`)**: Seluruh kartu metrik, bento, dan tabel pembungkus menggunakan base color abu-abu lembut (`#F6F8FA` / dark `#13161F`), inner shadow putih dominan di bagian atas (`inset 0 5px 12px 0 rgba(255, 255, 255, 0.95)` dan tipis di bawah), serta soft outer drop shadow halus (`0 4px 20px -2px rgba(15, 23, 42, 0.04)`).
