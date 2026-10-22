<template>
  <div class="space-y-4 sm:space-y-8 overflow-hidden font-sans">
    <!-- 1. Clean Hero with Business Telemetry Preview -->
    <HomeHero />

    <!-- 2. Sleek Unified Institutional Metrics Ledger -->
    <HomeStats />

    <!-- 3. Dedicated Interactive Self-Diagnostic Tool (Pill Chips & Live Score) -->
    <HomeDiagnostic />

    <!-- 4. Asymmetric 5-Pillar Bento Grid -->
    <HomeBentoFeatures />

    <!-- 5. 3 Tactical Process Steps to Funding Readiness -->
    <HomeProcess />

    <!-- 6. Editorial Business Growth Story -->
    <HomeStory />

    <!-- 7. High-Impact Minimalist Final Call to Action -->
    <HomeCta />
  </div>
</template>

<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import HomeStats from '~/components/home/HomeStats.vue'
import HomeDiagnostic from '~/components/home/HomeDiagnostic.vue'
import HomeBentoFeatures from '~/components/home/HomeBentoFeatures.vue'
import HomeProcess from '~/components/home/HomeProcess.vue'
import HomeStory from '~/components/home/HomeStory.vue'
import HomeCta from '~/components/home/HomeCta.vue'

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Beruang - Tata Kelola Finansial & Sertifikasi Modal UMKM',
  description: 'Platform tata kelola arus kas, penilaian 5 pilar bersama konsultan bersertifikat, dan sindikasi pendanaan terverifikasi untuk UMKM Indonesia.'
})
</script>
