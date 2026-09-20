<!--
FILE INI UNTUK APA:
File panduan teknis (skill) ini digunakan oleh developer dan AI agent untuk menerapkan 
aturan styling Tailwind CSS v4, helper cn(), integrasi komponen shadcn/ui, implementasi 
token Tactile Neo-Minimalism, serta perbandingan pattern styling yang benar vs salah.
-->

# Skill: Panduan Styling Tailwind CSS & shadcn/ui — [NAMA_PROYEK]

---

## 1. [WAJIB] Penggunaan Helper `cn()` Secara Konsisten

Jangan pernah menggabungkan string class secara manual dengan template literal (` `${classA} ${classB}` `) jika ada class yang berpotensi bentrok (misal `p-4` vs `p-6`). Selalu gunakan helper `cn()` yang memanfaatkan `clsx` dan `tailwind-merge`.

```tsx
import { cn } from "@/lib/utils";

// BENAR:
export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("rounded-3xl bg-white p-6 border border-black/5 shadow-sm", className)}>
    {children}
  </div>
);

// SALAH (Berpotensi duplikasi class dan CSS konflik):
export const BadCard = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`rounded-3xl bg-white p-6 ${className}`}>
    {children}
  </div>
);
```

---

## 2. [WAJIB] Penggunaan Token Tema Tactile Neo-Minimalism

Selalu gunakan kelas token yang konsisten dengan estetika produk:

| Elemen | Kelas Tailwind yang Direkomendasikan | Kelas yang DILARANG / Dihindari |
|---|---|---|
| **App Canvas** | `bg-[#F4F6F9]` | `bg-white`, `bg-gray-100` |
| **Bento Tile** | `rounded-3xl bg-white p-6 border border-black/5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]` | `rounded-none`, `border-2 border-black` |
| **Primary Action** | `rounded-full bg-[#18191E] text-white hover:bg-black px-5 py-2.5` | `rounded-md bg-blue-500 hover:bg-blue-600` |
| **Accent Action** | `rounded-full bg-[#2563EB] text-white hover:bg-blue-700 px-5 py-2.5` | `rounded-none bg-indigo-600` |
| **Navigation Dock**| `rounded-full bg-[#18191E]/95 backdrop-blur-md text-white p-1.5 shadow-2xl` | `fixed bottom-0 w-full bg-white border-t` |

---

## 3. [WAJIB] Cara Mengkustomisasi Komponen shadcn / Base UI

Komponen primitif dapat dikustomisasi dengan meneruskan class Tailwind baru melalui prop `className`:

```tsx
// Mengubah ukuran dan warna badge secara instan menggunakan cn()
<CapsuleBadge variant="verified" className="text-sm px-4 py-1 font-bold">
  Terverifikasi OJK
</CapsuleBadge>
```

Jika mengubah style dasar komponen, edit langsung pada berkas komponen di `src/components/ui/` dan pertahankan varian bawaannya.

---

## 4. [WAJIB] Dark Mode Approach

Aplikasi ini menggunakan pendekatan CSS Custom Properties berbasis token yang didefinisikan pada `src/index.css`:
```css
:root {
  --canvas: #F4F6F9;
  --surface-card: #FFFFFF;
  --text-primary: #111827;
}

[data-theme="dark"], .dark {
  --canvas: #0E1015;
  --surface-card: #181A20;
  --text-primary: #F9FAFB;
}
```
Ketika mengaktifkan dark mode, gunakan utility `dark:` pada class Tailwind jika diperlukan secara spesifik:
```tsx
<div className="bg-white dark:bg-[#181A20] text-gray-900 dark:text-gray-100">
  Konten Adaptif
</div>
```

---

## 5. [WAJIB] Contoh Pattern Styling: Benar vs Salah

### Kasus A: Penataan Typography
```tsx
// BENAR: Hirarki jelas, tracking tight, leading nyaman
<h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight">
  Kelayakan Finansial UMKM
</h1>
<p className="text-sm text-gray-500 mt-1 leading-relaxed">
  Ringkasan hasil audit 5 dimensi oleh konsultan.
</p>

// SALAH: Tanpa penyesuaian tracking, warna terlalu pekat/terlalu pudar
<h1 className="text-3xl font-normal text-black">
  Kelayakan Finansial UMKM
</h1>
<p className="text-xs text-gray-300">
  Ringkasan hasil audit...
</p>
```

### Kasus B: Action Button & Interactive State
```tsx
// BENAR: Menggunakan sudut kapsul membulat, transisi halus, dan tactile feedback
<button className="rounded-full px-6 py-2.5 bg-[#18191E] text-white text-sm font-medium transition-all hover:bg-black active:scale-95 shadow-sm">
  Mulai Konsultasi
</button>

// SALAH: Tombol kaku kotak tanpa visual state yang menyenangkan
<button className="bg-black text-white p-2">
  Mulai Konsultasi
</button>
```

---

## Cara Mengisi

Panduan pengisian nilai placeholder pada skill ini:

1. **`[NAMA_PROYEK]`**:
   - *Nilai yang diisi*: Nama sistem proyek.
   - *Contoh*: `Beruang Frontend Skills`.

2. **Menambahkan Token Baru**:
   - Tambahkan variabel hex di `src/index.css`, lalu daftarkan dokumentasinya di tabel section 2 dokumen ini.
