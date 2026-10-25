# Checklist penilaian visual

Skrip mengukur angka. File ini untuk hal yang harus Anda nilai dengan melihat screenshot (`screens/*.annotated.part*.png` dan `screens/<viewport>.png` yang bersih). Gunakan gambar bersih untuk menilai tampilan, gambar beranotasi untuk mencocokkan temuan skrip.

## Daftar isi
1. Cara melakukan penilaian
2. Clean design: apa yang dicari
3. Konsistensi komponen
4. Heuristik Nielsen yang bisa dinilai dari tampilan
5. Pemeriksaan per ukuran layar
6. Format temuan manual

## 1. Cara melakukan penilaian

1. Lihat screenshot **mobile** dulu dari atas ke bawah, lalu desktop. Pada setiap bagian tanya: "Apa yang pertama saya lihat? Apa yang harus saya lakukan di sini? Apakah ada yang membuat saya ragu?"
2. Bandingkan dengan temuan skrip. Jika skrip menandai sesuatu yang terlihat baik, curigai salah deteksi; jika Anda melihat masalah yang tidak ditandai, itu bahan temuan manual.
3. Tulis hanya yang benar-benar terlihat dan bisa ditunjuk lokasinya. Jangan menebak perilaku yang tidak terlihat di gambar (hover, animasi).

## 2. Clean design: apa yang dicari

| Aspek | Tanda baik | Tanda masalah |
|---|---|---|
| Ruang kosong | Jarak antar kelompok jelas lebih besar daripada jarak dalam kelompok | Semua jarak sama, atau elemen berdesakan |
| Hirarki | Satu hal paling menonjol per layar, lalu jelas urutannya | Beberapa elemen berebut perhatian; semua tebal/berwarna |
| Perataan | Tepi kiri sejajar rapi, grid terasa | Tepi bergeser sedikit, elemen "hampir" sejajar |
| Palet warna | 1 warna merek + netral + warna status | Banyak warna aksen tanpa peran jelas |
| Tipografi | 1–2 font, skala ukuran teratur | Campuran font dan ukuran |
| Dekorasi | Setiap elemen punya fungsi | Garis, bayangan, gradien, ikon hiasan berlebihan |
| Kepadatan | Satu ide per bagian | Terlalu banyak teks atau pilihan per layar |
| Gambar | Relevan, tajam, rasio konsisten | Kabur, rasio acak, stok generik yang tidak membantu |

## 3. Konsistensi komponen

Bandingkan semua instans komponen yang sama secara visual (tombol, kartu, input, badge, judul bagian):
- Apakah tombol utama selalu berwarna/berukuran sama di setiap halaman?
- Apakah kartu punya radius, bayangan, dan padding yang sama?
- Apakah ikon satu keluarga (garis vs isi, tebal garis sama)?
- Apakah judul bagian memakai gaya yang sama?
- Apakah status (sukses, error, peringatan) selalu memakai warna dan ikon yang sama?
- Apakah hover/fokus/disabled tampak sistematis (jika terlihat di screenshot)?

Gunakan `inventory` di `results.json` sebagai bukti: bila ada 9 ukuran font atau 5 radius, tunjukkan angkanya.

## 4. Heuristik Nielsen yang bisa dinilai dari tampilan

- **Visibilitas status sistem**: apakah pengguna tahu sedang di halaman/langkah mana?
- **Kecocokan dengan dunia nyata**: bahasa dan ikon familiar bagi audiens?
- **Kontrol dan kebebasan**: ada jalan keluar/batal/kembali yang terlihat?
- **Konsistensi dan standar**: pola yang sama terlihat sama dan bekerja sama?
- **Pencegahan kesalahan**: aksi berisiko diberi jarak/konfirmasi? Format input dicontohkan?
- **Mengenali daripada mengingat**: opsi terlihat, label selalu tampak, tidak mengandalkan ingatan?
- **Desain minimalis**: ada informasi yang tidak membantu keputusan pengguna?

## 5. Pemeriksaan per ukuran layar

- **Mobile (375)**: Apakah aksi utama terlihat tanpa scroll? Apakah teks tidak terpotong? Apakah tombol utama mudah dijangkau ibu jari? Apakah menu dapat dipahami?
- **Tablet (768)**: Apakah layout memanfaatkan lebar dengan wajar (bukan sekadar mobile yang diregangkan atau desktop yang dipaksa muat)?
- **Desktop (1440)**: Apakah lebar baris teks nyaman? Apakah tombol dan input tidak melar berlebihan? Apakah ada ruang kosong besar yang tidak bertujuan?
- Pada ketiganya: apakah urutan baca logis, dan apakah elemen yang sama tetap dikenali?

## 6. Format temuan manual

Simpan sebagai `manual.json`, lalu jalankan ulang skrip dengan `--manual manual.json`:

```json
[
  {
    "title": "Judul singkat masalah",
    "severity": "error | warn | info",
    "viewport": "mobile | tablet | desktop | semua",
    "detail": "Apa yang terlihat, di mana, dan kenapa mengganggu pengguna target.",
    "fix": "Perbaikan konkret (CSS/HTML/teks) yang bisa langsung dipakai."
  }
]
```

Pedoman tingkat:
- `error`: pengguna target kemungkinan gagal menyelesaikan tugas (aksi utama tidak terlihat, label menyesatkan).
- `warn`: menurunkan kenyamanan atau kepercayaan (hirarki lemah, gaya tidak konsisten).
- `info`: saran penyempurnaan.