<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 pt-16 pb-24">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      <!-- Left Column: Editorial Headline & Value Prop -->
      <div class="flex flex-col gap-8">


        <div class="flex flex-col gap-4">
          <h1 class="text-[42px] sm:text-[68px]  font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[52px] sm:leading-[84px] text-balance">
            Bisnismu, Terverifikasi & Siap Didanai.
          </h1>

          <p class="text-[16px] text-neutral-600 dark:text-neutral-300 max-w-[50ch] leading-[24px] ">
            Audit 5 pilar bersama konsultan bisnis profesional. Rapikan arus kas, raih sertifikasi kelayakan, dan terhubung langsung dengan investor terpercaya.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <NuxtLink
            to="/daftar"
            class="group pl-6 pr-2 py-2 h-[48px] rounded-[24px]  font-bold text-[16px] bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all duration-300 active:scale-[0.98] inline-flex items-center gap-3 cursor-pointer leading-[32px]"
          >
            <span>Mulai Audit Usaha Gratis</span>
            <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </span>
          </NuxtLink>

          <NuxtLink
            to="/investor"
            class="px-6 py-2 h-[48px] inline-flex items-center justify-center rounded-[24px]  font-semibold text-[16px] border border-[#EAEAEA] dark:border-[#26272F] bg-white dark:bg-[#15161A] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-all duration-150 active:scale-[0.98] leading-[32px]"
          >
            <span>Katalog Usaha</span>
          </NuxtLink>
        </div>


      </div>

      <!-- Right Column: Simple Lottie Animation (same as login) -->
      <div class="flex justify-center items-center">
        <div class="w-full max-w-[480px] aspect-square relative flex items-center justify-center">
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
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  LockKeyIcon
} from '@hugeicons/core-free-icons'
import BLottiePlayer from '~/components/base/BLottiePlayer.vue'

const lottieAnimationUrl = 'https://lottie.host/c484a436-22e4-4f84-b255-0d4edc5a280d/eJzWl0Bciv.lottie'
</script>
