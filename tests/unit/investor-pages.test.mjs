import { describe, it } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

describe('Investor Role Jaringan & Profil Investor Contracts', () => {
  it('pages/investor/profile.vue exists and allows investors to customize investor-essential profile fields', () => {
    assert.ok(fs.existsSync('pages/investor/profile.vue'), 'Expected pages/investor/profile.vue to exist')
    const content = fs.readFileSync('pages/investor/profile.vue', 'utf8')
    assert.ok(content.includes('Profil Investor'), 'Must have Profil Investor header')
    assert.ok(content.includes('BStoreBanner'), 'Must use BStoreBanner for banner and avatar customization')
    assert.ok(content.includes('BVerifiedBadge'), 'Must display BVerifiedBadge')
    assert.ok(content.includes('Simpan Perubahan'), 'Must have Simpan Perubahan button')
    assert.ok(content.includes('Bagikan Profil'), 'Must have Bagikan Profil button')
    assert.ok(content.includes('companyName'), 'Must allow editing company / PT name')
    assert.ok(content.includes('minTicket'), 'Must allow editing minimum investment ticket')
    assert.ok(content.includes('maxTicket'), 'Must allow editing maximum investment ticket')
    assert.ok(content.includes('preferredSectors'), 'Must allow editing preferred UMKM sectors')
  })

  it('pages/investor/index.vue (Jaringan) places Reset Semua and Wilayah trigger button inline with Jaringan title, shows Kostum when >1 selected, and removes Filter Aktif chips row', () => {
    const content = fs.readFileSync('pages/investor/index.vue', 'utf8')
    assert.ok(content.includes('Jaringan'), 'Page header title must be renamed to Jaringan')
    assert.ok(content.includes('isLocationModalOpen'), 'Jaringan must implement Wilayah modal state isLocationModalOpen')
    assert.ok(content.includes('indonesiaRegions'), 'Jaringan modal must define regions across all of Indonesia')
    assert.ok(content.includes('Tick02Icon'), 'Jaringan modal must use Tick02Icon for checklist selection')
    assert.ok(content.includes('toggleCitySelection'), 'Jaringan modal must allow multi-select checklist toggling')
    assert.ok(content.includes("return 'Kostum'"), 'Button label must return Kostum when >1 wilayah is selected')
    assert.ok(content.includes('<span>Reset Semua</span>'), 'Reset Semua button must be placed in header next to Pilih Lokasi')
    assert.strictEqual(content.includes('Filter Aktif:'), false, 'Jaringan must remove Filter Aktif: Wilayah row')
    assert.strictEqual(content.includes('selectedSortBy'), false, 'Jaringan must not contain sort by score selector')
    assert.strictEqual(content.includes('Urutkan:'), false, 'Jaringan must not display Urutkan label')
  })

  it('DashboardSidebar renames Katalog to Jaringan and Portofolio Pantau to Simpan for Investor role', () => {
    const sidebarContent = fs.readFileSync('components/layout/DashboardSidebar.vue', 'utf8')
    assert.ok(
      sidebarContent.includes("{ to: '/investor', label: 'Jaringan', icon: Store01Icon }"),
      'Investor sidebar must label /investor as Jaringan'
    )
    assert.ok(
      sidebarContent.includes("{ to: '/investor/watchlist', label: 'Simpan', icon: Bookmark02Icon }"),
      'Investor sidebar must label /investor/watchlist as Simpan'
    )
  })

  it('pages/investor/index.vue simplifies right-side Investor Profile card to avatar + name + company/PT only and shows 3 recent UMKM chat histories below it', () => {
    const content = fs.readFileSync('pages/investor/index.vue', 'utf8')
    assert.ok(content.includes('investorStore.profile.companyName'), 'Right profile container must show investor company/PT name')
    assert.strictEqual(content.includes('Bisnis Dipantau'), false, 'Must remove Bisnis Dipantau metric row from right profile card')
    assert.strictEqual(content.includes('Diskusi Terjalin'), false, 'Must remove Diskusi Terjalin metric row from right profile card')
    assert.strictEqual(content.includes('Pengaturan Mandat'), false, 'Must remove navigation buttons from right profile card')
    assert.ok(content.includes('recentUmkmChats'), 'Must display 3 recent UMKM chat histories below Investor Profile card')
    assert.ok(content.includes('Profil\n          </h2>'), 'Must display title Profil outside/above Investor Profile container')
    assert.ok(content.includes('Pesan\n          </h2>'), 'Must display title Pesan outside/above Recent Chats container')
    assert.ok(content.includes('chat.avatarUrl'), 'Recent chat item must display circular UMKM profile image on the left')
    assert.ok(content.includes('chat.umkmName'), 'Recent chat item must display UMKM name')
    assert.ok(content.includes('chat.lastMessage'), 'Recent chat item must display last message below UMKM name')
    assert.ok(content.includes('chat.online'), 'Recent chat item must show Online status when online or last communication time when offline')
  })

  it('enables UMKM role to create & manage posts in dedicated page pages/dashboard/postingan.vue and syncs them with Investor Jaringan & UMKM Profile view', () => {
    assert.ok(fs.existsSync('pages/dashboard/postingan.vue'), 'Expected dedicated UMKM post management page pages/dashboard/postingan.vue to exist')
    const umkmPostPage = fs.readFileSync('pages/dashboard/postingan.vue', 'utf8')
    const umkmProfile = fs.readFileSync('pages/dashboard/profile.vue', 'utf8')
    const sidebarContent = fs.readFileSync('components/layout/DashboardSidebar.vue', 'utf8')
    const investorStore = fs.readFileSync('stores/investor.ts', 'utf8')
    const investorUmkmDetail = fs.readFileSync('pages/investor/umkm/[id]/index.vue', 'utf8')

    assert.ok(
      sidebarContent.includes("{ to: '/dashboard/postingan', label: 'Postingan', icon: Image01Icon }"),
      'UMKM sidebar must include Postingan link to /dashboard/postingan'
    )
    assert.ok(
      sidebarContent.includes("{ to: '/dashboard/penilaian', label: 'Kesehatan Bisnis', icon: AnalyticsUpIcon }"),
      'UMKM sidebar must label /dashboard/penilaian as Kesehatan Bisnis'
    )
    assert.ok(investorStore.includes('createUmkmPost'), 'stores/investor.ts must provide createUmkmPost action')
    assert.ok(umkmPostPage.includes('Postingan'), 'pages/dashboard/postingan.vue must have Postingan header')
    assert.ok(umkmPostPage.includes('Buat Postingan Baru'), 'pages/dashboard/postingan.vue must provide Buat Postingan Baru trigger & modal')
    assert.ok(umkmPostPage.includes('Pilih gambar anda'), 'Step 1 of modal must display Pilih gambar anda heading')
    assert.ok(umkmPostPage.includes('Bagikan gambar atau video di postingan anda'), 'Step 1 of modal must display Bagikan gambar atau video di postingan anda body text')
    assert.ok(umkmPostPage.includes('Berikutnya'), 'Step 1 of modal must have Berikutnya button to advance to Step 2')
    assert.ok(umkmPostPage.includes('placeholder="Deskripsikan postingan anda"'), 'Step 2 of modal must have Deskripsikan postingan anda placeholder')
    assert.ok(umkmPostPage.includes('isDiscardConfirmOpen'), 'Modal must show discard confirmation modal when closing with content')
    assert.ok(umkmPostPage.includes('<span>Lanjutkan</span>'), 'Discard confirmation modal must have Lanjutkan button')
    assert.ok(umkmPostPage.includes('Keluar'), 'Discard confirmation modal must have Keluar button')
    assert.ok(umkmPostPage.includes('Daftar Postingan yang Sudah Dibuat'), 'pages/dashboard/postingan.vue must display Daftar Postingan yang Sudah Dibuat')
    assert.ok(umkmPostPage.includes('lg:grid-cols-3'), 'pages/dashboard/postingan.vue must lay out posts horizontally up to maximum 3 columns')
    assert.ok(umkmPostPage.includes('handleCreateUmkmPost'), 'pages/dashboard/postingan.vue must allow publishing single or multi-slide posts')
    assert.ok(umkmProfile.includes('to="/dashboard/postingan"'), 'UMKM profile page must link Buat Postingan button to /dashboard/postingan')

    // Investor view of UMKM profile (Lihat Profil target page) matches UMKM Profil Usaha design & components
    assert.ok(investorUmkmDetail.includes('BStoreBanner'), 'Investor UMKM profile page must use BStoreBanner component')
    assert.ok(investorUmkmDetail.includes('BVerifiedBadge'), 'Investor UMKM profile page must use BVerifiedBadge component')
    assert.ok(investorUmkmDetail.includes('BActionButton'), 'Investor UMKM profile page must use BActionButton component')
    assert.ok(investorUmkmDetail.includes('BShareModal'), 'Investor UMKM profile page must use BShareModal component')
    assert.ok(investorUmkmDetail.includes('Profil Usaha'), 'Investor UMKM profile page must display Profil Usaha header')
    assert.ok(investorUmkmDetail.includes('Tentang Bisnis Saya'), 'Investor UMKM profile page must display Tentang Bisnis Saya card')
    assert.ok(investorUmkmDetail.includes('Tentang Usaha & Model Bisnis'), 'Investor UMKM profile page must display Tentang Usaha & Model Bisnis section')
    assert.ok(investorUmkmDetail.includes('Legalitas & Kepatuhan Resmi'), 'Investor UMKM profile page must display Legalitas & Kepatuhan Resmi section')
    assert.ok(investorUmkmDetail.includes('Produk Unggulan & Unit Pendorong Omzet'), 'Investor UMKM profile page must display Produk Unggulan section')
    assert.ok(investorUmkmDetail.includes('Postingan & Aktivitas Usaha'), 'Investor UMKM profile page must display Postingan & Aktivitas Usaha section')
    assert.ok(investorUmkmDetail.includes('Konsultan Pendamping'), 'Investor UMKM profile page must display Konsultan Pendamping widget')
    assert.ok(investorUmkmDetail.includes('Dokumen Data Room & Arsip Perizinan'), 'Investor UMKM profile page must display Dokumen Data Room widget')
    assert.ok(investorStore.includes('build150MarketplaceUmkms'), 'stores/investor.ts must provide 150 UMKM dataset generator')
  })

  it('pages/investor/index.vue UMKM & Platform feed card meets all visual & functional requirements (upload timestamp, 468x578 LinkedIn carousel, fullscreen preview with rotating exit icon, and Tips & Trick platform posts)', () => {
    const content = fs.readFileSync('pages/investor/index.vue', 'utf8')
    const storeContent = fs.readFileSync('stores/investor.ts', 'utf8')

    // Proportional circular profile image on the left of name, sized to match the compact 3-line info height on its right (w-12 h-12 sm:w-13 sm:h-13 rounded-full & gap-0.5 sm:gap-1)
    assert.ok(content.includes('w-12 h-12 sm:w-13 sm:h-13 rounded-full'), 'Profile image must be circular and proportionally sized (w-12 h-12 sm:w-13 sm:h-13)')
    assert.ok(content.includes('gap-0.5 sm:gap-1'), '3-line info stack must have compact vertical gap matching profile image height')
    assert.ok(content.includes('inset-y-0 my-auto'), 'Carousel Next and Before buttons must use inset-y-0 my-auto so they do not shift down when pressed')

    // Upload timestamp (postedAt)
    assert.ok(content.includes('item.postedAt'), 'Feed card must display upload timestamp (item.postedAt)')
    assert.ok(content.includes('Time02Icon'), 'Feed card must display Time02Icon next to upload timestamp')

    // 550 x 578 Post Media Container + Wrapping Card Container sized to fit (max-w-[600px]) + Single/Multi-post LinkedIn Carousel with Next & Before buttons
    assert.ok(content.includes('max-w-[600px]'), 'Card container wrapping the media container must be sized to fit the 550px media width')
    assert.ok(content.includes('max-w-[550px] h-[578px] aspect-[550/578]'), 'Post media container must be sized 550 x 578')
    assert.ok(content.includes('getPostImages(item)'), 'Post media container must support single and multi-post image arrays')
    assert.ok(content.includes('carousel-next-btn'), 'Carousel must have Next button inside container')
    assert.ok(content.includes('carousel-before-btn'), 'Carousel must have Before button inside container when slide > 0')
    assert.ok(content.includes('getSlideIndex(item.id) > 0'), 'Before button must appear after Next button is pressed (slide > 0)')

    // Full Screen Preview with FullScreenIcon trigger, Cancel01Icon rotating Exit icon, and Next/Before buttons
    assert.ok(content.includes('FullScreenIcon'), 'Must use FullScreenIcon for fullscreen preview button')
    assert.ok(content.includes('Cancel01Icon'), 'Must use Cancel01Icon (silang) for fullscreen exit/close button')
    assert.ok(content.includes('openFullscreenPreview'), 'Must provide full-screen preview trigger')
    assert.ok(content.includes('fullscreenPost'), 'Must render full-screen preview modal')
    assert.ok(content.includes('group-hover:rotate-90'), 'Full-screen exit button icon must have rotating animation')
    assert.ok(content.includes('prevFullscreenSlide'), 'Full-screen preview must have Before slide navigation')
    assert.ok(content.includes('nextFullscreenSlide'), 'Full-screen preview must have Next slide navigation')

    // Platform Tips & Trick posts interleaved in feed
    assert.ok(storeContent.includes('platformPosts'), 'Store must include official platform posts')
    assert.ok(storeContent.includes('Tips & Trick'), 'Store platform posts must include Tips & Trick category')
    assert.ok(content.includes('item.isPlatformPost'), 'Feed must support rendering official platform Tips & Trick posts')

    // Removed pills & overlays
    assert.strictEqual(content.includes('Siap Pendanaan'), false, 'Must remove Siap Pendanaan pill')
    assert.strictEqual(content.includes('Skor {{ item.healthScore }}'), false, 'Must remove Skor pill')
    assert.strictEqual(content.includes('Validasi Kas Selesai'), false, 'Must remove Validasi Kas Selesai date')
    assert.strictEqual(content.includes('Gerai Fisik Aktif'), false, 'Must remove Gerai Fisik Aktif overlay')

    // Save & Share icons
    assert.ok(content.includes('Bookmark02Icon'), 'Must replace Star icon with Bookmark02Icon (Save)')
    assert.ok(content.includes('Share08Icon'), 'Must use Share08Icon for sharing')

    // Author header layout: Location above UMKM name, upload timestamp below UMKM name, no establishedYear or sector
    assert.ok(content.includes('<span>{{ item.city }}</span>'), 'Must display UMKM city location above UMKM name')
    assert.strictEqual(content.includes('item.establishedYear'), false, 'Must remove establishedYear from post header')
    assert.strictEqual(content.includes('<span>{{ item.sector }}</span>'), false, 'Must remove UMKM sector/category from post header')

    // Sidebar-matched pitch text size
    assert.ok(content.includes('text-[14px] sm:text-[15px] font-poppins'), 'Post text must use 14px/15px font-poppins matching sidebar')

    // 4 metric cards at the bottom of UMKM post must be removed
    assert.strictEqual(content.includes('Target Modal'), false, 'Must remove 4 bottom metric cards from UMKM post')
    assert.strictEqual(content.includes('stat-card-icon-box'), false, 'Must remove 4 bottom metric cards from UMKM post')

    // Action footer: only Lihat Profil, no Kirim Pesan / Simulasi ROI / Data Room
    assert.ok(content.includes('Lihat Profil'), 'Action footer must have Lihat Profil button')
    assert.strictEqual(content.includes('Kirim Pesan'), false, 'Must remove Kirim Pesan button')
    assert.strictEqual(content.includes('Simulasi ROI'), false, 'Must remove Simulasi ROI button')
    assert.strictEqual(content.includes('<span>Data Room</span>'), false, 'Must replace Data Room button with Lihat Profil')
  })

  it('enforces zero drop-shadow and 100% Hugeicons on Jaringan, Profil Investor, Investor UMKM Profile, and UMKM Postingan pages', () => {
    for (const file of [
      'pages/investor/index.vue',
      'pages/investor/profile.vue',
      'pages/investor/umkm/[id]/index.vue',
      'pages/dashboard/postingan.vue',
      'components/search/AdvancedNavbarSearch.vue'
    ]) {
      const content = fs.readFileSync(file, 'utf8')
      const hasRawSvg = /<svg[\s>]/i.test(content)
      assert.strictEqual(hasRawSvg, false, `${file} must not contain raw <svg> tags`)
      const unwantedShadow = /shadow-(?:xs|2xs|sm|md|lg|xl|2xl)/.test(content)
      assert.strictEqual(unwantedShadow, false, `${file} must not contain drop-shadow classes`)
    }
  })

  it('AdvancedNavbarSearch removes Ctrl+K, uses table-style FilterHorizontalIcon for sector filter, and displays uncolored top-stroked UMKM results with only name, sector, and city', () => {
    const content = fs.readFileSync('components/search/AdvancedNavbarSearch.vue', 'utf8')
    assert.strictEqual(content.includes('Ctrl K'), false, 'Must remove Ctrl K shortcut badge')
    assert.ok(content.includes('FilterHorizontalIcon'), 'Must use FilterHorizontalIcon like table filter bar')
    assert.ok(content.includes('isSectorDropdownOpen'), 'Must support joined sector filter dropdown')
    assert.strictEqual(content.includes('Siap Modal'), false, 'Must remove Siap Modal badge from search results')
    assert.strictEqual(content.includes('Untung {{'), false, 'Must remove Untung % from search results')
    assert.strictEqual(content.includes('Skor {{'), false, 'Must remove Skor badge from search results')
    assert.ok(content.includes('border-t border-[#E2E8F0] dark:border-neutral-800'), 'Must separate searched UMKM items with top border stroke only')
    assert.ok(content.includes('{{ item.sector }} • {{ item.city }}'), 'Must display sector and city location under UMKM name')
  })
})
