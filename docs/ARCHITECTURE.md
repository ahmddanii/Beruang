<!--
FILE INI UNTUK APA:
File ini mendokumentasikan arsitektur teknis lengkap untuk frontend web B2B Beruang.
Menjelaskan alasan pemilihan tech stack, struktur direktori kode, strategi state management, 
data fetching, routing, integrasi dependency, serta penanganan environment variables.
-->

# Arsitektur Teknis Frontend — [NAMA_PROYEK]

---

## 1. [WAJIB] Alasan Pemilihan Tech Stack

| Teknologi | Alasan Pemilihan untuk Web B2B | Alternatif yang Dipertimbangkan |
|---|---|---|
| **React 19 + TypeScript** | Ekosistem enterprise terluas, performa rendering tinggi dengan React compiler, tipe statis yang meminimalkan bug runtime pada data finansial sensitif. | Vue 3, Svelte (ekosistem enterprise & library grafik B2B lebih terbatas). |
| **Vite 6** | Waktu *cold start* server instan (< 300ms) dan HMR kilat, konfigurasi fleksibel, tidak memerlukan overhead SSR untuk aplikasi portal internal / dashboard SPA tertutup. | Next.js (dipilih Vite karena aplikasi ini adalah authenticated dashboard SPA, tidak membutuhkan public SEO rendering). |
| **Tailwind CSS v4** | Performa kompilasi engine baru berbasis Rust/Vite plugin, arsitektur token modern tanpa file config raksasa, mudah menjaga konsistensi desain Bento Tactile. | Vanilla CSS, Styled-Components (overhead runtime CSS-in-JS lebih besar). |
| **Base UI + shadcn Primitives** | Komponen headless tanpa opini styling kaku yang dapat diintegrasikan dengan sistem desain kapsul dan bento card kustom. | Ant Design, MUI (terlalu kaku dan sulit dikustomisasi ke gaya Tactile Neo-Minimalism). |
| **Framer Motion** | Standard industri untuk micro-interactions, layout transitions, dan animated tabs yang halus tanpa mengorbankan performa browser. | CSS Keyframes murni (kurang deklaratif untuk interaksi state yang dinamis). |
| **Recharts** | Rendering SVG responsif yang mudah diintegrasikan dengan React untuk visualisasi radar assessment dan histogram laba rugi. | Chart.js (memerlukan canvas wrapper dan konfigurasi imperatif). |

---

## 2. [WAJIB] Struktur Direktori Frontend (`src/`)

```text
src/
├── components/           # Komponen UI modular terisolasi
│   ├── charts/           # Visualisasi chart (RadarAssessmentChart, FinancialTrendChart)
│   ├── onboarding/       # Flow wizard registrasi profil bisnis UMKM
│   └── ui/               # Primitif UI (BentoCard, CapsuleButton, ModalDialog, TabBar, Navbar)
├── context/              # State management global berbasis domain
│   ├── AppContext.tsx    # State data bisnis (action plans, monthly reports, data room, radar)
│   └── AuthContext.tsx   # State sesi pengguna (token, role, current user)
├── hooks/                # Reusable custom hooks (e.g., useDebounce, useMediaQuery)
├── lib/                  # Utilitas teknis & helper fungsi murni
│   └── utils.ts          # Fungsi cn() penggabung class Tailwind (clsx + tailwind-merge)
├── services/             # Layer komunikasi API & data access object
│   ├── api.ts            # Base HTTP client & interceptor header Authorization
│   ├── businessService.ts# Request data audit, action plan, dan laporan
│   └── mockData.ts       # Mock dataset untuk testing lokal dan demo offline
├── types/                # Kontrak tipe data TypeScript
│   ├── index.ts          # Central export untuk semua interfaces domain bisnis
│   └── dotlottie.d.ts    # Deklarasi tipe module asset animasi
├── views/                # Halaman tampilan layar berdasarkan konteks & role
│   ├── auth/             # LoginView, RegisterView, ForgotPasswordView
│   └── dashboard/        # RoleDashboard container
│       ├── umkm/         # View khusus peran Pelaku UMKM
│       ├── konsultan/    # View khusus peran Business Consultant
│       └── investor/     # View khusus peran Investor Mitra
├── App.tsx               # Root component pengatur rute autentikasi
├── index.css             # Import Tailwind, custom font Satoshi, dan token CSS
└── main.tsx              # Mount aplikasi ke root DOM HTML
```

---

## 3. [WAJIB] Strategi State Management

Aplikasi menggunakan arsitektur **Layered State Management**:
1. **Server/Remote State**:
   - Dikelola melalui service layer terpusat (`src/services/`). Mendukung caching data dan invalidasi saat mutasi data terjadi.
2. **Global Application State**:
   - `AuthContext`: Menyimpan status autentikasi, JWT token dummy/nyata, profil user, dan role aktif (`umkm`, `konsultan`, `investor`).
   - `AppContext`: Menyimpan status assessment radar, daftar *action plan tasks*, histori *monthly reports*, dan dokumen *data room*.
3. **Local Component State**:
   - Menggunakan `useState` dan `useReducer` untuk state sementara seperti status modal terbuka/tutup, input filter pencarian, dan state accordion.

---

## 4. [WAJIB] Data Fetching Strategy & HTTP Client

- **Base URL API**: Diambil dari environment variable `VITE_API_BASE_URL`.
- **Authentication**: Header `Authorization: Bearer <TOKEN>` disematkan secara otomatis melalui wrapper interceptor `services/api.ts`.
- **Handling UI States**:
  - *Loading State*: Skeleton loader yang menyerupai Bento Card.
  - *Empty State*: Ilustrasi kapsul dan pesan interaktif untuk memandu pengguna menambahkan data pertama kali.
  - *Error State*: Alert pill banner dengan opsi *retry action*.

---

## 5. [WAJIB] Routing & Layout Architecture

Struktur navigasi saat ini dirancang menggunakan pendekatan **State-based Role Routing**:
- Jika `!isAuthenticated`: Menampilkan layar otentikasi (`LoginView`, `RegisterView`, `ForgotPasswordView`).
- Jika `isAuthenticated`: Menampilkan `RoleDashboard` yang secara otomatis memilih subsistem tampilan sesuai role aktif pengguna:
  - Role `umkm` -> Tampilan Ringkasan Bisnis, Action Plan, Form Upload Laporan.
  - Role `konsultan` -> Tampilan Daftar UMKM Klien, Verifikasi Dokumen, Radar Audit.
  - Role `investor` -> Tampilan Marketplace Deal Flow, Verified Data Room.
- Dilengkapi dengan *Floating Navigation Dock* / *TabBar* untuk beralih antar tab sub-fitur dengan transisi Framer Motion.

---

## 6. [WAJIB] Environment Variables

File konfigurasi runtime disimpan pada `.env` (mengacu pada `.env.example`):
```bash
# URL Backend API Gateway
VITE_API_BASE_URL=https://api.beruang.example.com/v1

# AI Copilot / LLM Endpoint
VITE_AI_SERVICE_URL=https://ai.beruang.example.com/v1

# Mode Environment
VITE_APP_ENV=development
```

---

## 7. [WAJIB] Dependency Penting & Fungsinya

| Package | Fungsi & Rationale |
|---|---|
| `clsx` & `tailwind-merge` | Digunakan dalam `cn()` untuk menyelesaikan bentrok class Tailwind secara aman. |
| `lucide-react` | Kumpulan icon SVG ringan dan konsisten untuk kebutuhan dashboard B2B. |
| `framer-motion` | Mengatur transisi animasi floating tab dock, popover modal, dan accordion. |
| `recharts` | Menggambar visualisasi grafik Radar 5 dimensi dan trendline finansial. |
| `canvas-confetti` | Efek selebrasi visual saat UMKM mencapai status *"Ready for Funding"*. |

---

## Cara Mengisi

Panduan pengisian nilai placeholder pada dokumen ARCHITECTURE ini:

1. **`[NAMA_PROYEK]`**:
   - *Nilai yang diisi*: Nama sistem frontend.
   - *Contoh*: `Beruang Frontend Architecture`.

2. **Menyesuaikan State Management ke TanStack Query / Zustand**:
   - Jika proyek diskalakan ke server backend penuh, tambahkan dokumentasi setup `@tanstack/react-query` atau `zustand` di section 3.
