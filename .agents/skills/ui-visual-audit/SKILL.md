---
name: ui-visual-audit
description: Unit test visual untuk frontend. Membuka halaman web di browser sungguhan, mengukur setiap elemen, memotret layar di mobile/tablet/desktop, lalu mendeteksi komponen tidak konsisten, ukuran teks atau tombol terlalu kecil/besar/abnormal, kontras buruk, spasi acak, pelanggaran standar UX/UI (WCAG 2.2, HIG, Material, Nielsen), dan menghasilkan laporan HTML visual dengan skor serta saran perbaikan CSS. Punya profil khusus ramah lansia/orang tua. Gunakan skill ini setiap kali pengguna meminta audit/cek/review/tes desain, UI, UX, tampilan, konsistensi komponen, ukuran font, ukuran tombol, kontras warna, aksesibilitas, clean design, atau user friendly, terutama untuk pengguna lansia, walau pengguna tidak menyebut kata "audit" atau "unit test". Juga untuk regresi visual (membandingkan tampilan sebelum/sesudah perubahan) dan sebelum/sesudah merombak UI.
---

# UI Visual Audit

Skill ini bekerja seperti unit test, tetapi untuk **tampilan**. Skrip membuka halaman di Chromium, mengukur semua elemen terlihat (ukuran, font, warna, spasi, target sentuh), menjalankan ±45 aturan, memotret layar dengan penanda bernomor di lokasi masalah, lalu membuat `report.html` dan `results.json`.

Skrip menangkap hal yang **bisa diukur**. Hal yang **bergantung penilaian mata** (kerapian, hirarki perhatian, kejelasan bahasa, ikon membingungkan) Anda nilai sendiri dari screenshot. Hasil akhir yang bagus selalu menggabungkan keduanya.

## Alur kerja

### 1. Tentukan target dan profil

Dapatkan salah satu dari pengguna, atau cari sendiri di proyek mereka:

| Situasi | Cara |
|---|---|
| URL publik / staging | `--url https://...` |
| Proyek lokal (React, Next, Vite, Laravel, dll.) | Jalankan dev server di background (`npm run dev &`), tunggu siap, lalu `--url http://localhost:PORT` |
| File HTML tunggal | `--file path/ke/index.html` |
| Hanya potongan kode / komponen | Tulis ke satu file HTML yang memuat komponen itu dengan CSS-nya, lalu `--file` |
| Halaman butuh login | Minta pengguna menyimpan sesi Playwright (`--storage-state`), atau audit halaman publiknya saja dan katakan jelas bahwa halaman terkunci belum diperiksa |

Pilih profil:
- `elderly` (default): pengguna lansia/orang tua/senior. Font isi ≥ 18px, target ≥ 48px, kontras 7:1, jarak target 12px, dst. Pakai ini bila pengguna menyebut orang tua, lansia, senior, atau "user friendly" untuk kalangan awam.
- `general`: standar WCAG AA umum, lebih longgar.

Jika proyek punya design token (font, warna, radius, kelipatan spasi), tanyakan atau baca dari kode, lalu isi `--config` (lihat bagian Konfigurasi) agar penyimpangan dari token ikut ditandai.

### 2. Pastikan alat tersedia

```bash
python3 -c "import playwright, PIL" 2>&1 || pip install playwright pillow --break-system-packages
python3 -m playwright install chromium   # hanya bila browser belum ada
```

Bila unduhan browser diblokir jaringan, beri tahu pengguna agar mengizinkan domain di pengaturan jaringan, atau jalankan skrip di mesin mereka sendiri.

### 3. Jalankan audit

```bash
python3 /path/ke/ui-visual-audit/scripts/audit.py \
  --url http://localhost:3000 \
  --profile elderly \
  --out ./ui-audit-output
```

Opsi yang sering berguna:

| Opsi | Fungsi |
|---|---|
| `--viewports mobile,tablet,desktop` | Default. Bisa `375x812,1440x900` atau tambah `320x640` untuk uji zoom/reflow ekstrem |
| `--config file.json` | Ambang batas kustom, `ignore` (selector yang diabaikan), `tokens` |
| `--baseline ./baseline` | Regresi visual: run pertama menyimpan baseline, run berikutnya membandingkan dan menampilkan % piksel berubah + gambar selisih |
| `--update-baseline` | Perbarui baseline setelah perubahan desain yang disengaja |
| `--manual manual.json` | Menyertakan penilaian visual Anda ke laporan (langkah 5) |
| `--fail-on error\|warn\|never` | Exit code 1 untuk CI. Default `error` |
| `--wait 1500` | Tambah jeda bila halaman memuat data lambat / animasi masuk |
| `--storage-state state.json` | Sesi login |

Satu halaman = satu run. Untuk aplikasi multi-halaman, jalankan per rute penting (beranda, form utama, halaman transaksi) dengan `--out` berbeda.

### 4. Baca hasil: angka dulu, lalu gambar

1. Baca ringkasan terminal (skor, jumlah error/peringatan per kategori).
2. Buka `results.json`. Field penting: `score`, `category_scores`, `issues` (sudah digabung lintas ukuran layar; tiap isu punya `rule`, `sev`, `msg`, `fix`, `targets[].sel`, `vps`), `inventory` (semua ukuran font/warna/radius/spasi yang dipakai).
3. **Lihat screenshot dengan tool `view`**, jangan hanya membaca angka. File `screens/<viewport>.annotated.part1.png` dst. adalah potongan kecil yang terbaca jelas. Cocokkan nomor penanda dengan isu di `results.json` (`issues_by_viewport`).

Aturan membaca temuan:
- `error` = melanggar standar atau menghalangi pengguna. Selesaikan dulu.
- `warn` = menyimpang dari rekomendasi atau tanda ketidakkonsistenan.
- `info` = tidak bisa diverifikasi otomatis (misalnya teks di atas gambar). Periksa manual dari screenshot.
- Satu penyebab sering memicu banyak temuan (misalnya `font-size` global 14px memicu belasan `TYPO-02`). Perbaiki di akar (token/variabel CSS), bukan per elemen.
- Waspadai salah deteksi. Jika temuan terlihat keliru (komponen pihak ketiga, elemen dekoratif, banner cookie), periksa screenshot, lalu tambahkan selector ke `ignore` dan jelaskan alasannya ke pengguna. Jangan menyembunyikan temuan hanya agar skor naik.

### 5. Penilaian visual (bagian yang tidak bisa diukur skrip)

Baca `references/visual-review-checklist.md`, lalu periksa screenshot terhadap daftar itu: hirarki visual, kerapian/ritme spasi, kejelasan satu aksi utama, ikon tanpa label, teks yang membingungkan, kepadatan, bahasa yang terlalu teknis, konsistensi gaya komponen. Untuk profil `elderly`, baca juga `references/elderly-ux.md`.

Tulis temuan Anda ke `manual.json`, lalu jalankan ulang skrip dengan `--manual manual.json` (cepat, hasil screenshot tetap sama) agar masuk ke laporan:

```json
[
  {"title": "Tiga tombol solid bersaing", "severity": "warn", "viewport": "mobile",
   "detail": "Daftar, Janji Temu, dan Info berbobot visual sama; aksi utama tidak jelas.",
   "fix": "Jadikan 'Buat Janji Temu' satu-satunya tombol solid; sisanya outline."}
]
```

`severity`: `error` | `warn` | `info`. Hanya tulis temuan yang benar-benar Anda lihat di screenshot, dengan lokasi yang jelas.

### 6. Sampaikan hasil

Bahasakan dalam bahasa pengguna (Indonesia bila mereka menulis Indonesia). Urutan jawaban:

1. **Satu kalimat verdict**: skor, tingkat (Sangat baik / Perlu perbaikan kecil / Banyak masalah / Kritis), dan profil yang dipakai.
2. **Skor per kategori** secukupnya (tidak perlu tabel besar).
3. **Prioritas perbaikan** dalam 3 tingkat:
   - P0: error yang memblokir pengguna (zoom diblokir, kontras sangat rendah, target sentuh sangat kecil, tidak ada indikator fokus, label form hilang).
   - P1: ketidakkonsistenan sistem (banyak ukuran font/tombol/radius, spasi acak, warna kembar).
   - P2: penyempurnaan.
   Tiap butir: apa masalahnya, di mana (selector), kenapa penting bagi pengguna, dan **kode perbaikan konkret** (CSS/HTML). Batasi sekitar 5–8 butir teratas; jangan menyalin 100 temuan ke chat.
4. **Yang tidak bisa diperiksa** (state hover, animasi, halaman yang belum dijalankan, konten di atas gambar) agar pengguna tidak merasa halaman "pasti aman".
5. Serahkan `report.html` dengan `present_files` (dan `results.json` bila diminta) supaya pengguna bisa membuka laporan visualnya.

### 7. Perbaiki dan uji ulang (bila diminta)

Jika pengguna meminta perbaikan: ubah di akar masalah, jalankan ulang, dan tunjukkan skor sebelum → sesudah. Sarankan `--baseline` agar perubahan tampilan berikutnya yang tidak disengaja langsung ketahuan, dan `--fail-on error` di CI agar desain tidak mundur.

## Konfigurasi (`--config`)

```json
{
  "thresholds": { "body_warn": 18, "target_warn": 52 },
  "ignore": [".cookie-banner", "#chat-widget", "[data-testid=map]"],
  "tokens": {
    "font_sizes": [16, 18, 24, 32, 40],
    "radii": [8, 12, 16],
    "colors": ["#111827", "#374151", "#0a4a8c"],
    "spacing_base": 4
  }
}
```

Semua kunci `thresholds` ada di `PROFILES` pada `scripts/rules.py` (`min_font`, `body_err`, `body_warn`, `line_height`, `contrast_err`, `contrast_warn`, `target_err`, `target_warn`, `target_gap`, `max_font_sizes`, dst.). Alasan di balik tiap angka ada di `references/standards.md`.

## Cakupan aturan

| Kategori | Yang diperiksa |
|---|---|
| Tipografi | Ukuran minimum, teks isi, banyaknya/kembarnya ukuran font, line-height, weight tipis, hirarki heading, jumlah font keluarga, panjang baris, huruf kapital/miring/justify, teks terpotong, ukuran abnormal |
| Ukuran & target sentuh | Target kecil, target berdekatan/tumpang tindih, ukuran komponen sejenis tidak seragam, variasi tombol, komponen terlalu besar/kecil, gambar buram, ukuran ikon |
| Layout & konsistensi | Scroll horizontal, skala spasi 4/8px, variasi radius, tepi yang bergeser beberapa piksel, kepadatan layar pertama, elemen keluar layar, padding sempit, kepatuhan token |
| Warna & kontras | Kontras teks (AA/AAA), batas input, warna hampir kembar, link tanpa penanda, placeholder |
| UX & aksesibilitas | Alt gambar, label form, nama kontrol, zoom diblokir, lang, fokus keyboard (diuji dengan menekan Tab), teks link samar, tombol hanya ikon, autoplay, ID ganda, banner fixed besar, menu terlalu panjang, tombol utama bersaing |

Daftar lengkap dengan alasan dan sumber: `scripts/rules.py` (`RULES`) dan `references/standards.md`.

## Batasan yang perlu diketahui

- Hanya memeriksa kondisi awal halaman setelah dimuat. State hover, modal, dropdown, dan konten setelah interaksi perlu dijalankan terpisah atau dinilai manual.
- Kontras teks di atas gambar/gradien tidak bisa dihitung. Ditandai `info` untuk dicek dari screenshot.
- Deteksi "komponen sejenis" memakai kesamaan nama class. Proyek dengan utility class (Tailwind) lebih sedikit terdeteksi pada aturan ini, tetapi aturan berbasis ukuran/warna/spasi tetap bekerja penuh.
- Laporan menangkap maksimal 7000px tinggi halaman per ukuran layar.
- Hasil otomatis tidak menggantikan uji dengan pengguna asli. Untuk audiens lansia, sarankan uji singkat dengan 3–5 orang.