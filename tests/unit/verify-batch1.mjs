import fs from 'node:fs'
import assert from 'node:assert'

console.log('--- RUNNING BATCH 1 VERIFICATION ---')

// 1. Verify rencana-aksi.vue (Progress Tugas)
const rencanaAksiContent = fs.readFileSync('pages/dashboard/rencana-aksi.vue', 'utf8')

// Check meta hideHeader
assert.ok(rencanaAksiContent.includes("hideHeader: true"), 'rencana-aksi.vue should have hideHeader: true')
// Check 1-row header
assert.ok(rencanaAksiContent.includes("Progress Tugas") || rencanaAksiContent.includes("Rencana Aksi"), 'rencana-aksi.vue should have Progress Tugas title')
// Check BPillTabs and components
assert.ok(rencanaAksiContent.includes("BPillTabs"), 'rencana-aksi.vue should reuse BPillTabs')
assert.ok(rencanaAksiContent.includes("card-tactile-gopay"), 'rencana-aksi.vue should use card-tactile-gopay')
// Check no forbidden HPP or audit jargon
assert.ok(!rencanaAksiContent.includes("Kelola HPP"), 'rencana-aksi.vue must not have forbidden jargon')
console.log('✓ Progress Tugas (rencana-aksi.vue) passed all structural & architectural assertions!')

// 2. Verify penilaian.vue (Kesehatan Bisnis)
const penilaianContent = fs.readFileSync('pages/dashboard/penilaian.vue', 'utf8')

// Check meta hideHeader
assert.ok(penilaianContent.includes("hideHeader: true"), 'penilaian.vue should have hideHeader: true')
// Check 1-row header
assert.ok(penilaianContent.includes("Kesehatan Bisnis"), 'penilaian.vue should have Kesehatan Bisnis title')
assert.ok(penilaianContent.includes("Chat Konsultan"), 'penilaian.vue should have Chat Konsultan action')
// Check Tren Untung Bersih header and chart dropdown pills matching Pergerakan Uang Toko
assert.ok(penilaianContent.includes("Tren Untung Bersih"), 'penilaian.vue should have Tren Untung Bersih chart title')
assert.ok(!penilaianContent.includes("Tren Untung Bersih (Jan - Jun)"), 'penilaian.vue must not have (Jan - Jun) in Tren Untung Bersih title')
assert.ok(penilaianContent.includes("activeChartTypeLabel"), 'penilaian.vue should have chart type dropdown pill matching Pergerakan Uang Toko')
assert.ok(penilaianContent.includes("activePeriodLabel"), 'penilaian.vue should have time range dropdown pill matching Pergerakan Uang Toko')
// Check 4 metric cards and card-tactile-gopay
assert.ok(penilaianContent.includes("card-tactile-gopay"), 'penilaian.vue should use card-tactile-gopay')
assert.ok(penilaianContent.includes("BActionButton"), 'penilaian.vue should reuse BActionButton')
// Check no forbidden jargon
assert.ok(!penilaianContent.includes("Kelola HPP"), 'penilaian.vue must not have forbidden jargon')
console.log('✓ Kesehatan Bisnis (penilaian.vue) passed all structural & architectural assertions!')

console.log('--- ALL BATCH 1 TESTS PASSED SUCCESSFULLY! ---')
