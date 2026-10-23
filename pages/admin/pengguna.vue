<template>
  <div class="space-y-8 pb-10">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
        Kelola Pengguna Platform
      </h1>
      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1.5">
        Daftar seluruh akun terdaftar di ekosistem Beruang (Pemilik Usaha, Konsultan, Investor, dan Administrator).
      </p>
    </div>

    <!-- Filter and Search Bar -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <!-- Search Input -->
      <div class="relative flex-1 max-w-sm">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama, bisnis, atau email..."
          class="w-full pl-3.5 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs focus:ring-2 focus:ring-primary-500 focus:outline-none"
        />
      </div>

      <!-- Role Filter Pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <button
          v-for="r in roleFilters"
          :key="r.value"
          type="button"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition-all border',
            selectedRole === r.value
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs'
              : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
          ]"
          @click="selectedRole = r.value"
        >
          {{ r.label }}
        </button>
      </div>
    </div>

    <!-- Users Table Card -->
    <div class="bg-white dark:bg-[#151519] rounded-2xl border border-[#E4E7EC] dark:border-[#2B2B31] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 font-heading font-semibold uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800">
            <tr>
              <th class="px-6 py-3.5">Nama & Usaha / Lembaga</th>
              <th class="px-6 py-3.5">Email & Kontak</th>
              <th class="px-6 py-3.5">Peran</th>
              <th class="px-6 py-3.5">Status Akun</th>
              <th class="px-6 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800 font-medium">
            <tr
              v-for="u in filteredUsers"
              :key="u.email"
              class="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 font-heading font-bold text-xs flex items-center justify-center shrink-0">
                    {{ u.name.slice(0, 2).toUpperCase() }}
                  </div>
                  <div>
                    <span class="font-heading font-bold text-neutral-900 dark:text-white block">
                      {{ u.name }}
                    </span>
                    <span class="text-[11px] text-neutral-500 font-normal">
                      {{ u.org }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="font-mono text-neutral-700 dark:text-neutral-300 block">{{ u.email }}</span>
                <span class="text-[11px] text-neutral-400">{{ u.phone }}</span>
              </td>
              <td class="px-6 py-4">
                <BBadge
                  :variant="u.role === 'UMKM' ? 'primary' : u.role === 'KONSULTAN' ? 'success' : u.role === 'INVESTOR' ? 'gold' : 'secondary'"
                  size="sm"
                >
                  {{ u.role }}
                </BBadge>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px]">
                  <HugeiconsIcon :icon="CheckmarkCircle02Icon" :size="14" :stroke-width="2" />
                  <span>Aktif Terverifikasi</span>
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button
                  type="button"
                  class="text-xs text-primary-600 font-heading font-semibold hover:underline"
                  @click="viewUser(u.name)"
                >
                  Kelola ↗
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BBadge from '~/components/base/BBadge.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  CheckmarkCircle02Icon
} from '@hugeicons/core-free-icons'
import { useApi } from '~/composables/useApi'

definePageMeta({
  layout: 'dashboard'
})

const searchQuery = ref('')
const selectedRole = ref('ALL')

const roleFilters = [
  { label: 'Semua Peran', value: 'ALL' },
  { label: 'Pemilik Usaha (UMKM)', value: 'UMKM' },
  { label: 'Konsultan', value: 'KONSULTAN' },
  { label: 'Investor', value: 'INVESTOR' },
  { label: 'Administrator', value: 'ADMIN' }
]

const users = ref([
  { name: 'Budi Setiawan', org: 'Kopi Senja Nusantara', email: 'budi@kopisenja.id', phone: '0812-3456-7890', role: 'UMKM' },
  { name: 'Dra. Maya Suryani, M.M.', org: 'Konsultan Senior BNSP (F&B)', email: 'maya@beruang.id', phone: '0811-9876-5432', role: 'KONSULTAN' },
  { name: 'Hendro Wicaksono', org: 'Nusantara Angel Syndicate', email: 'hendro@nusantara.id', phone: '0813-2233-4455', role: 'INVESTOR' },
  { name: 'Siti Rahmawati', org: 'Batik Lestari Malang', email: 'siti@batiklestari.id', phone: '0857-1122-3344', role: 'UMKM' },
  { name: 'Bambang Sudarsono, S.E.', org: 'Konsultan Rantai Pasok', email: 'bambang@beruang.id', phone: '0812-9988-7766', role: 'KONSULTAN' },
  { name: 'Super Admin Beruang', org: 'Operations & Compliance Lead', email: 'admin@beruang.id', phone: '0811-0000-1111', role: 'ADMIN' }
])

onMounted(async () => {
  try {
    const res = await useApi<any>('/admin/users')
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      users.value = res.data
    }
  } catch (err: any) {
    console.warn('Gagal memuat pengguna ekosistem live:', err?.message)
  }
})

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const matchRole = selectedRole.value === 'ALL' || u.role === selectedRole.value
    const matchSearch = !searchQuery.value ||
      u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.org.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchRole && matchSearch
  })
})

function viewUser(name: string) {
  alert(`Detail dan izin akses untuk pengguna ${name} ditampilkan.`)
}
</script>
