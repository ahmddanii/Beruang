<template>
  <Teleport to="body">
    <div
      v-if="isRendered"
      ref="drawerContainerRef"
      class="fixed inset-0 z-50 flex justify-end overflow-hidden font-poppins"
      role="dialog"
      aria-modal="true"
      aria-label="Catat Kas Toko Baru"
      @keydown="handleKeydown"
    >
      <!-- Backdrop Scrim with subtle blur -->
      <div
        ref="backdropRef"
        class="fixed inset-0 bg-neutral-950/45 backdrop-blur-xs transition-opacity cursor-pointer"
        tabindex="-1"
        aria-hidden="true"
        @click="closeDrawer"
      />

      <!-- Slide-Over Sidebar Panel -->
      <div
        ref="panelRef"
        class="relative w-full max-w-lg sm:max-w-xl bg-[#F8FAFC] dark:bg-[#0C121D] h-full shadow-2xl flex flex-col border-l border-[#E2E8F0] dark:border-neutral-800 z-10 overflow-hidden will-change-transform"
      >
        <!-- 1. Header: Generous Top Padding & Rotating Exit Icon -->
        <div class="pt-7 sm:pt-8 pb-5 px-6 sm:px-8 border-b border-[#E2E8F0] dark:border-neutral-800 bg-white dark:bg-[#13161F] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3.5 min-w-0">
            <div class="w-11 h-11 rounded-xl bg-[#E6F4F7] dark:bg-[#156374]/25 border border-[#156374]/20 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="Coins01Icon" :size="22" :stroke-width="2.2" />
            </div>
            <div class="min-w-0">
              <h2 class="font-poppins font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white tracking-tight truncate">
                Catat Kas Toko Baru
              </h2>
              <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans mt-0.5 truncate">
                Buku Catatan Penjualan & Biaya Harian Toko
              </p>
            </div>
          </div>

          <!-- Close Button with Rotating 'X' Icon -->
          <button
            ref="closeBtnRef"
            type="button"
            class="group w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-[#E6F4F7] dark:hover:bg-[#156374]/30 text-neutral-500 dark:text-neutral-400 hover:text-[#156374] dark:hover:text-[#50AABF] flex items-center justify-center transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-none"
            title="Tutup (Esc)"
            aria-label="Tutup Panel Catat Kas"
            @click="closeDrawer"
          >
            <span ref="closeIconRef" class="inline-flex transition-transform duration-300 ease-out group-hover:rotate-90 group-active:rotate-180">
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" :stroke-width="2.2" />
            </span>
          </button>
        </div>

        <!-- 2. Form Body (Scrollable, Tactile Card Sections) -->
        <form
          id="catat-kas-sidebar-form"
          @submit.prevent="handleSaveTransaction"
          class="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 scrollbar-none font-poppins"
        >
          <!-- Section 1: Jenis Aliran Kas -->
          <div class="drawer-form-section bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800/80 rounded-xl p-5 shadow-2xs space-y-3">
            <div>
              <label class="block text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                Pilih Jenis Aliran Kas
              </label>
              <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                Tentukan apakah transaksi ini uang masuk atau beban biaya toko
              </p>
            </div>

            <div class="grid grid-cols-3 gap-2.5 sm:gap-3" role="radiogroup" aria-label="Jenis Aliran Kas">
              <!-- Uang Masuk -->
              <button
                type="button"
                role="radio"
                :aria-checked="newTxForm.category === 'PEMASUKAN'"
                :class="[
                  'p-3 sm:p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer relative text-center focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none',
                  newTxForm.category === 'PEMASUKAN'
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-500 text-emerald-900 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'bg-[#F8FAFC] dark:bg-[#181C26] border-[#E2E8F0] dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-[#156374]/30 hover:bg-[#E6F4F7]/40'
                ]"
                @click="newTxForm.category = 'PEMASUKAN'"
                @keydown.space.prevent="newTxForm.category = 'PEMASUKAN'"
              >
                <div
                  :class="[
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                    newTxForm.category === 'PEMASUKAN'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-[#E2E8F0] dark:border-neutral-700'
                  ]"
                >
                  <HugeiconsIcon :icon="ArrowDownLeft01Icon" :size="18" :stroke-width="2.4" />
                </div>
                <div>
                  <span class="text-sm font-bold block leading-tight">Uang Masuk</span>
                  <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-tight mt-0.5 block">Penjualan</span>
                </div>
              </button>

              <!-- Modal Jualan -->
              <button
                type="button"
                role="radio"
                :aria-checked="newTxForm.category === 'MODAL_JUALAN'"
                :class="[
                  'p-3 sm:p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer relative text-center focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-none',
                  newTxForm.category === 'MODAL_JUALAN'
                    ? 'bg-[#E6F4F7] dark:bg-[#156374]/30 border-[#156374] dark:border-[#50AABF] text-[#156374] dark:text-[#50AABF] ring-2 ring-[#156374]/20'
                    : 'bg-[#F8FAFC] dark:bg-[#181C26] border-[#E2E8F0] dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-[#156374]/30 hover:bg-[#E6F4F7]/40'
                ]"
                @click="newTxForm.category = 'MODAL_JUALAN'"
                @keydown.space.prevent="newTxForm.category = 'MODAL_JUALAN'"
              >
                <div
                  :class="[
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                    newTxForm.category === 'MODAL_JUALAN'
                      ? 'bg-[#156374] dark:bg-[#50AABF] text-white dark:text-[#0A0D14]'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-[#E2E8F0] dark:border-neutral-700'
                  ]"
                >
                  <HugeiconsIcon :icon="ShoppingBag01Icon" :size="18" :stroke-width="2.2" />
                </div>
                <div>
                  <span class="text-sm font-bold block leading-tight">Modal Jualan</span>
                  <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-tight mt-0.5 block">Bahan Baku</span>
                </div>
              </button>

              <!-- Operasional -->
              <button
                type="button"
                role="radio"
                :aria-checked="newTxForm.category === 'OPERASIONAL'"
                :class="[
                  'p-3 sm:p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer relative text-center focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none',
                  newTxForm.category === 'OPERASIONAL'
                    ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 dark:border-amber-500 text-amber-900 dark:text-amber-300 ring-2 ring-amber-500/20'
                    : 'bg-[#F8FAFC] dark:bg-[#181C26] border-[#E2E8F0] dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-[#156374]/30 hover:bg-[#E6F4F7]/40'
                ]"
                @click="newTxForm.category = 'OPERASIONAL'"
                @keydown.space.prevent="newTxForm.category = 'OPERASIONAL'"
              >
                <div
                  :class="[
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                    newTxForm.category === 'OPERASIONAL'
                      ? 'bg-amber-500 text-white'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-[#E2E8F0] dark:border-neutral-700'
                  ]"
                >
                  <HugeiconsIcon :icon="Building01Icon" :size="18" :stroke-width="2.2" />
                </div>
                <div>
                  <span class="text-sm font-bold block leading-tight">Operasional</span>
                  <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-tight mt-0.5 block">Sewa/Listrik</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Section 2: Nominal Transaksi (Large Display + Quick Addition Chips) -->
          <div class="drawer-form-section bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800/80 rounded-xl p-5 shadow-2xs space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label class="block text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                  Nominal Transaksi (Rupiah)
                </label>
                <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Masukkan nilai rupiah sesuai bukti kas
                </p>
              </div>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0',
                  newTxForm.category === 'PEMASUKAN'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800'
                ]"
              >
                {{ newTxForm.category === 'PEMASUKAN' ? 'Uang Masuk (+)' : 'Uang Keluar (-)' }}
              </span>
            </div>

            <!-- Big Input Display -->
            <div class="flex items-center gap-3 pb-3 border-b border-[#E2E8F0] dark:border-neutral-700">
              <span class="text-2xl sm:text-3xl font-bold text-neutral-400 dark:text-neutral-500 font-poppins">Rp</span>
              <input
                ref="amountInputRef"
                v-model.number="newTxForm.amount"
                type="number"
                required
                min="1000"
                placeholder="0"
                :class="[
                  'w-full bg-transparent text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight focus:outline-none placeholder:text-neutral-300 dark:placeholder:text-neutral-600 font-poppins focus-visible:ring-2 focus-visible:ring-[#156374] rounded-lg px-2',
                  newTxForm.category === 'PEMASUKAN'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-neutral-900 dark:text-white'
                ]"
              />
            </div>

            <!-- Quick Nominal Chips -->
            <div class="space-y-2">
              <span class="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 block">
                Pintasan Penambahan Cepat:
              </span>
              <div class="flex items-center gap-2 flex-wrap">
                <button
                  v-for="chip in [50000, 100000, 250000, 500000, 1000000]"
                  :key="chip"
                  type="button"
                  class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-neutral-100 hover:bg-[#E6F4F7] hover:text-[#156374] dark:bg-[#181C26] dark:hover:bg-[#156374]/25 dark:hover:text-[#50AABF] border border-[#E2E8F0] dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-none"
                  @click="addQuickAmount(chip)"
                  @keydown.space.prevent="addQuickAmount(chip)"
                >
                  +{{ chip >= 1000000 ? `${chip / 1000000} jt` : `${chip / 1000} rb` }}
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-none"
                  @click="addQuickAmount(0)"
                  @keydown.space.prevent="addQuickAmount(0)"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <!-- Section 3: Rincian & Nama Transaksi -->
          <div class="drawer-form-section bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800/80 rounded-xl p-5 shadow-2xs space-y-2">
            <label class="block text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
              Nama Transaksi / Keperluan
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <HugeiconsIcon :icon="Note01Icon" :size="18" :stroke-width="2.0" />
              </div>
              <input
                v-model="newTxForm.title"
                type="text"
                required
                placeholder="Contoh: Belanja Biji Kopi Arabika 20kg"
                class="w-full pl-11 pr-3.5 py-3 text-sm sm:text-base rounded-xl border border-[#E2E8F0] dark:border-neutral-700 bg-white dark:bg-[#121620] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#156374]/25 focus:border-[#156374] font-poppins transition-colors focus-visible:ring-2 focus-visible:ring-[#156374]"
              />
            </div>
          </div>

          <!-- Section 4: Tanggal Pembukuan -->
          <div class="drawer-form-section bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800/80 rounded-xl p-5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between">
              <label class="block text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                Tanggal Pembukuan
              </label>
              <button
                type="button"
                class="text-xs sm:text-sm font-semibold text-[#156374] dark:text-[#50AABF] hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-none rounded"
                @click="setTodayDate"
                @keydown.space.prevent="setTodayDate"
              >
                Set Hari Ini
              </button>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <HugeiconsIcon :icon="Calendar01Icon" :size="18" :stroke-width="2.0" />
              </div>
              <input
                v-model="newTxForm.date"
                type="text"
                required
                placeholder="Contoh: 15 Oktober 2026"
                class="w-full pl-11 pr-3.5 py-3 text-sm sm:text-base rounded-xl border border-[#E2E8F0] dark:border-neutral-700 bg-white dark:bg-[#121620] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#156374]/25 focus:border-[#156374] font-poppins transition-colors focus-visible:ring-2 focus-visible:ring-[#156374]"
              />
            </div>
          </div>

          <!-- Section 5: Metode Pembayaran -->
          <div class="drawer-form-section bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800/80 rounded-xl p-5 shadow-2xs space-y-2.5">
            <label class="block text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
              Metode Pembayaran
            </label>
            <div class="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Metode Pembayaran">
              <button
                type="button"
                role="radio"
                :aria-checked="newTxForm.paymentMethod === 'QRIS'"
                :class="[
                  'p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-none',
                  newTxForm.paymentMethod === 'QRIS'
                    ? 'bg-[#E6F4F7] dark:bg-[#156374]/25 border-[#156374] dark:border-[#50AABF] text-[#156374] dark:text-[#50AABF] ring-1 ring-[#156374]/30'
                    : 'bg-white dark:bg-[#121620] border-[#E2E8F0] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-[#156374]/30'
                ]"
                @click="newTxForm.paymentMethod = 'QRIS'"
                @keydown.space.prevent="newTxForm.paymentMethod = 'QRIS'"
              >
                <HugeiconsIcon :icon="QrCodeIcon" :size="17" :stroke-width="2.0" />
                <span>QRIS</span>
              </button>
              <button
                type="button"
                role="radio"
                :aria-checked="newTxForm.paymentMethod === 'TRANSFER'"
                :class="[
                  'p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-none',
                  newTxForm.paymentMethod === 'TRANSFER'
                    ? 'bg-[#E6F4F7] dark:bg-[#156374]/25 border-[#156374] dark:border-[#50AABF] text-[#156374] dark:text-[#50AABF] ring-1 ring-[#156374]/30'
                    : 'bg-white dark:bg-[#121620] border-[#E2E8F0] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-[#156374]/30'
                ]"
                @click="newTxForm.paymentMethod = 'TRANSFER'"
                @keydown.space.prevent="newTxForm.paymentMethod = 'TRANSFER'"
              >
                <HugeiconsIcon :icon="CreditCardIcon" :size="17" :stroke-width="2.0" />
                <span>Transfer</span>
              </button>
              <button
                type="button"
                role="radio"
                :aria-checked="newTxForm.paymentMethod === 'TUNAI'"
                :class="[
                  'p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-none',
                  newTxForm.paymentMethod === 'TUNAI'
                    ? 'bg-[#E6F4F7] dark:bg-[#156374]/25 border-[#156374] dark:border-[#50AABF] text-[#156374] dark:text-[#50AABF] ring-1 ring-[#156374]/30'
                    : 'bg-white dark:bg-[#121620] border-[#E2E8F0] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-[#156374]/30'
                ]"
                @click="newTxForm.paymentMethod = 'TUNAI'"
                @keydown.space.prevent="newTxForm.paymentMethod = 'TUNAI'"
              >
                <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="2.0" />
                <span>Tunai</span>
              </button>
            </div>
          </div>

          <!-- Section 6: Catatan Tambahan (Enter to submit, Shift+Enter for new line) -->
          <div class="drawer-form-section bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800/80 rounded-xl p-5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between">
              <label class="block text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                Catatan Tambahan / Nomor Nota
              </label>
              <span class="text-xs text-neutral-400 dark:text-neutral-500 font-sans">
                Shift + Enter untuk baris baru
              </span>
            </div>
            <textarea
              v-model="newTxForm.notes"
              rows="3"
              placeholder="Contoh: Pembelian langsung di pasar grosir, nota terlampir fisik."
              class="w-full px-3.5 py-3 text-sm sm:text-base rounded-xl border border-[#E2E8F0] dark:border-neutral-700 bg-white dark:bg-[#121620] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#156374]/25 focus:border-[#156374] font-poppins leading-relaxed transition-colors focus-visible:ring-2 focus-visible:ring-[#156374]"
              @keydown.enter.exact.prevent="handleSaveTransaction"
            ></textarea>
          </div>
        </form>

        <!-- 3. Sticky Bottom Action Footer -->
        <div class="px-6 sm:px-8 py-5 border-t border-[#E2E8F0] dark:border-neutral-800 bg-white dark:bg-[#13161F] flex items-center justify-between gap-4 shrink-0">
          <div>
            <span class="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 block">Total Transaksi</span>
            <span class="text-xl sm:text-2xl font-bold tabular-nums text-neutral-900 dark:text-white">
              Rp {{ (newTxForm.amount || 0).toLocaleString('id-ID') }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <button
              ref="cancelBtnRef"
              type="button"
              class="btn-pill-action focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-none"
              @click="closeDrawer"
            >
              <span>Batal</span>
            </button>
            <BActionButton
              variant="green"
              icon="plus"
              type="submit"
              form="catat-kas-sidebar-form"
              custom-class="focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              Simpan ke Buku Kas
            </BActionButton>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Coins01Icon,
  Cancel01Icon,
  ArrowDownLeft01Icon,
  ShoppingBag01Icon,
  Building01Icon,
  Calendar01Icon,
  QrCodeIcon,
  CreditCardIcon,
  Note01Icon
} from '@hugeicons/core-free-icons'
import BActionButton from '~/components/base/BActionButton.vue'
import { useUmkmStore } from '~/stores/umkm'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
  }>(),
  {
    modelValue: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'saved', payload: any): void
}>()

const umkmStore = useUmkmStore()

const isRendered = ref(false)
const drawerContainerRef = ref<HTMLElement | null>(null)
const backdropRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)
const closeIconRef = ref<HTMLElement | null>(null)
const amountInputRef = ref<HTMLInputElement | null>(null)
const cancelBtnRef = ref<HTMLButtonElement | null>(null)

let isDrawerAnimating = false

const newTxForm = ref({
  date: '15 Oktober 2026',
  title: '',
  category: 'PEMASUKAN' as 'PEMASUKAN' | 'MODAL_JUALAN' | 'OPERASIONAL',
  amount: 0,
  paymentMethod: 'QRIS' as 'QRIS' | 'TRANSFER' | 'TUNAI',
  notes: ''
})

function addQuickAmount(amount: number) {
  if (amount === 0) {
    newTxForm.value.amount = 0
  } else {
    newTxForm.value.amount = (newTxForm.value.amount || 0) + amount
  }
}

function setTodayDate() {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  newTxForm.value.date = now.toLocaleDateString('id-ID', options)
}

function animateDrawerOpen() {
  if (!backdropRef.value || !panelRef.value) return
  isDrawerAnimating = true
  const backdrop = backdropRef.value
  const panel = panelRef.value
  const sections = panel.querySelectorAll('.drawer-form-section')

  const tl = gsap.timeline({
    onComplete: () => {
      isDrawerAnimating = false
      if (amountInputRef.value) {
        amountInputRef.value.focus()
      }
    }
  })

  tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
  tl.fromTo(panel, { x: '100%' }, { x: '0%', duration: 0.38, ease: 'power3.out' }, '<')
  if (sections.length > 0) {
    tl.fromTo(
      sections,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out' },
      '-=0.2'
    )
  }
}

function closeDrawer() {
  if (isDrawerAnimating) return
  if (!panelRef.value || !backdropRef.value) {
    emit('update:modelValue', false)
    emit('close')
    isRendered.value = false
    return
  }

  isDrawerAnimating = true
  const backdrop = backdropRef.value
  const panel = panelRef.value
  const tl = gsap.timeline({
    onComplete: () => {
      emit('update:modelValue', false)
      emit('close')
      isRendered.value = false
      isDrawerAnimating = false
    }
  })

  // Rotate exit 'x' icon during exit transition
  if (closeIconRef.value) {
    tl.to(closeIconRef.value, { rotate: 180, duration: 0.28, ease: 'power2.inOut' }, 0)
  }
  tl.to(panel, { x: '100%', duration: 0.28, ease: 'power3.in' }, 0)
  tl.to(backdrop, { opacity: 0, duration: 0.22 }, '-=0.1')
}

function handleSaveTransaction() {
  if (!newTxForm.value.title || newTxForm.value.amount <= 0) return

  const recordPayload = {
    date: newTxForm.value.date,
    title: newTxForm.value.title,
    category: newTxForm.value.category,
    amount: newTxForm.value.amount,
    paymentMethod: newTxForm.value.paymentMethod,
    receiptNumber: `NOTA/${Date.now().toString().slice(-6)}`,
    notes: newTxForm.value.notes
  }

  umkmStore.addDailyTransaction(recordPayload)
  emit('saved', recordPayload)

  // Reset form
  newTxForm.value = {
    date: '15 Oktober 2026',
    title: '',
    category: 'PEMASUKAN',
    amount: 0,
    paymentMethod: 'QRIS',
    notes: ''
  }

  closeDrawer()
}

// Keyboard Integration (Tab Trap, Escape, Enter, Space)
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    closeDrawer()
    return
  }

  if (e.key === 'Tab' && drawerContainerRef.value) {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ')

    const focusableEls = Array.from(
      drawerContainerRef.value.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter(el => el.offsetParent !== null)

    if (focusableEls.length === 0) return

    const firstEl = focusableEls[0]
    const lastEl = focusableEls[focusableEls.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      isRendered.value = true
      nextTick(() => {
        animateDrawerOpen()
      })
    } else if (isRendered.value && !isDrawerAnimating) {
      closeDrawer()
    }
  },
  { immediate: true }
)

function onGlobalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    closeDrawer()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', onGlobalKeydown)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onGlobalKeydown)
  }
})
</script>
