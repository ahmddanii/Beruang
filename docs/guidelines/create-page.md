<!--
FILE INI UNTUK APA:
File panduan teknis (skill) ini digunakan oleh developer dan AI agent untuk membuat 
halaman/view baru pada aplikasi Beruang, menghubungkannya ke layout, sistem autentikasi, 
state global/API, dan mendaftarkannya pada routing aplikasi.
-->

# Skill: Panduan Membuat Halaman / View Baru — [NAMA_PROYEK]

---

## 1. [WAJIB] Lokasi & Konvensi Halaman

Semua halaman antarmuka diletakkan di direktori `src/views/`:
- `src/views/auth/` -> Halaman autentikasi (`LoginView.tsx`, `RegisterView.tsx`, `ForgotPasswordView.tsx`).
- `src/views/dashboard/` -> Halaman dashboard utama dan subsistem role:
  - `src/views/dashboard/umkm/` -> Halaman spesifik peran UMKM.
  - `src/views/dashboard/konsultan/` -> Halaman spesifik peran Business Consultant.
  - `src/views/dashboard/investor/` -> Halaman spesifik peran Investor.

---

## 2. [WAJIB] Template Struktur Halaman Baru

Berikut adalah template standar halaman view lengkap dengan loading, error state, dan integrasi context:

```tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { BentoCard } from "@/components/ui/BentoCard";
import { CapsuleButton } from "@/components/ui/CapsuleButton";
import { AlertPillBanner } from "@/components/ui/AlertPillBanner";
import { Loader2, Plus, ArrowUpRight } from "lucide-react";

export interface DataRoomViewProps {
  onBack?: () => void;
}

export const DataRoomView: React.FC<DataRoomViewProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { dataRoomDocs } = useApp();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm text-gray-500 font-medium">Memuat berkas Data Room...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Verified Data Room</h1>
          <p className="text-sm text-gray-500">
            Arsip dokumen legalitas dan finansial terenkripsi untuk kebutuhan audit investor.
          </p>
        </div>
        <CapsuleButton variant="primary" onClick={() => alert("Upload dialog...")}>
          <Plus className="w-4 h-4 mr-1.5" /> Unggah Berkas Baru
        </CapsuleButton>
      </div>

      {error && <AlertPillBanner type="danger" message={error} />}

      {/* Grid Konten Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dataRoomDocs.map((doc) => (
          <BentoCard key={doc.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  {doc.category}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm mt-3">{doc.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{doc.size} • Terverifikasi {doc.verifiedAt}</p>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </BentoCard>
        ))}
      </div>
    </div>
  );
};
```

---

## 3. [WAJIB] Cara Mendaftarkan Halaman ke Navigasi & Router

Aplikasi menggunakan controller tampilan terpusat di `src/views/dashboard/RoleDashboard.tsx`:
1. Tambahkan ID tab baru pada tipe navigasi, misalnya:
   ```typescript
   type TabId = "overview" | "action-plan" | "data-room" | "diagnostic";
   ```
2. Daftarkan label dan icon pada array `tabItems`:
   ```typescript
   { id: "data-room", label: "Data Room", icon: FolderCheck }
   ```
3. Tambahkan kondisi render pada switch case atau conditional rendering di `RoleDashboard`:
   ```tsx
   {activeTab === "data-room" && <DataRoomView />}
   ```

---

## 4. [WAJIB] Layout Wrapper Standar

Setiap halaman otomatis berada di dalam layout global `App.tsx` yang membungkus:
- `AuthProvider`: Menyediakan session & user.
- `AppProvider`: Menyediakan business domain data.
- Kanvas background: `bg-[#F4F6F9] min-h-screen`.
- Floating dock `TabBar`: Navigasi kapsul bawah dengan animasi halus.

---

## Cara Mengisi

Panduan pengisian nilai placeholder pada skill ini:

1. **`[NAMA_PROYEK]`**:
   - *Nilai yang diisi*: Nama sistem proyek.
   - *Contoh*: `Beruang Frontend Skills`.

2. **Menambahkan Halaman Baru**:
   - Tentukan role pengguna yang berhak mengakses halaman tersebut.
   - Buat file view di folder role yang sesuai (`views/dashboard/[role]/[NamaView].tsx`).
