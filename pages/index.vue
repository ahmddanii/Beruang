<template>
  <div class="overflow-hidden ">
    <!-- 1. Hero Section (Simple & Clear Value Prop) -->
    <HomeHero />

    <!-- 2. Process Section (How It Works) -->
    <HomeProcess />

    <!-- 3. Final Call to Action -->
    <HomeCta />
  </div>
</template>

<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import HomeProcess from '~/components/home/HomeProcess.vue'
import HomeCta from '~/components/home/HomeCta.vue'

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Beruang - Tata Kelola Finansial & Sertifikasi Modal UMKM',
  description: 'Platform tata kelola arus kas, audit 5 pilar berlisensi BNSP, dan sindikasi pendanaan terverifikasi untuk UMKM Indonesia.'
})
</script>
