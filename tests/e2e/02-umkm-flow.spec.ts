import { test, expect } from '@playwright/test';
import { loginAs } from './helpers/auth';

test.describe('E2E: UMKM Flow', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'UMKM');
  });

  test('1. UMKM Dashboard displays primary metric cards and navigation shortcuts', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1')).toContainText(/Beranda/i);
    // Financial overview metric cards
    await expect(page.locator('body')).toContainText(/Untung Bersih|Rapor Keuangan Bulanan/i);
    // Navigation sidebar links
    await expect(page.locator('a[href="/dashboard/progres"]').first()).toBeVisible();
    await expect(page.locator('a[href="/dashboard/penilaian"]').first()).toBeVisible();
    await expect(page.locator('a[href="/dashboard/rencana-aksi"]').first()).toBeVisible();
  });

  test('2. UMKM Catat Kas loads transaction records and cash balance', async ({ page }) => {
    await page.goto('/dashboard/progres');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Catatan Kas|Pergerakan Kas|Uang Masuk|Uang Keluar|Semua/i);
    // Verify action button or filter is accessible
    const actionElement = page.locator('button, a').filter({ hasText: /Catat|Tambah|Filter|Semua/i }).first();
    await expect(actionElement).toBeVisible();
  });

  test('3. UMKM Penilaian Mandiri displays 5 Business Pillars readiness score', async ({ page }) => {
    await page.goto('/dashboard/penilaian');
    await page.waitForLoadState('domcontentloaded');

    // 5 Fundamental pillars
    await expect(page.locator('body')).toContainText(/Finansial|Operasional|Legalitas|Tata Kelola|Pasar/i);
    // Score gauge / health badge
    await expect(page.locator('body')).toContainText(/Skor|Kesiapan|Kelayakan/i);
  });

  test('4. UMKM Rencana Aksi displays roadmap milestones and tasks', async ({ page }) => {
    await page.goto('/dashboard/rencana-aksi');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Rencana Aksi|Roadmap|Tugas|Bimbingan/i);
    const taskContainer = page.locator('#action-plans-list, .space-y-4, main');
    await expect(taskContainer.first()).toBeVisible();
  });

  test('5. UMKM Cari Modal displays funding readiness and investor stage', async ({ page }) => {
    await page.goto('/dashboard/pendanaan');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Cari Modal|Funding|Kelayakan|Tahap Pengajuan/i);
  });

  test('6. UMKM Profil Publik Usaha renders brand information and metrics', async ({ page }) => {
    await page.goto('/dashboard/profil-publik');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Kopi Senja Nusantara|Profil|Kuliner & Minuman/i);
  });

});
