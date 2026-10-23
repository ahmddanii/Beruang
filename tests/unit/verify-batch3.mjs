import fs from 'node:fs'
import assert from 'node:assert'

console.log('--- RUNNING BATCH 3 VERIFICATION ---')

// 1. Verify profile.vue (Profil Usaha)
const profileContent = fs.readFileSync('pages/dashboard/profile.vue', 'utf8')

// Check meta hideHeader
assert.ok(profileContent.includes("hideHeader: true"), 'profile.vue should have hideHeader: true')
// Check 1-row header
assert.ok(profileContent.includes("Profil Usaha"), 'profile.vue should have Profil Usaha title')
assert.ok(profileContent.includes("Bagikan Profil"), 'profile.vue should have Bagikan Profil action')
// Check components reuse
assert.ok(profileContent.includes("BStoreBanner"), 'profile.vue should reuse BStoreBanner')
assert.ok(profileContent.includes("BBadge"), 'profile.vue should reuse BBadge')
assert.ok(profileContent.includes("BVerifiedBadge"), 'profile.vue should reuse BVerifiedBadge')
assert.ok(profileContent.includes("BActionButton"), 'profile.vue should reuse BActionButton')
assert.ok(profileContent.includes("Share08Icon"), 'profile.vue should use Share08Icon')
assert.ok(profileContent.includes("BShareModal"), 'profile.vue should use BShareModal')
console.log('✓ Profil Usaha (profile.vue) passed all structural & architectural assertions!')

// 2. Verify pesan.vue (Pesan Diskusi)
const pesanContent = fs.readFileSync('pages/dashboard/pesan.vue', 'utf8')

// Check meta hideHeader
assert.ok(pesanContent.includes("hideHeader: true"), 'pesan.vue should have hideHeader: true')
// Check 1-row header
assert.ok(pesanContent.includes("Pesan"), 'pesan.vue should have Pesan title')
assert.ok(pesanContent.includes("Ruang Modal"), 'pesan.vue should have Ruang Modal action button')
// Check components and structure
assert.ok(pesanContent.includes("Pesan Masuk Investor"), 'pesan.vue should have threads sidebar')
assert.ok(pesanContent.includes("BActionButton"), 'pesan.vue should reuse BActionButton')
assert.ok(pesanContent.includes("card-tactile-gopay"), 'pesan.vue should use card-tactile-gopay')
console.log('✓ Pesan Diskusi (pesan.vue) passed all structural & architectural assertions!')

console.log('--- ALL BATCH 3 TESTS PASSED SUCCESSFULLY! ---')
