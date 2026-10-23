import fs from 'node:fs'
import assert from 'node:assert'

console.log('--- RUNNING BATCH 1 VERIFICATION ---')

// 1. Verify rencana-aksi.vue
const rencanaAksiContent = fs.readFileSync('pages/dashboard/rencana-aksi.vue', 'utf8')

// Check meta hideHeader
assert.ok(rencanaAksiContent.includes("hideHeader: true"), 'rencana-aksi.vue should have hideHeader: true')
// Check 1-row header
assert.ok(rencanaAksiContent.includes("Progress Tugas") || rencanaAksiContent.includes("Rencana Aksi"), 'rencana-aksi.vue should have Progress Tugas title')
assert.ok(rencanaAksiContent.includes("Tambah Tugas") || rencanaAksiContent.includes("Tambah Rencana"), 'rencana-aksi.vue should have Tambah Tugas action button')
// Check unified Hero Roadmap Card
assert.ok(rencanaAksiContent.includes("Roadmap Kelulusan Tugas Usaha"), 'rencana-aksi.vue should have Roadmap Kelulusan Tugas Usaha')
assert.ok(rencanaAksiContent.includes("tasksProgressPct"), 'rencana-aksi.vue should have progress bar')
// Check BPillTabs and BModal reusability
assert.ok(rencanaAksiContent.includes("BPillTabs"), 'rencana-aksi.vue should reuse BPillTabs')
assert.ok(rencanaAksiContent.includes("BModal"), 'rencana-aksi.vue should reuse BModal')
assert.ok(rencanaAksiContent.includes("BActionButton"), 'rencana-aksi.vue should reuse BActionButton')
// Check no forbidden HPP or audit jargon
assert.ok(!rencanaAksiContent.includes("Kelola HPP"), 'rencana-aksi.vue must not have forbidden jargon')
console.log('✓ Rencana Aksi page passed all structural & architectural assertions!')

// 2. Verify penilaian.vue
const penilaianContent = fs.readFileSync('pages/dashboard/penilaian.vue', 'utf8')

// Check meta hideHeader
assert.ok(penilaianContent.includes("hideHeader: true"), 'penilaian.vue should have hideHeader: true')
// Check 1-row header
assert.ok(penilaianContent.includes("Cek Kesehatan"), 'penilaian.vue should have Cek Kesehatan title')
assert.ok(penilaianContent.includes("Unduh Rapor"), 'penilaian.vue should have Unduh Rapor action')
assert.ok(penilaianContent.includes("Lihat Sertifikat"), 'penilaian.vue should have Lihat Sertifikat action')
// Check Radar Hero Section
assert.ok(penilaianContent.includes("BRadarChart"), 'penilaian.vue should reuse BRadarChart')
assert.ok(penilaianContent.includes("Radar 5 Aspek Fundamental Toko"), 'penilaian.vue should display 5 Aspek Radar')
assert.ok(penilaianContent.includes("Rincian Evaluasi 5 Pilar Bisnis"), 'penilaian.vue should display 5 Pillars details')
// Check BModal
assert.ok(penilaianContent.includes("BModal"), 'penilaian.vue should reuse BModal')
console.log('✓ Cek Kesehatan page passed all structural & architectural assertions!')

console.log('--- ALL BATCH 1 TESTS PASSED SUCCESSFULLY! ---')
