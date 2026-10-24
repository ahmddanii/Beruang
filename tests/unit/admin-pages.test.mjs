import { describe, it } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

describe('Admin Role Pages & Design System Consistency Contracts', () => {
  const adminFiles = [
    'pages/admin/index.vue',
    'pages/admin/umkm.vue',
    'pages/admin/penugasan.vue',
    'pages/admin/sertifikasi.vue',
    'pages/admin/investasi.vue',
    'pages/admin/pengguna.vue',
    'pages/admin/pengaturan.vue'
  ]

  it('all 7 dedicated admin pages exist on disk', () => {
    for (const file of adminFiles) {
      assert.ok(fs.existsSync(file), `Expected ${file} to exist`)
    }
  })

  it('sidebar groups admin pages into Beranda, Pemberdayaan, Monitoring, and Sistem', () => {
    const sidebarContent = fs.readFileSync('components/layout/DashboardSidebar.vue', 'utf8')
    assert.ok(sidebarContent.includes("to: '/admin', label: 'Beranda'"), 'Sidebar must label /admin as Beranda')
    assert.ok(sidebarContent.includes("title: 'Pemberdayaan'"), 'Sidebar must include Pemberdayaan group for Admin')
    assert.ok(sidebarContent.includes("title: 'Monitoring'"), 'Sidebar must include Monitoring group for Admin')
    assert.ok(sidebarContent.includes("title: 'Sistem'"), 'Sidebar must include Sistem group for Admin')
    assert.ok(sidebarContent.includes("to: '/admin/umkm'"), 'Sidebar must link to /admin/umkm')
    assert.ok(sidebarContent.includes("to: '/admin/penugasan'"), 'Sidebar must link to /admin/penugasan')
    assert.ok(sidebarContent.includes("to: '/admin/sertifikasi'"), 'Sidebar must link to /admin/sertifikasi')
    assert.ok(sidebarContent.includes("to: '/admin/investasi'"), 'Sidebar must link to /admin/investasi')
    assert.ok(sidebarContent.includes("to: '/admin/pengguna'"), 'Sidebar must link to /admin/pengguna')
    assert.ok(sidebarContent.includes("to: '/admin/pengaturan'"), 'Sidebar must link to /admin/pengaturan')
  })

  it('all admin pages enforce hideHeader: true, layout: dashboard, and UMKM-style page header without subtitle or decorative banner', () => {
    for (const file of adminFiles) {
      const content = fs.readFileSync(file, 'utf8')
      assert.ok(content.includes('hideHeader: true'), `${file} must define hideHeader: true`)
      assert.ok(content.includes("layout: 'dashboard'"), `${file} must define layout: 'dashboard'`)
      assert.ok(
        content.includes('font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight'),
        `${file} must use the exact UMKM h1 typography class`
      )
      assert.strictEqual(
        content.includes('gsap-admin-banner') || content.includes('gsap-settings-banner'),
        false,
        `${file} must not include decorative blue banners`
      )
    }
  })

  it('enforces standard white action buttons (btn-pill-action) and bans muted grey buttons (btn-pill-action-muted) across all admin pages', () => {
    for (const file of adminFiles) {
      const content = fs.readFileSync(file, 'utf8')
      assert.strictEqual(
        content.includes('btn-pill-action-muted'),
        false,
        `${file} must not use grey inactive-looking btn-pill-action-muted for action buttons`
      )
    }
  })

  it('enforces 100% Hugeicons usage (0 raw <svg> tags) across all 7 admin pages', () => {
    for (const file of adminFiles) {
      const content = fs.readFileSync(file, 'utf8')
      const hasRawSvg = /<svg[\s>]/i.test(content)
      assert.strictEqual(hasRawSvg, false, `${file} contains raw <svg> tags; must use HugeiconsIcon`)
      assert.ok(content.includes('HugeiconsIcon'), `${file} must use HugeiconsIcon component`)
    }
  })

  it('enforces zero drop-shadow rule across all 7 admin pages and main.css card/button classes', () => {
    for (const file of adminFiles) {
      const content = fs.readFileSync(file, 'utf8')
      const unwantedShadow = /shadow-(?:sm|md|lg|xl|2xl|xs)/.test(content)
      assert.strictEqual(unwantedShadow, false, `${file} must not contain drop-shadow classes`)
    }
    const mainCss = fs.readFileSync('assets/css/main.css', 'utf8')
    assert.ok(mainCss.includes('box-shadow: none !important;'), 'main.css must enforce box-shadow: none !important on tactile cards')
  })

  it('all 7 admin pages implement GSAP entrance animations with proper lifecycle cleanup', () => {
    for (const file of adminFiles) {
      const content = fs.readFileSync(file, 'utf8')
      assert.ok(content.includes("from 'gsap'"), `${file} must import gsap`)
      assert.ok(content.includes('gsap.context'), `${file} must use gsap.context`)
      assert.ok(content.includes('onMounted'), `${file} must animate onMounted`)
      assert.ok(content.includes('onUnmounted'), `${file} must clean up onUnmounted`)
      assert.ok(content.includes('revert()'), `${file} must revert gsapCtx onUnmounted`)
    }
  })

  it('admin/umkm.vue provides complete tripartite ecosystem mapping (UMKM • Konsultan • Investor) with UMKM card & table typography', () => {
    const content = fs.readFileSync('pages/admin/umkm.vue', 'utf8')
    assert.ok(content.includes('umkmPartnerships'), 'Must define umkmPartnerships data structure')
    assert.ok(content.includes('consultant'), 'Must include assigned consultant per UMKM')
    assert.ok(content.includes('investors'), 'Must include active connected investors per UMKM')
    assert.ok(content.includes('selectedUmkm'), 'Must provide interactive detail modal state')
    assert.ok(content.includes('openDetailModal'), 'Must provide openDetailModal handler')
    assert.ok(content.includes('stat-card-clean'), 'Must use UMKM stat-card-clean metric cards')
    assert.ok(content.includes('card-tactile-gopay'), 'Must use card-tactile-gopay container')
  })

  it('all admin table pages implement the joined search & filter control bar identical to UMKM Catatan Kas', () => {
    const tablePages = [
      'pages/admin/umkm.vue',
      'pages/admin/penugasan.vue',
      'pages/admin/sertifikasi.vue',
      'pages/admin/investasi.vue',
      'pages/admin/pengguna.vue'
    ]
    for (const file of tablePages) {
      const content = fs.readFileSync(file, 'utf8')
      assert.ok(
        content.includes('rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-neutral-50/70 dark:bg-[#1A1A1A]'),
        `${file} must use the exact joined search & filter bar container class from Catatan Kas`
      )
      assert.ok(
        content.includes('h-6 w-px bg-neutral-300 dark:bg-neutral-700 shrink-0'),
        `${file} must include the vertical divider inside the joined search & filter bar`
      )
      assert.ok(content.includes('FilterHorizontalIcon'), `${file} must use FilterHorizontalIcon in the joined filter trigger`)
      assert.ok(content.includes('isFilterDropdownOpen'), `${file} must manage joined filter dropdown state`)
    }
  })

  it('admin/index.vue is titled Beranda and displays Kemitraan UMKM Terkini without score pills', () => {
    const content = fs.readFileSync('pages/admin/index.vue', 'utf8')
    assert.ok(content.includes('Beranda'), 'Must be titled Beranda')
    assert.ok(content.includes('topPartnerships'), 'Must define topPartnerships on Beranda')
    assert.ok(content.includes('consultantName'), 'Must display consultantName in partnership row')
    assert.ok(content.includes('investorName'), 'Must display investorName in partnership row')
    assert.strictEqual(content.includes('item.score'), false, 'Kemitraan UMKM Terkini must not display score pills')
    assert.ok(content.includes('stat-card-clean'), 'Must use UMKM stat-card-clean metric cards')
  })
})
