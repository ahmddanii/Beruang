<!--
FILE INI UNTUK APA:
File panduan teknis (skill) ini digunakan oleh developer dan AI agent untuk menulis 
unit test dan integration test pada frontend Beruang menggunakan Vitest dan React Testing Library. 
Menjelaskan konfigurasi, template test komponen, template test hook, serta boundary apa saja yang wajib diuji.
-->

# Skill: Panduan Testing Frontend — [NAMA_PROYEK]

---

## 1. [WAJIB] Stack Testing & Setup Environment

- **Test Runner**: Vitest (cepat, kompatibel secara *native* dengan konfigurasi Vite).
- **DOM Simulator**: `jsdom` atau `happy-dom`.
- **Testing Utilities**: `@testing-library/react` dan `@testing-library/user-event`.
- **Assertions**: `chai` / `jest-dom` matchers (`@testing-library/jest-dom`).

### [OPSIONAL] Instalasi Dependensi Testing
Jika belum terpasang di `package.json`:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

---

## 2. [WAJIB] Apa yang Harus Di-test vs Tidak Perlu Di-test

### ✅ Wajib Di-test:
1. **Critical User Flows**:
   - Pengalihan role dashboard (UMKM, Konsultan, Investor).
   - Pengubahan status checklist Action Plan.
   - Pemicu deteksi anomali finansial saat HPP melebihi batas aman.
2. **Kalkulasi & Logika Finansial**:
   - Perhitungan rasio HPP: `(hpp / omzet) * 100`.
   - Perhitungan komposit skor Radar 5 Dimensi.
3. **Komponen Primitif Interaktif**:
   - `CapsuleButton`: Menjalankan handler `onClick`, menampilkan state `disabled`.
   - `ModalDialog`: Terbuka dan tertutup saat tombol diklik.

### ❌ Tidak Perlu Di-test:
1. Class Tailwind statis (jangan menguji apakah sebuah div memiliki class `p-4` atau `bg-white`).
2. Animasi visual Framer Motion secara piksel per piksel.
3. Library pihak ketiga yang sudah memiliki test internal (misal: icon Lucide).

---

## 3. [WAJIB] Template Unit Test untuk Komponen React

Simpan berkas pengujian berdampingan dengan komponen, misalnya: `src/components/ui/CapsuleButton.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CapsuleButton } from "./CapsuleButton";

describe("CapsuleButton Component", () => {
  it("merender teks tombol dengan benar", () => {
    render(<CapsuleButton>Mulai Verifikasi</CapsuleButton>);
    expect(screen.getByRole("button", { name: /mulai verifikasi/i })).toBeDefined();
  });

  it("memanggil fungsi onClick saat diklik oleh pengguna", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<CapsuleButton onClick={handleClick}>Kirim Laporan</CapsuleButton>);
    const button = screen.getByRole("button", { name: /kirim laporan/i });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("tidak memicu onClick saat status disabled aktif", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<CapsuleButton disabled onClick={handleClick}>Terkunci</CapsuleButton>);
    const button = screen.getByRole("button", { name: /terkunci/i });

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

---

## 4. [WAJIB] Template Test untuk Custom Hook / Logika Bisnis

Contoh pengujian logika kalkulasi komposit skor radar di `src/hooks/useBusinessMetrics.test.ts`:

```typescript
import { describe, it, expect } from "vitest";

// Fungsi helper yang diuji
export function calculateHppRatio(omzet: number, hpp: number): number {
  if (omzet <= 0) return 0;
  return Math.round((hpp / omzet) * 100);
}

describe("Business Metrics Logic", () => {
  it("menghitung rasio HPP dengan akurat", () => {
    const omzet = 100000000;
    const hpp = 45000000;
    const ratio = calculateHppRatio(omzet, hpp);

    expect(ratio).toBe(45);
  });

  it("mengembalikan 0 jika omzet nol atau negatif untuk mencegah pembagian dengan nol", () => {
    expect(calculateHppRatio(0, 5000000)).toBe(0);
  });
});
```

---

## 5. [WAJIB] Perintah Menjalankan Test

Tambahkan skrip di `package.json`:
```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

Jalankan pengujian di terminal:
```bash
npm run test:run
```

---

## Cara Mengisi

Panduan pengisian nilai placeholder pada skill ini:

1. **`[NAMA_PROYEK]`**:
   - *Nilai yang diisi*: Nama sistem proyek.
   - *Contoh*: `Beruang Frontend Testing Guide`.

2. **Membuat File Test Baru**:
   - Beri akhiran `.test.tsx` atau `.test.ts` pada nama file dan simpan di direktori yang sama dengan kode sumber.
