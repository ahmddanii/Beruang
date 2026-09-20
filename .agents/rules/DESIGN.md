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

```css
:root {
  --background: #F7F8F4;              /* Soft parchment warm-neutral canvas */
  --foreground: #111E19;              /* Obsidian Charcoal Green text */
  --card: #FFFFFF;                    /* Pure white card surface */
  --card-foreground: #111E19;
  --popover: #FFFFFF;
  --popover-foreground: #111E19;

  --primary: #173F35;                 /* Main brand & primary interactive triggers */
  --primary-foreground: #FFFFFF;
  --primary-hover: #204F43;

  --secondary: #E8F4B8;               /* Optimistic accent for metric highlights & active chips */
  --secondary-foreground: #173F35;
  --secondary-hover: #DCEDB0;

  --muted: #F0F2EB;                   /* Warm parchment for stratified panels */
  --muted-foreground: #617369;        /* Secondary label text */
  --border: #E2E8E4;                  /* 1px hairline border */
  --input: #E2E8E4;
  --ring: #173F35;

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

1. **Card (`@/components/ui/card`)**: `Card` → `CardHeader` (`CardTitle` + `CardDescription`) → `CardContent`. Surface `#FFFFFF` dengan `border 1px #E2E8E4`.
2. **Button (`@/components/ui/button`)**: `default` (`#173F35`), `secondary` (`#E8F4B8` teks `#173F35`), `outline` (`border-[#E2E8E4]`), `ghost`, `destructive`.
3. **Badge (`@/components/ui/badge`)**: `default`, `secondary`, `verified` (`#EBF5EE` + `#1F7A4D`), `warning` (`#FEF3C7`), `outline`.
4. **Tabs (`@/components/ui/tabs`)**: Segmented control berlatar `#F0F2EB`.
5. **Table (`@/components/ui/table`)**: Tabel ledger finansial berbaris zebra dengan angka rata kanan (`tabular-nums`).
6. **Progress (`@/components/ui/progress`)**: Track `#E2E8E4` dengan indikator `#173F35`.
7. **Dialog (`@/components/ui/dialog`)**: Modal dialog baku untuk formulir konfirmasi dan upload.
