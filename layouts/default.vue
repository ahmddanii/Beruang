<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans transition-colors">
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
