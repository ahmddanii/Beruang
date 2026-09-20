<!--
FILE INI UNTUK APA:
File ini adalah pedoman operasional utama dan instruksi sistem (system prompt context) 
untuk AI Agent (Antigravity). File ini mengatur batas kewenangan, konvensi teknis, 
gaya komunikasi, dan referensi dokumentasi agar AI agent selalu menghasilkan kode 
yang konsisten dengan standar frontend B2B Beruang.
-->

# Petunjuk Operasional AI Agent (AGENT.md)

Dokumen ini adalah acuan kerja otomatis untuk AI Agent **Antigravity** dalam mengembangkan platform web B2B **Beruang (Ber-Uang)**.

---

## 1. Ringkasan Proyek

- **[WAJIB] Nama Proyek**: `[NAMA_PROYEK]` *(Contoh: Beruang - Business Development & Verified Funding Platform for Indonesian MSMEs)*
- **[WAJIB] Tipe Proyek**: Web Application B2B (Multi-role: Pelaku UMKM, Business Consultant, dan Investor)
- **[WAJIB] Deskripsi Singkat**: Platform terintegrasi yang membantu UMKM merapikan fundamental bisnis dan keuangan melalui bimbingan konsultan terakreditasi, pelacakan histori perbaikan terukur (*action plan*), hingga siap masuk ke *marketplace* pendanaan investor terverifikasi (*Funding Readiness Gate*).
- **[OPSIONAL] Target Rilis MVP**: `[TARGET_RILIS]` *(Contoh: Q4 2026 / Hackathon Final Stage)*

---

## 2. Tech Stack & Versi

| Kategori | Teknologi | Versi | Catatan |
|---|---|---|---|
| **[WAJIB] Framework** | React | `^19.0.0` | React 19 Client SPA |
| **[WAJIB] Build Tool** | Vite | `^6.1.0` | Hot Module Replacement ultra cepat |
| **[WAJIB] Language** | TypeScript | `^5.7.2` | Strict mode aktif |
| **[WAJIB] Styling** | Tailwind CSS | `^4.0.0` | Menggunakan `@tailwindcss/vite` |
| **[WAJIB] UI Primitives** | Base UI / shadcn-compatible | `^1.0.0-alpha.5` | Headless, accessible primitives |
| **[WAJIB] Motion & Anim** | Framer Motion | `^13.3.0` | Micro-interactions & animated tabs |
| **[WAJIB] Iconography** | Lucide React | `^1.16.0` | Clean line icons |
| **[WAJIB] Visualisasi Data** | Recharts | `^3.10.1` | Radar charts, financial bar charts |
| **[OPSIONAL] State Management** | React Context API | Native | Terbagi per domain: `AppContext`, `AuthContext` |
| **[OPSIONAL] HTTP Client** | Native Fetch / Axios | `[NAMA_HTTP_CLIENT]` | Standard JSON API layer |

---

## 3. Struktur Folder & Konvensi Penamaan

### A. Struktur Folder Utama
```text
App/
├── .agents/              # Standard Antigravity Customizations
│   ├── rules/            # Design & UX rules (DESIGN.md, DESIGN-apple.md, PWA-DESIGN-RULES.md, AGENT.md)
│   └── skills/           # 11 Active AI execution skills (berstandar SKILL.md)
├── docs/                 # Dokumentasi spesifikasi arsitektur & produk
│   ├── PRD.md            # Product Requirements Document
│   ├── DESIGN.md         # Panduan Design System & Tokens
│   ├── CONTEXT.md        # Konteks Domain Bisnis & Glosarium
│   ├── ARCHITECTURE.md   # Arsitektur Frontend & State Management
│   ├── FLOW.md           # Standar workflow & Git convention
│   └── guidelines/       # Panduan teknis task-specific untuk developer
│       ├── create-component.md
│       ├── create-page.md
│       ├── styling.md
│       ├── api-integration.md
│       └── testing.md
├── public/               # Static assets (logo.svg, fonts/Satoshi-Variable.ttf)
├── server/               # Backend Express & Prisma ORM service
├── src/
│   ├── components/       # Komponen UI modular
│   │   ├── ui/           # Komponen primitif (BentoCard, CapsuleButton, Modal, Input)
│   │   ├── charts/       # Komponen visualisasi data (Radar, Bar)
│   │   └── onboarding/   # Flow wizard pendaftaran & verifikasi
│   ├── context/          # State providers global (AuthContext, AppContext)
│   ├── hooks/            # Custom React hooks reusable
│   ├── lib/              # Helper utilitas teknis (cn, formatters, sanitizers)
│   ├── services/         # Layer komunikasi API & mock service
│   ├── types/            # Definisi TypeScript interface & types domain
│   ├── views/            # Halaman utama aplikasi berbasis role
│   │   ├── auth/         # Login, Register, Forgot Password
│   │   └── dashboard/    # Dashboard UMKM, Konsultan, dan Investor
│   ├── App.tsx           # Root router/switcher
│   ├── index.css         # Styling global & Tailwind tokens
│   └── main.tsx          # Entrypoint DOM React
├── .env.example          # Template environment variable
├── .gitignore            # Filter file git
└── README.md             # Panduan onboarding developer
```

### B. [WAJIB] Konvensi Penamaan
1. **Komponen React**: `PascalCase.tsx` *(Contoh: `BentoCard.tsx`, `DailyCashCard.tsx`)*.
2. **Custom Hooks**: `camelCase.ts` diawali `use` *(Contoh: `useAuth.ts`, `useWindowSize.ts`)*.
3. **Helper & Utils**: `camelCase.ts` *(Contoh: `formatCurrency.ts`, `utils.ts`)*.
4. **Types / Interfaces**: `PascalCase` untuk nama tipe *(Contoh: `BusinessAssessment`, `ActionPlanTask`)*.
5. **Folder**: `kebab-case` atau `lowercase` *(Contoh: `components/ui`, `views/dashboard/umkm`)*.
6. **CSS Token / Variables**: `kebab-case` dengan prefix `--` *(Contoh: `--canvas`, `--surface-card`, `--accent-blue`)*.

---

## 4. Aturan Kerja Agent (Do's and Don'ts)

### [WAJIB] HAL YANG BOLEH DAN HARUS DILAKUKAN (DO'S)
1. **Patuhi Design System & Taste Skills**: Selalu gunakan warna token yang ditentukan di [`docs/DESIGN.md`](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/DESIGN.md) dan padukan dengan `taste skills` (`design-taste-frontend`, `gpt-taste`, `minimalist-ui`, `high-end-visual-design`) untuk hasil visual yang premium, estetis, dan mahal.
2. **Terapkan Prinsip Ponytail (Efisiensi & YAGNI)**: Terapkan skill `ponytail` — pilih solusi paling ringkas, utamakan native platform & stdlib, gunakan reusable code yang ada sebelum menulis baru, hindari over-engineering.
3. **Anti-UI Slop**: Terapkan skill `ai-anti-slop` — hindari desain AI generik/murahan, pelajari DNA desain sebelum coding, bangun UI yang intensional dan berkarakter.
4. **Detail Visual Better-UI**: Terapkan skill `better-ui` — poles interaksi mikro, pastikan kelengkapan states (hover, focus, active, empty), transisi halus dengan motion restraint.
5. **Minimal Diff**: Lakukan perubahan kode secara presisi dan terarah; hindari mengubah kode yang tidak relevan dengan tugas.
6. **Utility `cn()`**: Gunakan helper `cn(...)` dari `@/lib/utils` untuk menggabungkan class Tailwind secara dinamis.
7. **Validasi Build**: Selalu pastikan kode dapat dikompilasi dengan `npm run build` tanpa error tipe TypeScript.
8. **Aksesibilitas**: Sertakan label ARIA, keyboard navigation, dan contrast ratio yang memadai untuk penggunaan korporat B2B.

### [WAJIB] HAL YANG TIDAK BOLEH DILAKUKAN (DON'TS)
1. **DILARANG Mengubah Skema Warna Sembarangan**: Jangan menggunakan warna primer acak (misal: ungu neon, merah terang acak) tanpa mengacu token di `DESIGN.md`.
2. **DILARANG Menghapus Mock Data / State Tanpa Solusi Pengganti**: Jangan mematahkan alur demo yang sedang berjalan.
3. **DILARANG Memasang Library Eksternal Berat**: Hindari menambah dependencies baru tanpa persetujuan developer; utamakan library yang sudah terpasang di `package.json`.
4. **DILARANG Mengabaikan TypeScript Strict Mode**: Jangan gunakan tipe `any` kecuali benar-benar darurat dengan catatan alasan jelas.

---

## 5. Bahasa & Format Respons AI

- **[WAJIB] Bahasa Komunikasi**: Bahasa Indonesia yang profesional, lugas, ramah pengembang, dan menggunakan terminologi teknis baku industri.
- **[WAJIB] Level Detail**:
  - Berikan penjelasan arsitektural singkat sebelum menyajikan potongan kode.
  - Tampilkan kode secara lengkap atau sertakan diff yang jelas.
  - Berikan konfirmasi pengujian (testing/build) setelah melakukan modifikasi file.
- **[WAJIB] Format Referensi File**: Selalu gunakan format tautan markdown yang dapat diklik: `[nama-file](file:///path/to/file)`.

---

## 6. Referensi Dokumentasi Proyek

Untuk memahami konteks lebih dalam, AI Agent wajib membaca file terkait berikut:
- **Spesifikasi Produk**: [`docs/PRD.md`](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/PRD.md)
- **Sistem Desain & Token**: [`docs/DESIGN.md`](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/DESIGN.md)
- **Domain Bisnis & Istilah**: [`docs/CONTEXT.md`](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/CONTEXT.md)
- **Arsitektur Teknis**: [`docs/ARCHITECTURE.md`](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/ARCHITECTURE.md)
- **Alur Kerja Git & Review**: [`docs/FLOW.md`](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/FLOW.md)

---

## Cara Mengisi

Bagian ini menjelaskan cara memperbarui atau mengisi placeholder yang ada di file ini:

1. **`[NAMA_PROYEK]`**:
   - *Nilai yang diisi*: Nama resmi platform web B2B beserta tagline singkat.
   - *Cara mendapatkan*: Diskusikan dengan Product Manager atau lihat judul PRD.
   - *Contoh konkret*: `Beruang - Business Development & Verified Funding Platform for Indonesian MSMEs`.

2. **`[TARGET_RILIS]`**:
   - *Nilai yang diisi*: Jadwal target peluncuran sprint atau fase MVP.
   - *Cara mendapatkan*: Dari roadmap tim engineering atau timeline kompetisi.
   - *Contoh konkret*: `Q4 2026 - Tahap Final Insevent Hackathon`.

3. **`[NAMA_HTTP_CLIENT]`**:
   - *Nilai yang diisi*: Library yang digunakan untuk koneksi API ke backend (misalnya native `fetch` wrapper atau `axios`).
   - *Cara mendapatkan*: Cek kesepakatan tech stack pada tim backend.
   - *Contoh konkret*: `Fetch API wrapper with TanStack Query v5`.
