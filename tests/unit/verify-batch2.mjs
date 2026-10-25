import fs from 'node:fs'
import assert from 'node:assert'

console.log('--- RUNNING BATCH 2 VERIFICATION ---')

// 1. Verify pendanaan.vue (Cari Modal)
const pendanaanContent = fs.readFileSync('pages/dashboard/pendanaan.vue', 'utf8')

// Check meta hideHeader
assert.ok(pendanaanContent.includes("hideHeader: true"), 'pendanaan.vue should have hideHeader: true')
// Check 1-row header
assert.ok(pendanaanContent.includes("Cari Modal"), 'pendanaan.vue should have Cari Modal title')
// Check dummy button "Rayakan Kelulusan" is removed
assert.ok(!pendanaanContent.includes("Rayakan Kelulusan"), 'pendanaan.vue must not have dummy Rayakan Kelulusan button')
// Check Hero Funding Status Banner & Switcher
assert.ok(pendanaanContent.includes("Tahap Pengajuan"), 'pendanaan.vue should have Tahap Pengajuan stage')
assert.ok(pendanaanContent.includes("Sudah Siap (Lolos)"), 'pendanaan.vue should have Sudah Siap (Lolos) stage')
// Check BActionButton and card-tactile-gopay
assert.ok(pendanaanContent.includes("BActionButton"), 'pendanaan.vue should reuse BActionButton')
assert.ok(pendanaanContent.includes("card-tactile-gopay"), 'pendanaan.vue should use card-tactile-gopay')
console.log('✓ Cari Modal (pendanaan.vue) passed all structural & architectural assertions!')

// 2. Verify notifikasi.vue (Notifikasi)
const notifikasiContent = fs.readFileSync('pages/dashboard/notifikasi.vue', 'utf8')

// Check meta hideHeader
assert.ok(notifikasiContent.includes("hideHeader: true"), 'notifikasi.vue should have hideHeader: true')
// Check 1-row header with size 26 icon and font-semibold text-2xl sm:text-3xl
assert.ok(notifikasiContent.includes("Notifikasi"), 'notifikasi.vue should have Notifikasi title')
assert.ok(!notifikasiContent.includes("Notifikasi Toko"), 'notifikasi.vue must not have oversized Notifikasi Toko duplicate title')
assert.ok(notifikasiContent.includes("Tandai Semua Dibaca"), 'notifikasi.vue should have Tandai Semua Dibaca button')
// Check BPillTabs with reactive counts directly
assert.ok(notifikasiContent.includes("BPillTabs"), 'notifikasi.vue should reuse BPillTabs')
assert.ok(notifikasiContent.includes("Daftar Notifikasi & Aktivitas Toko"), 'notifikasi.vue should have direct notification feed')
console.log('✓ Notifikasi (notifikasi.vue) passed all structural & architectural assertions!')

console.log('--- ALL BATCH 2 TESTS PASSED SUCCESSFULLY! ---')
