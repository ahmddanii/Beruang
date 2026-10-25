import { test, expect } from '@playwright/test';
import { loginAs } from './helpers/auth';

test.describe('E2E: Super Admin Ecosystem Flow', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN');
  });

  test('1. Admin Dashboard displays macro ecosystem telemetry and quick shortcuts', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Beranda|Ekosistem|Total UMKM|Modal Tersalur/i);
    // Shortcut navigation links
    await expect(page.locator('a[href="/admin/umkm"]').first()).toBeVisible();
    await expect(page.locator('a[href="/admin/penugasan"]').first()).toBeVisible();
  });

  test('2. Admin Manajemen UMKM displays comprehensive directory of enterprises', async ({ page }) => {
    await page.goto('/admin/umkm');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Daftar UMKM|Sektor|Status|Pemilik/i);
  });

  test('3. Admin Penugasan Konsultan displays mentorship dispatch queue', async ({ page }) => {
    await page.goto('/admin/penugasan');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Penugasan|Konsultan|Pendamping|Tugaskan/i);
  });

  test('4. Admin Sertifikasi displays readiness validation records', async ({ page }) => {
    await page.goto('/admin/sertifikasi');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Sertifikasi|Verifikasi|Kesiapan|Audit/i);
  });

  test('5. Admin Manajemen Pengguna displays all ecosystem user accounts', async ({ page }) => {
    await page.goto('/admin/pengguna');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Pengguna|Akun|Peran|Email/i);
  });

});
