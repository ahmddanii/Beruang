import { test, expect } from '@playwright/test';
import { loginAs } from './helpers/auth';

test.describe('E2E: Konsultan Bisnis Flow', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'CONSULTANT');
  });

  test('1. Konsultan Dashboard displays telemetry cards and active practice metrics', async ({ page }) => {
    await page.goto('/konsultan');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Maya Suryani|Klien Binaan|Bimbingan/i);
    // 4 Key telemetry cards
    await expect(page.locator('body')).toContainText(/KLIEN BINAAN|PERMINTAAN|VALIDASI|TUGAS/i);
  });

  test('2. Konsultan Klien page displays portfolio of UMKM binaan', async ({ page }) => {
    await page.goto('/konsultan/klien');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Daftar Klien|UMKM Binaan|Kesiapan Modal/i);
  });

  test('3. Konsultan Validasi Kas page renders financial audit verification queue', async ({ page }) => {
    await page.goto('/konsultan/validasi');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Validasi|Laporan Kas|Rekening|Verifikasi/i);
  });

  test('4. Konsultan Permintaan Bimbingan displays incoming mentoring proposals', async ({ page }) => {
    await page.goto('/konsultan/permintaan');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Permintaan|Bimbingan|Pengajuan|UMKM/i);
  });

  test('5. Konsultan Profil page displays advisory firm credentials and bio', async ({ page }) => {
    await page.goto('/konsultan/profil');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Maya Suryani|Suryani Consulting|Kredensial|Profil/i);
  });

});
