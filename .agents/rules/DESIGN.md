# DESIGN.md — Beruang (Ber-Uang) Desktop Design System
## 60-30-10 Blue & Green Architecture (GoPay Tactile Edition)

Dokumen ini adalah Single Source of Truth (SSOT) untuk seluruh arsitektur UI/UX platform **Beruang (Ber-Uang)**. Sistem desain ini mengadopsi standar visual antarmuka fintech modern bereputasi tinggi (terinspirasi dari ekosistem GoPay) dengan prinsip **60% Dominan Biru Kanvas, 30% Hijau Pertumbuhan, dan 10% Aksen Taktil & 3D**.

---

## 1. CREATIVE THESIS & ATMOSPHERE

Beruang adalah ruang kerja finansial B2B dan telemetri kesiapan pendanaan UMKM.
- **Visual Personality:** *Warm, Optimistic, Trustworthy, Tactile, & Action-Driven Desktop Fintech*.
- **Tone & Copywriting:** Mematuhi penuh standar `copywriter-beruang` — B2B kredibel, ramah UMKM, bebas jargon rumit (larang: Omzet/HPP/Laba/Audit/Real-time), dan berstandar institusi investor.
- **Ergonomi & Skala Proporsional:** Hirarki visual lapang, pembagian data bento berdampingan (*side-by-side*), teks judul tegas dan nyaman dibaca, angka moneter besar dengan `tabular-nums`, serta tombol taktil yang memberi umpan balik fisik yang nyata.

---

## 2. COLOR ARCHITECTURE: 60 - 30 - 10 RULE

### A. 60% Dominan: Biru Terpercaya (Trust & Structural Canvas)
Digunakan secara konsisten sebagai kanvas ruang dasar, pembungkus layout desktop, header kontekstual, dan identitas utama:
- **Canvas Desktop (Light):** `#F3F8FC` (Ice Blue Tint yang bersih, lembut, dan nyaman di mata).
- **Canvas Desktop (Dark):** `#0C121D` (Deep Navy Dark Surface).
- **Tactile Card Base Surface:** `#F6F8FA` (Light) / `#13161F` (Dark) dengan hairline border `#E2E8F0` / dark `rgba(255,255,255,0.08)`.
- **Card Header Blue Banner:** Gradasi teal-blue khas Beruang (`#50AABF` → `#2091AA`, dark `#1D6F80` → `#114F5D`) untuk label kategori kartu finansial utama.
- **Brand Wordmark:** `Ber` warna `#0081A0` (dark `#00A5CC`), `uang` warna `#00AA13` (dark `#22C55E`).

### B. 30% Sekunder: Hijau Pertumbuhan (Growth, Health & Verified Engine)
Digunakan untuk struktur pendukung, indikator kesehatan kas, metrik untung bersih, status validasi, dan aksen navigasi:
- **Fresh Growth Green:** `#00AA13` / `#00A62A` (Indikator pertumbuhan, delta positif MoM `+12%`, untung bersih).
- **Sage-Mint Pill Gradient (`.btn-pill-action`):** Latar pil lembut (`#F6FBF7` → `#ECF8EF` → `#D6F1DF`), border `#A6D9B7`, teks & ikon hitam solid.
- **Verified Rosette Badge:** Rosette hijau khas GoPay dengan gradasi `#00C058` → `#00A62A` → `#007D13` dengan ikon centang putih, ditempatkan di avatar UMKM berlisensi OSS RBA.
- **Pill Badges & Tags:** Badge hijau pekat *"Baru"*, lencana *"Terverifikasi OSS / Pendamping"*, tag status *"Untung Bersih"*.

### C. 10% Aksen Interaktif: Tombol Taktil & 3D (High-Impact Triggers)
Khusus dicadangkan untuk elemen aksi kritis yang menggerakkan konversi dan interaksi pengguna:
- **3D Blue Button (`.btn-3d-blue`):** Tombol aksi utama (misal: "Catat Kas", "Simpan Perubahan").
  - Gradasi: `#1A8EFF` → `#0066D6`
  - Inner highlight atas: `inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45)`
  - Rim shadow bawah: `inset 0 -2.5px 2px 0 rgba(0, 0, 0, 0.22)`
  - Active state: `translate-y-[2px]` dengan bayangan memadat.
- **3D Green Button (`.btn-3d-green`):** Tombol validasi kesiapan dan pengajuan modal (misal: "Perkuat Kesiapan", "Rayakan Kelulusan").
  - Gradasi: `#00C853` → `#009624`
- **Gradient Pill (`.btn-pill-gradient`):** Tombol filter/pilihan dengan gradasi putih-abu taktil (`#FFFFFF` → `#EBF0F5`).
- **Segmented Pill Switcher (`.segmented-pill-container`):** Wadah pil abu-abu luar (`#E2E5EA`) dengan pil indikator aktif mengambang (`#FFFFFF`) beranimasi GSAP (`back.out(1.5)`).

---

## 3. ANATOMI KARTU & KOMPONEN TAKTIL

### A. Kartu Taktil Dasar (`.card-tactile-gopay`)
```css
.card-tactile-gopay {
  background-color: #F6F8FA !important;
  border: 1px solid #E2E8F0 !important;
  box-shadow: 
    0 4px 20px -2px rgba(15, 23, 42, 0.04),
    0 2px 6px -1px rgba(15, 23, 42, 0.02),
    inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.45) !important;
  border-radius: 1rem; /* 16px */
}
```

### B. Kartu Metrik Dual-Layer (`.card-tactile-gopay.has-blue-banner`)
1. **Bagian Atas (Blue Banner):** Banner teal-blue bergradasi penuh dengan ikon putih dan teks kategori uppercase (`text-xs sm:text-sm font-poppins font-semibold text-white`).
2. **Bagian Bawah (Tactile Body):** Container melengkung di atas (`rounded-t-2xl bg-[#F6F8FA]`) menampung nominal angka besar (`text-2xl sm:text-[28px] lg:text-3xl font-bold tabular-nums`), subteks periode, dan tombol `.btn-pill-action`.

### C. Tombol Pil Aksi (`.btn-pill-action`)
- **Tinggi:** Tepat `2.375rem` (38px), bentuk kapsul (`rounded-full`).
- **Warna:** Gradasi mint-sage (`#F6FBF7` -> `#D6F1DF`), border `#A6D9B7`, teks dan ikon SVG **berwarna hitam solid** (`#000000`).
- **Interaksi:** Hover memunculkan inner highlight putih lembut (`inset 0 0 10px 2px rgba(255,255,255,0.85)`), ikon panah bergeser halus `translate-x-0.5`. Tanpa zoom container luar.

---

## 4. STANDAR COPYWRITING RESMI (BERUANG PLAYBOOK)

| Konteks | Dilarang Keras ⛔ | Wajib Digunakan ✅ |
|---|---|---|
| Pendapatan Toko | Omzet, Penjualan Kotor, GMV | **Total Pendapatan** |
| Biaya Bahan Baku | HPP, COGS, Beban Pokok | **Modal Jualan** |
| Biaya Operasional | Opex, Beban Usaha, Overhead | **Biaya Operasional** |
| Profit Akhir | Laba Bersih, Net Profit, Cuan | **Untung Bersih** |
| Arus Uang | Cash Flow, Arus Kas | **Pergerakan Uang Toko** |
| Pemeriksaan Finansial | Audit, Sidak Keuangan | **Status Validasi / Cek Kesehatan** |
| Pembiayaan Eksternal | Pinjol, Utang, Cari Funder | **Akses Modal Kemitraan** |
| Waktu Pembaharuan | Real-time, Instan | **Tersinkronisasi Otomatis** |
| Konsultan | Auditor BNSP (terlalu kaku) | **Konsultan Pendamping Toko** |

---

## 5. TIPOGRAFI & ERGONOMI

- **Font Family Tunggal:** **`Poppins`** di seluruh elemen antarmuka (Heading, Body, Button, Badge).
- **Universal Letter Spacing:** `letter-spacing: normal !important;` (menghapus tracking rapat default Tailwind yang membuat teks sempit).
- **Tabular Nums:** Seluruh nominal mata uang Rupiah dan angka metrik wajib memakai kelas `tabular-nums` agar sejajar secara vertikal.
- **Skala Ukuran Teks:**
  - H1 Page Title: `24px - 36px` (`font-bold`)
  - Section Title: `20px - 24px` (`font-bold`)
  - Subtitle / Eyebrow: `10px - 12px` (`font-semibold uppercase tracking-wider`)
  - Large Metric Numbers: `24px - 32px` (`font-bold tabular-nums`)
  - Body Text: `14px - 16px` (`leading-relaxed text-neutral-600 dark:text-neutral-300`)
  - Caption / Metadata: `11px - 13px` (`font-medium text-neutral-500`)
