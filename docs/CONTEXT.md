<!--
FILE INI UNTUK APA:
File ini mendokumentasikan konteks bisnis, domain knowledge, glosarium terminologi, 
dan batasan industri untuk platform B2B Beruang. Berfungsi sebagai pedoman bagi engineer 
dan AI agent agar memahami "mengapa" sebuah fitur dibangun dan bagaimana model bisnis 
mempengaruhi keputusan antarmuka serta arsitektur data.
-->

# Konteks Bisnis & Domain Knowledge — [NAMA_PROYEK]

---

## 1. [WAJIB] Deskripsi Bisnis & Industri

- **Industri**: B2B FinTech & Business Acceleration / SME Enablement
- **Model Bisnis**: 
  1. *Subscription/Mentoring Fee*: Biaya bulanan asistensi konsultan bisnis dan akses ke alat audit otomatis berbasis AI.
  2. *Success Fee / Deal Facilitation*: Persentase komisi keberhasilan saat UMKM yang telah terverifikasi berhasil mendapatkan pendanaan modal kerja atau ekuitas dari jaringan investor mitra.
- **Nilai Tambah Inti**: Menjembatani jurang (*trust deficit*) antara pelaku UMKM dengan investor profesional melalui verifikasi data bertahap dan pendampingan konsultan bersertifikat.

---

## 2. [WAJIB] Masalah Domain yang Diselesaikan

Dalam ekosistem pembiayaan konvensional di Indonesia:
- **Asimetri Informasi Tinggi**: Investor kesulitan memvalidasi apakah laporan omzet UMKM adalah angka nyata atau sekadar *vanity metrics*.
- **Tingginya Tingkat Kegagalan UMKM**: Lebih dari 60% UMKM gulung tikar dalam 3 tahun pertama karena kesalahan penentuan Harga Pokok Penjualan (HPP) dan pengelolaan modal kerja.
- **Biaya Konsultan Mahal**: Jasa konsultan manajemen ternama tidak terjangkau bagi usaha rintisan beromzet di bawah 500 juta per tahun.

**Solusi Beruang**:
Menyediakan infrastruktur digital di mana UMKM didampingi konsultan dengan alur kerja terstandar (*Action Plan*), audit anomali otomatis berbasis AI, dan ruang data terenkripsi (*Verified Data Room*) yang siap ditinjau investor.

---

## 3. [WAJIB] User Personas & Interaksi Multi-Role

```text
[ Pelaku UMKM ] ──( Unggah Data & Laporan )──> [ Business Consultant ]
                                                        │
                                                 ( Audit 5 Dimensi &
                                                   Verifikasi Tugas )
                                                        │
                                                        ▼
[ Investor Partner ] <──( Buka Akses Data Room )── [ Ready for Funding ]
```

1. **Pelaku UMKM (End-User / Mentee)**:
   - Pengusaha lokal yang ingin usahanya bertumbuh dan mendapatkan suntikan modal.
   - Perilaku: Menginginkan antarmuka yang ramah, tidak rumit oleh istilah akuntansi berbelit, dan menyukai tampilan *mobile-friendly*.
2. **Business Consultant (Auditor & Mentor)**:
   - Akuntan publik, konsultan manajemen, atau *business coach* bersertifikasi.
   - Perilaku: Memerlukan efisiensi kerja cepat (*batch review* tugas, perbandingan rasio keuangan, pembuatan catatan rekomendasi).
3. **Investor Partner (B2B Buyer / Capital Provider)**:
   - *Venture Capital*, *Angel Investor*, *Family Office*, atau lembaga P2P/Perbankan.
   - Perilaku: Sangat mengutamakan integritas data, transparansi histori perbaikan, dan kecepatan akses dokumen audit legalitas.

---

## 4. [WAJIB] Glosarium Domain (Glossary of Terms)

| Istilah | Definisi Teknis & Konteks Penggunaan |
|---|---|
| **HPP (Harga Pokok Penjualan)** | Total biaya langsung yang timbul dari proses produksi barang/jasa. Rasio HPP terhadap omzet idealnya terjaga di bawah ambang batas industri (misal: 40-50%). |
| **Radar Assessment (5 Dimensi)** | Evaluasi diagnostik kesehatan usaha mencakup: 1. Finansial, 2. HPP & Operasional, 3. Pemasaran, 4. SDM & Organisasi, 5. Legalitas Usaha. |
| **Funding Readiness Gate** | Gerbang validasi kelayakan bisnis sebelum UMKM diizinkan tampil di hadapan investor. Skor komposit harus mencapai minimal 75/100. |
| **Verified Business Journey** | Rekam jejak kronologis yang mencatat setiap perbaikan, penyelesaian tugas checklist, dan histori audit bulanan yang telah disetujui konsultan. |
| **Data Room** | Ruang penyimpanan digital berkas sensitif perusahaan (Akta Pendirian, Rekening Koran, Laporan Audit, Kontrak Kerja) dengan kontrol hak akses ketat. |
| **Anomaly Flagged** | Peringatan sistem otomatis saat terjadi deviasi keuangan tidak wajar (misal: lonjakan HPP > 10% dalam satu periode pelaporan). |
| **Letter of Intent (LOI)** | Dokumen formal minat awal investor untuk menjajaki investasi ke UMKM tertentu. |

---

## 5. [WAJIB] Kompetitor & Referensi Pasar

- **Mekari Jurnal / Zahir**: Kuat pada sistem akuntansi dan kasir buku besar, namun minim pendampingan konsultan bisnis langsung dan tidak terhubung ke *deal flow* investor.
- **Bina UMKM Pemerintah / Inkubator Kampus**: Memiliki program pelatihan, tetapi pencatatan data kemajuan masih menggunakan Google Forms dan PDF manual yang sulit diaudit.
- **KoinWorks / Modalku (P2P Lending)**: Fokus pada pinjaman hutang bunga berjalan tanpa membenahi fundamental inefisiensi operasional usaha terlebih dahulu.

---

## 6. [WAJIB] Batasan Bisnis yang Mempengaruhi Keputusan Teknis

1. **Kerahasiaan Data Finansial**:
   - Berkas keuangan di *Data Room* tidak boleh dapat diakses oleh publik atau investor sebelum UMKM memberikan persetujuan akses.
2. **Kepatuhan Privasi & Regulasi**:
   - Penyimpanan dokumen legalitas (KTP Direktur, NIB, NPWP) harus memenuhi prinsip pelindungan data pribadi (UU PDP Indonesia).
3. **Keterbatasan Perangkat Pengguna**:
   - Pelaku UMKM mayoritas mengakses platform melalui ponsel cerdas (*smartphone*) dengan koneksi internet bervariasi; antarmuka harus responsif, ringan, dan mendukung *offline-tolerant caching*.

---

## Cara Mengisi

Panduan pengisian nilai placeholder pada dokumen CONTEXT ini:

1. **`[NAMA_PROYEK]`**:
   - *Nilai yang diisi*: Nama produk resmi.
   - *Contoh*: `Beruang - B2B Business Mentoring & Capital Gateway`.

2. **Menyesuaikan Batasan & Model Bisnis**:
   - Jika di masa mendatang sistem menambahkan integrasi open finance (misal: API Perbankan / Brick / Finantier), perbarui bagian *Glosarium* dan *Batasan Teknis*.
