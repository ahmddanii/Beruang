<template>
  <section class="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-8 sm:pt-14 pb-12 sm:pb-20 font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
      
      <!-- Left Column: Editorial Headline & Value Prop -->
      <div class="lg:col-span-7 flex flex-col gap-6 sm:gap-7">
        <!-- Headline & Description -->
        <div class="space-y-3.5">
          <h1 class="text-3xl sm:text-5xl lg:text-5xl xl:text-[56px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-tight lg:leading-[1.15] text-balance">
            Bisnismu, Terverifikasi & Siap Didanai.
          </h1>

          <p class="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-300 font-poppins leading-relaxed max-w-2xl">
            Audit 5 pilar bersama konsultan bisnis profesional. Rapikan arus kas, raih sertifikasi kelayakan, dan terhubung langsung dengan investor terpercaya.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-3.5 pt-1">
          <NuxtLink
            to="/daftar"
            class="btn-3d-blue group px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-poppins font-semibold inline-flex items-center gap-2.5 shadow-sm"
          >
            <span>Mulai Audit Usaha Gratis</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>

          <NuxtLink
            to="/investor"
            class="btn-pill-action group px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm"
          >
            <span>Katalog Usaha Terverifikasi</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Right Column: Lottie Animation -->
      <div class="lg:col-span-5 flex justify-center items-center">
        <div class="w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[500px] aspect-square relative flex items-center justify-center">
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
