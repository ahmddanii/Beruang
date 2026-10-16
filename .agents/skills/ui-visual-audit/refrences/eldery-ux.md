# UX untuk pengguna lansia

Baca file ini saat profil `elderly` dipakai, atau saat pengguna menyebut orang tua, senior, atau kalangan awam teknologi. Skrip sudah mengukur sebagian (ukuran, kontras, target). Daftar ini untuk bagian yang perlu dinilai lewat screenshot dan kode.

## Daftar isi
1. Prinsip inti
2. Penglihatan
3. Motorik
4. Kognitif
5. Bahasa dan teks
6. Pola yang harus dicurigai
7. Pola yang membantu

## 1. Prinsip inti

Pengguna lansia tidak "bodoh teknologi". Mereka menghadapi perubahan fisik nyata (penglihatan, ketepatan jari, memori kerja) dan sering kurang terbiasa dengan konvensi antarmuka yang dianggap umum oleh pengguna muda. Desain yang baik di sini: **besar, jelas, sedikit pilihan, tidak menghukum kesalahan.** Hampir semuanya juga membuat produk lebih baik untuk semua orang.

## 2. Penglihatan

- Teks isi 18px atau lebih; judul jelas lebih besar. Jangan mengandalkan pengguna akan zoom.
- Kontras tinggi (7:1). Hindari abu-abu muda untuk teks, terutama teks sekunder, placeholder, dan teks di tombol outline.
- Weight 400 ke atas. Hindari font tipis dan font dekoratif untuk teks isi.
- Warna jangan menjadi satu-satunya penanda (status, error, link). Tambahkan ikon, teks, atau garis bawah.
- Hindari teks di atas foto tanpa overlay gelap atau latar solid.
- Hormati pengaturan ukuran font perangkat: pakai `rem`/`em`, bukan piksel tetap untuk ukuran teks.

## 3. Motorik

- Target sentuh 48px atau lebih, jarak antar target 12px atau lebih.
- Tombol aksi utama lebar dan mudah dijangkau ibu jari, di bagian bawah/tengah layar pada ponsel.
- Hindari aksi yang hanya bisa dilakukan lewat gestur (geser, tekan lama, cubit, drag) tanpa alternatif tombol.
- Hindari hover-only: menu atau info yang baru muncul saat kursor melayang tidak bisa dipakai di layar sentuh.
- Jangan membuat timeout pendek pada form atau sesi. Beri peringatan dan opsi perpanjang.
- Beri konfirmasi untuk aksi merusak (hapus, bayar, kirim) dan sediakan batal/undo.

## 4. Kognitif

- Satu aksi utama per layar. Tombol utama solid dan jelas, aksi lain dibuat tenang (outline atau teks).
- Kurangi pilihan: menu maksimal 5–7 item, layar pertama tidak penuh sesak.
- Satu tugas per langkah (wizard bertahap) lebih baik daripada form panjang satu halaman.
- Navigasi konsisten di semua halaman: letak, urutan, dan nama menu tidak berubah.
- Hindari carousel otomatis, animasi bergerak, popup mendadak, dan banner yang menutupi konten.
- Selalu beri tahu posisi pengguna (judul halaman, langkah 2 dari 4, breadcrumb sederhana) dan jalan kembali.
- Pesan error menjelaskan apa yang salah dan cara memperbaikinya, tanpa menyalahkan pengguna dan tanpa kode teknis.

## 5. Bahasa dan teks

- Bahasa sehari-hari yang sopan. Hindari istilah teknis dan singkatan ("OTP", "login", "dashboard", "submit") tanpa penjelasan atau padanan: "Kode verifikasi", "Masuk", "Halaman utama", "Kirim".
- Label tombol berupa kata kerja yang spesifik: "Buat janji temu", bukan "Lanjut" atau "OK".
- Ikon selalu disertai teks. Ikon yang dianggap universal oleh desainer (hamburger, tiga titik, gir, bagikan) sering tidak dikenali.
- Kalimat pendek, paragraf pendek, bullet seperlunya. Hindari huruf kapital semua, teks miring panjang, dan rata kanan-kiri.
- Placeholder bukan label. Label harus selalu terlihat di atas kolom.

## 6. Pola yang harus dicurigai

| Pola | Kenapa bermasalah |
|---|---|
| Menu hamburger sebagai satu-satunya navigasi di desktop | Tersembunyi; banyak lansia tidak tahu itu bisa ditekan |
| Tombol ikon tanpa teks | Makna tidak dikenali |
| Tombol dan link berukuran seperti teks biasa | Sulit ditekan dan sulit dibedakan |
| Dropdown/select kecil dan date picker rumit | Sulit dipilih; pertimbangkan input terpisah hari/bulan/tahun |
| CAPTCHA gambar | Sulit dilihat dan stres |
| Notifikasi toast yang hilang cepat | Terlalu cepat dibaca |
| Layout padat berbasis kartu kecil | Tidak jelas mana yang penting |
| Konfirmasi hanya lewat warna | Tidak terlihat bagi yang buta warna atau kontras rendah |

## 7. Pola yang membantu

- Tombol besar berisi kata kerja jelas, dengan jarak lega.
- Indikator fokus tebal (3px+) dan kontras tinggi.
- Progress eksplisit pada proses multi-langkah.
- Opsi "Hubungi kami" atau bantuan telepon yang mudah ditemukan di setiap halaman penting.
- Ringkasan sebelum konfirmasi ("Periksa kembali data Anda").
- Ukuran teks bisa diperbesar dengan kontrol sederhana yang terlihat (A+).