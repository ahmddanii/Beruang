<!--
FILE INI UNTUK APA:
File panduan teknis (skill) ini digunakan oleh developer dan AI agent untuk mengintegrasikan 
frontend dengan RESTful API backend, mencakup struktur service layer, header otentikasi JWT, 
custom fetch hook, penanganan loading/error/empty state, dan caching data.
-->

# Skill: Panduan Integrasi API & Data Fetching — [NAMA_PROYEK]

---

## 1. [WAJIB] Arsitektur API Layer

Integrasi API di frontend Beruang diisolasi dalam folder `src/services/`:
```text
src/services/
├── api.ts              # HTTP client base, interceptors, dan error handling
├── businessService.ts  # Endpoint data audit, assessment, dan action plans
└── mockData.ts         # Mock response untuk pengembangan offline / demo
```

---

## 2. [WAJIB] Setup HTTP Client & Otentikasi Header

File `src/services/api.ts` bertugas menyisipkan token JWT secara otomatis:

```typescript
// src/services/api.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.beruang.example.com/v1";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("beruang_auth_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "Terjadi kesalahan pada server";
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.message || errorMessage;
    } catch {
      // Abaikan jika respons bukan JSON
    }
    throw new ApiError(errorMessage, response.status);
  }

  return response.json();
}
```

---

## 3. [WAJIB] Template Custom Hook untuk Data Fetching

Gunakan custom hook berbasis React untuk mempermudah konsumsi data pada komponen:

```typescript
// src/hooks/useFetch.ts
import { useState, useEffect, useCallback } from "react";
import { apiClient, ApiError } from "@/services/api";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(endpoint: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiClient<T>(endpoint);
      setData(result);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Gagal memuat data dari jaringan.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
```

---

## 4. [WAJIB] Penanganan Loading, Error, dan Empty State

Pada komponen antarmuka, selalu tangani keempat kondisi data secara eksplisit:

```tsx
import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { BentoCard } from "@/components/ui/BentoCard";
import { CapsuleButton } from "@/components/ui/CapsuleButton";
import { AlertPillBanner } from "@/components/ui/AlertPillBanner";
import { Loader2, Inbox, RefreshCw } from "lucide-react";
import { ActionPlanTask } from "@/types";

export const TaskListSection: React.FC = () => {
  const { data: tasks, isLoading, error, refetch } = useFetch<ActionPlanTask[]>("/tasks");

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <p className="text-sm text-gray-500">Memuat daftar tugas perbaikan...</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="space-y-4">
        <AlertPillBanner type="danger" message={error} />
        <CapsuleButton variant="secondary" onClick={refetch}>
          <RefreshCw className="w-4 h-4 mr-2" /> Coba Muat Ulang
        </CapsuleButton>
      </div>
    );
  }

  // 3. Empty State
  if (!tasks || tasks.length === 0) {
    return (
      <BentoCard className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400 mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <h4 className="text-base font-semibold text-gray-900">Belum Ada Tugas Perbaikan</h4>
        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
          Konsultan belum menetapkan rencana aksi untuk periode ini.
        </p>
      </BentoCard>
    );
  }

  // 4. Success State
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 rounded-2xl bg-white border border-black/5 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">{task.title}</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600">{task.priority}</span>
        </div>
      ))}
    </div>
  );
};
```

---

## 5. [OPSIONAL] Integrasi TanStack Query v5 (React Query)

Jika proyek bertambah besar dan membutuhkan caching multi-page otomatis:
1. Pasang paket: `npm install @tanstack/react-query`
2. Bungkus aplikasi di `main.tsx` dengan `QueryClientProvider`.
3. Gunakan `useQuery({ queryKey: ['tasks'], queryFn: () => apiClient('/tasks') })`.

---

## Cara Mengisi

Panduan pengisian nilai placeholder pada skill ini:

1. **`[NAMA_PROYEK]`**:
   - *Nilai yang diisi*: Nama sistem proyek.
   - *Contoh*: `Beruang API Integration Guide`.

2. **Menyesuaikan Base URL**:
   - Isi file `.env` dengan variabel `VITE_API_BASE_URL` mengarah ke server backend Anda.
