<!--
FILE INI UNTUK APA:
File panduan teknis (skill) ini digunakan oleh developer dan AI agent untuk membuat 
komponen React baru yang memenuhi standar Tactile Neo-Minimalism, typed props TypeScript, 
penggunaan helper cn(), dan integrasi styling shadcn / Base UI.
-->

# Skill: Panduan Membuat Komponen React Baru — [NAMA_PROYEK]

---

## 1. [WAJIB] Aturan & Lokasi File

| Kategori Komponen | Direktori | Contoh Komponen |
|---|---|---|
| **Primitif / Reusable UI** | `src/components/ui/` | `BentoCard.tsx`, `CapsuleButton.tsx`, `InputField.tsx` |
| **Visualisasi / Chart** | `src/components/charts/` | `RadarAssessmentChart.tsx`, `MonthlyCashTrend.tsx` |
| **Feature Domain / Wizard** | `src/components/onboarding/` | `BusinessDiagnosticWizard.tsx`, `StepIndicator.tsx` |

**[WAJIB] Aturan Penamaan**:
- Nama file wajib `PascalCase.tsx`.
- Nama fungsi komponen wajib sama persis dengan nama file.
- Interface props wajib diberi nama `[NamaKomponen]Props`.

---

## 2. [WAJIB] Template Standar Komponen React

Setiap komponen baru wajib mengikuti struktur dasar berikut:

```tsx
import React from "react";
import { cn } from "@/lib/utils";

export interface BentoTileProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: "mint" | "coral" | "yellow" | "blue";
  children?: React.ReactNode;
}

export const BentoTile: React.FC<BentoTileProps> = ({
  title,
  subtitle,
  badgeText,
  badgeVariant = "blue",
  children,
  className,
  ...props
}) => {
  const badgeStyles = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    mint: "bg-teal-50 text-teal-600 border-teal-200",
    coral: "bg-orange-50 text-orange-600 border-orange-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-6 border border-black/5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {badgeText && (
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-medium border",
              badgeStyles[badgeVariant]
            )}
          >
            {badgeText}
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};
```

---

## 3. [WAJIB] Cara Menggunakan shadcn / Base UI sebagai Base

Jika membuat komponen interaktif seperti Dialog, Popover, atau Select:
1. Manfaatkan primitive headless dari `@base-ui/react` yang sudah terpasang.
2. Bungkus (*wrap*) dengan styling Bento & Tactile pill melalui `cn()`.
3. Contoh:

```tsx
import React from "react";
import { Dialog } from "@base-ui/react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ModalBox: React.FC<ModalBoxProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-black/5 relative">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
};
```

---

## 4. [OPSIONAL] Integrasi Micro-Interactions dengan Framer Motion

Untuk elemen yang memerlukan interaksi hover atau gesture halus:
```tsx
import { motion } from "framer-motion";

export const InteractiveCapsule = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="rounded-full px-5 py-2.5 bg-[#18191E] text-white text-sm font-medium shadow-sm hover:bg-black transition-colors"
  >
    {label}
  </motion.button>
);
```

---

## Cara Mengisi

Panduan pengisian nilai placeholder pada skill ini:

1. **`[NAMA_PROYEK]`**:
   - *Nilai yang diisi*: Nama proyek sistem.
   - *Contoh*: `Beruang Frontend Skills`.

2. **Menambahkan Komponen Baru**:
   - Salin template di Section 2, ganti nama interface dan fungsi ke komponen yang dituju (misal: `StatMetricCard.tsx`).
