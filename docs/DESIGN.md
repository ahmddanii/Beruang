# DESIGN.md — Beruang (Ber-Uang) Design System
## Powered by Google Stitch & shadcn/ui

Dokumen ini adalah single source of truth (SSOT) untuk seluruh arsitektur UI/UX platform **Beruang (Ber-Uang)**.
Sistem desain ini disinkronkan langsung dari Google Stitch Project `projects/9051643215289631919` (**Beruang MSME Capital & Growth**) dan ditenagai oleh pustaka komponen resmi **shadcn/ui**.

---

## 1. DESIGN PHILOSOPHY & ATMOSPHERE

Beruang adalah platform B2B financial telemetry dan kesiapan pendanaan UMKM.
- **Visual Style:** *Modern Fintech Minimalism with Subtle Editorial Craft*.
- **Tone:** Grounded, authoritative, optimistic, and transparent. Menghindari motif crypto neon murahan atau kartu bertumpuk kaku, mengutamakan stabilitas modal jangka panjang dan kepercayaan institusional.
- **Visual Mechanics:** Kanvas off-white luas, aksen hijau botani tua (*Deep Botanical Forest Green*), aksen energi limau lembut (*Soft Energetic Lime*), garis hairline presisi 1px, dan ruang bernapas (*whitespace*) yang lapang.

---

## 2. COLOR PALETTE & DESIGN TOKENS

### 2.1 Color Variables & shadcn Mapping

```css
:root {
  /* Canvas & Surfaces */
  --background: #F7F8F4;              /* Soft parchment warm-neutral canvas */
  --foreground: #111E19;              /* Obsidian Charcoal Green text */
  --card: #FFFFFF;                    /* Pure white card surface */
  --card-foreground: #111E19;
  --popover: #FFFFFF;
  --popover-foreground: #111E19;

  /* Primary Brand: Deep Botanical Forest Green */
  --primary: #173F35;                 /* Main brand & primary interactive triggers */
  --primary-foreground: #FFFFFF;
  --primary-hover: #204F43;

  /* Secondary Accent: Soft Energetic Lime */
  --secondary: #E8F4B8;               /* Optimistic accent for metric highlights & active chips */
  --secondary-foreground: #173F35;
  --secondary-hover: #DCEDB0;

  /* Neutral & Structure */
  --muted: #F0F2EB;                   /* Warm parchment for stratified panels */
  --muted-foreground: #617369;        /* Secondary label text */
  --border: #E2E8E4;                  /* 1px hairline border */
  --input: #E2E8E4;
  --ring: #173F35;

  /* Semantic Status */
  --success: #1F7A4D;                 /* Growth green / verified tags */
  --success-bg: #EBF5EE;
  --warning: #D97706;                 /* Attention required */
  --warning-bg: #FEF3C7;
  --destructive: #DC2626;             /* Deficit / danger */
  --destructive-bg: #FEE2E2;

  --radius: 1rem;                     /* 16px default border radius */
}
```

---

## 3. COMPONENT DISCIPLINE (SHADCN/UI PRIMITIVES)

Seluruh komponen UI wajib memanfaatkan pustaka resmi `shadcn/ui` tanpa membuat div ad-hoc:

1. **Card (`@/components/ui/card`)**:
   - Digunakan untuk membungkus section data analitik.
   - Komposisi: `Card` → `CardHeader` (`CardTitle` + `CardDescription`) → `CardContent` → `CardFooter`.
   - Permukaan `#FFFFFF` dengan garis tepi 1px `#E2E8E4` dan sudut `rounded-2xl` (16px).
2. **Button (`@/components/ui/button`)**:
   - `default`: Solid `#173F35` teks putih (primary CTA).
   - `secondary`: Soft lime `#E8F4B8` teks `#173F35` (secondary high-intent CTA).
   - `outline`: Border 1px `#E2E8E4` background putih hover `#F0F2EB`.
   - `ghost`: Transparan untuk aksi utilitas.
   - `destructive`: Soft red container `#FEE2E2` dengan teks `#DC2626`.
3. **Badge (`@/components/ui/badge`)**:
   - `default`: `#173F35` teks putih.
   - `secondary`: `#E8F4B8` teks `#173F35`.
   - `verified`: `#EBF5EE` teks `#1F7A4D` border `#1F7A4D`/20 dengan dot hijau.
   - `warning`: `#FEF3C7` teks `#D97706`.
   - `outline`: Border 1px `#E2E8E4` teks `#617369`.
4. **Tabs (`@/components/ui/tabs`)**:
   - Segmented control berlatar `#F0F2EB` dengan tab aktif berlatar `#FFFFFF` dan bayangan lembut.
5. **Table (`@/components/ui/table`)**:
   - Tabel ledger finansial bulanan dengan baris bergantian (*alternating rows*) dan kolom numerik rata kanan (*tabular-nums*).
6. **Progress (`@/components/ui/progress`)**:
   - Track `#E2E8E4` dengan indikator isi `#173F35` atau `#1F7A4D`.
7. **Dialog (`@/components/ui/dialog`)**:
   - Modal konfirmasi input omzet, upload bukti, dan permintaan akses data room.

---

## 4. TYPOGRAPHY & NUMERICAL ALIGNMENT

- **Font Family**: `Inter` / `Plus Jakarta Sans` / `Poppins` sans-serif.
- **Financial Figures (Tabular Numerals - MANDATORY)**:
  Semua nominal mata uang (`Rp`), persentase, saldo, dan tabel keuangan WAJIB menerapkan:
  `font-variant-numeric: tabular-nums lining-nums` (`tabular-nums`).

---

## 5. ANTI-PATTERNS (BANNED AI CLICHÉS)

- **DILARANG** menampilkan mockup bingkai ponsel buatan (fake phone frame) di desktop.
- **DILARANG** menggunakan warna gradien neon ungu/biru yang mencolok (*no AI neon slop*).
- **DILARANG** menggunakan hitam pekat sintetis `#000000`; gunakan `#111E19` (*Obsidian Charcoal*).
- **DILARANG** membuat kartu di dalam kartu bertingkat 3 lapis (*no triple nested cards*).
