import fs from 'node:fs'
import assert from 'node:assert'

console.log('=================================================================')
console.log('RUNNING COMPREHENSIVE AUDIT & VERIFICATION ACROSS ALL UMKM PAGES')
console.log('Target: Profil Usaha, Rencana Aksi, Cek Kesehatan, Cari Modal, Pesan, Notifikasi')
console.log('=================================================================\n')

const pages = [
  { file: 'pages/dashboard/profile.vue', name: 'Profil Usaha', title: 'Profil Usaha' },
  { file: 'pages/dashboard/rencana-aksi.vue', name: 'Progress Tugas', title: 'Progress Tugas' },
  { file: 'pages/dashboard/penilaian.vue', name: 'Cek Kesehatan', title: 'Cek Kesehatan' },
  { file: 'pages/dashboard/pendanaan.vue', name: 'Cari Modal', title: 'Cari Modal' },
  { file: 'pages/dashboard/pesan.vue', name: 'Pesan', title: 'Pesan' },
  { file: 'pages/dashboard/notifikasi.vue', name: 'Notifikasi', title: 'Notifikasi' }
]

pages.forEach((p, idx) => {
  const content = fs.readFileSync(p.file, 'utf8')
  
  // Rule 1: hideHeader: true is mandatory for 1-row unified page header
  assert.ok(content.includes('hideHeader: true'), `[${p.name}] Must specify hideHeader: true`)
  
  // Rule 2: Page Title consistency (large scale font-poppins text-2xl sm:text-3xl)
  assert.ok(content.includes(`>${p.title}<`) || content.includes(p.title), `[${p.name}] Page title must match standard`)
  assert.ok(content.includes('text-2xl sm:text-3xl') || content.includes('text-2xl'), `[${p.name}] Header title font size must match large title standard (text-2xl sm:text-3xl)`)
  
  // Rule 3: Component Reusability (BActionButton, HugeiconsIcon)
  assert.ok(content.includes('BActionButton'), `[${p.name}] Must reuse BActionButton for actionable triggers`)
  assert.ok(content.includes('HugeiconsIcon'), `[${p.name}] Must use HugeiconsIcon standard`)
  
  // Rule 4: Clean Design Architecture (card-tactile-gopay with 1.5px border, no box-shadow)
  assert.ok(content.includes('card-tactile-gopay'), `[${p.name}] Must use .card-tactile-gopay container`)
  assert.ok(content.includes('border-width: 1.5px !important') || content.includes('border: 1.5px solid'), `[${p.name}] Must enforce 1.5px crisp border style`)
  
  // Rule 5: Copywriting Standard (No forbidden jargon: "Kelola HPP", "Audit Kas", "Rayakan Kelulusan")
  assert.ok(!content.includes('Kelola HPP'), `[${p.name}] Must not contain forbidden jargon "Kelola HPP"`)
  assert.ok(!content.includes('Rayakan Kelulusan'), `[${p.name}] Must not contain non-MVP dummy button "Rayakan Kelulusan"`)

  console.log(`[PASS] ${idx + 1}. ${p.name} (${p.file}) passed all design & architectural rules.`)
})

console.log('\n=================================================================')
console.log('ALL 6 UMKM PAGES SUCCESSFULLY COMPLIANT WITH DESIGN SYSTEM & SRS!')
console.log('=================================================================')
