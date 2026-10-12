<template>
  <div class="min-h-screen flex items-center justify-center bg-white dark:bg-[#0F1014] text-neutral-500 text-sm">
    <span>Mengarahkan ke halaman Profil...</span>
  </div>
</template>

<script setup lang="ts">
await navigateTo('/dashboard/profile', { replace: true })
</script>
