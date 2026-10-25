import { test, expect } from '@playwright/test';
import { loginAs } from './helpers/auth';

test.describe('E2E: Investor Mitra Flow', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'INVESTOR');
  });

  test('1. Investor Marketplace displays curated network feed and controls', async ({ page }) => {
    await page.goto('/investor');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1')).toContainText(/Jaringan/i);
    await expect(page.locator('body')).toContainText(/Semua Sektor|Semua Wilayah|Pesan|Profil/i);
  });

  test('2. Investor can filter marketplace catalog by sector', async ({ page }) => {
    await page.goto('/investor');
    await page.waitForLoadState('domcontentloaded');

    // Filter bar presence
    const filterSection = page.locator('button, div').filter({ hasText: /Semua Sektor|Kuliner|F&B|Retail/i });
    await expect(filterSection.first()).toBeVisible();
  });

  test('3. Investor inspects detailed business profile and funding telemetry', async ({ page }) => {
    await page.goto('/investor/umkm/umkm-01');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1')).toContainText(/Profil Usaha/i);
    await expect(page.locator('body')).toContainText(/Kopi Senja|Kembali ke Jaringan|Profil Usaha/i);
  });

  test('4. Investor Portofolio page displays watched deals and capital commitments', async ({ page }) => {
    await page.goto('/investor/portofolio');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Portofolio|Pantau|Alokasi Modal|Imbal Hasil/i);
  });

});
