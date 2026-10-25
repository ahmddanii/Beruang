<template>
  <div ref="pageRootRef" class="space-y-8 pb-10 max-w-2xl mx-auto">
    <!-- Breadcrumb & Header -->
    <div>
      <div class="flex items-center gap-2 text-xs text-neutral-500 mb-3">
        <NuxtLink :to="`/investor/umkm/${umkmId}`" class="hover:text-primary-600 transition-colors flex items-center gap-1.5">
          <HugeiconsIcon :icon="ArrowLeft02Icon" :size="14" :stroke-width="2" />
          <span>Kembali ke Profil Usaha</span>
        </NuxtLink>
      </div>
      <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
        Ajukan Akses Data Room Privat
      </h1>
      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1.5">
        Pemilik usaha <strong>{{ item?.name }}</strong> akan menerima permohonan Anda dan memutuskan izin pembukaan data finansial riil.
      </p>
    </div>

    <!-- Alert Submitted -->
    <BAlert
      v-if="submitted"
      variant="success"
      title="Permintaan Akses Berhasil Terkirim"
      message="Notifikasi instan telah diteruskan ke WhatsApp & dashboard pemilik usaha. Anda akan menerima pemberitahuan saat permohonan disetujui."
    />

    <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none space-y-6">
      <!-- Target Summary Box -->
      <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-between">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-xl bg-amber-400 p-2 shadow-xs shrink-0 flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div>
            <span class="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">{{ item?.code }}</span>
            <h3 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
              {{ item?.name }}
            </h3>
            <span class="text-xs text-neutral-500">{{ item?.sector }} • {{ item?.city }}</span>
          </div>
        </div>

        <BBadge variant="gold" size="sm" class="flex items-center gap-1">
          <HugeiconsIcon :icon="Award01Icon" :size="13" :stroke-width="2" />
          <span>Ready for Funding</span>
        </BBadge>
      </div>

      <form @submit.prevent="submitRequest" class="space-y-5">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
            Rencana Tiket Investasi (Rp)
          </label>
          <input
            v-model.number="ticketSize"
            type="number"
            required
            step="10000000"
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
          />
          <span class="text-[11px] text-neutral-500 mt-1.5 block tabular-nums">
            Estimasi Nilai: <strong class="text-neutral-900 dark:text-white">Rp {{ ticketSize.toLocaleString('id-ID') }}</strong>
          </span>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
            Skema Pendanaan yang Diminati
          </label>
          <select
            v-model="scheme"
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
          >
            <option value="REVENUE_SHARE">Bagi Hasil / Revenue Sharing (Syariah-Friendly)</option>
            <option value="PERFORMANCE_LOAN">Pinjaman Modal Kerja Berbasis Kinerja</option>
            <option value="EQUITY">Penyertaan Saham Ekuitas Minoritas</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
            Pesan Perkenalan & Alasan Tertarik
          </label>
          <textarea
            v-model="message"
            rows="3"
            required
            placeholder="Perkenalkan diri atau sindikasi Anda dan sampaikan poin utama yang membuat Anda tertarik pada bisnis ini..."
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>

        <!-- NDA Agreement -->
        <div class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/70">
          <label class="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              v-model="ndaAgreed"
              required
              class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 mt-0.5"
            />
            <span class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Saya menyetujui <strong class="text-neutral-900 dark:text-white">Perjanjian Kerahasiaan (NDA) Beruang</strong> dan mengikat diri untuk tidak menyebarluaskan data rekening koran, laporan audit, atau dokumen privat yang diakses.
            </span>
          </label>
        </div>

        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <NuxtLink :to="`/investor/umkm/${umkmId}`">
            <BButton variant="ghost" size="md">Batal</BButton>
          </NuxtLink>

          <BButton
            type="submit"
            variant="primary"
            size="lg"
            :disabled="!ndaAgreed"
            :loading="loading"
            class="flex items-center gap-2"
          >
            <span>Kirimkan Permintaan Akses</span>
            <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2" />
          </BButton>
        </div>
      </form>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { useRoute, useRouter } from 'vue-router'
import { useInvestorStore } from '~/stores/investor'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BBadge from '~/components/base/BBadge.vue'
import BAlert from '~/components/base/BAlert.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Award01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const route = useRoute()
const router = useRouter()
const umkmId = computed(() => route.params.id as string || 'umkm-01')

const investorStore = useInvestorStore()
const pageRootRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

onMounted(() => {
  if (typeof window !== 'undefined' && pageRootRef.value) {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (!prefersReducedMotion) {
      gsapCtx = gsap.context(() => {
        gsap.fromTo(
          pageRootRef.value!.children,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'all'
          }
        )
      }, pageRootRef.value)
    }
  }
})

onBeforeUnmount(() => {
  if (gsapCtx) {
    gsapCtx.revert()
    gsapCtx = null
  }
})

const item = computed(() => {
  return investorStore.marketplaceList.find(m => m.id === umkmId.value) || investorStore.marketplaceList[0]
})

const initialAmount = Number(route.query.amount) || 150000000
const initialTenor = route.query.tenor ? String(route.query.tenor) : '24'
const initialShare = route.query.share ? String(route.query.share) : '15'

const ticketSize = ref(initialAmount)
const scheme = ref('REVENUE_SHARE')
const defaultPitchNote = route.query.amount
  ? `Halo, berdasarkan simulasi kalkulator ROI dengan rencana komitmen modal Rp ${new Intl.NumberFormat('id-ID').format(initialAmount)} (tenor ${initialTenor} bulan, porsi bagi hasil ${initialShare}%), kami bermaksud mengajukan pembukaan data room privat untuk kajian uji tuntas resmi.`
  : 'Halo, kami sangat tertarik dengan konsistensi margin dan rencana ekspansi 2 gerai baru di Jawa Barat.'
const message = ref(defaultPitchNote)
const ndaAgreed = ref(true)
const loading = ref(false)
const submitted = ref(false)

function submitRequest() {
  loading.value = true
  setTimeout(() => {
    investorStore.requestAccess(umkmId.value, ticketSize.value, message.value)
    loading.value = false
    submitted.value = true
    setTimeout(() => {
      router.push(`/investor/umkm/${umkmId.value}`)
    }, 1500)
  }, 500)
}
</script>
