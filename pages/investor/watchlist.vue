<template>
  <div ref="pageRootRef" class="space-y-6 pb-20 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- Toast Feedback Notification -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div
        v-if="toastMessage"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-neutral-900/90 dark:bg-neutral-800/90 text-white border border-neutral-700/60 backdrop-blur-md text-xs font-poppins font-semibold shadow-xl flex items-center gap-2 pointer-events-none"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="text-emerald-400 shrink-0" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- 1. Top Header: Title on Left (btn kembali ke jaringan dihapus) -->
    <div class="flex items-center gap-2.5 sm:gap-3 min-h-[44px]">
      <HugeiconsIcon
        :icon="Bookmark02Icon"
        :size="26"
        :stroke-width="2.2"
        class="text-neutral-900 dark:text-white shrink-0"
      />
      <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
        {{ t('watchlist_title') || 'Simpan' }}
      </h1>
    </div>

    <!-- Empty State if empty -->
    <div
      v-if="investorStore.watchlist.length === 0"
      class="card-tactile-gopay rounded-2xl p-12 sm:p-16 border text-center max-w-lg mx-auto space-y-4"
    >
      <div class="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[#00800e] dark:text-emerald-400 flex items-center justify-center mx-auto">
        <HugeiconsIcon :icon="Bookmark02Icon" :size="24" :stroke-width="1.8" />
      </div>
      <div>
        <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
          {{ t('watchlist_empty_title') || 'Belum Ada Bisnis Tersimpan' }}
        </h3>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mt-1 leading-relaxed font-sans">
          {{ t('watchlist_empty_desc') || 'Jelajahi Jaringan dan klik ikon simpan pada kartu UMKM untuk menyimpan bisnis potensial ke daftar pantau Anda.' }}
        </p>
      </div>
      <div class="pt-2">
        <NuxtLink
          to="/investor"
          class="btn-pill-action group cursor-pointer inline-flex items-center gap-2"
        >
          <span>{{ t('watchlist_explore_btn') || 'Eksplorasi Feed UMKM' }}</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="15" :stroke-width="2.2" />
        </NuxtLink>
      </div>
    </div>

    <!-- Watchlist Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in investorStore.watchlist"
        :key="item.id"
        class="gsap-watchlist-card lazy-render-card card-tactile-gopay rounded-2xl p-5 sm:p-6 border flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all font-poppins space-y-4.5 group"
      >
        <div class="space-y-3.5">
          <!-- 1. Top Row: Status Pill Placed Above UMKM Name -->
          <div class="flex items-center justify-between">
            <span
              :class="[
                'inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border tabular-nums',
                getStatusBadge(item.accessStatus).class
              ]"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="getStatusBadge(item.accessStatus).dot" />
              <span>{{ getStatusBadge(item.accessStatus).label }}</span>
            </span>
          </div>

          <!-- 2. Store Identity & Location (Without blue text hover effect) -->
          <div>
            <h3 class="font-poppins font-bold text-lg text-neutral-900 dark:text-white leading-tight">
              {{ item.name }}
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-2">
              <span>{{ item.sector }}</span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <HugeiconsIcon :icon="Location01Icon" :size="12" />
                {{ item.city }}
              </span>
            </p>
          </div>

          <!-- 3. Pitch Summary -->
          <p class="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed font-sans">
            "{{ item.pitchSummary }}"
          </p>
        </div>

        <!-- 4. Footer Actions Row: [Icon Save Only] [Btn Lihat Profil (Putih)] [Btn Koneksi (Direct ke pesan)] -->
        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-2.5">
          <!-- Btn Save: Base dari btn putih tapi tanpa label (Filled icon karena status tersimpan) -->
          <BActionButton
            variant="default"
            custom-class="!w-11 !h-11 !min-w-[44px] !max-w-[44px] !px-0 shrink-0 justify-center text-center"
            :title="t('watchlist_remove_tooltip') || 'Hapus dari Simpanan'"
            :aria-label="t('watchlist_remove_tooltip') || 'Hapus dari Simpanan'"
            @click="removeFromWatchlist(item)"
          >
            <template #icon>
              <HugeiconsIcon
                :icon="Bookmark02Icon"
                :size="17"
                :stroke-width="2"
                class="shrink-0 [&_path]:fill-current fill-current text-[#156374] dark:text-[#50AABF]"
              />
            </template>
          </BActionButton>

          <!-- Btn Lihat Profil (White button / default) -->
          <BActionButton
            :to="`/investor/umkm/${item.id}`"
            variant="default"
            custom-class="flex-1 justify-center text-center text-xs py-2"
          >
            {{ t('watchlist_view_profile') || 'Lihat Profil' }}
          </BActionButton>

          <!-- Btn Koneksi (Direct ke pesan dari si UMKM) -->
          <BActionButton
            variant="green"
            custom-class="flex-1 justify-center text-center text-xs py-2"
            @click="goToChat(item)"
          >
            {{ t('watchlist_connect') || 'Koneksi' }}
          </BActionButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import { useChatStore } from '~/stores/chat'
import { useLanguage } from '~/composables/useLanguage'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowRight01Icon,
  Bookmark02Icon,
  CheckmarkCircle01Icon,
  Location01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const investorStore = useInvestorStore()
const chatStore = useChatStore()
const { t } = useLanguage()

const pageRootRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

onMounted(() => {
  if (typeof window !== 'undefined' && pageRootRef.value) {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (!prefersReducedMotion) {
      gsapCtx = gsap.context(() => {
        const cards = pageRootRef.value?.querySelectorAll('.gsap-watchlist-card, .card-tactile-gopay')
        if (cards && cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.05,
              ease: 'power2.out',
              clearProps: 'all'
            }
          )
        }
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

// Toast State
const toastMessage = ref('')
let toastTimer: any = null

function triggerToast(msg: string) {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}

function removeFromWatchlist(item: MarketplaceUmkm) {
  investorStore.toggleBookmark(item.id)
  const template = t('watchlist_removed_toast') || 'dihapus dari daftar simpan.'
  triggerToast(`${item.name} ${template}`)
}

function goToChat(item: MarketplaceUmkm) {
  const threadId = chatStore.startOrGetThread(item.id, item.name)
  navigateTo(`/investor/pesan?threadId=${threadId}`)
}

function getStatusBadge(status?: string) {
  if (status === 'APPROVED') {
    return {
      label: t('watchlist_status_approved') || 'Diterima',
      class: 'bg-emerald-50 dark:bg-emerald-950/60 text-[#00800e] dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
      dot: 'bg-[#00800e]'
    }
  }
  if (status === 'REJECTED') {
    return {
      label: t('watchlist_status_rejected') || 'Ditolak',
      class: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
      dot: 'bg-rose-600'
    }
  }
  return {
    label: t('watchlist_status_pending') || 'Menunggu',
    class: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    dot: 'bg-amber-500'
  }
}
</script>
