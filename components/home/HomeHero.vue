<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16 font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
      
      <!-- Left Column: Editorial Headline & Value Prop -->
      <div class="lg:col-span-6 flex flex-col gap-5 sm:gap-6">
        <!-- Headline & Description -->
        <div class="space-y-3">
          <h1 class="text-2xl sm:text-4xl lg:text-[40px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-tight lg:leading-[1.18] text-balance">
            Bisnismu, Terverifikasi & Siap Didanai.
          </h1>

          <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-poppins leading-relaxed max-w-xl">
            Audit 5 pilar bersama konsultan bisnis profesional. Rapikan arus kas, raih sertifikasi kelayakan, dan terhubung langsung dengan investor terpercaya.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-3 pt-1">
          <NuxtLink
            to="/daftar"
            class="btn-3d-blue group px-5 py-2.5 rounded-full text-xs sm:text-sm font-poppins font-semibold inline-flex items-center gap-2.5 shadow-sm"
          >
            <span>Mulai Audit Usaha Gratis</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>

          <NuxtLink
            to="/investor"
            class="btn-pill-action group"
          >
            <span>Katalog Usaha Terverifikasi</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Right Column: Lottie Animation (Disesuaikan Ukuran Tidak Terlalu Besar) -->
      <div class="lg:col-span-6 flex justify-center items-center">
        <div class="w-full max-w-[360px] sm:max-w-[400px] aspect-square relative flex items-center justify-center">
          <BLottiePlayer
            :src="lottieAnimationUrl"
            :autoplay="true"
            :loop="true"
            class="w-full h-full"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import BLottiePlayer from '~/components/base/BLottiePlayer.vue'

const lottieAnimationUrl = 'https://lottie.host/c484a436-22e4-4f84-b255-0d4edc5a280d/eJzWl0Bciv.lottie'
</script>
