import { test, expect } from '@playwright/test';
import { loginAs, logout } from './helpers/auth';

test.describe('E2E: Authentication & RBAC Guard', () => {

  test('1. Landing page displays branding and navigation links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check brand title
    await expect(page).toHaveTitle(/Beruang/i);

    // Verify main navigation buttons
    const masukButton = page.locator('a[href="/masuk"]');
    await expect(masukButton.first()).toBeVisible();

    const daftarButton = page.locator('a[href="/daftar"]');
    await expect(daftarButton.first()).toBeVisible();
  });

  test('2. /masuk renders multi-option login view and validates phone step', async ({ page }) => {
    await page.goto('/masuk');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText(/Halo, senang melihatmu kembali!/i);

    // Switch to phone entry step via button click
    const waButton = page.locator('button', { hasText: 'Masuk dengan WhatsApp' });
    await waButton.click();

    const phoneInput = page.locator('#loginPhone');
    await phoneInput.waitFor({ state: 'visible' });

    // Test phone validation: invalid prefix (must start with 8)
    await phoneInput.fill('123456789');
    await expect(page.getByText(/Nomor seluler Indonesia harus diawali angka 8/i)).toBeVisible();

    // Test phone validation: valid phone
    await phoneInput.fill('81234567890');
    await expect(page.getByRole('button', { name: /Kirim Kode Verifikasi/i })).toBeEnabled();
  });

  test('3. Unauthenticated access to private admin route redirects to /masuk', async ({ page }) => {
    await logout(page);
    try {
      await page.goto('/admin', { waitUntil: 'commit' });
    } catch {}
    await page.waitForURL(/\/masuk/);
    await expect(page).toHaveURL(/\/masuk/);
  });

  test('4. UMKM authentication grants access to /dashboard', async ({ page }) => {
    const { user } = await loginAs(page, 'UMKM');
    expect(user.role).toBe('UMKM');

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('h1')).toContainText(/Beranda/i);
    await expect(page.getByText(/Rapor Keuangan Bulanan|Tugas Hari Ini|Untung Bersih/i).first()).toBeVisible();
  });

  test('5. Konsultan authentication grants access to /konsultan', async ({ page }) => {
    const { user } = await loginAs(page, 'CONSULTANT');
    expect(user.role).toBe('CONSULTANT');

    await expect(page).toHaveURL(/\/konsultan/);
    await expect(page.locator('body')).toContainText(/Maya Suryani|Klien Binaan|Bimbingan/i);
  });

  test('6. Investor authentication grants access to /investor', async ({ page }) => {
    const { user } = await loginAs(page, 'INVESTOR');
    expect(user.role).toBe('INVESTOR');

    await expect(page).toHaveURL(/\/investor/);
    await expect(page.locator('body')).toContainText(/Katalog UMKM|Investor|Imbal Hasil/i);
  });

  test('7. Admin authentication grants access to /admin', async ({ page }) => {
    const { user } = await loginAs(page, 'ADMIN');
    expect(user.role).toBe('ADMIN');

    await expect(page).toHaveURL(/\/admin/);
    await expect(page.locator('body')).toContainText(/Admin|Ekosistem|Kelola/i);
  });

  test('8. Logout clears session and redirects unauthenticated user away', async ({ page }) => {
    await loginAs(page, 'UMKM');
    await logout(page);

    await page.goto('/admin');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/masuk/);
  });

  test('9. Onboarded user visiting /onboarding is redirected to /dashboard and stays on dashboard without bounce', async ({ page }) => {
    await loginAs(page, 'UMKM');
    await page.goto('/onboarding?role=UMKM');
    await page.waitForLoadState('networkidle');

    // Should immediately bounce away to /dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('body')).toContainText(/Untung Bersih|Beranda|Catatan Kas/i);

    // Reloading /dashboard should keep user on /dashboard
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/dashboard/);
  });

});

