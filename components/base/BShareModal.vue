<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs select-none"
        @click.self="close"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out transform"
          enter-from-class="scale-95 opacity-0 translate-y-3"
          enter-to-class="scale-100 opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100 translate-y-0"
          leave-to-class="scale-95 opacity-0 translate-y-3"
        >
          <div
            v-if="modelValue"
            class="w-full max-w-lg bg-white dark:bg-[#13161F] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col font-poppins"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-share-title"
          >
            <!-- 1. Modal Header: Title 'Bagikan' on Left, Circular Close Button with Micro-Animation on Right -->
            <div class="px-6 sm:px-7 pt-5 pb-3 flex items-center justify-between shrink-0">
              <h3
                id="modal-share-title"
                class="font-poppins font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white tracking-tight"
              >
                {{ title || 'Bagikan' }}
              </h3>
              <button
                type="button"
                class="group w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 active:scale-90"
                aria-label="Tutup modal bagikan (Esc)"
                title="Tutup (Esc)"
                @click="close"
                @keydown.enter="close"
                @keydown.space.prevent="close"
              >
                <svg
                  class="w-4 h-4 transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- 2. Preview Section: Banner + Overlapping Avatar (as in wireframe) -->
            <div class="px-6 sm:px-7 py-3 flex flex-col">
              <!-- Banner Image with Avatar Overlapping -->
              <div class="relative w-full pb-8 sm:pb-10">
                <!-- Banner Box -->
                <div class="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
                  <img
                    :src="currentBannerUrl"
                    :alt="`Banner ${storeName}`"
                    class="w-full h-full object-cover object-center"
                    @error="onBannerError"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <!-- Avatar Circle overlapping bottom-left of banner -->
                <div class="absolute -bottom-2 left-4 z-10">
                  <div class="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 border-white dark:border-[#13161F] bg-neutral-100 dark:bg-neutral-800 overflow-hidden shadow-md flex items-center justify-center">
                    <img
                      :src="currentAvatarUrl"
                      :alt="`Avatar ${storeName}`"
                      class="w-full h-full object-cover object-center"
                      @error="onAvatarError"
                    />
                  </div>
                </div>
              </div>

              <!-- Store Name below Banner/Avatar (Wider gap, description removed) -->
              <div class="mt-4 sm:mt-5 pb-2">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white tracking-tight truncate">
                    {{ storeName }}
                  </h4>
                  <BVerifiedBadge v-if="isVerified" />
                </div>
              </div>

              <!-- Inline Copied Toast Feedback -->
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
              >
                <div
                  v-if="isCopied"
                  class="mt-1 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-1.5 self-start"
                >
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" class="text-emerald-500" />
                  <span>Tautan berhasil disalin ke clipboard!</span>
                </div>
              </Transition>
            </div>

            <!-- 3. Bottom Shelf: White Container with Stroke at Top (Same thickness as sidebar) -->
            <div class="p-5 sm:p-6 bg-white dark:bg-[#13161F] border-t border-[#E2E8F0] dark:border-neutral-800/80">
              <div class="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-2 justify-items-center items-start">
                <!-- 1. Salin Tautan (CopyLinkIcon) -->
                <button
                  type="button"
                  tabindex="0"
                  class="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl p-1"
                  title="Salin Tautan Profil Usaha"
                  @click="handleCopyLink"
                  @keydown.enter="handleCopyLink"
                  @keydown.space.prevent="handleCopyLink"
                >
                  <div class="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700/60 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-all duration-150 shadow-2xs group-hover:scale-105 active:scale-95">
                    <HugeiconsIcon :icon="CopyLinkIcon" :size="20" :stroke-width="2.2" />
                  </div>
                  <span class="text-[11px] sm:text-xs font-poppins font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white text-center leading-tight">
                    Salin tautan
                  </span>
                </button>

                <!-- 2. WhatsApp (WhatsappIcon) -->
                <button
                  type="button"
                  tabindex="0"
                  class="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl p-1"
                  title="Bagikan ke WhatsApp"
                  @click="handleWhatsApp"
                  @keydown.enter="handleWhatsApp"
                  @keydown.space.prevent="handleWhatsApp"
                >
                  <div class="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700/60 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-all duration-150 shadow-2xs group-hover:scale-105 active:scale-95">
                    <HugeiconsIcon :icon="WhatsappIcon" :size="20" :stroke-width="2.2" />
                  </div>
                  <span class="text-[11px] sm:text-xs font-poppins font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white text-center leading-tight">
                    Whatsapp
                  </span>
                </button>

                <!-- 3. Facebook (Facebook02Icon) -->
                <button
                  type="button"
                  tabindex="0"
                  class="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl p-1"
                  title="Bagikan ke Facebook"
                  @click="handleFacebook"
                  @keydown.enter="handleFacebook"
                  @keydown.space.prevent="handleFacebook"
                >
                  <div class="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700/60 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-all duration-150 shadow-2xs group-hover:scale-105 active:scale-95">
                    <HugeiconsIcon :icon="Facebook02Icon" :size="20" :stroke-width="2.2" />
                  </div>
                  <span class="text-[11px] sm:text-xs font-poppins font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white text-center leading-tight">
                    Facebook
                  </span>
                </button>

                <!-- 4. Messenger (MessengerIcon) -->
                <button
                  type="button"
                  tabindex="0"
                  class="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl p-1"
                  title="Bagikan ke Messenger"
                  @click="handleMessenger"
                  @keydown.enter="handleMessenger"
                  @keydown.space.prevent="handleMessenger"
                >
                  <div class="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700/60 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-all duration-150 shadow-2xs group-hover:scale-105 active:scale-95">
                    <HugeiconsIcon :icon="MessengerIcon" :size="20" :stroke-width="2.2" />
                  </div>
                  <span class="text-[11px] sm:text-xs font-poppins font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white text-center leading-tight">
                    Messanger
                  </span>
                </button>

                <!-- 5. LinkedIn (Linkedin02Icon) -->
                <button
                  type="button"
                  tabindex="0"
                  class="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl p-1"
                  title="Bagikan ke LinkedIn"
                  @click="handleLinkedIn"
                  @keydown.enter="handleLinkedIn"
                  @keydown.space.prevent="handleLinkedIn"
                >
                  <div class="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700/60 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-all duration-150 shadow-2xs group-hover:scale-105 active:scale-95">
                    <HugeiconsIcon :icon="Linkedin02Icon" :size="20" :stroke-width="2.2" />
                  </div>
                  <span class="text-[11px] sm:text-xs font-poppins font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white text-center leading-tight">
                    LinkedIn
                  </span>
                </button>

                <!-- 6. Gmail (Mail02Icon) -->
                <button
                  type="button"
                  tabindex="0"
                  class="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl p-1"
                  title="Bagikan via Gmail"
                  @click="handleGmail"
                  @keydown.enter="handleGmail"
                  @keydown.space.prevent="handleGmail"
                >
                  <div class="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700/60 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-all duration-150 shadow-2xs group-hover:scale-105 active:scale-95">
                    <HugeiconsIcon :icon="Mail02Icon" :size="20" :stroke-width="2.2" />
                  </div>
                  <span class="text-[11px] sm:text-xs font-poppins font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white text-center leading-tight">
                    Gmail
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  CopyLinkIcon,
  WhatsappIcon,
  Facebook02Icon,
  MessengerIcon,
  Linkedin02Icon,
  Mail02Icon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons'
import BVerifiedBadge from '~/components/base/BVerifiedBadge.vue'

interface Props {
  modelValue: boolean
  title?: string
  storeName?: string
  description?: string
  bannerUrl?: string
  avatarUrl?: string
  shareUrl?: string
  isVerified?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Bagikan',
  storeName: 'Kopi Senja Nusantara',
  description: '',
  bannerUrl: '',
  avatarUrl: '',
  shareUrl: '',
  isVerified: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'copied', url: string): void
  (e: 'share', platform: string): void
}>()

const isCopied = ref(false)

const currentBannerUrl = computed(() => {
  return props.bannerUrl || '/images/default-store-banner.jpg'
})

const currentAvatarUrl = computed(() => {
  return props.avatarUrl || '/images/user-profile.png'
})

const effectiveShareUrl = computed(() => {
  if (props.shareUrl) return props.shareUrl
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/dashboard/profil-publik`
  }
  return 'https://beruang.id/dashboard/profil-publik'
})

function close() {
  emit('update:modelValue', false)
}

// Global Keyboard Escape handler
function handleGlobalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (typeof window === 'undefined') return
    if (isOpen) {
      window.addEventListener('keydown', handleGlobalKeydown)
    } else {
      window.removeEventListener('keydown', handleGlobalKeydown)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleGlobalKeydown)
  }
})

function onBannerError(e: Event) {
  const target = e.target as HTMLImageElement
  target.src = '/images/default-store-banner.jpg'
}

function onAvatarError(e: Event) {
  const target = e.target as HTMLImageElement
  target.src = '/images/user-profile.png'
}

function handleCopyLink() {
  const url = effectiveShareUrl.value
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(url)
  }
  isCopied.value = true
  emit('copied', url)
  setTimeout(() => {
    isCopied.value = false
  }, 2500)
}

function handleWhatsApp() {
  const text = `Lihat profil usaha ${props.storeName} di platform Beruang:\n${effectiveShareUrl.value}`
  const targetUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
  window.open(targetUrl, '_blank')
  emit('share', 'whatsapp')
}

function handleFacebook() {
  const targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(effectiveShareUrl.value)}`
  window.open(targetUrl, '_blank')
  emit('share', 'facebook')
}

function handleMessenger() {
  const url = effectiveShareUrl.value
  const targetUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(url)}`
  window.open(targetUrl, '_blank')
  emit('share', 'messenger')
}

function handleLinkedIn() {
  const targetUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(effectiveShareUrl.value)}`
  window.open(targetUrl, '_blank')
  emit('share', 'linkedin')
}

function handleGmail() {
  const subject = `Profil Usaha: ${props.storeName} - Beruang`
  const body = `Halo,\n\nSilakan cek profil usaha ${props.storeName} di platform Beruang melalui tautan berikut:\n${effectiveShareUrl.value}`
  const targetUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.open(targetUrl, '_blank')
  emit('share', 'gmail')
}
</script>
