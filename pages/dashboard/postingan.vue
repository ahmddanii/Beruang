<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
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
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-neutral-900/95 dark:bg-neutral-800/95 text-white border border-neutral-700/60 backdrop-blur-md text-xs font-poppins font-semibold shadow-none flex items-center gap-2 pointer-events-none"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="text-emerald-400 shrink-0" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- ========================================================================= -->
    <!-- 1. TOP PAGE HEADER: Title on Left & Profil Usaha Button on Right          -->
    <!-- ========================================================================= -->
    <div class="flex items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Image01Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Postingan Usaha
        </h1>
      </div>

      <BActionButton
        to="/dashboard/profile"
        variant="default"
        :huge-icon="UserCircleIcon"
        :icon-size="15"
      >
        Profil Usaha
      </BActionButton>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. SIMPLE & CLEAN 2-COLUMN WORKSPACE                                      -->
    <!-- ========================================================================= -->
    <div class="flex flex-col lg:flex-row items-start gap-6 lg:gap-7">

      <!-- ======================================================================= -->
      <!-- KOLOM KIRI: COMPOSER RINGKAS "Buat Postingan Baru"                      -->
      <!-- ======================================================================= -->
      <aside class="w-full lg:w-[420px] xl:w-[440px] shrink-0 lg:sticky lg:top-6 space-y-2.5">
        <h2 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white px-0.5">
          Buat Postingan Baru
        </h2>

        <div class="card-tactile-gopay rounded-[22px] p-5 sm:p-6 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-5 !shadow-none">
          <!-- 1. Textarea Caption -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
                Cerita / Kabar Usaha
              </label>
              <span class="text-[11px] font-poppins text-neutral-400 tabular-nums">
                {{ newPostForm.pitchSummary.length }}/350
              </span>
            </div>

            <textarea
              v-model="newPostForm.pitchSummary"
              rows="4"
              maxlength="350"
              class="input-tactile-gopay resize-none"
              placeholder="Tulis kabar terbaru usahamu untuk dilihat investor..."
            />
          </div>

          <!-- 2. Foto Postingan (Grid Bersih: Thumbnail Slide + Tombol Tambah Foto) -->
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
                Foto Postingan
              </label>
              <span class="text-[11px] font-poppins font-medium text-neutral-500 dark:text-neutral-400">
                {{ newPostForm.postImages.length > 1 ? `Carousel (${newPostForm.postImages.length} Foto)` : '1 Foto (Single Post)' }}
              </span>
            </div>

            <input
              ref="postImageFileInputRef"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="onPostImageFilesSelected"
            />

            <div class="grid grid-cols-3 gap-2.5">
              <!-- Foto yang sudah dipilih -->
              <div
                v-for="(img, idx) in newPostForm.postImages"
                :key="`draft-slide-${idx}`"
                class="relative aspect-square rounded-xl overflow-hidden border border-[#CBD5E1] dark:border-neutral-700 bg-neutral-900 group"
              >
                <img :src="img" :alt="`Foto ${idx + 1}`" class="w-full h-full object-cover" />
                <span class="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-neutral-950/75 text-white text-[10px] font-poppins font-semibold tabular-nums">
                  {{ idx + 1 }}
                </span>
                <button
                  v-if="newPostForm.postImages.length > 1"
                  type="button"
                  class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-neutral-950/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Hapus Foto"
                  @click="removeDraftPostImage(idx)"
                >
                  <HugeiconsIcon :icon="Cancel01Icon" :size="12" />
                </button>
              </div>

              <!-- Tombol + Tambah Foto -->
              <button
                type="button"
                class="aspect-square rounded-xl border border-dashed border-[#CBD5E1] dark:border-neutral-700 hover:border-[#00800e] dark:hover:border-[#00C058] bg-[#F8FAFC] dark:bg-neutral-900/40 hover:bg-[#F6FCF7] dark:hover:bg-[#00800e]/10 flex flex-col items-center justify-center gap-1.5 text-neutral-500 hover:text-[#00800e] dark:text-neutral-400 dark:hover:text-[#00C058] transition-colors cursor-pointer"
                title="Unggah Foto dari Perangkat"
                @click="triggerPostImageUpload"
              >
                <HugeiconsIcon :icon="Upload04Icon" :size="20" />
                <span class="text-[11px] font-poppins font-semibold">Tambah Foto</span>
              </button>
            </div>
          </div>

          <!-- 3. Tombol Terbitkan -->
          <BActionButton
            variant="green"
            icon="plus"
            :icon-size="16"
            :disabled="!newPostForm.pitchSummary.trim() || newPostForm.postImages.length === 0"
            custom-class="w-full justify-center text-center"
            @click="handleCreateUmkmPost"
          >
            Terbitkan Postingan
          </BActionButton>
        </div>
      </aside>

      <!-- ======================================================================= -->
      <!-- KOLOM KANAN: "Daftar Postingan yang Sudah Dibuat"                        -->
      <!-- ======================================================================= -->
      <main class="w-full max-w-[600px] lg:flex-1 space-y-2.5 mx-auto lg:mx-0">
        <div class="flex items-center justify-between px-0.5">
          <h2 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
            Daftar Postingan yang Sudah Dibuat
          </h2>
          <span class="text-xs font-poppins font-medium text-neutral-500 dark:text-neutral-400 tabular-nums">
            {{ myUmkmPosts.length }} Postingan
          </span>
        </div>

        <div class="space-y-6">
          <article
            v-for="post in myUmkmPosts"
            :key="post.id"
            class="card-tactile-gopay w-full max-w-[600px] rounded-[22px] border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] font-poppins transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden !shadow-none"
          >
            <div class="p-5 sm:p-6 space-y-5">
              <!-- 1. Post Author Header -->
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <div class="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-amber-400/90 dark:bg-amber-500/90 p-2.5 shrink-0 flex items-center justify-center border border-amber-300/60 overflow-hidden shadow-none">
                    <img
                      :src="umkmStore.profile.ownerAvatarUrl || authStore.currentUser?.avatar || '/logo.svg'"
                      :alt="post.name"
                      class="w-full h-full object-contain rounded-full"
                    />
                  </div>

                  <div class="min-w-0 flex flex-col justify-center gap-0.5 sm:gap-1">
                    <div class="inline-flex items-center gap-1 text-xs font-poppins font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
                      <HugeiconsIcon :icon="Location01Icon" :size="13" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
                      <span>{{ post.city }}</span>
                    </div>

                    <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white truncate leading-tight">
                      {{ post.name }}
                    </h3>

                    <div class="inline-flex items-center gap-1.5 text-xs font-poppins text-neutral-500 dark:text-neutral-400 leading-tight">
                      <HugeiconsIcon :icon="Time02Icon" :size="13" class="text-neutral-400 dark:text-neutral-500 shrink-0" />
                      <span>{{ post.postedAt || 'Baru saja' }}</span>
                    </div>
                  </div>
                </div>

                <!-- Right Actions: Share & Delete -->
                <div class="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    aria-label="Bagikan Tautan Postingan"
                    class="w-9 h-9 rounded-xl bg-white dark:bg-[#18191E] text-neutral-600 dark:text-neutral-300 border border-[#CBD5E1] dark:border-neutral-700 hover:bg-[#F8FAFC] dark:hover:bg-[#262626] hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-none"
                    title="Salin Tautan Postingan"
                    @click="copyPostShareLink(post)"
                  >
                    <HugeiconsIcon :icon="Share08Icon" :size="16" :stroke-width="2" />
                  </button>

                  <button
                    v-if="myUmkmPosts.length > 1"
                    type="button"
                    aria-label="Hapus Postingan"
                    class="w-9 h-9 rounded-xl bg-white dark:bg-[#18191E] text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 border border-[#CBD5E1] dark:border-neutral-700 hover:border-red-300 dark:hover:border-red-800 transition-colors flex items-center justify-center cursor-pointer shadow-none"
                    title="Hapus Postingan Ini"
                    @click="handleDeletePost(post.id)"
                  >
                    <HugeiconsIcon :icon="Delete02Icon" :size="16" :stroke-width="2" />
                  </button>
                </div>
              </div>

              <!-- 2. Post Text -->
              <p class="text-[14px] sm:text-[15px] font-poppins text-neutral-700 dark:text-neutral-300 leading-relaxed">
                "{{ post.pitchSummary }}"
              </p>

              <!-- 3. POST MEDIA CONTAINER (Ukuran 550 x 578, Single Post & Multi-Post LinkedIn Carousel) -->
              <div
                class="relative w-full max-w-[550px] h-[578px] aspect-[550/578] mx-auto rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-neutral-800 bg-neutral-900 select-none shadow-none"
              >
                <div
                  class="flex w-full h-full transition-transform duration-300 ease-out"
                  :style="{ transform: `translateX(-${getSlideIndex(post.id) * 100}%)` }"
                >
                  <div
                    v-for="(imgUrl, sIdx) in getPostImages(post)"
                    :key="`${post.id}-slide-${sIdx}`"
                    class="w-full h-full shrink-0 relative overflow-hidden bg-neutral-900"
                  >
                    <img
                      :src="imgUrl"
                      :alt="`${post.name} - Slide ${sIdx + 1}`"
                      loading="lazy"
                      class="w-full h-full object-cover object-center cursor-pointer"
                      @click="openFullscreenPreview(post, getSlideIndex(post.id))"
                    />
                  </div>
                </div>

                <!-- Top-Left Slide Counter Pill -->
                <div
                  v-if="getPostImages(post).length > 1"
                  class="absolute top-3.5 left-3.5 z-20 px-2.5 py-1 rounded-full bg-neutral-950/75 text-white text-xs font-poppins font-semibold tabular-nums border border-white/15 backdrop-blur-xs pointer-events-none"
                >
                  {{ getSlideIndex(post.id) + 1 }} / {{ getPostImages(post).length }}
                </div>

                <!-- Top-Right FullScreenIcon Button -->
                <button
                  type="button"
                  aria-label="Pratinjau Layar Penuh"
                  title="Pratinjau Layar Penuh"
                  class="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/20 backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer shadow-none"
                  @click.stop="openFullscreenPreview(post, getSlideIndex(post.id))"
                >
                  <HugeiconsIcon :icon="FullScreenIcon" :size="17" :stroke-width="2.2" />
                </button>

                <!-- Before Button (inset-y-0 my-auto tanpa efek turun saat ditekan) -->
                <button
                  v-if="getPostImages(post).length > 1 && getSlideIndex(post.id) > 0"
                  type="button"
                  aria-label="Slide Sebelumnya (Before)"
                  title="Slide Sebelumnya"
                  class="absolute left-3 inset-y-0 my-auto z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
                  @click.stop="prevSlide(post)"
                >
                  <HugeiconsIcon :icon="ArrowLeft01Icon" :size="18" :stroke-width="2.4" />
                </button>

                <!-- Next Button (inset-y-0 my-auto tanpa efek turun saat ditekan) -->
                <button
                  v-if="getPostImages(post).length > 1 && getSlideIndex(post.id) < getPostImages(post).length - 1"
                  type="button"
                  aria-label="Slide Berikutnya (Next)"
                  title="Slide Berikutnya"
                  class="absolute right-3 inset-y-0 my-auto z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
                  @click.stop="nextSlide(post)"
                >
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="18" :stroke-width="2.4" />
                </button>

                <!-- Bottom Dot Indicators -->
                <div
                  v-if="getPostImages(post).length > 1"
                  class="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1.5 rounded-full bg-neutral-950/65 backdrop-blur-xs border border-white/15 flex items-center gap-1.5"
                >
                  <button
                    v-for="(_, dIdx) in getPostImages(post)"
                    :key="`${post.id}-dot-${dIdx}`"
                    type="button"
                    :aria-label="`Pilih Slide ${dIdx + 1}`"
                    :class="[
                      'h-1.5 rounded-full transition-all duration-200 cursor-pointer',
                      getSlideIndex(post.id) === dIdx
                        ? 'w-4 bg-white'
                        : 'w-1.5 bg-white/50 hover:bg-white/80'
                    ]"
                    @click.stop="setSlideIndex(post.id, dIdx)"
                  />
                </div>
              </div>
            </div>

            <!-- 4. Post Footer Row -->
            <div
              class="px-5 sm:px-6 py-4 bg-[#F8FAFC] dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div class="flex items-center gap-2 text-xs sm:text-[13px] min-w-0">
                <HugeiconsIcon
                  :icon="Award01Icon"
                  :size="16"
                  class="text-[#156374] dark:text-[#50AABF] shrink-0"
                />
                <span class="text-neutral-600 dark:text-neutral-400 truncate">
                  Didampingi oleh: <strong class="text-neutral-900 dark:text-white font-semibold">{{ post.consultantName }}</strong>
                </span>
              </div>

              <span class="inline-flex items-center gap-1.5 text-xs font-poppins font-semibold text-[#00800e] dark:text-[#00C058] shrink-0">
                <span class="w-2 h-2 rounded-full bg-[#00800e] dark:bg-[#00C058]" />
                <span>Tayang di Jaringan</span>
              </span>
            </div>
          </article>
        </div>
      </main>
    </div>

    <!-- ========================================================================= -->
    <!-- 3. FULL SCREEN PREVIEW MODAL (FullScreenIcon & Cancel01Icon Berputar)     -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <div
        v-if="fullscreenPost"
        class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 font-poppins select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Pratinjau Gambar Layar Penuh"
        @click.self="closeFullscreenPreview"
      >
        <div class="relative w-full max-w-4xl flex-1 max-h-[82vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-neutral-950">
          <img
            :src="getPostImages(fullscreenPost)[fullscreenSlideIndex]"
            :alt="`${fullscreenPost.name} - Pratinjau Penuh ${fullscreenSlideIndex + 1}`"
            class="max-w-full max-h-[80vh] w-auto h-auto object-contain select-none transition-all duration-300"
          />

          <div
            v-if="getPostImages(fullscreenPost).length > 1"
            class="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-neutral-900/90 text-white text-xs font-poppins font-semibold tabular-nums border border-white/25 backdrop-blur-xs pointer-events-none"
          >
            {{ fullscreenSlideIndex + 1 }} / {{ getPostImages(fullscreenPost).length }}
          </div>

          <button
            type="button"
            aria-label="Tutup Pratinjau Layar Penuh"
            class="group absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/30 backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer shadow-none"
            @click.stop="closeFullscreenPreview"
          >
            <HugeiconsIcon
              :icon="Cancel01Icon"
              :size="20"
              :stroke-width="2.4"
              class="transition-transform duration-300 ease-out group-hover:rotate-90 group-active:rotate-180 animate-in spin-in-90"
            />
          </button>

          <button
            v-if="getPostImages(fullscreenPost).length > 1 && fullscreenSlideIndex > 0"
            type="button"
            aria-label="Slide Sebelumnya di Layar Penuh"
            class="absolute left-4 inset-y-0 my-auto z-30 w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/30 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
            @click.stop="prevFullscreenSlide"
          >
            <HugeiconsIcon :icon="ArrowLeft01Icon" :size="20" :stroke-width="2.4" />
          </button>

          <button
            v-if="getPostImages(fullscreenPost).length > 1 && fullscreenSlideIndex < getPostImages(fullscreenPost).length - 1"
            type="button"
            aria-label="Slide Berikutnya di Layar Penuh"
            class="absolute right-4 inset-y-0 my-auto z-30 w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/30 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
            @click.stop="nextFullscreenSlide"
          >
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="20" :stroke-width="2.4" />
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Image01Icon,
  UserCircleIcon,
  CheckmarkCircle01Icon,
  Upload04Icon,
  Delete02Icon,
  Share08Icon,
  Location01Icon,
  Time02Icon,
  Award01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  FullScreenIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const authStore = useAuthStore()
const umkmStore = useUmkmStore()
const investorStore = useInvestorStore()

const umkmName = computed(() => umkmStore.profile.name || 'Kopi Senja Nusantara')
const umkmCity = computed(() => (umkmStore.profile.city || 'Bandung').split(',')[0]!.trim())

// Toast Feedback
const toastMessage = ref('')
let toastTimer: any = null

function triggerToast(msg: string) {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2800)
}

const postImageFileInputRef = ref<HTMLInputElement | null>(null)

const newPostForm = reactive({
  pitchSummary: '',
  postImages: [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80'
  ] as string[]
})

function triggerPostImageUpload() {
  if (postImageFileInputRef.value) {
    postImageFileInputRef.value.value = ''
    postImageFileInputRef.value.click()
  }
}

function onPostImageFilesSelected(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return

  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        newPostForm.postImages.push(reader.result)
      }
    }
    reader.readAsDataURL(file)
  })
}

function removeDraftPostImage(idx: number) {
  if (newPostForm.postImages.length > 1) {
    newPostForm.postImages.splice(idx, 1)
  }
}

function handleCreateUmkmPost() {
  if (!newPostForm.pitchSummary.trim()) return

  investorStore.createUmkmPost({
    umkmRefId: 'umkm-01',
    name: umkmName.value,
    city: umkmCity.value,
    sector: umkmStore.profile.sector || 'Kuliner & Minuman (F&B)',
    establishedYear: umkmStore.profile.establishedYear || 2021,
    fundingTarget: umkmStore.profile.fundingTarget || 250000000,
    consultantName: 'Dra. Maya Suryani, M.M.',
    pitchSummary: newPostForm.pitchSummary.trim(),
    postImages: [...newPostForm.postImages]
  })

  newPostForm.pitchSummary = ''
  triggerToast('Postingan usaha berhasil diterbitkan!')
}

function handleDeletePost(postId: string) {
  investorStore.deleteUmkmPost(postId)
  triggerToast('Postingan berhasil dihapus.')
}

const myUmkmPosts = computed<MarketplaceUmkm[]>(() => {
  const currentName = umkmName.value.toLowerCase().trim()
  return investorStore.marketplaceList.filter(
    m =>
      m.id === 'umkm-01' ||
      m.umkmRefId === 'umkm-01' ||
      m.name.toLowerCase().trim() === currentName
  )
})

// Carousel Navigation per Post
const activeSlides = ref<Record<string, number>>({})

function getPostImages(post: MarketplaceUmkm): string[] {
  if (post.postImages && post.postImages.length > 0) {
    return post.postImages
  }
  return [post.postImageUrl || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80']
}

function getSlideIndex(postId: string): number {
  return activeSlides.value[postId] ?? 0
}

function setSlideIndex(postId: string, idx: number) {
  activeSlides.value[postId] = idx
}

function nextSlide(post: MarketplaceUmkm) {
  const imgs = getPostImages(post)
  const cur = getSlideIndex(post.id)
  if (cur < imgs.length - 1) {
    activeSlides.value[post.id] = cur + 1
  }
}

function prevSlide(post: MarketplaceUmkm) {
  const cur = getSlideIndex(post.id)
  if (cur > 0) {
    activeSlides.value[post.id] = cur - 1
  }
}

// Fullscreen Preview
const fullscreenPost = ref<MarketplaceUmkm | null>(null)
const fullscreenSlideIndex = ref(0)

function openFullscreenPreview(post: MarketplaceUmkm, slideIdx = 0) {
  fullscreenPost.value = post
  fullscreenSlideIndex.value = slideIdx
}

function closeFullscreenPreview() {
  fullscreenPost.value = null
}

function nextFullscreenSlide() {
  if (!fullscreenPost.value) return
  const imgs = getPostImages(fullscreenPost.value)
  if (fullscreenSlideIndex.value < imgs.length - 1) {
    fullscreenSlideIndex.value += 1
    activeSlides.value[fullscreenPost.value.id] = fullscreenSlideIndex.value
  }
}

function prevFullscreenSlide() {
  if (!fullscreenPost.value) return
  if (fullscreenSlideIndex.value > 0) {
    fullscreenSlideIndex.value -= 1
    activeSlides.value[fullscreenPost.value.id] = fullscreenSlideIndex.value
  }
}

function copyPostShareLink(post: MarketplaceUmkm) {
  if (import.meta.client && navigator.clipboard) {
    const url = `${window.location.origin}/investor/umkm/${post.umkmRefId || post.id}`
    navigator.clipboard.writeText(url)
    triggerToast('Tautan postingan usaha berhasil disalin!')
  }
}

onMounted(() => {
  umkmStore.initBannerFromStorage()
  umkmStore.initAvatarFromStorage()
  umkmStore.initQuickProfileFromStorage()
  investorStore.initPostsFromStorage()
})
</script>

<style scoped>
.card-tactile-gopay,
:deep(.card-tactile-gopay) {
  background-color: #FFFFFF !important;
  box-shadow: none !important;
  filter: none !important;
  border-width: 1.5px !important;
  border-color: #CBD5E1 !important;
}

.dark .card-tactile-gopay,
:deep(.dark .card-tactile-gopay),
:deep(.dark) .card-tactile-gopay {
  background-color: #13161F !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow: none !important;
  filter: none !important;
}

.card-tactile-gopay::before,
:deep(.card-tactile-gopay::before) {
  display: none !important;
  box-shadow: none !important;
}

:deep(.card-tactile-gopay *),
:deep([class*="shadow-"]) {
  box-shadow: none !important;
  filter: none !important;
}

.input-tactile-gopay {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 0.75rem;
  border: 1.5px solid #CBD5E1;
  background-color: #FFFFFF;
  color: #0F172A;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 0.15s ease-in-out;
  outline: none;
  box-shadow: none !important;
}

.dark .input-tactile-gopay,
:deep(.dark .input-tactile-gopay),
:deep(.dark) .input-tactile-gopay,
html.dark .input-tactile-gopay {
  border-color: #334155 !important;
  background-color: #161922 !important;
  color: #F8FAFC !important;
}
</style>
