import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

test('Mobile Responsiveness & Android Design Guidelines Verification', async (t) => {
  await t.test('MobilePillTabBar.vue matches Reference Image 1 specification', () => {
    const content = fs.readFileSync('components/layout/MobilePillTabBar.vue', 'utf8')
    assert.ok(content.includes('lg:hidden'), 'TabBar must be mobile-only (< lg)')
    assert.ok(content.includes('fixed bottom-4'), 'TabBar must float at bottom-4')
    assert.ok(content.includes('rounded-full'), 'TabBar must be rounded-full pill')
    assert.ok(content.includes('isQuickAccessOpen'), 'TabBar must manage Quick Access state')
    assert.ok(content.includes('toggleQuickAccess'), 'TabBar must have toggleQuickAccess function')
  })

  await t.test('MobileQuickAccessSheet.vue matches Reference Image 2 bento grid', () => {
    const content = fs.readFileSync('components/layout/MobileQuickAccessSheet.vue', 'utf8')
    assert.ok(content.includes('grid-cols-4'), 'Quick Access sheet must render 4-column bento grid')
    assert.ok(content.includes('Akses Cepat UMKM'), 'Quick Access sheet must have proper title')
    assert.ok(content.includes('bottom-[86px]'), 'Quick Access sheet must float directly above bottom tab bar')
  })

  await t.test('Catatan Kas (progres.vue) has joined search & filter bar and responsive tables', () => {
    const content = fs.readFileSync('pages/dashboard/progres.vue', 'utf8')
    assert.ok(content.includes('activeCategoryShortLabel'), 'progres.vue must support short label on mobile')
    assert.ok(content.includes('FilterHorizontalIcon'), 'progres.vue must use FilterHorizontalIcon')
    assert.ok(content.includes('hidden sm:table') || content.includes('hidden sm:block'), 'Table must hide on mobile in favor of cards')
    assert.ok(content.includes('sm:hidden divide-y'), 'Must have mobile card list view')
  })

  await t.test('Beranda (index.vue) has stacked full-width action buttons & mobile card list', () => {
    const content = fs.readFileSync('pages/dashboard/index.vue', 'utf8')
    assert.ok(content.includes('flex-col sm:flex-row'), 'Buttons must stack on mobile')
    assert.ok(content.includes('[&>*]:w-full sm:[&>*]:w-auto'), 'Buttons must be full width on mobile')
    assert.ok(content.includes('sm:hidden divide-y'), 'Must have mobile card list view replacing wide table')
  })

  await t.test('Progress Tugas (rencana-aksi.vue & BTaskCategoryCard.vue) has stacked action buttons', () => {
    const cardContent = fs.readFileSync('components/base/BTaskCategoryCard.vue', 'utf8')
    assert.ok(cardContent.includes('flex flex-col sm:flex-row'), 'Task header must stack on mobile')
    assert.ok(cardContent.includes('[&>*]:w-full sm:[&>*]:w-auto'), 'Task action button must be full width on mobile')
  })

  await t.test('Pesan (pesan.vue) has unified search & filter bar', () => {
    const content = fs.readFileSync('pages/dashboard/pesan.vue', 'utf8')
    assert.ok(content.includes('activeFilter'), 'pesan.vue must have activeFilter state')
    assert.ok(content.includes('Search01Icon'), 'pesan.vue must have Search01Icon')
  })

  await t.test('Notifikasi (notifikasi.vue) has joined search & filter bar and stacked buttons', () => {
    const content = fs.readFileSync('pages/dashboard/notifikasi.vue', 'utf8')
    assert.ok(content.includes('activeFilterLabel'), 'notifikasi.vue must have activeFilterLabel')
    assert.ok(content.includes('FilterHorizontalIcon'), 'notifikasi.vue must use FilterHorizontalIcon')
    assert.ok(content.includes('isFilterDropdownOpen'), 'notifikasi.vue must manage filter dropdown')
    assert.ok(content.includes('[&>*]:w-full sm:[&>*]:w-auto'), 'Action buttons must be full width on mobile')
  })

  await t.test('Profil Usaha (profile.vue) has stacked full-width action buttons on mobile', () => {
    const content = fs.readFileSync('pages/dashboard/profile.vue', 'utf8')
    assert.ok(content.includes('flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto [&>*]:w-full'), 'Simpan & Bagikan buttons must stack full-width on mobile')
  })

  await t.test('BPillTabs supports shortLabel for mobile responsiveness', () => {
    const content = fs.readFileSync('components/base/BPillTabs.vue', 'utf8')
    assert.ok(content.includes('shortLabel'), 'BPillTabs must support shortLabel')
    assert.ok(content.includes('isMobile && tab.shortLabel'), 'BPillTabs must render shortLabel on mobile')
  })

  await t.test('Layout has mobile clearance padding on footer for UMKM floating tab bar', () => {
    const content = fs.readFileSync('layouts/dashboard.vue', 'utf8')
    assert.ok(content.includes('pb-26 sm:pb-4') || content.includes('pb-22 sm:pb-4'), 'Footer must have clearance padding on mobile')
  })
})
