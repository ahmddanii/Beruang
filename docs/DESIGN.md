# Beruang Design System
## Desktop-first financial workspace

Dokumen ini adalah sumber kebenaran visual untuk Beruang, platform B2B financial telemetry dan kesiapan pendanaan UMKM.

## 1. Creative thesis

Beruang adalah ruang kerja finansial yang membantu pemilik bisnis memahami kondisi usaha, memperbaiki kesiapan, dan mengambil keputusan pendanaan dengan percaya diri.

Arah visual: refined fintech workspace. Tenang, terstruktur, transparan, dan berorientasi pada keputusan. Referensi utamanya adalah aplikasi desktop dengan sidebar persisten, topbar ringan, panel data yang lapang, dan aksen warna yang berfungsi sebagai status.

Jangan membuat dashboard terasa seperti landing page, aplikasi crypto, atau kumpulan kartu dekoratif.

## 2. Desktop-first shell

Struktur dasar:

- Sidebar kiri persisten pada layar desktop.
- Main workspace fleksibel di sebelah kanan.
- Topbar ringan untuk konteks halaman, periode, notifikasi, AI Copilot, dan profil.
- Konten dibatasi pada lebar sekitar 1440px agar tidak terlalu melebar.
- Desktop menampilkan perbandingan data secara berdampingan.
- Mobile mengubah sidebar menjadi drawer dan grid menjadi stack.

Sidebar memiliki lebar 240 sampai 280px, border kanan 1px, dan tidak memakai shadow besar.

## 3. Information architecture

### UMKM

- Overview
- Action Plan
- Laporan dan Kas Harian
- Audit 5-Dimensi
- Verified Data Room
- Profil dan Dokumen

### Konsultan

- Portfolio Klien
- Radar Diagnostic
- Verifikasi Laporan
- Review Action Plan

### Investor

- Curated Deal Flow
- Data Room Due Diligence
- Investasi Aktif

Sidebar hanya memuat area kerja utama. CTA seperti upload laporan, memperbarui profil, atau meminta review harus berada di halaman yang relevan.

## 4. Layout and density

- Canvas halaman menggunakan #F7F8FA.
- Panel utama menggunakan putih.
- Gunakan grid 12 kolom pada layar besar.
- Metric summary biasanya memakai 4 kolom.
- Area analitik memakai komposisi 8 kolom dan 4 kolom.
- Table atau ledger dapat memakai seluruh 12 kolom.
- Jarak antar panel 24 sampai 32px.
- Padding halaman desktop 32 sampai 40px.
- Gunakan whitespace untuk memisahkan konteks, bukan shadow.

Jangan mengubah semua elemen menjadi card. Gunakan panel besar untuk chart, table untuk data komparatif, dan inline status untuk informasi singkat.

## 5. Color tokens

Warna utama: background #F7F8FA, foreground #111318, card #FFFFFF, primary #011BFF, primary hover #0016CC, secondary #EAF0FF, muted #F1F3F7, muted foreground #667085, border #E3E6EC, success #1F7A4D, warning #D97706, destructive #DC2626.

Aksen blue tint digunakan untuk highlight progres dan secondary action. Blue solid hanya digunakan pada navigasi aktif dan tindakan utama. Jangan memenuhi seluruh halaman dengan warna aksen.

## 6. Surfaces and components

- Panel: background putih, border 1px #E3E6EC, radius 12 sampai 16px.
- Sidebar active item: blue primary dengan teks putih.
- Sidebar hover: muted parchment dengan teks foreground.
- Button primary: blue primary.
- Button secondary: soft blue tint.
- Button outline: putih dengan border hairline.
- Badge verified: success background dan success foreground.
- Table: baris bersih, angka rata kanan, hover halus, tidak memakai zebra yang kontras.
- Dialog: putih, radius 16px, border hairline, shadow hanya untuk pemisahan layer.
- Input: minimal, label jelas, focus ring blue primary.

Semua komponen interaktif wajib memiliki default, hover, active, focus-visible, disabled, loading, dan empty state jika relevan.

## 7. Typography

Heading dan metric memakai Plus Jakarta Sans. Body dan control memakai Inter atau Poppins. Hierarki harus jelas tanpa memakai terlalu banyak ukuran.

Nominal Rupiah, persentase, skor, jumlah transaksi, dan tanggal numerik wajib memakai tabular-nums lining-nums.

Judul halaman singkat. Deskripsi halaman memberi konteks dan menjelaskan manfaat, bukan mengulang judul.

## 8. Copywriting

Brand voice: grounded, authoritative, optimistic, transparent, dan mudah dipahami pemilik UMKM.

Label sidebar harus ringkas: Overview, Action Plan, Data Room.

Gunakan CTA yang konkret: Perbarui Data Keuangan, Upload Laporan, Lihat Rincian, Mulai Action Plan, dan Minta Review Konsultan.

Gunakan deskripsi halaman yang lebih informatif, misalnya: Pantau arus kas, profitabilitas, dan perubahan kondisi bisnis Anda dalam satu tampilan.

Hindari jargon teknis tanpa penjelasan, copy promosi berlebihan, dan CTA generik seperti Klik di sini.

## 9. Responsive transformation

- Desktop: sidebar persisten.
- Tablet: sidebar dapat collapse menjadi rail atau drawer.
- Mobile: sidebar hidden by default dan dibuka melalui menu.
- Desktop multi-column menjadi mobile single-column.
- Filter inline menjadi dialog atau sheet.
- Table penuh menjadi horizontal scroll atau detail row.
- CTA di samping heading berpindah ke bawah heading.

Mobile bukan versi desktop yang diperkecil. Hierarki informasi tetap sama, tetapi pola interaksinya boleh berubah.

## 10. Anti-patterns

- Tidak memakai gradient neon ungu atau biru.
- Tidak memakai fake phone frame pada desktop.
- Tidak memakai biru sebagai dekorasi berlebihan; gunakan hanya untuk navigasi aktif dan tindakan utama.
- Tidak memakai shadow besar pada setiap card.
- Tidak membuat card di dalam card lebih dari dua lapisan.
- Tidak memakai #000000 sebagai warna utama.
- Tidak menaruh semua CTA di sidebar.
- Tidak menyembunyikan data penting desktop di balik accordion tanpa alasan.
- Tidak mengandalkan hover sebagai satu-satunya cara menemukan aksi.
