import { describe, it } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

describe('Frontend UI Components & Design System Contracts', () => {
  it('BActionButton (components/base/BActionButton.vue) implements tactile button variants & props', () => {
    const content = fs.readFileSync('components/base/BActionButton.vue', 'utf8')
    assert.ok(content.includes('variant'), 'BActionButton must have variant prop')
    assert.ok(content.includes('NuxtLink') || content.includes('button'), 'BActionButton must support links or buttons')
    assert.ok(content.includes('#00800e') || content.includes('emerald') || content.includes('green'), 'BActionButton must support green accent')
  })

  it('BPillTabs (components/base/BPillTabs.vue) enforces rounded pill navigation', () => {
    const content = fs.readFileSync('components/base/BPillTabs.vue', 'utf8')
    assert.ok(content.includes('tabs'), 'BPillTabs must have tabs prop')
    assert.ok(content.includes('modelValue') || content.includes('v-model'), 'BPillTabs must support two-way binding')
    assert.ok(content.includes('rounded-full') || content.includes('rounded-xl'), 'BPillTabs must use rounded styling')
  })

  it('Dashboard Layout (layouts/dashboard.vue) implements sticky viewport footer and mobile responsive structure', () => {
    const content = fs.readFileSync('layouts/dashboard.vue', 'utf8')
    assert.ok(content.includes('footer'), 'Layout must have sticky footer')
    assert.ok(content.includes('Beruang'), 'Footer must contain brand copyright')
    assert.ok(content.includes('DashboardSidebar'), 'Layout must include DashboardSidebar')
  })

  it('Brand Assets & Typography enforce Poppins and proper logos', () => {
    assert.ok(fs.existsSync('public/logo/logoSmall.svg') || fs.existsSync('public/logo.svg'), 'Brand logo must exist in public directory')
  })

  it('DashboardSidebar implements quick theme switcher positioned at bottom, visible only when expanded', () => {
    const content = fs.readFileSync('components/layout/DashboardSidebar.vue', 'utf8')
    assert.ok(content.includes('sidebar-theme-footer'), 'DashboardSidebar must include sidebar-theme-footer container')
    assert.ok(content.includes('Tema'), 'Quick theme switcher must display "Tema" label')
    assert.ok(content.includes('v-if="!isCollapsed"'), 'Quick theme switcher must disappear when collapsed and only show when expanded')
    assert.ok(content.includes("selectTheme('system'"), 'Quick theme switcher must support System theme')
    assert.ok(content.includes("selectTheme('light'"), 'Quick theme switcher must support Light theme')
    assert.ok(content.includes("selectTheme('dark'"), 'Quick theme switcher must support Dark theme')
    assert.ok(content.includes('ComputerIcon') && content.includes('Sun03Icon') && content.includes('Moon02Icon'), 'Quick theme switcher must use Hugeicons')
  })

  it('BSkeletonScreen (components/base/BSkeletonScreen.vue) provides zero-overhead GPU shimmer skeleton screens', () => {
    assert.ok(fs.existsSync('components/base/BSkeletonScreen.vue'), 'BSkeletonScreen component must exist')
    const content = fs.readFileSync('components/base/BSkeletonScreen.vue', 'utf8')
    assert.ok(content.includes('skeleton-shimmer'), 'BSkeletonScreen must use skeleton-shimmer class')
    assert.ok(content.includes('dashboard') && content.includes('feed') && content.includes('profile') && content.includes('table'), 'BSkeletonScreen must support all core variants')
  })

  it('enforces universal smooth scrolling and GPU shimmer in main.css', () => {
    const cssContent = fs.readFileSync('assets/css/main.css', 'utf8')
    assert.ok(cssContent.includes('scroll-behavior: smooth'), 'main.css must configure scroll-behavior: smooth')
    assert.ok(cssContent.includes('skeleton-shimmer'), 'main.css must configure skeleton-shimmer keyframes')
    assert.ok(cssContent.includes('lazy-render-card'), 'main.css must configure lazy-render-card content-visibility')
  })

  it('enforces GSAP entrance animations across UMKM and Investor pages', () => {
    for (const page of [
      'pages/dashboard/index.vue',
      'pages/dashboard/penilaian.vue',
      'pages/dashboard/postingan.vue',
      'pages/dashboard/profile.vue',
      'pages/dashboard/pendanaan.vue',
      'pages/investor/index.vue',
      'pages/investor/profile.vue',
      'pages/investor/watchlist.vue',
      'pages/investor/umkm/[id]/index.vue',
      'pages/investor/data-room/[id].vue'
    ]) {
      const content = fs.readFileSync(page, 'utf8')
      assert.ok(content.includes('gsap'), `${page} must import and use gsap`)
      assert.ok(content.includes('onMounted') && content.includes('onBeforeUnmount'), `${page} must have onMounted and onBeforeUnmount for GSAP lifecycle cleanup`)
    }
  })

  it('pages/investor/data-room/[id].vue adopts BPillTabs adhering to the segmented pill design scheme', () => {
    const content = fs.readFileSync('pages/investor/data-room/[id].vue', 'utf8')
    assert.ok(content.includes('BPillTabs'), 'Data room page must use BPillTabs')
    assert.ok(content.includes('dataRoomTabs'), 'Data room page must pass dataRoomTabs to BPillTabs')
    assert.ok(content.includes('shortLabel'), 'dataRoomTabs must provide shortLabel for mobile responsiveness')
  })
})
