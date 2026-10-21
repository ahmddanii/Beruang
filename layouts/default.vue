<template>
  <div class="min-h-screen flex flex-col bg-[#F3F8FC] dark:bg-[#0C121D] text-neutral-900 dark:text-neutral-100 transition-colors">
    <!-- Public Navbar -->
    <AppNavbar />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Public Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '~/components/layout/AppNavbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
</script>
