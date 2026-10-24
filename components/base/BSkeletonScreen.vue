<template>
  <div
    class="w-full space-y-6 sm:space-y-8 font-poppins select-none pointer-events-none"
    role="status"
    aria-live="polite"
    aria-busy="true"
    aria-label="Memuat halaman..."
  >
    <!-- 1. Top Header Skeleton -->
    <div v-if="showHeader" class="flex items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg skeleton-shimmer shrink-0" />
        <div class="h-7 w-40 sm:w-52 rounded-xl skeleton-shimmer" />
      </div>
      <div class="h-10 w-32 sm:w-36 rounded-xl skeleton-shimmer shrink-0" />
    </div>

    <!-- 2. Variant: Feed (Investor Jaringan / Postingan) -->
    <template v-if="variant === 'feed'">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div class="lg:col-span-8 space-y-6 max-w-[600px] w-full">
          <div
            v-for="i in count"
            :key="`feed-skel-${i}`"
            class="card-tactile-gopay rounded-[22px] p-5 sm:p-6 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-4 !shadow-none"
          >
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full skeleton-shimmer shrink-0" />
                <div class="space-y-2">
                  <div class="h-3 w-20 rounded-md skeleton-shimmer" />
                  <div class="h-4 w-36 rounded-md skeleton-shimmer" />
                  <div class="h-3 w-24 rounded-md skeleton-shimmer" />
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-9 h-9 rounded-xl skeleton-shimmer" />
                <div class="w-9 h-9 rounded-xl skeleton-shimmer" />
              </div>
            </div>
            <div class="space-y-2">
              <div class="h-3.5 w-full rounded-md skeleton-shimmer" />
              <div class="h-3.5 w-4/5 rounded-md skeleton-shimmer" />
            </div>
            <div class="w-full h-80 sm:h-96 rounded-2xl skeleton-shimmer" />
          </div>
        </div>
        <div class="hidden lg:block lg:col-span-4 space-y-6">
          <div class="card-tactile-gopay rounded-[22px] p-5 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-3 !shadow-none">
            <div class="flex items-center gap-3.5">
              <div class="w-14 h-14 rounded-full skeleton-shimmer shrink-0" />
              <div class="space-y-2 flex-1">
                <div class="h-4 w-32 rounded-md skeleton-shimmer" />
                <div class="h-3 w-40 rounded-md skeleton-shimmer" />
              </div>
            </div>
          </div>
          <div class="card-tactile-gopay rounded-[22px] p-4 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-3 !shadow-none">
            <div v-for="c in 3" :key="`chat-skel-${c}`" class="flex items-center gap-3 p-2">
              <div class="w-10 h-10 rounded-full skeleton-shimmer shrink-0" />
              <div class="space-y-1.5 flex-1">
                <div class="h-3.5 w-28 rounded-md skeleton-shimmer" />
                <div class="h-3 w-40 rounded-md skeleton-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 3. Variant: Profile (Profil Usaha / Profil Investor) -->
    <template v-else-if="variant === 'profile'">
      <div class="w-full h-48 sm:h-60 rounded-[22px] skeleton-shimmer" />
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 space-y-6">
          <div
            v-for="i in 2"
            :key="`prof-skel-${i}`"
            class="card-tactile-gopay rounded-[22px] p-6 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-4 !shadow-none"
          >
            <div class="h-5 w-48 rounded-lg skeleton-shimmer" />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="h-11 rounded-xl skeleton-shimmer" />
              <div class="h-11 rounded-xl skeleton-shimmer" />
              <div class="h-11 rounded-xl skeleton-shimmer" />
              <div class="h-11 rounded-xl skeleton-shimmer" />
            </div>
          </div>
        </div>
        <div class="lg:col-span-4 space-y-6">
          <div class="card-tactile-gopay rounded-[22px] p-6 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-4 !shadow-none">
            <div class="h-5 w-40 rounded-lg skeleton-shimmer" />
            <div class="h-24 w-full rounded-xl skeleton-shimmer" />
            <div class="h-10 w-full rounded-xl skeleton-shimmer" />
          </div>
        </div>
      </div>
    </template>

    <!-- 4. Variant: Table (Catatan Kas / Admin Tables) -->
    <template v-else-if="variant === 'table'">
      <!-- Search & Control Bar Skeleton -->
      <div class="h-11 sm:h-12 w-full rounded-[10px] skeleton-shimmer" />

      <!-- Table Card Container Skeleton -->
      <div class="card-tactile-gopay rounded-[22px] border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] overflow-hidden !shadow-none">
        <div class="p-5 sm:p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div class="h-6 w-48 sm:w-64 rounded-md skeleton-shimmer" />
          <div class="h-8 w-24 sm:w-28 rounded-lg skeleton-shimmer" />
        </div>
        <div class="divide-y divide-neutral-100 dark:divide-neutral-800/80">
          <div v-for="r in 6" :key="`table-row-${r}`" class="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div class="h-4 w-20 sm:w-24 rounded-md skeleton-shimmer shrink-0" />
            <div class="h-6 w-24 sm:w-28 rounded-full skeleton-shimmer shrink-0" />
            <div class="h-4 w-48 rounded-md skeleton-shimmer flex-1 hidden sm:block" />
            <div class="h-5 w-28 sm:w-32 rounded-md skeleton-shimmer shrink-0" />
            <div class="h-8 w-14 sm:w-16 rounded-lg skeleton-shimmer shrink-0" />
          </div>
        </div>
      </div>
    </template>

    <!-- 5. Default Variant: Dashboard / Analytics / Admin (4 Stat Cards + Chart/Table) -->
    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="i in 4"
          :key="`stat-skel-${i}`"
          class="card-tactile-gopay rounded-[18px] p-5 sm:p-6 border border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-4 min-h-[168px] flex flex-col justify-between !shadow-none"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg skeleton-shimmer" />
              <div class="h-4 w-24 rounded-md skeleton-shimmer" />
            </div>
            <div class="h-5 w-14 rounded-full skeleton-shimmer" />
          </div>
          <div class="h-8 w-36 rounded-lg skeleton-shimmer my-auto" />
          <div class="h-8 w-28 rounded-xl skeleton-shimmer" />
        </div>
      </div>

      <!-- Main Chart / Table Container Skeleton -->
      <div class="card-tactile-gopay rounded-[18px] p-6 sm:p-8 border border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-6 !shadow-none">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-2">
            <div class="h-6 w-48 rounded-lg skeleton-shimmer" />
            <div class="h-4 w-72 max-w-full rounded-md skeleton-shimmer" />
          </div>
          <div class="flex items-center gap-2.5">
            <div class="h-9 w-28 rounded-xl skeleton-shimmer" />
            <div class="h-9 w-24 rounded-xl skeleton-shimmer" />
          </div>
        </div>
        <div class="w-full h-64 sm:h-72 rounded-2xl skeleton-shimmer" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'dashboard' | 'feed' | 'profile' | 'table'
    count?: number
    showHeader?: boolean
  }>(),
  {
    variant: 'dashboard',
    count: 2,
    showHeader: false
  }
)
</script>
