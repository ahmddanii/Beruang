<template>
  <div class="min-h-screen flex flex-col bg-[#F3F8FC] dark:bg-[#0C121D] text-neutral-900 dark:text-neutral-50 font-sans">
    <div class="flex-1 flex flex-col justify-center items-center p-4 sm:p-6">
      <div class="mb-6 flex flex-col items-center">
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-9 w-auto object-contain transition-transform group-hover:scale-105" />
          <span class="font-heading font-extrabold text-2xl tracking-tight leading-none select-none">
            <span class="text-[#0081A0] dark:text-[#2091AA]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
          </span>
        </NuxtLink>
      </div>

      <div class="w-full max-w-md">
        <slot />
      </div>

      <div class="mt-8 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 dark:bg-[#13161F]/90 border border-[#E2E8F0] dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-300 font-semibold hover:border-[#0081A0] hover:text-[#0081A0] transition-colors"
        >
          <span>← Kembali ke Beranda</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
