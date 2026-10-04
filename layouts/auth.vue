<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans">
    <div class="flex-1 flex flex-col justify-center items-center p-4 sm:p-6">
      <div class="mb-6 flex flex-col items-center">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-12 h-12 rounded-2xl bg-amber-400 p-2 shadow-sm group-hover:scale-105 transition-transform">
            <img src="/logo.svg" alt="Beruang Logo" class="w-full h-full object-contain" />
          </div>
          <span class="font-heading font-extrabold text-2xl tracking-tight text-neutral-900 dark:text-white">
            Beruang
          </span>
        </NuxtLink>
      </div>

      <div class="w-full max-w-md">
        <slot />
      </div>

      <div class="mt-8 text-center text-xs text-neutral-500">
        <NuxtLink to="/" class="hover:underline flex items-center justify-center gap-1">
          ← Kembali ke Beranda
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
