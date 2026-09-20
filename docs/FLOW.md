<!--
FILE INI UNTUK APA:
File ini mendokumentasikan alur kerja (workflow), strategi Git branching, konvensi kode, 
standar commit message, checklist Pull Request, dan panduan langkah demi langkah (step-by-step) 
dalam menambahkan fitur atau komponen baru pada platform Beruang.
-->

# Development Workflow & Conventions — [NAMA_PROYEK]

---

## 1. [WAJIB] Git Branching Strategy

Proyek menggunakan model **Trunk-Based / Git Flow Ringan**:

| Branch | Kegunaan | Hak Akses & Aturan |
|---|---|---|
| `main` | Production-ready code | Terproteksi. Wajib melalui Pull Request (PR) dan lolos CI build. |
| `dev` / `staging` | Lingkungan integrasi fitur & QA internal | Menggabungkan cabang fitur yang siap diuji sebelum rilis. |
| `feature/[nama-fitur]` | Pengembangan fitur baru | Contoh: `feature/radar-assessment`, `feature/data-room-upload`. |
| `fix/[nama-bug]` | Perbaikan bug non-kritis | Contoh: `fix/hpp-calculation-overflow`. |
| `hotfix/[nama-insiden]` | Perbaikan darurat langsung ke `main` | Contoh: `hotfix/auth-token-expiry`. |

---

## 2. [WAJIB] Naming Conventions

1. **Berkas Komponen**: `PascalCase.tsx`
   - *Benar*: `BentoCard.tsx`, `MonthlyReportTable.tsx`
   - *Salah*: `bento-card.tsx`, `monthlyReportTable.tsx`
2. **Berkas Hook**: `camelCase.ts` diawali `use`
   - *Benar*: `useAuth.ts`, `useBusinessMetrics.ts`
   - *Salah*: `UseAuth.tsx`, `business_metrics.ts`
3. **Variabel & Fungsi**: `camelCase`
   - *Benar*: `const totalRevenue = 1500000;`, `const calculateCompositeScore = () => {}`
   - *Salah*: `const TotalRevenue = 1500000;`, `const hitung_skor = () => {}`
4. **Tipe Data & Interface**: `PascalCase`
   - *Benar*: `interface MonthlyReport {}`, `type UserRole = 'umkm' | 'konsultan';`
   - *Salah*: `interface monthly_report {}`
5. **Class Utility CSS**: Mengikuti pola utilitas Tailwind CSS dengan helper `cn()`
   - *Benar*: `cn("rounded-3xl p-6 bg-white border border-black/5", className)`

---

## 3. [WAJIB] Commit Message Format

Gunakan standar **Conventional Commits**:
```text
<type>(<scope>): <deskripsi singkat dalam bahasa indonesia atau inggris>
```

### Jenis Type yang Didukung:
- `feat`: Penambahan fitur baru *(Contoh: `feat(radar): add 5-dimension radar diagnostic chart`)*.
- `fix`: Perbaikan bug *(Contoh: `fix(auth): prevent redirect loop on expired session`)*.
- `docs`: Perubahan dokumentasi saja *(Contoh: `docs(prd): update KPI targets for MVP`)*.
- `style`: Penyesuaian whitespace, format kode, atau CSS tanpa mengubah logika.
- `refactor`: Restrukturisasi kode tanpa menambah fitur atau memperbaiki bug.
- `perf`: Optimasi performa kode atau aset.
- `test`: Menambah atau memodifikasi unit test.
- `chore`: Update build config, package, atau dependensi.

---

## 4. [WAJIB] Checklist Sebelum Push / Pull Request

Sebelum melakukan `git push` atau membuka PR ke branch `dev`/`main`, pastikan checklist ini terpenuhi:
- [ ] Jalankan `npm run build` dan pastikan **exit code 0** (tidak ada error TypeScript).
- [ ] Tidak ada log debug sementara yang tertinggal (`console.log`, `debugger`).
- [ ] Semua komponen baru mematuhi warna dan token di [`docs/DESIGN.md`](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/DESIGN.md).
- [ ] Tipe data TypeScript sudah didefinisikan secara eksplisit (hindari `any`).
- [ ] Helper `cn()` digunakan pada komponen yang menerima `className` dinamis.
- [ ] Tidak ada *hardcoded secret* (API key, token rahasia) di dalam kode.

---

## 5. [WAJIB] Cara Menambah Fitur Baru (Step-by-Step)

Ikuti langkah berikut saat membuat fitur baru:
1. **Pahami Kebutuhan di PRD**:
   - Baca deskripsi fitur dan prioritas di [`docs/PRD.md`](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/PRD.md).
2. **Definisikan Tipe Data Domain**:
   - Tambahkan interface/type baru ke dalam [`src/types/index.ts`](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/src/types/index.ts).
3. **Siapkan API Service / Mock Data**:
   - Buat fungsi pemanggil data di folder `src/services/`.
4. **Bangun Komponen UI Primitif / Spesifik**:
   - Ikuti panduan [`skills/create-component.md`](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/skills/create-component.md).
5. **Rangkai Halaman / View**:
   - Hubungkan komponen ke dalam view terkait di `src/views/dashboard/` sesuai role.
6. **Hubungkan State**:
   - Kaitkan state ke Context atau custom hook.
7. **Verifikasi**:
   - Jalankan `npm run build` dan uji interaksi secara visual di browser.

---

## 6. [WAJIB] Cara Menambah Komponen Baru (Step-by-Step)

1. Tentukan kategori komponen:
   - Komponen generik/primitif (tombol, badge, kartu, input) -> letakkan di `src/components/ui/`.
   - Komponen grafik/visualisasi data -> letakkan di `src/components/charts/`.
   - Komponen alur proses (wizard) -> letakkan di `src/components/onboarding/`.
2. Buat file dengan ekstensi `.tsx` menggunakan nama `PascalCase`.
3. Definisikan `interface Props` dengan dukungan `className?: string`.
4. Gunakan helper `cn()` untuk menggabungkan class default dan class kustom.
5. Ekspor komponen secara terstruktur (`export const NamaKomponen: React.FC<Props> = ...`).

---

## Cara Mengisi

Panduan pengisian nilai placeholder pada dokumen FLOW ini:

1. **`[NAMA_PROYEK]`**:
   - *Nilai yang diisi*: Nama inisiatif proyek.
   - *Contoh*: `Beruang Frontend Team Guidelines`.

2. **Branching Rules**:
   - Jika tim Anda menggunakan nama branch integrasi `development` alih-alih `dev`, sesuaikan tabel pada section 1.
