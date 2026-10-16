<template>
  <div class="p-8 text-center font-poppins text-neutral-500">
    Mengalihkan ke Notifikasi...
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: [
    () => navigateTo('/dashboard/notifikasi', { replace: true })
  ]
})
</script>
