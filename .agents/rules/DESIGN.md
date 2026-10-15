# DESIGN.md — Beruang (Ber-Uang) Desktop Design System
## 60-30-10 Blue & Green Architecture (Fintech Ecosystem Edition)

Dokumen ini adalah Single Source of Truth (SSOT) untuk seluruh arsitektur UI/UX platform **Beruang (Ber-Uang)** versi Desktop. Sistem desain ini mengadopsi filosofi visual fintech modern berdaya tarik tinggi (terinspirasi dari ekosistem GoPay/Gojek) dengan perpaduan warna **60% Biru, 30% Hijau, dan 10% Aksen Interaktif 3D**.

---

## 1. CREATIVE THESIS & ATMOSPHERE

Beruang adalah ruang kerja finansial B2B dan telemetri kesiapan pendanaan UMKM.
- **Visual Personality:** *Warm, Optimistic, Trustworthy, & Action-Driven Desktop Fintech*.
- **Tone & Copywriting:** Menggabungkan ketegasan standar perbankan/audit BNSP dengan keramahan yang memotivasi khas aplikasi fintech terdepan Indonesia.
- **Desktop-First Execution:** Menghadirkan layout bento grid desktop yang lapang, pembagian data berdampingan (*side-by-side*), dan penekanan visual pada tombol-tombol transaksional penting dengan efek 3D taktil yang premium.

---

## 2. COLOR ARCHITECTURE: 60 - 30 - 10 RULE

### A. 60% Dominan: Biru Terpercaya (Trust & Structural Canvas)
Digunakan secara konsisten sebagai kanvas ruang dasar, pembungkus layout desktop, dan identitas utama:
- **Canvas Desktop (Light):** `#F3F8FC` (Ice Blue Tint yang bersih dan nyaman di mata).
- **Canvas Desktop (Dark):** `#0C121D` (Deep Navy Dark Surface).
- **Header / Executive Hero:** Gradasi biru khas ekosistem (`#0066AE` → `#0081A7`).
- **Cards & Bento Container:** Surface putih `#FFFFFF` / dark `#15161A` dengan border halus bernuansa biru es `#E0EDF6` (dark: `#1E293B`).
- **Container Title Bars:** Title bar konteks biru (`#EFF6FF` / dark `#1E3A8A/30`) untuk membingkai judul section dengan rapi.

### B. 30% Sekunder: Hijau Pertumbuhan (Growth, Health & Verified Engine)
Digunakan untuk membentuk struktur pendukung, indikator kesehatan kas, metrik keuntungan, dan status terverifikasi:
- **Fresh Growth Green:** `#00AA13` / `#059669` / `#10B981` (Warna hijau segar pertumbuhan omzet & laba).
- **Card Highlight / Soft Green Surface:** `#F0FDF4` (latar belakang kartu rekomendasi, banner kesiapan pendanaan, checklist tugas).
- **Pill Badges & Tags:** Badge hijau pekat *"Baru"*, lencana *"Terverifikasi OSS / BNSP"*, tag status *"Untung Bersih"*, dan delta MoM positif `+12%`.
- **Progress Bar:** Indikator progres pendanaan dan skor kesehatan dengan gradasi hijau segar ke cyan.

### C. 10% Aksen Interaktif: Tombol 3D Taktil (High-Impact 3D Triggers)
Khusus dicadangkan untuk elemen aksi kritis yang menggerakkan konversi pengguna:
- **Tombol Transaksional Kunci (3D Embossed):**
  - Tombol **"Catat Kas"** (Anchor transaksi utama di dashboard, setara tombol QRIS).
  - Tombol **"Perkuat Kesiapan Usaha" / "Simpan Perubahan"** (Aksi konversi audit).
  - Tombol **"Kerjakan"** pada Tugas Hari Ini.
- **Karakteristik Visual 3D Button:**
  - Permukaan bergradasi halus (*top-to-bottom subtle gradient*).
  - *Inner highlight* di bibir atas (`inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45)`).
  - *Bottom rim shadow* di bibir bawah (`inset 0 -2.5px 2px 0 rgba(0, 0, 0, 0.22)`).
  - *Elevated outer drop shadow* dengan sebaran warna pendar (*colored glow drop shadow*).
  - *Tactile Active State:* Ketika ditekan, tombol turun 2px (`translate-y-[2px]`) dengan bayangan yang memadat, memberikan respons fisik yang nyata.

---

## 3. IDENTIFIKASI TOMBOL KRUSIAL UNTUK KONSEP 3D

Tidak semua tombol dibuat 3D agar antarmuka tidak sesak (*visual fatigue*). Hanya tombol dengan **nilai transaksi dan konversi tertinggi** yang diberikan sentuhan 3D:

| Prioritas | Nama Tombol | Posisi | Gaya 3D | Peran Aksi |
|---|---|---|---|---|
| **Tier 1 (Utama)** | **Catat Kas / Input Kas** | Quick Action Card & Navbar | `.btn-3d-blue` | Pintu masuk pencatatan arus uang harian |
| **Tier 1 (Utama)** | **Perkuat Kesiapan / Simpan** | Banner Kesiapan & Header Form | `.btn-3d-green` | Simpan data & validasi kesiapan audit |
| **Tier 2 (Taktis)** | **Kerjakan** | Daftar Tugas Hari Ini | `.btn-3d-surface` | Menyelesaikan langkah aksi perbaikan |
| **Tier 2 (Taktis)** | **Rayakan Kelulusan** | Funding Gate / Kelulusan | `.btn-3d-green` | Klaim sertifikasi & rilis ke investor |

---

## 4. COPYWRITING PLAYBOOK (BERUANG EDITION)

Mengadopsi gaya copywriting yang komunikatif, ramah, dan memberi semangat (seperti *"Dikit lagi gol!", "Yok bisa yok"* pada referensi):

| Konteks | Copywriting Lama (Kaku) | Copywriting Baru (Ramah & Berdaya-Dorong) |
|---|---|---|
| **Kesiapan Pendanaan** | "Progres kelengkapan dokumen 80%" | **"80% → Dikit lagi lolos pendanaan! Tinggal 1 langkah lagi buat bikin tokomu siap audit investor. Yok bisa yok."** |
| **Perlindungan Kas** | "Laporan keuangan terenkripsi" | **"Kesehatan Kas Toko Terlindungi. Saldo riil dan margin aman dari kebocoran modal."** |
| **Tindakan Perbaikan** | "Perbaiki pembukuan Anda" | **"Perkuat kesehatan tokomu di sini →"** |
| **Pencatatan Harian** | "Formulir input kas harian" | **"Catat kas hari ini biar pembukuan rapi & siap audit konsultan."** |
| **Lencana Status** | "Status: Aktif" | **Pill Badge Hijau: "Baru" & "Terverifikasi Resmi"** |

---

## 5. DESIGN TOKENS (CSS & TAILWIND)

```css
:root {
  /* 60% Dominan: Canvas & Struktur Biru */
  --bg-canvas: #F3F8FC;
  --bg-surface: #FFFFFF;
  --border-subtle: #E0EDF6;
  --color-blue-primary: #0066D6;
  --color-blue-deep: #004C99;
  --color-blue-surface: #EFF6FF;

  /* 30% Sekunder: Pertumbuhan & Verifikasi Hijau */
  --color-green-primary: #00AA13;
  --color-green-deep: #00880C;
  --color-green-surface: #F0FDF4;
  --color-green-border: #BBF7D0;

  /* 10% Aksen: 3D Taktil & Interactive Triggers */
  --shadow-3d-blue: 0 6px 16px -2px rgba(0, 102, 214, 0.42), 0 2px 4px -1px rgba(0, 0, 0, 0.08);
  --shadow-3d-green: 0 6px 16px -2px rgba(0, 170, 19, 0.42), 0 2px 4px -1px rgba(0, 0, 0, 0.08);
}
```

---

## 6. TYPOGRAPHY & BRAND DISCIPLINE

- **Font Utama:** Seluruh antarmuka menggunakan **Poppins** dengan bobot konsisten: Medium (500), Semibold (600), dan Bold (700).
- **Spacing:** Spacing normal (`letter-spacing: normal !important`).
- **Angka Finansial:** Wajib menerapkan kelas `tabular-nums` untuk keselarasan angka moneter dan persentase.
