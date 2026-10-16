# Standar dan ambang batas

Baca file ini bila pengguna bertanya "kenapa angkanya segitu?", ingin menyesuaikan ambang batas, atau menolak sebuah temuan. Semua angka ada di `PROFILES` dalam `scripts/rules.py`.

## Daftar isi
1. Sumber standar
2. Tabel ambang batas per profil
3. Alasan di balik angka penting
4. Cara memutuskan bila standar bertentangan
5. Cara skor dihitung

## 1. Sumber standar

| Sumber | Dipakai untuk |
|---|---|
| WCAG 2.2 (W3C) | Kontras (1.4.3, 1.4.6, 1.4.11), zoom/resize (1.4.4), reflow (1.4.10), jarak teks (1.4.12), fokus (2.4.7), ukuran target (2.5.8), label (3.3.2), nama kontrol (4.1.2) |
| Apple Human Interface Guidelines | Target sentuh minimal 44×44 pt |
| Material Design | Target sentuh minimal 48×48 dp, jarak antar target 8 dp |
| Nielsen Norman Group (10 heuristik, riset pengguna senior) | Label selalu terlihat, teks ikon, konsistensi, beban kognitif, ukuran teks untuk senior |
| Hukum Hick & Miller | Jumlah pilihan di layar pertama, panjang menu |

## 2. Tabel ambang batas

| Parameter | `elderly` | `general` | Aturan |
|---|---|---|---|
| Font minimum (teks apa pun) | 14px | 12px | TYPO-01 |
| Teks isi error / peringatan | < 16px / < 18px | < 14px / < 16px | TYPO-02 |
| Line-height paragraf | ≥ 1.5 | ≥ 1.4 | TYPO-05 |
| Weight minimum | 400 | 300 | TYPO-06 |
| Karakter per baris | ≤ 75 | ≤ 90 | TYPO-09 |
| Jumlah ukuran font berbeda | ≤ 7 | ≤ 9 | TYPO-03 |
| Kontras teks normal: error / peringatan | < 4.5 / < 7.0 | < 4.5 / < 4.5 | COLOR-01 |
| Kontras teks besar (≥24px atau ≥18.66px bold) | < 3.0 / < 4.5 | < 3.0 / < 3.0 | COLOR-01 |
| Target sentuh: error / peringatan | < 44px / < 48px | < 24px / < 44px | SIZE-01 |
| Jarak antar target | ≥ 12px | ≥ 8px | SIZE-02 |
| Kontrol interaktif di layar pertama | ≤ 10 | ≤ 18 | LAYOUT-05 |
| Padding horizontal tombol | ≥ 12px | ≥ 8px | LAYOUT-07 |
| Item dalam satu menu | ≤ 7 | ≤ 9 | UX-15 |
| Tombol solid di layar pertama | ≤ 3 | ≤ 4 | UX-16 |
| Radius sudut berbeda | ≤ 3 | ≤ 4 | LAYOUT-03 / SIZE-05 |
| Warna teks berbeda | ≤ 7 | ≤ 9 | COLOR-03 |

Aturan tanpa profil khusus: kontras batas input ≥ 3:1 (COLOR-02), font input ≥ 16px (UX-12), ukuran ikon maksimal 5 variasi (SIZE-07), skala spasi kelipatan 4px dengan toleransi 30% (LAYOUT-02).

## 3. Alasan di balik angka penting

**Font isi 18px (elderly).** WCAG tidak menetapkan ukuran minimum, tetapi presbiopia dan penurunan ketajaman penglihatan membuat teks 16px yang nyaman bagi usia 25 terasa kecil bagi usia 65. Banyak pedoman senior (NN/g, AARP, GOV.UK) menyarankan 18px atau lebih. 16px dijadikan batas error, 18px target ideal.

**Kontras 7:1 (elderly).** WCAG AA meminta 4.5:1; AAA meminta 7:1. Lensa mata menguning dan menyerap cahaya seiring usia sehingga kontras efektif turun. Karena itu profil lansia memakai AAA sebagai target dan AA sebagai batas gagal.

**Target 48px dan jarak 12px (elderly).** Standar minimum WCAG 2.5.8 hanya 24px. HIG meminta 44, Material 48. Tremor ringan dan jari yang kurang presisi pada lansia menaikkan kebutuhan, jadi 44 dijadikan batas gagal dan 48 target.

**Line-height 1.5.** WCAG 1.4.12 menetapkan bahwa konten tetap terbaca bila jarak baris diubah ke 1.5×. Desain yang sudah 1.5 tidak patah saat pengguna memakai penyesuaian ini.

**Zoom tidak boleh diblokir.** `user-scalable=no` atau `maximum-scale` di bawah 2 menghalangi kebiasaan paling umum pengguna senior: mencubit layar untuk memperbesar (WCAG 1.4.4).

**Skala spasi 4/8px.** Bukan aturan WCAG, melainkan praktik desain sistem (Material, Apple, Tailwind). Dipakai sebagai indikator konsistensi: spasi acak seperti 13px, 7px, 23px biasanya tanda nilai ditulis manual tanpa token.

**Font keluarga ≤ 2.** Praktik tipografi: lebih dari dua keluarga jarang disengaja dan memperlambat muat halaman.

## 4. Bila standar bertentangan

- Keputusan merek (font tipis, kontras rendah demi estetika) kalah dari keterbacaan untuk audiens lansia. Katakan itu langsung ke pengguna dengan alternatif yang tetap menarik (misalnya warna merek lebih gelap, weight 500).
- Komponen yang memang kecil secara fungsional (ikon dekoratif, link inline dalam paragraf) dikecualikan oleh WCAG 2.5.8. Skrip sudah mengecualikan link inline; elemen dekoratif lain gunakan `ignore`.
- Bila pengguna sadar melanggar dan menolak sebuah aturan, catat sebagai keputusan sadar, naikkan ambangnya di `--config`, dan jangan debat berulang.

## 5. Cara skor dihitung

- Tiap aturan yang terpicu mengurangi nilai kategorinya. Error: 6 poin + 0.7 per elemen tambahan (maks 14 per aturan). Peringatan: 2 poin + 0.3 per elemen tambahan (maks 7). Batas per aturan mencegah satu masalah berulang menghabiskan seluruh skor.
- Skor akhir = rata-rata kategori (50%) + kategori terendah (50%), lalu dibatasi `100 − 1.2 × jumlah jenis error`. Halaman dengan banyak jenis error tidak bisa mendapat nilai bagus walau kategori lain bersih.
- Tingkat: ≥ 90 Sangat baik, 75–89 Perlu perbaikan kecil, 50–74 Banyak masalah, < 50 Kritis.
- Skor dihitung dari temuan yang digabung lintas ukuran layar, jadi masalah yang sama di tiga layar tidak dihitung tiga kali.