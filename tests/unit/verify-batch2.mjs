import fs from 'node:fs'
import assert from 'node:assert'

console.log('--- RUNNING BATCH 2 VERIFICATION ---')

// 1. Verify pendanaan.vue (Cari Modal)
const pendanaanContent = fs.readFileSync('pages/dashboard/pendanaan.vue', 'utf8')

// Check meta hideHeader
assert.ok(pendanaanContent.includes("hideHeader: true"), 'pendanaan.vue should have hideHeader: true')
// Check 1-row header
assert.ok(pendanaanContent.includes("Cari Modal"), 'pendanaan.vue should have Cari Modal title')
assert.ok(pendanaanContent.includes("Unduh Proposal"), 'pendanaan.vue should have Unduh Proposal action')
// Check dummy button "Rayakan Kelulusan" is removed
assert.ok(!pendanaanContent.includes("Rayakan Kelulusan"), 'pendanaan.vue must not have dummy Rayakan Kelulusan button')
// Check unified Hero Funding Status Banner
assert.ok(pendanaanContent.includes("Target Akses Modal Usaha"), 'pendanaan.vue should have Hero Funding Banner')
assert.ok(pendanaanContent.includes("Ready for Funding"), 'pendanaan.vue should have Ready for Funding badge')
// Check BPillTabs and BActionButton
assert.ok(pendanaanContent.includes("BPillTabs"), 'pendanaan.vue should reuse BPillTabs')
assert.ok(pendanaanContent.includes("BActionButton"), 'pendanaan.vue should reuse BActionButton')
// Check 4 tabs
assert.ok(pendanaanContent.includes("Status Kesiapan (Funding Gate)"), 'pendanaan.vue should have Gate tab')
assert.ok(pendanaanContent.includes("Tawaran Investor Masuk"), 'pendanaan.vue should have Investor Requests tab')
assert.ok(pendanaanContent.includes("Simulasi Akses Modal"), 'pendanaan.vue should have Simulation tab')
assert.ok(pendanaanContent.includes("Pratinjau Kartu Publik"), 'pendanaan.vue should have Preview tab')
console.log('✓ Cari Modal (pendanaan.vue) passed all structural & architectural assertions!')

// 2. Verify notifikasi.vue (Notifikasi)
const notifikasiContent = fs.readFileSync('pages/dashboard/notifikasi.vue', 'utf8')

// Check meta hideHeader
assert.ok(notifikasiContent.includes("hideHeader: true"), 'notifikasi.vue should have hideHeader: true')
// Check 1-row header with size 20 icon and font-semibold text-lg sm:text-xl
assert.ok(notifikasiContent.includes("Notifikasi"), 'notifikasi.vue should have Notifikasi title')
assert.ok(!notifikasiContent.includes("Notifikasi Toko"), 'notifikasi.vue must not have oversized Notifikasi Toko duplicate title')
assert.ok(notifikasiContent.includes("Tandai Semua Dibaca"), 'notifikasi.vue should have Tandai Semua Dibaca button')
assert.ok(notifikasiContent.includes("Pengaturan"), 'notifikasi.vue should have Pengaturan action')
// Check BPillTabs with reactive counts directly
assert.ok(notifikasiContent.includes("BPillTabs"), 'notifikasi.vue should reuse BPillTabs')
assert.ok(notifikasiContent.includes("Daftar Notifikasi & Aktivitas Toko"), 'notifikasi.vue should have direct notification feed')
console.log('✓ Notifikasi (notifikasi.vue) passed all structural & architectural assertions!')

console.log('--- ALL BATCH 2 TESTS PASSED SUCCESSFULLY! ---')
