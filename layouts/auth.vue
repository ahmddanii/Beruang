<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans">
    <div class="flex-1 flex flex-col justify-center items-center p-4 sm:p-6">
      <div class="mb-6 flex flex-col items-center">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-10 w-auto object-contain" />
          <span class="font-heading font-extrabold text-2xl tracking-tight leading-none select-none">
            <span class="text-[#2091AA] dark:text-[#50AABF]">Ber</span><span class="text-[#00AA13] dark:text-[#00C058]">uang</span>
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
