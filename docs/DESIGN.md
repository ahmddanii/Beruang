# docs/DESIGN.md — Beruang Desktop Design System (SSOT)
## 60-30-10 Blue & Green Architecture (Fintech Ecosystem Edition)

Dokumen ini adalah Single Source of Truth (SSOT) resmi untuk seluruh arsitektur visual platform **Beruang (Ber-Uang)** versi Desktop.

---

## 1. Konsep & Creative Thesis

Beruang adalah ruang kerja finansial B2B dan telemetri kesiapan pendanaan UMKM.
- **Inspirasi Visual:** Fintech modern Indonesia (ekosistem GoPay/Gojek) yang dipadukan dengan disiplin layout desktop B2B.
- **Komposisi Warna 60-30-10:**
  - **60% Biru (Warna Dominan):** Latar belakang canvas desktop ice-blue (`#F3F8FC`), container header bento bernuansa biru, navigasi sidebar, dan struktur pembungkus.
  - **30% Hijau (Warna Sekunder):** Indikator pertumbuhan omzet, untung bersih, kartu kesiapan pendanaan, tag status "Terverifikasi", dan badge pill "Baru".
  - **10% Aksen 3D (Pemicu Aksi Taktil):** Tombol-tombol fisik berkilau (3D embossed/glassmorphic) untuk aksi bernilai konversi tinggi (misal: "Catat Kas", "Perkuat Kesiapan Usaha", dan "Kerjakan").
- **Copywriting:** Komunikatif, optimis, dan memberi dorongan motivasi (*"80% → Dikit lagi lolos pendanaan! Yok bisa yok."*).

---

## 2. Token & Spesifikasi Warna

| Peran | Spektrum Warna | Penerapan di DOM |
|---|---|---|
| **60% Dominan (Biru)** | `#F3F8FC` (Canvas), `#0066AE` s/d `#0081A7` (Header/Brand), `#E0EDF6` (Border) | Background layar, header bento, pembungkus layout desktop, tab header |
| **30% Sekunder (Hijau)** | `#00AA13` / `#059669` (Solid), `#F0FDF4` (Surface), `#BBF7D0` (Border) | Kartu Untung Bersih, banner kesiapan pendanaan, status audit, tag "Baru" |
| **10% Aksen (3D Button)** | Gradasi Biru `#1A8EFF` → `#0066D6`, Gradasi Hijau `#00C853` → `#009624` | Tombol Catat Kas, Tombol Simpan/Perkuat Kesiapan, Tombol Aksi Kritis |

---

## 3. Spesifikasi 3D Button Framework

Tombol 3D diciptakan dengan kombinasi CSS murni (hardware-accelerated):
1. **Bevel Inner Shadow:** `inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45)` (kilau cahaya di tepi atas).
2. **Bottom Dark Edge:** `inset 0 -2.5px 2px 0 rgba(0, 0, 0, 0.22)` (kedalaman ketebalan fisik di tepi bawah).
3. **Elevated Glow Shadow:** `box-shadow: 0 8px 18px -4px rgba(..., 0.45), 0 3px 6px -2px rgba(0, 0, 0, 0.1)`.
4. **Tactile Push (Active State):** `transform: translateY(2px)` saat tombol diklik.

---

## 4. Copywriting Guidelines

1. Gunakan kalimat bernada positif dan memberi dukungan langsung kepada pemilik UMKM.
2. Gunakan metafora progres yang nyata: *"Dikit lagi gol!"*, *"Tinggal 1 langkah lagi"*, *"Buku kas aman"*.
3. Sajikan data finansial selalu dengan font **Poppins** dan kelas `tabular-nums` agar sejajar rapi.
