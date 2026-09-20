# 📱 PWA Design Rules & Standards

Pedoman desain Progressive Web App (PWA) resmi untuk **Beruang / INSEVENT**. Aturan ini wajib dipatuhi dalam setiap komponen UI, layout responsif, form, dan interaksi aplikasi.

---

## 1. Touch Target (Area Sentuh)
*   **Ukuran Minimum**: `48×48px` (Standar Google Material Design 3 & Apple Human Interface Guidelines).
*   **Padding Internal**: Minimal `12px` vertikal, `16px` horizontal pada tombol dan elemen interaktif.
*   **Jarak Antar Elemen (Gutter)**: Minimal `8px` untuk mencegah salah ketuk (*mis-tap*).
*   **Floating Action Button (FAB)**: Ukuran standar `56×56px`.

---

## 2. Button Hierarchy & Specifications

| Tipe Button | Tinggi | Border Radius | Padding Horizontal | Min Width (Label Teks) |
| :--- | :---: | :---: | :---: | :---: |
| **Primary** | `48px` | `8–12px` atau Capsule `9999px` | `24px` (`px-6`) | `≥ 120px` |
| **Secondary** | `44px` | `8–12px` atau Capsule `9999px` | `20px` (`px-5`) | `≥ 100px` |
| **Icon Button** | `48×48px` | `50%` (Lingkaran sempurna) | — | — |
| **Small Button** | `36px` | `6–8px` atau Capsule `9999px` | `16px` (`px-4`) | `≥ 80px` |

### Aturan Tambahan Button:
*   Hindari tombol berlabel teks dengan lebar `< 120px` pada tombol utama.
*   **Satu Primary Action**: Hanya ada 1 aksi primer dominan per layar/viewport.
*   **State Lengkap**: Wajib memiliki state Default, Hover, Active/Pressed (`scale(0.96)`), Disabled, dan Loading.

---

## 3. Tipografi & Hierarki Teks

| Elemen | Ukuran | Weight | Line Height | Tracking |
| :--- | :---: | :---: | :---: | :---: |
| **Heading H1** | `24–32px` | Bold (700 / 800) | `1.2` | `-0.03em` |
| **Heading H2** | `20–24px` | SemiBold (600) | `1.3` | `-0.02em` |
| **Body Text** | `16px` | Regular (400) | `1.5` | `normal` |
| **Caption / Label** | `12–14px` | Medium (500) | `1.4` | `normal` |
| **Button Label** | `14–16px` | Medium / SemiBold (500–600) | `1.0` | `-0.01em` |

*   ⛔ **Dilarang keras memakai ukuran font `< 12px`** karena tidak terbaca di layar smartphone resolusi tinggi.
*   Maksimal **2 font family** dalam aplikasi (`Satoshi` sebagai primer).
*   **Kontras Teks (WCAG AA)**: Minimal `4.5:1` untuk teks normal (<18px), dan `3:1` untuk teks besar (≥18px bold / 24px regular).

---

## 4. Spacing & Layout
*   **8px Grid System**: Semua nilai `margin`, `padding`, dan `gap` wajib merupakan kelipatan 8 (`8px`, `16px`, `24px`, `32px`, `40px`, dst.).
*   **Safe Area Insets**: Selalu gunakan `padding-bottom: env(safe-area-inset-bottom, 16px)` dan `padding-top: env(safe-area-inset-top, 16px)` untuk menghindari gesture bar iPhone dan notch.
*   **Konten Utama Tidak Tertutup**: Kontainer konten utama wajib memiliki `padding-bottom` (misalnya `pb-32`) agar tidak tertimpa oleh floating navigation dock.
*   **Lebar Maksimal Mobile**: `max-w-[480px]` untuk pengalaman mobile native yang terpusat (*centered*) saat dibuka di tablet atau desktop.

---

## 5. Navigasi Mobile-First
*   **Bottom Navigation Bar**: Tinggi `56–64px`, maksimal `5 item` (saat ini 4 item: Beranda, Tugas, Progres, Data).
*   **Icon Ukuran**: `24×24px`.
*   **Label Navigasi**: `10–12px` font bold.
*   **Sticky Bottom**: Selalu gunakan fixed/sticky bottom navigation dock ketimbang hamburger menu tersembunyi.

---

## 6. Form & Input Fields
*   **Tinggi Input**: Minimal `48px` (`py-3.5 px-4`).
*   **Font Size Input**: **Wajib minimal 16px (`text-[16px]` / `text-base`)** — di bawah 16px, iOS Safari akan otomatis melakukan auto-zoom yang merusak layout viewport PWA.
*   **Label Eksplisit**: Label selalu terletak di atas field (`htmlFor`), bukan hanya sebagai placeholder yang hilang saat diketik.
*   **Keyboard Virtual Spesifik**: Gunakan atribut yang tepat:
    *   `inputMode="numeric"` untuk nominal rupiah / angka.
    *   `type="email"` untuk surel.
    *   `type="tel"` untuk nomor WhatsApp/telepon.

---

## 7. Feedback & State Responsif
*   **Loading State**: Wajib ada skeleton atau spinner halus saat memuat data.
*   **Toast / Snackbar**: Muncul di bawah layar, berdurasi `3–4 detik`, dan tidak boleh menutupi tombol aksi utama atau bottom bar.
*   **Animasi Transisi**: Durasi `150–300ms` dengan easing `ease-out`. Hindari animasi lambat (>400ms) yang membuat app terasa berat.
*   **Prefers-Reduced-Motion**: Wajib didukung untuk pengguna yang sensitif terhadap motion.

---

## 8. Warna & Kontras Aksesibilitas
*   Tidak boleh mengandalkan warna semata untuk menyampaikan status (sertakan ikon atau teks penjelas).
*   Warna primer konsisten (`#0004ff` / `#2563EB` dengan varian tint pendukung).
*   Dukung preferensi tema gelap (`prefers-color-scheme: dark`) secara proporsional.

---

## 9. PWA-Specific Features
*   **App Icons**: Sediakan ikon `192×192px` dan `512×512px` di `manifest.json`.
*   **Splash Screen & Theme Color**: Samakan warna background dan `theme_color` meta tag.
*   **Offline State**: Tampilkan UI informatif yang ramah ketika jaringan terputus.
*   **Install Banner**: Jangan memunculkan prompt install pada detik pertama pembukaan; picu setelah user berinteraksi.

---

## 10. Gestur & Ergonomi Scroll
*   **Zero Horizontal Overflow**: Cegah `overflow-x` yang tidak disengaja pada layout utama.
*   **Kompatibilitas Gestur Edge**: Jangan letakkan tombol interaktif kritis di zona 20px bawah atau 24px tepi kiri/kanan agar tidak berbenturan dengan gestur back/home sistem OS.
