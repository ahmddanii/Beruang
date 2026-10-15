---
name: color-architecture-60-30-10
description: System Rules for 60-30-10 Color Architecture, semantic color mapping, accessibility overrides (WCAG priority), and micro-level isolation exceptions.
---

# System Rules: 60-30-10 Color Architecture

## 1. Pemetaan Hierarki Warna (Color Mapping)
AI tidak boleh menghitung luas area, melainkan harus mendistribusikan warna berdasarkan peran elemen pada DOM (Document Object Model):

- **60% (Warna Dominan):** Wajib diaplikasikan sebagai warna dasar ruang. Gunakan secara eksklusif untuk `<body>`, background pembungkus utama, section backgrounds, dan area negative space. Warna ini tidak boleh menarik perhatian.
- **30% (Warna Sekunder):** Wajib diaplikasikan untuk membentuk struktur dan pemisahan konten. Gunakan pada cards, sidebars, navbars, footer, input borders, dan teks utama. Warna ini harus cukup kontras dengan warna dominan untuk memisahkan area, namun tidak mendistraksi.
- **10% (Warna Aksen):** Wajib dicadangkan hanya untuk pemicu interaksi dan metrik kritis. Gunakan pada Call to Action (CTA) buttons, active states, toggles, links, dan alert/badges. Dilarang keras menggunakan warna aksen untuk elemen statis yang tidak bisa diklik.

## 2. Aturan Override Aksesibilitas (WCAG Priority)
- Standar rasio kontras WCAG AA (4.5:1 untuk teks normal, 3:1 untuk teks besar) memiliki hierarki tertinggi.
- Jika kombinasi warna 30% di atas 60%, atau 10% di atas 30% gagal memenuhi standar WCAG, AI diinstruksikan untuk secara otomatis menyesuaikan luminance (shade atau tint) dari warna tersebut tanpa mengubah base hue.
- Warna aksen (10%) pada teks berukuran kecil di atas warna dominan (60%) harus divalidasi ulang; jika gagal, AI harus membalik gaya (misal: dari teks berwarna aksen menjadi background aksen dengan teks putih/hitam pekat).

## 3. Implementasi Kode dan Variabel
- AI dilarang men-generate hex codes mentah (misal: `#FF5733`) secara acak di dalam elemen markup.
- AI harus mengelompokkan warna ke dalam semantik variabel. Jika menggunakan utility-first framework seperti Tailwind CSS, AI wajib menggunakan kelas semantik seperti `bg-primary`, `text-secondary`, dan `bg-accent` yang merujuk pada konfigurasi tema pusat, bukan kelas absolut seperti `bg-red-500`.

## 4. Isolasi Komponen (Micro-Level Exception)
- Aturan 60-30-10 hanya berlaku pada skala makro (page level atau viewport penuh).
- Saat AI diminta membuat komponen individu berukuran kecil (seperti sekadar dropdown atau tooltip), AI tidak boleh memaksa rasio 60-30-10 ke dalam komponen tersebut. Komponen mikro harus mewarisi state dari kontainer induknya.

## 5. Spesifikasi Arsitektur Beruang (GoPay Tactile Edition)
- **60% Dominan (Biru Kanvas & Struktur Taktil):**
  - Kanvas: `#F3F8FC` (light) / `#0C121D` (dark).
  - Permukaan Kartu Taktil (`.card-tactile-gopay`): `#F6F8FA` (light) / `#13161F` (dark) dengan `border: 1px solid #E2E8F0` dan inner shadow `inset 0 1.5px 2px 0 rgba(255,255,255,0.45)`.
  - Header Kontekstual Kartu Metrik (`.card-tactile-gopay.has-blue-banner`): Gradasi teal-blue `#50AABF` → `#2091AA`.
- **30% Sekunder (Hijau Pertumbuhan & Verifikasi):**
  - Hijau Pertumbuhan: `#00AA13` / `#00A62A` untuk untung bersih, status validasi lolos, dan delta pertumbuhan.
  - Pil Aksi Mint-Sage (`.btn-pill-action`): Gradasi `#F6FBF7` → `#D6F1DF`, border `#A6D9B7`, teks & ikon hitam `#000000`.
  - Badge Terverifikasi: Rosette hijau dengan ikon centang putih di atas avatar UMKM OSS RBA.
- **10% Aksen Interaktif (3D & Taktil):**
  - `.btn-3d-blue`: Tombol aksi transaksional utama ("Catat Kas", "Simpan Perubahan").
  - `.btn-3d-green`: Tombol validasi kesiapan ("Perkuat Kesiapan", "Rayakan Kelulusan").
  - `.segmented-pill-container`: Filter tab makro dengan animasi indikator mengambang GSAP.
  - `.btn-pill-gradient`: Filter atau aksi sekunder bergradasi putih-ke-abu taktil.
