<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100 select-none">
    <!-- 1. Tombol Kembali & Client Header Card -->
    <div>
      <div class="mb-3.5">
        <NuxtLink
          to="/konsultan/klien?tab=aktif"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-[#0081A0] hover:text-[#0081A0] dark:hover:text-[#2091AA] transition-all shadow-2xs group cursor-pointer"
        >
          <HugeiconsIcon :icon="ArrowLeft01Icon" :size="15" :stroke-width="2.2" class="transition-transform group-hover:-translate-x-0.5 text-neutral-500 group-hover:text-[#0081A0] dark:group-hover:text-[#2091AA]" />
          <span>Kembali</span>
        </NuxtLink>
      </div>

      <!-- Tactile GoPay Header Card -->
      <div class="card-tactile-gopay rounded-3xl p-5 sm:p-6 border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F] relative overflow-hidden">
        <!-- Ambient subtle glow -->
        <div class="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#0081A0]/10 dark:bg-[#0081A0]/15 blur-3xl pointer-events-none" />
        <div class="absolute right-36 -bottom-16 w-48 h-48 rounded-full bg-[#00AA13]/10 dark:bg-[#00AA13]/10 blur-3xl pointer-events-none" />

        <div class="relative z-10 flex items-center gap-4 sm:gap-4.5">
            <!-- Brand Avatar -->
            <div class="w-16 h-16 rounded-2xl bg-amber-400/20 dark:bg-amber-400/10 border border-amber-300/40 dark:border-amber-500/20 p-2.5 shadow-xs shrink-0 flex items-center justify-center">
              <img src="/logo.svg" alt="Client Logo" class="w-full h-full object-contain" />
            </div>

            <div class="space-y-1">
              <h1 class="text-xl sm:text-2xl font-poppins font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {{ client?.name }}
              </h1>

              <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-poppins">
                <strong class="text-neutral-800 dark:text-neutral-200 font-semibold">{{ client?.owner }}</strong> • {{ client?.sector }} • {{ client?.city }}
              </p>
            </div>
          </div>
        </div>
      </div>

    <!-- 2. Macro Segmented Pill Switcher (Tab Navigasi Makro - GoPay Green Edition Sesuai Catatan Kas UMKM) -->
    <div class="w-full overflow-x-auto pb-1">
      <div class="segmented-pill-container is-gopay-green min-w-[640px] sm:min-w-0 w-full relative">
        <!-- GSAP Animated Sliding Pill Indicator -->
        <div
          ref="tabIndicatorRef"
          class="segmented-pill-indicator"
          aria-hidden="true"
        />

        <!-- Pilihan 1: Rangkuman -->
        <button
          type="button"
          :ref="el => setTabRef('summary', el)"
          class="segmented-pill-btn group"
          :class="activeTab === 'summary' ? 'is-active' : 'is-inactive'"
          @click="setActiveTab('summary')"
        >
          <HugeiconsIcon :icon="AnalyticsUpIcon" :size="16" :stroke-width="activeTab === 'summary' ? 2.2 : 1.8" class="mr-2 shrink-0 transition-colors" />
          <span class="truncate">Rangkuman</span>
        </button>

        <!-- Pilihan 2: Roadmap -->
        <button
          type="button"
          :ref="el => setTabRef('milestones', el)"
          class="segmented-pill-btn group"
          :class="activeTab === 'milestones' ? 'is-active' : 'is-inactive'"
          @click="setActiveTab('milestones')"
        >
          <HugeiconsIcon :icon="Task01Icon" :size="16" :stroke-width="activeTab === 'milestones' ? 2.2 : 1.8" class="mr-2 shrink-0 transition-colors" />
          <span class="truncate">Roadmap</span>
          <span
            v-if="clientTotalTasksCount > 0"
            :class="[
              'ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold tabular-nums leading-none transition-colors',
              activeTab === 'milestones'
                ? 'bg-white/25 text-white'
                : 'bg-neutral-300/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
            ]"
          >
            {{ clientCompletedTasksCount }}/{{ clientTotalTasksCount }}
          </span>
        </button>

        <!-- Pilihan 3: Validasi Kas -->
        <button
          type="button"
          :ref="el => setTabRef('validation', el)"
          class="segmented-pill-btn group"
          :class="activeTab === 'validation' ? 'is-active' : 'is-inactive'"
          @click="setActiveTab('validation')"
        >
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" :stroke-width="activeTab === 'validation' ? 2.2 : 1.8" class="mr-2 shrink-0 transition-colors" />
          <span class="truncate">Validasi Kas</span>
        </button>

        <!-- Pilihan 4: Audit -->
        <button
          type="button"
          :ref="el => setTabRef('audit', el)"
          class="segmented-pill-btn group"
          :class="activeTab === 'audit' ? 'is-active' : 'is-inactive'"
          @click="setActiveTab('audit')"
        >
          <HugeiconsIcon :icon="PencilEdit02Icon" :size="16" :stroke-width="activeTab === 'audit' ? 2.2 : 1.8" class="mr-2 shrink-0 transition-colors" />
          <span class="truncate">Audit</span>
        </button>

        <!-- Pilihan 5: Sertifikasi -->
        <button
          type="button"
          :ref="el => setTabRef('certification', el)"
          class="segmented-pill-btn group"
          :class="activeTab === 'certification' ? 'is-active' : 'is-inactive'"
          @click="setActiveTab('certification')"
        >
          <HugeiconsIcon :icon="Award01Icon" :size="16" :stroke-width="activeTab === 'certification' ? 2.2 : 1.8" class="mr-2 shrink-0 transition-colors" />
          <span class="truncate">Sertifikasi</span>
        </button>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- TAB 1: RANGKUMAN & RADAR 5 DIMENSI                                  -->
    <!-- =================================================================== -->
    <div v-if="activeTab === 'summary'" class="gsap-tab-content space-y-6">
      <!-- 4 Quick Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <!-- Stat 1: Skor Fundamental -->
        <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl space-y-1">
          <span class="text-xs text-neutral-500 font-medium">Skor 5 Dimensi</span>
          <div class="flex items-baseline gap-1 mt-0.5">
            <span class="font-poppins font-extrabold text-2xl sm:text-3xl text-[#0081A0] dark:text-[#2091AA] tabular-nums">
              {{ client?.healthScore }}
            </span>
            <span class="text-xs text-neutral-400">/ 100</span>
          </div>
          <p class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            {{ (client?.healthScore || 0) >= 80 ? 'Sangat Siap Didanai' : (client?.healthScore || 0) >= 65 ? 'Perlu Pembenahan Taktis' : 'Butuh Pendampingan' }}
          </p>
        </div>

        <!-- Stat 2: Target Modal -->
        <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl space-y-1">
          <span class="text-xs text-neutral-500 font-medium">Target Tiket Investasi</span>
          <div class="flex items-baseline gap-1 mt-0.5">
            <span class="font-poppins font-extrabold text-2xl sm:text-3xl text-neutral-900 dark:text-white tabular-nums">
              Rp {{ ((client?.fundingTarget || 0) / 1000000) }}
            </span>
            <span class="text-xs text-neutral-400">Juta</span>
          </div>
          <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
            Target Kesiapan Modal
          </p>
        </div>

        <!-- Stat 3: Progres Task -->
        <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl space-y-1">
          <span class="text-xs text-neutral-500 font-medium">Langkah Aksi Selesai</span>
          <div class="flex items-baseline gap-1 mt-0.5">
            <span class="font-poppins font-extrabold text-2xl sm:text-3xl text-[#00AA13] dark:text-emerald-400 tabular-nums">
              {{ clientCompletedTasksCount }}/{{ clientTotalTasksCount }}
            </span>
            <span class="text-xs text-neutral-400">Tuntas</span>
          </div>
          <div class="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              class="bg-[#00AA13] h-full rounded-full transition-all duration-500"
              :style="{ width: `${clientTasksProgressPct}%` }"
            />
          </div>
        </div>

        <!-- Stat 4: Validasi Bulanan -->
        <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl space-y-1">
          <span class="text-xs text-neutral-500 font-medium">Validasi Laporan Kas</span>
          <div class="flex items-baseline gap-1 mt-0.5">
            <span class="font-poppins font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-white">
              {{ client?.monthlyStatus === 'VERIFIED' ? 'Terverifikasi' : client?.monthlyStatus === 'PENDING' ? 'Menunggu' : 'Terlambat' }}
            </span>
          </div>
          <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
            Audit: {{ client?.lastAuditDate }}
          </p>
        </div>
      </div>

      <!-- Interactive Radar Card (Hero Bento dengan Rincian On-Demand) -->
      <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 flex flex-col items-center">
        <!-- Header -->
        <div class="w-full pb-3.5 border-b border-neutral-100 dark:border-neutral-800 mb-2">
          <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Radar Diagnosa 5 Aspek Fundamental
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Tekan atau arahkan kursor ke pilar radar untuk melihat diagnosa & catatan lengkap.
          </p>
        </div>

        <!-- Radar Chart Component -->
        <div class="w-full flex justify-center py-3">
          <BRadarChart
            :items="radarData"
            :size="440"
            :max-width="500"
            show-target
            :selected-index="selectedAspectIndex"
            @hover="idx => hoveredAspectIndex = idx"
            @select="idx => selectedAspectIndex = idx"
          />
        </div>

        <!-- Legend -->
        <div class="w-full mt-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-center gap-6 text-xs text-neutral-500">
          <span class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#0081A0]" />
            <span class="font-medium text-neutral-700 dark:text-neutral-300">Skor Klien Saat Ini</span>
          </span>
          <span class="flex items-center gap-2">
            <span class="w-3.5 h-0.5 border-t-2 border-dashed border-[#D4AA0B]" />
            <span class="font-medium text-neutral-700 dark:text-neutral-300">Target Benchmark (85)</span>
          </span>
        </div>

        <!-- Dynamic Aspect Detail Card (Muncul saat ditekan atau di-hover) -->
        <div class="w-full mt-4">
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-2 scale-98"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 translate-y-2 scale-98"
            mode="out-in"
          >
            <!-- Case 1: An aspect is hovered or selected -->
            <div
              v-if="activeAspect"
              :key="activeAspect.id"
              class="w-full max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-3"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-3 h-3 rounded-full bg-[#0081A0]" />
                  <h4 class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                    {{ activeAspect.name }}
                  </h4>
                  <span class="text-[11px] font-semibold text-neutral-400 hidden sm:inline">
                    • Dimensi {{ activeAspectIndex! + 1 }} dari 5
                  </span>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <span
                    :class="[
                      'px-2.5 py-0.5 rounded-full text-xs font-poppins font-extrabold tabular-nums',
                      activeAspect.score >= 80
                        ? 'bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/50 dark:text-emerald-400'
                        : activeAspect.score >= 65
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                    ]"
                  >
                    {{ activeAspect.score }}/100
                  </span>

                  <!-- Unpin button if selected -->
                  <button
                    v-if="selectedAspectIndex !== null"
                    type="button"
                    class="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 rounded-lg transition-colors cursor-pointer"
                    title="Tutup rincian"
                    @click="selectedAspectIndex = null"
                  >
                    <HugeiconsIcon :icon="Cancel01Icon" :size="14" />
                  </button>
                </div>
              </div>

              <!-- Progress bar with benchmark marker -->
              <div class="space-y-1.5">
                <div class="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden relative">
                  <div
                    :class="[
                      'h-full rounded-full transition-all duration-500',
                      activeAspect.score >= 80 ? 'bg-[#00AA13]' : activeAspect.score >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                    ]"
                    :style="{ width: `${activeAspect.score}%` }"
                  />
                </div>

                <div class="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span>Target Benchmark: <strong class="text-neutral-700 dark:text-neutral-200 font-semibold">85 Poin</strong></span>
                  <span
                    :class="activeAspect.score >= 85 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-amber-600 dark:text-amber-400 font-semibold'"
                  >
                    {{ activeAspect.score >= 85 ? '✓ Memenuhi Target' : `Kurang ${85 - activeAspect.score} Poin Menuju Target` }}
                  </span>
                </div>
              </div>

              <!-- Qualitative Note from Consultant Assessment -->
              <div v-if="activeAspect.notes" class="p-3 rounded-xl bg-neutral-50 dark:bg-[#13161F] border border-neutral-200/60 dark:border-neutral-800/60 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <strong class="font-poppins font-semibold text-neutral-800 dark:text-neutral-200 block mb-0.5">Catatan Diagnosa Lapangan:</strong>
                {{ activeAspect.notes }}
              </div>
            </div>

            <!-- Case 2: No aspect selected/hovered - show friendly subtle hint -->
            <div
              v-else
              key="hint"
              class="w-full max-w-xl mx-auto py-3 px-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E]/60 border border-dashed border-neutral-200 dark:border-neutral-800/80 text-center flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400"
            >
              <span>👆</span>
              <span>Tekan titik atau nama aspek pada radar untuk memunculkan rincian skor & diagnosa.</span>
            </div>
          </transition>
        </div>
      </div>

      <!-- Riwayat Kinerja Historis Bulanan (Omzet vs HPP) -->
      <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
              Riwayat Kinerja Historis Bulanan
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Tren omzet penjualan dan modal jualan (HPP) riil yang telah diverifikasi oleh konsultan pendamping.
            </p>
          </div>

          <!-- Filter Range Waktu -->
          <div class="inline-flex items-center p-1 rounded-2xl bg-neutral-100 dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 self-start sm:self-auto shadow-2xs gap-0.5">
            <button
              v-for="range in timeRangeOptions"
              :key="range.value"
              type="button"
              :class="[
                'px-3 py-1.5 rounded-xl text-xs font-poppins font-semibold transition-all duration-150 cursor-pointer select-none',
                selectedTimeRange === range.value
                  ? 'bg-white dark:bg-[#232733] text-[#0081A0] dark:text-[#50AABF] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              ]"
              @click="selectedTimeRange = range.value"
            >
              {{ range.label }}
            </button>
          </div>
        </div>

        <BLineAreaChart
          title="Omzet vs HPP (Juta Rp)"
          :categories="chartDataByRange.categories"
          :series="chartSeries"
          :value-formatter="(v) => `Rp ${v} Juta`"
        />
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- TAB 2: ROADMAP, MILESTONE & TASK MANAGEMENT                         -->
    <!-- =================================================================== -->
    <div v-else-if="activeTab === 'milestones'" class="gsap-tab-content space-y-6">
      <!-- Controls & Header -->
      <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 space-y-5">
        <div class="space-y-1">
          <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white">
            Roadmap Bimbingan: {{ client?.name }}
          </h2>
          <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
            Tambahkan milestone tahapan pembinaan dan tugaskan langkah aksi (task) bagi pemilik usaha untuk memperkuat 5 pilar bisnisnya.
          </p>
        </div>

        <!-- Toolbar Terpadu: 1. Search | 2. Filter Dropdown | 3. Tindakan Nambah -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <!-- 1. Search -->
          <div class="relative flex-1 min-w-[200px]">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <HugeiconsIcon :icon="Search01Icon" :size="16" :stroke-width="1.8" />
            </div>
            <input
              v-model="searchTask"
              type="text"
              placeholder="Cari langkah aksi atau milestone..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#18191E] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0] transition-colors"
            />
          </div>

          <!-- 2. Filter Dropdown -->
          <div class="relative shrink-0 sm:w-48">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <HugeiconsIcon :icon="FilterIcon" :size="15" :stroke-width="2" />
            </div>
            <select
              v-model="selectedCategory"
              class="w-full pl-9 pr-8 py-2.5 rounded-xl text-xs sm:text-sm font-poppins font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#18191E] text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#0081A0] transition-colors appearance-none cursor-pointer"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Finansial">Kategori: Finansial</option>
              <option value="Operasional">Kategori: Operasional</option>
              <option value="Legalitas">Kategori: Legalitas</option>
              <option value="Pemasaran">Kategori: Pemasaran</option>
              <option value="SDM">Kategori: SDM</option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- 3. Tindakan Nambah Milestone -->
          <div class="flex items-center shrink-0">
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-poppins font-semibold bg-[#0081A0] hover:bg-[#00708C] text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap active:scale-[0.98]"
              @click="openAddMilestoneModal"
            >
              <HugeiconsIcon :icon="Add01Icon" :size="15" :stroke-width="2.2" />
              <span>Tambah Milestone</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Milestone Cards List -->
      <div v-if="filteredMilestones.length > 0" class="space-y-6">
        <div
          v-for="milestone in filteredMilestones"
          :key="milestone.id"
          class="card-tactile-gopay rounded-3xl p-5 sm:p-6 space-y-4 border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F]"
        >
          <!-- Milestone Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-neutral-100 dark:border-neutral-800 gap-3">
            <div class="flex items-start sm:items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#0081A0]/10 text-[#0081A0] dark:bg-[#0081A0]/20 dark:text-[#2091AA] font-poppins font-bold text-sm flex items-center justify-center border border-[#0081A0]/20 shrink-0">
                #{{ milestone.order }}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                    {{ milestone.title }}
                  </h3>
                  <span v-if="milestone.targetDate" class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                    {{ milestone.targetDate }}
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {{ milestone.description }}
                </p>
              </div>
            </div>

            <!-- Milestone Actions & Status -->
            <div class="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
              <span
                :class="[
                  'inline-flex items-center gap-1.5 text-xs font-poppins font-bold px-3 py-1 rounded-xl border',
                  getMilestoneTasks(milestone.id).length > 0 && getMilestoneTasks(milestone.id).every(t => t.completed || t.status === 'DONE')
                    ? 'bg-emerald-50 text-[#00AA13] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                    : 'bg-neutral-50 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700'
                ]"
              >
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
                <span>{{ getMilestoneTasks(milestone.id).filter(t => t.completed || t.status === 'DONE').length }}/{{ getMilestoneTasks(milestone.id).length }} Selesai</span>
              </span>

              <!-- Button to Add Task directly inside this Milestone -->
              <button
                type="button"
                class="px-2.5 py-1.5 rounded-xl text-xs font-poppins font-semibold text-[#0081A0] dark:text-[#2091AA] hover:bg-[#0081A0]/10 transition-colors flex items-center gap-1 cursor-pointer"
                title="Tambah task ke milestone ini"
                @click="openAddTaskModal(milestone.id)"
              >
                <HugeiconsIcon :icon="Add01Icon" :size="14" :stroke-width="2" />
                <span>Task</span>
              </button>

              <!-- Delete Milestone Button -->
              <button
                type="button"
                class="text-neutral-400 hover:text-rose-500 p-1.5 rounded-lg transition-colors cursor-pointer"
                title="Hapus Milestone"
                @click="confirmDeleteMilestone(milestone.id)"
              >
                <HugeiconsIcon :icon="Delete02Icon" :size="15" :stroke-width="1.8" />
              </button>
            </div>
          </div>

          <!-- Tasks List under this Milestone -->
          <div v-if="getFilteredMilestoneTasks(milestone.id).length > 0" class="space-y-3">
            <div
              v-for="task in getFilteredMilestoneTasks(milestone.id)"
              :key="task.id"
              class="p-4 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 space-y-2.5 transition-all"
            >
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div class="flex items-center gap-2 flex-wrap">
                  <span
                    :class="[
                      'px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-poppins font-semibold border',
                      getCategoryBadgeClass(task.category)
                    ]"
                  >
                    {{ task.category }}
                  </span>
                  <span
                    :class="[
                      'px-2 py-0.5 rounded-md text-[10px] font-semibold',
                      task.priority === 'Tinggi'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                        : task.priority === 'Sedang'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                          : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                    ]"
                  >
                    Prioritas {{ task.priority }}
                  </span>
                </div>

                <div class="flex items-center gap-3 text-xs text-neutral-500 self-end sm:self-auto">
                  <span class="flex items-center gap-1 text-[11px]">
                    <HugeiconsIcon :icon="Calendar01Icon" :size="12" />
                    <span>Tenggat: <strong>{{ task.dueDate }}</strong></span>
                  </span>

                  <!-- Status Eksekusi oleh UMKM (Read-Only Monitoring Badge untuk Konsultan) -->
                  <div class="flex items-center">
                    <span
                      v-if="task.status === 'DONE' || task.completed"
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-bold bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-2xs"
                      title="Telah diselesaikan oleh pelaku usaha"
                    >
                      <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" :stroke-width="2.5" />
                      <span>Selesai Dikerjakan</span>
                    </span>
                    <span
                      v-else-if="task.status === 'IN_PROGRESS'"
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800 shadow-2xs"
                      title="Sedang dalam proses pengerjaan oleh pelaku usaha"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span>Sedang Dikerjakan</span>
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-semibold bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                      title="Menunggu tindakan dari pelaku usaha"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      <span>Belum Dimulai</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    class="text-neutral-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                    title="Hapus Task"
                    @click="konsultanStore.deleteTask(task.id)"
                  >
                    <HugeiconsIcon :icon="Delete02Icon" :size="14" />
                  </button>
                </div>
              </div>

              <!-- Task Title & Description -->
              <div class="space-y-1">
                <h4
                  :class="[
                    'font-poppins font-bold text-sm sm:text-[15px]',
                    task.status === 'DONE' ? 'text-neutral-400 line-through' : 'text-neutral-900 dark:text-white'
                  ]"
                >
                  {{ task.title }}
                </h4>
                <p class="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                  {{ task.description }}
                </p>
                <div v-if="task.consultantNote" class="mt-2 text-[11px] text-[#0081A0] dark:text-[#2091AA] bg-sky-50 dark:bg-sky-950/30 p-2 rounded-xl border border-sky-100 dark:border-sky-900/30">
                  <strong>Catatan Konsultan:</strong> {{ task.consultantNote }}
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Tasks in Milestone -->
          <div v-else class="p-4 text-center rounded-2xl bg-neutral-50 dark:bg-[#18191E] border border-dashed border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500">
            Belum ada task pada milestone ini. Klik "+ Task" di kanan atas milestone untuk menambahkan.
          </div>
        </div>
      </div>

      <!-- Empty Search Result or Empty Milestones -->
      <div v-else class="card-tactile-gopay rounded-3xl p-10 sm:p-12 text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-[#0081A0]/10 text-[#0081A0] mx-auto flex items-center justify-center">
          <HugeiconsIcon :icon="Task01Icon" :size="24" :stroke-width="2" />
        </div>
        <div class="space-y-1 max-w-md mx-auto">
          <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
            {{ clientMilestones.length === 0 ? 'Belum Ada Milestone untuk Klien Ini' : 'Tidak Ada Hasil yang Cocok' }}
          </h3>
          <p class="text-xs text-neutral-500">
            {{ clientMilestones.length === 0 ? 'Mulai susun roadmap bimbingan dengan membuat tahapan milestone pertama.' : 'Tidak ditemukan langkah aksi atau milestone yang sesuai dengan pencarian atau filter ini.' }}
          </p>
        </div>
        <div class="flex items-center justify-center gap-2 pt-1">
          <button
            v-if="clientMilestones.length > 0 && (searchTask || selectedCategory !== 'Semua')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            @click="searchTask = ''; selectedCategory = 'Semua'"
          >
            Reset Pencarian & Filter
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold bg-[#0081A0] text-white hover:bg-[#00708C] transition-all cursor-pointer shadow-2xs"
            @click="openAddMilestoneModal"
          >
            + Buat Milestone
          </button>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- TAB 3: VALIDASI KAS BULANAN UMKM                                   -->
    <!-- =================================================================== -->
    <div v-else-if="activeTab === 'validation'" class="gsap-tab-content space-y-6">
      <!-- Success Alert if validated -->
      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
        <div
          v-if="validationSuccessMsg"
          class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3 text-xs text-emerald-800 dark:text-emerald-200"
        >
          <div class="flex items-center gap-2.5">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Laporan kas periode September 2026 telah <strong>berhasil disahkan</strong>! Status verifikasi telah diperbarui untuk investor.</span>
          </div>
          <button type="button" @click="validationSuccessMsg = false" class="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 font-bold px-2 py-1 cursor-pointer">✕</button>
        </div>
      </transition>

      <!-- Card 1: Review & Pengesahan Laporan Kas Terakhir (September 2026) -->
      <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 space-y-6">
        <div class="pb-4 border-b border-neutral-100 dark:border-neutral-800 space-y-1">
          <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white">
            Tinjauan Kas Periode: September 2026
          </h2>
          <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
            Cocokkan laporan keuangan masuk dan keluar usaha {{ client?.name }} dengan bukti mutasi rekening koran serta struk POS untuk calon investor.
          </p>
        </div>

        <!-- 4 Financial Metrics Bento -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div class="p-4 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <span class="text-xs text-neutral-500 font-medium">Omzet Penjualan</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="font-poppins font-extrabold text-xl sm:text-2xl text-[#0081A0] dark:text-[#2091AA] tabular-nums">
                Rp 73,0
              </span>
              <span class="text-xs text-neutral-400">Juta</span>
            </div>
            <p class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              ↑ 12.3% vs Agustus 2026
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <span class="text-xs text-neutral-500 font-medium">Modal Jualan (HPP)</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="font-poppins font-extrabold text-xl sm:text-2xl text-rose-600 dark:text-rose-400 tabular-nums">
                Rp 34,5
              </span>
              <span class="text-xs text-neutral-400">Juta</span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
              Rasio HPP 47.3% (Ideal)
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <span class="text-xs text-neutral-500 font-medium">Beban Operasional</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="font-poppins font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-white tabular-nums">
                Rp 18,0
              </span>
              <span class="text-xs text-neutral-400">Juta</span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
              Gaji tim, sewa & utilitas
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <span class="text-xs text-neutral-500 font-medium">Untung Bersih Riil</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="font-poppins font-extrabold text-xl sm:text-2xl text-[#00AA13] dark:text-emerald-400 tabular-nums">
                Rp 20,5
              </span>
              <span class="text-xs text-neutral-400">Juta</span>
            </div>
            <p class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              Margin Bersih 28.1%
            </p>
          </div>
        </div>

        <!-- Bukti Dokumen Terlampir dari UMKM -->
        <div class="space-y-3">
          <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
            <HugeiconsIcon :icon="File01Icon" :size="16" class="text-[#0081A0]" />
            <span>Dokumen Bukti Keuangan Terlampir</span>
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3.5 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0081A0] flex items-center justify-center shrink-0">
                  <HugeiconsIcon :icon="File01Icon" :size="20" />
                </div>
                <div>
                  <p class="text-xs font-poppins font-bold text-neutral-900 dark:text-white">
                    Rekening Koran Mandiri - Sep 2026.pdf
                  </p>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                    2.4 MB • Mutasi Bank Lengkap (1-30 Sep)
                  </p>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                Cocok
              </span>
            </div>

            <div class="p-3.5 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <HugeiconsIcon :icon="File01Icon" :size="20" />
                </div>
                <div>
                  <p class="text-xs font-poppins font-bold text-neutral-900 dark:text-white">
                    Rekap POS & Kasir Moka - Sep 2026.pdf
                  </p>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                    1.1 MB • 1.420 Transaksi Struk Kasir
                  </p>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                Sesuai
              </span>
            </div>
          </div>
        </div>

        <!-- Consultant Validation Notes & Action -->
        <div class="space-y-2 pt-2">
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-poppins">
            Catatan Rekomendasi Validasi Konsultan (Untuk UMKM & Investor)
          </label>
          <textarea
            v-model="validationNotes"
            rows="3"
            class="w-full px-4 py-2.5 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#00AA13]"
            placeholder="Tuliskan catatan hasil pemeriksaan buku kas bulan ini..."
          />
        </div>

        <!-- Validation Action Buttons -->
        <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button
            type="button"
            class="px-4 py-2.5 rounded-xl text-xs font-poppins font-semibold border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
            @click="clientCashStatus = 'REVISED'"
          >
            Minta Revisi Pencatatan
          </button>
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl text-xs font-poppins font-bold text-white bg-[#00AA13] hover:bg-[#009210] active:scale-[0.98] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
            @click="confirmValidateCash"
          >
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" />
            <span>Sahkan & Validasi Kas Bulan Ini</span>
          </button>
        </div>
      </div>

      <!-- Card 2: Log Riwayat Buku Kas Bulanan Terverifikasi -->
      <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 space-y-4">
        <div>
          <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Log Riwayat Buku Kas Terverifikasi
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Daftar laporan keuangan bulanan {{ client?.name }} yang telah disahkan keabsahannya oleh konsultan pendamping.
          </p>
        </div>

        <div class="overflow-x-auto -mx-6 sm:mx-0">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                <th class="py-3 px-4">Periode</th>
                <th class="py-3 px-4">Omzet Penjualan</th>
                <th class="py-3 px-4">Modal Jualan (HPP)</th>
                <th class="py-3 px-4">Untung Bersih</th>
                <th class="py-3 px-4">Tanggal Audit</th>
                <th class="py-3 px-4 text-center">Status Validasi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
              <tr
                v-for="log in historicalCashLogs"
                :key="log.month"
                class="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/30 transition-colors"
              >
                <td class="py-3.5 px-4 font-poppins font-bold text-neutral-900 dark:text-white">
                  {{ log.month }}
                </td>
                <td class="py-3.5 px-4 text-[#0081A0] dark:text-[#2091AA] font-bold tabular-nums">
                  Rp {{ log.omzet }},0 Juta
                </td>
                <td class="py-3.5 px-4 text-rose-600 dark:text-rose-400 font-bold tabular-nums">
                  Rp {{ log.hpp }} Juta
                </td>
                <td class="py-3.5 px-4 text-[#00AA13] dark:text-emerald-400 font-bold tabular-nums">
                  Rp {{ log.net }} Juta
                </td>
                <td class="py-3.5 px-4 text-neutral-500 tabular-nums">
                  {{ log.auditDate }}
                </td>
                <td class="py-3.5 px-4 text-center">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-[#00AA13] dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" />
                    Terverifikasi
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- TAB 4: AUDIT SKOR 5 ASPEK FUNDAMENTAL                               -->
    <!-- =================================================================== -->
    <div v-else-if="activeTab === 'audit'" class="gsap-tab-content space-y-6">
      <!-- Success Alert if saved -->
      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
        <div
          v-if="auditSavedSuccess"
          class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3 text-xs text-emerald-800 dark:text-emerald-200"
        >
          <div class="flex items-center gap-2.5">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Audit penilaian 5 pilar berhasil disimpan! Skor fundamental klien kini diperbarui menjadi <strong>{{ client?.healthScore }}/100</strong>.</span>
          </div>
          <button type="button" @click="auditSavedSuccess = false" class="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 font-bold px-2 py-1 cursor-pointer">✕</button>
        </div>
      </transition>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Left: Form Skor 5 Aspek (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          <div class="card-tactile-gopay p-5 sm:p-6 rounded-3xl space-y-5">
            <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
                Evaluasi Skor 5 Dimensi
              </h3>
              <p class="text-xs text-neutral-500 mt-0.5">
                Geser slider atau masukkan nilai evaluasi objektif untuk setiap pilar fundamental.
              </p>
            </div>

            <!-- 5 Aspect Items -->
            <div class="space-y-5 divide-y divide-neutral-100 dark:divide-neutral-800/60">
              <div
                v-for="(aspect, idx) in auditAspects"
                :key="aspect.id"
                :class="idx > 0 ? 'pt-5' : ''"
                class="space-y-3"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-300">
                      {{ idx + 1 }}
                    </span>
                    <label class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
                      {{ aspect.name }}
                    </label>
                  </div>

                  <div class="flex items-center gap-1.5 shrink-0">
                    <input
                      v-model.number="aspect.score"
                      type="number"
                      min="0"
                      max="100"
                      class="w-16 px-2.5 py-1 text-center font-poppins font-bold text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#00AA13]"
                    />
                    <span class="text-xs text-neutral-400 font-semibold font-poppins">/ 100</span>
                  </div>
                </div>

                <!-- Range Slider with green accent -->
                <input
                  v-model.number="aspect.score"
                  type="range"
                  min="0"
                  max="100"
                  class="w-full accent-[#00AA13] cursor-pointer"
                />

                <!-- Qualitative Note Input -->
                <div>
                  <label class="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                    Catatan Objektif Konsultan:
                  </label>
                  <textarea
                    v-model="aspect.notes"
                    rows="2"
                    placeholder="Tuliskan temuan audit atau hal yang perlu ditingkatkan..."
                    class="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#00AA13]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Real-time Live Radar Preview (5 cols) -->
        <div class="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
          <div class="card-tactile-gopay p-6 rounded-3xl flex flex-col items-center space-y-4">
            <div class="w-full pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
                Pratinjau Radar Live
              </h4>
            </div>

            <BRadarChart
              :items="liveRadarData"
              :size="270"
              show-target
            />

            <div class="w-full pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-neutral-500">Rata-rata Skor Fundamental:</span>
                <span class="font-poppins font-extrabold text-lg text-[#00AA13] dark:text-emerald-400 tabular-nums">
                  {{ liveAverageScore }} / 100
                </span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-neutral-500">Predikat Kesiapan:</span>
                <span class="font-semibold text-xs" :class="liveAverageScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' : liveAverageScore >= 65 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'">
                  {{ liveAverageScore >= 80 ? 'Sangat Siap Didanai' : liveAverageScore >= 65 ? 'Perlu Pembenahan Taktis' : 'Butuh Pendampingan Intensif' }}
                </span>
              </div>
            </div>

            <button
              type="button"
              class="w-full py-3 rounded-2xl text-xs sm:text-sm font-poppins font-semibold bg-[#00AA13] hover:bg-[#009210] active:scale-[0.98] text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              @click="saveAuditAssessment"
            >
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" :stroke-width="2.2" />
              <span>Simpan Seluruh Hasil Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- TAB 5: SERTIFIKASI PENDANAAN                                        -->
    <!-- =================================================================== -->
    <div v-else-if="activeTab === 'certification'" class="gsap-tab-content space-y-6">
      <!-- Main Certification Form Card -->
      <div class="card-tactile-gopay p-6 sm:p-7 rounded-3xl space-y-6">
        <div>
          <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Pemberian Sertifikasi Kelayakan Modal
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Sertifikasi ini adalah jaminan profesional dari konsultan terdaftar bagi investor institusi maupun perorangan.
          </p>
        </div>

        <!-- Verification Checklist -->
        <div class="space-y-3">
          <label class="font-poppins font-bold text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
            Pernyataan Kepatuhan Konsultan (Checklist Kelayakan)
          </label>

          <div class="space-y-2.5">
            <label class="flex items-start gap-3 p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 cursor-pointer select-none hover:border-emerald-500/50 transition-colors">
              <input type="checkbox" v-model="certCheck1" class="w-4 h-4 rounded accent-[#00AA13] mt-0.5" />
              <div class="text-xs">
                <strong class="font-poppins block text-neutral-900 dark:text-white">Transparansi Laporan Finansial:</strong>
                <span class="text-neutral-500 dark:text-neutral-400">Klien telah membuktikan minimal 3 bulan pelaporan kas & HPP tanpa ada rekayasa atau anomali fatal.</span>
              </div>
            </label>

            <label class="flex items-start gap-3 p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 cursor-pointer select-none hover:border-emerald-500/50 transition-colors">
              <input type="checkbox" v-model="certCheck2" class="w-4 h-4 rounded accent-[#00AA13] mt-0.5" />
              <div class="text-xs">
                <strong class="font-poppins block text-neutral-900 dark:text-white">Legalitas & Kepatuhan Izin:</strong>
                <span class="text-neutral-500 dark:text-neutral-400">NIB RBA, status sewa outlet, dan sertifikasi izin produk sudah tervalidasi keabsahannya.</span>
              </div>
            </label>

            <label class="flex items-start gap-3 p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 cursor-pointer select-none hover:border-emerald-500/50 transition-colors">
              <input type="checkbox" v-model="certCheck3" class="w-4 h-4 rounded accent-[#00AA13] mt-0.5" />
              <div class="text-xs">
                <strong class="font-poppins block text-neutral-900 dark:text-white">Rencana Penggunaan Modal Rasional:</strong>
                <span class="text-neutral-500 dark:text-neutral-400">Proyeksi pertumbuhan dan alokasi modal kerja telah ditinjau dan terbukti realistis.</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Ticket Recommendation -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
              Rekomendasi Tiket Pendanaan (Rp)
            </label>
            <input
              v-model.number="certFundingTicket"
              type="number"
              step="10000000"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm focus:ring-1 focus:ring-[#00AA13] focus:outline-none tabular-nums"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
              Estimasi Payback / Imbal Hasil
            </label>
            <input
              v-model="certRoiNote"
              type="text"
              placeholder="Contoh: Payback 18-24 bulan, Bagi hasil 15%"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm focus:ring-1 focus:ring-[#00AA13] focus:outline-none"
            />
          </div>
        </div>

        <!-- Official Recommendation Note -->
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Pernyataan Rekomendasi Resmi Konsultan untuk Calon Investor
          </label>
          <textarea
            v-model="certRecommendationText"
            rows="3"
            placeholder="Tuliskan catatan rekomendasi yang akan ditampilkan kepada investor di data room..."
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm focus:ring-1 focus:ring-[#00AA13] focus:outline-none"
          />
        </div>

        <!-- Action Button -->
        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p class="text-xs text-neutral-500">
            Pastikan seluruh aspek telah dicek secara seksama sebelum menerbitkan sertifikasi.
          </p>

          <button
            type="button"
            :disabled="!certCheck1 || !certCheck2 || !certCheck3"
            :class="[
              'px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-poppins font-semibold transition-all flex items-center justify-center gap-2 shadow-sm',
              certCheck1 && certCheck2 && certCheck3
                ? 'bg-[#00AA13] hover:bg-[#009210] text-white cursor-pointer active:scale-95'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
            ]"
            @click="certifyNow"
          >
            <HugeiconsIcon :icon="Award01Icon" :size="16" :stroke-width="2.2" />
            <span>{{ client?.fundingStatus === 'READY_FOR_FUNDING' ? 'Perbarui Sertifikasi' : 'Terbitkan Sertifikasi' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- MODAL 1: TAMBAH MILESTONE BARU                                      -->
    <!-- =================================================================== -->
    <BModal
      v-model="isAddMilestoneModalOpen"
      title="Tambah Milestone Baru"
      subtitle="Buat tahapan baru dalam roadmap bimbingan klien ini."
    >
      <div class="space-y-4 text-left">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Judul Milestone <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="newMilestone.title"
            type="text"
            placeholder="Contoh: Validasi Kesiapan Modal & Audit Proposal"
            class="w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Target Periode Waktu
          </label>
          <input
            v-model="newMilestone.targetDate"
            type="text"
            placeholder="Contoh: Bulan 3 atau 6 Minggu ke Depan"
            class="w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Deskripsi Tahapan <span class="text-rose-500">*</span>
          </label>
          <textarea
            v-model="newMilestone.description"
            rows="3"
            placeholder="Jelaskan fokus dan sasaran utama bimbingan pada tahapan ini..."
            class="w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          />
        </div>
      </div>

      <template #footer="{ close }">
        <button
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          @click="close"
        >
          Batal
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold bg-[#0081A0] hover:bg-[#00708C] text-white transition-all cursor-pointer shadow-2xs"
          @click="submitNewMilestone"
        >
          Simpan Milestone
        </button>
      </template>
    </BModal>

    <!-- =================================================================== -->
    <!-- MODAL 2: TAMBAH TASK BARU KE MILESTONE                              -->
    <!-- =================================================================== -->
    <BModal
      v-model="isAddTaskModalOpen"
      title="Beri Task / Rencana Aksi Baru"
      subtitle="Tugaskan langkah aksi yang harus diselesaikan pemilik UMKM."
    >
      <div class="space-y-4 text-left">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Pilih Milestone Induk <span class="text-rose-500">*</span>
          </label>
          <select
            v-model="newTask.milestoneId"
            class="w-full px-3 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          >
            <option
              v-for="ms in clientMilestones"
              :key="ms.id"
              :value="ms.id"
            >
              #{{ ms.order }} - {{ ms.title }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Judul Task / Rencana Aksi <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="newTask.title"
            type="text"
            placeholder="Contoh: Pisahkan rekening kas toko & lengkapi kartu stok"
            class="w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
              Pilar Kategori
            </label>
            <select
              v-model="newTask.category"
              class="w-full px-3 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
            >
              <option value="Finansial">Finansial</option>
              <option value="Operasional">Operasional</option>
              <option value="Legalitas">Legalitas</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="SDM">SDM</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
              Tingkat Prioritas
            </label>
            <select
              v-model="newTask.priority"
              class="w-full px-3 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
            >
              <option value="Tinggi">Tinggi</option>
              <option value="Sedang">Sedang</option>
              <option value="Rendah">Rendah</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Target Tanggal Selesai
          </label>
          <input
            v-model="newTask.dueDate"
            type="text"
            placeholder="Contoh: 25 Oktober 2026 atau 2 Minggu"
            class="w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Panduan Langkah Aksi <span class="text-rose-500">*</span>
          </label>
          <textarea
            v-model="newTask.description"
            rows="2"
            placeholder="Jelaskan langkah taktis yang harus dilakukan oleh pemilik usaha..."
            class="w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Catatan Konsultan (Opsional)
          </label>
          <input
            v-model="newTask.consultantNote"
            type="text"
            placeholder="Contoh: Berkas formulir telah dikirimkan via WA"
            class="w-full px-3.5 py-2 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          />
        </div>
      </div>

      <template #footer="{ close }">
        <button
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          @click="close"
        >
          Batal
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold bg-[#0081A0] hover:bg-[#00708C] text-white transition-all cursor-pointer shadow-2xs"
          @click="submitNewTask"
        >
          Tugaskan Task
        </button>
      </template>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import confetti from 'canvas-confetti'
import gsap from 'gsap'
import { useKonsultanStore } from '~/stores/konsultan'
import BModal from '~/components/base/BModal.vue'
import BRadarChart from '~/components/base/BRadarChart.vue'
import BLineAreaChart from '~/components/base/BLineAreaChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Award01Icon,
  CheckmarkCircle01Icon,
  Calendar01Icon,
  Delete02Icon,
  Add01Icon,
  AnalyticsUpIcon,
  Task01Icon,
  ArrowLeft01Icon,
  PencilEdit02Icon,
  Coins01Icon,
  Cancel01Icon,
  File01Icon,
  Search01Icon,
  FilterIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const route = useRoute()
const clientId = computed(() => (route.params.id as string) || 'umkm-01')

const konsultanStore = useKonsultanStore()

const client = computed(() => {
  return konsultanStore.clients.find(c => c.id === clientId.value) || konsultanStore.clients[0]
})

// 5 Aspek Fundamental Radar Otomatis per Klien
const clientAspects = computed(() => {
  return konsultanStore.getClientAssessment(clientId.value)
})

const selectedAspectIndex = ref<number | null>(null)
const hoveredAspectIndex = ref<number | null>(null)

const activeAspectIndex = computed(() => {
  if (hoveredAspectIndex.value !== null) return hoveredAspectIndex.value
  return selectedAspectIndex.value
})

const activeAspect = computed(() => {
  if (activeAspectIndex.value === null) return null
  return clientAspects.value[activeAspectIndex.value] || null
})

function toggleAspectSelect(index: number) {
  selectedAspectIndex.value = selectedAspectIndex.value === index ? null : index
}

const radarData = computed(() => {
  return clientAspects.value.map(a => ({
    name: a.name.split(' ')[0],
    fullName: a.name,
    score: Number(a.score) || 0,
    maxScore: a.maxScore || 100,
    targetScore: a.targetScore || 85,
    notes: a.notes || ''
  }))
})

// Milestones & Tasks per Klien
const clientMilestones = computed(() => {
  return konsultanStore.getClientMilestones(clientId.value)
})

const allClientTasks = computed(() => {
  return konsultanStore.getClientTasks(clientId.value)
})

const clientCompletedTasksCount = computed(() => {
  return allClientTasks.value.filter(t => t.completed || t.status === 'DONE').length
})

const clientTotalTasksCount = computed(() => {
  return allClientTasks.value.length
})

const clientTasksProgressPct = computed(() => {
  if (clientTotalTasksCount.value === 0) return 0
  return Math.round((clientCompletedTasksCount.value / clientTotalTasksCount.value) * 100)
})

// Macro Tab Navigation (GoPay Green Edition - 5 Pilihan Menu Sesuai Catatan Kas UMKM)
type TabKey = 'summary' | 'milestones' | 'validation' | 'audit' | 'certification'
const activeTab = ref<TabKey>('summary')
const tabIndicatorRef = ref<HTMLElement | null>(null)
const tabRefs = new Map<string, HTMLElement>()

// Validasi Kas Bulanan State & Actions
const validationNotes = ref(
  'Seluruh mutasi debet/kredit pada rekening koran dan POS kasir telah dicocokkan dengan bukti fisik nota pembelian bahan baku biji kopi serta kemasan. Laporan kas tervalidasi riil tanpa anomali pencampuran kas pribadi.'
)
const validationSuccessMsg = ref(false)
const clientCashStatus = ref<'VERIFIED' | 'PENDING' | 'REVISED'>('VERIFIED')

const historicalCashLogs = [
  { month: 'September 2026', omzet: 73, hpp: 34.5, net: 20.5, auditDate: '18 Sep 2026' },
  { month: 'Agustus 2026', omzet: 65, hpp: 29, net: 18, auditDate: '15 Agu 2026' },
  { month: 'Juli 2026', omzet: 58, hpp: 26, net: 16, auditDate: '14 Jul 2026' },
  { month: 'Juni 2026', omzet: 52, hpp: 23.5, net: 14.5, auditDate: '12 Jun 2026' },
  { month: 'Mei 2026', omzet: 46, hpp: 21, net: 13, auditDate: '10 Mei 2026' }
]

// Filter Range Waktu untuk Riwayat Kinerja Historis Bulanan
type TimeRangeKey = '3M' | '6M' | '1Y' | 'ALL'
const selectedTimeRange = ref<TimeRangeKey>('6M')

const timeRangeOptions = [
  { label: '3 Bulan', value: '3M' },
  { label: '6 Bulan', value: '6M' },
  { label: '1 Tahun', value: '1Y' },
  { label: 'Semua', value: 'ALL' }
]

const chartDataByRange = computed(() => {
  switch (selectedTimeRange.value) {
    case '3M':
      return {
        categories: ['Jul', 'Agu', 'Sep'],
        omzet: [58, 65, 73],
        hpp: [26, 29, 34.5]
      }
    case '6M':
      return {
        categories: ['Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
        omzet: [42, 46, 52, 58, 65, 73],
        hpp: [19, 21, 23.5, 26, 29, 34.5]
      }
    case '1Y':
      return {
        categories: ['Okt', 'Nov', 'Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
        omzet: [28, 30, 33, 35, 37, 39, 42, 46, 52, 58, 65, 73],
        hpp: [13, 14, 15.5, 16, 17, 18, 19, 21, 23.5, 26, 29, 34.5]
      }
    case 'ALL':
    default:
      return {
        categories: ['2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2', '2026 Q3'],
        omzet: [85, 96, 111, 156, 196],
        hpp: [41, 46, 51, 70.5, 89.5]
      }
  }
})

const chartSeries = computed(() => [
  { id: 'omzet', name: 'Omzet Penjualan', color: '#0081A0', data: chartDataByRange.value.omzet },
  { id: 'hpp', name: 'Modal Jualan (HPP)', color: '#FF4B4B', data: chartDataByRange.value.hpp }
])

function confirmValidateCash() {
  clientCashStatus.value = 'VERIFIED'
  validationSuccessMsg.value = true
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.6 }
  })
  setTimeout(() => {
    validationSuccessMsg.value = false
  }, 4000)
}

function setTabRef(id: string, el: any) {
  if (el) tabRefs.set(id, el as HTMLElement)
}

function updateTabIndicator(immediate = false) {
  const indicatorEl = tabIndicatorRef.value
  if (!indicatorEl) return

  const targetEl = tabRefs.get(activeTab.value)
  if (!targetEl) return

  const targetLeft = targetEl.offsetLeft
  const targetWidth = targetEl.offsetWidth

  if (immediate) {
    gsap.set(indicatorEl, { x: targetLeft, width: targetWidth, opacity: 1 })
  } else {
    gsap.to(indicatorEl, {
      x: targetLeft,
      width: targetWidth,
      opacity: 1,
      duration: 0.45,
      ease: 'back.out(1.5)',
      overwrite: 'auto'
    })
  }
}

function setActiveTab(tab: TabKey) {
  if (activeTab.value === tab) return
  activeTab.value = tab
  updateTabIndicator(false)
  nextTick(() => {
    gsap.fromTo(
      '.gsap-tab-content',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
    )
  })
}

// Audit 5 Aspek Fundamental State
const auditAspects = ref(JSON.parse(JSON.stringify(konsultanStore.getClientAssessment(clientId.value))))
const auditSavedSuccess = ref(false)

const liveAverageScore = computed(() => {
  const sum = auditAspects.value.reduce((acc: number, a: { score: number }) => acc + (Number(a.score) || 0), 0)
  return Math.round(sum / (auditAspects.value.length || 1))
})

const liveRadarData = computed(() => {
  return auditAspects.value.map((a: { name: string; score: number; maxScore: number; targetScore: number }) => ({
    name: a.name.split(' ')[0],
    score: Number(a.score) || 0,
    maxScore: a.maxScore || 100,
    targetScore: a.targetScore || 85
  }))
})

function saveAuditAssessment() {
  konsultanStore.updateClientAssessment(clientId.value, auditAspects.value)
  auditSavedSuccess.value = true
  setTimeout(() => {
    auditSavedSuccess.value = false
  }, 4000)
}

// Sertifikasi Ready for Funding State
const certCheck1 = ref(true)
const certCheck2 = ref(true)
const certCheck3 = ref(true)
const certFundingTicket = ref(client.value?.fundingTarget || 250000000)
const certRoiNote = ref('Payback 18-24 bulan (Bagi Hasil)')
const certRecommendationText = ref(
  'Klien menunjukkan pertumbuhan stabil di outlet dengan manajemen stok bahan baku yang efisien. Sangat direkomendasikan untuk pendanaan ekspansi usaha.'
)
const certifiedSuccess = ref(false)

function certifyNow() {
  konsultanStore.certifyClientReady(clientId.value)
  certifiedSuccess.value = true

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  })

  setTimeout(() => {
    certifiedSuccess.value = false
  }, 5000)
}

let handleResize: (() => void) | null = null

onMounted(() => {
  nextTick(() => {
    updateTabIndicator(true)
  })
  setTimeout(() => {
    updateTabIndicator(true)
  }, 120)

  handleResize = () => {
    updateTabIndicator(true)
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (handleResize) {
    window.removeEventListener('resize', handleResize)
  }
})

// Filter & Search Kategori Task
const searchTask = ref('')
const selectedCategory = ref('Semua')
const categoryFilters = ['Semua', 'Finansial', 'Operasional', 'Legalitas', 'Pemasaran', 'SDM']

function getMilestoneTasks(milestoneId: string) {
  return allClientTasks.value.filter(t => t.milestoneId === milestoneId)
}

function getFilteredMilestoneTasks(milestoneId: string) {
  let tasks = getMilestoneTasks(milestoneId)
  if (selectedCategory.value !== 'Semua') {
    tasks = tasks.filter(t => t.category === selectedCategory.value)
  }
  if (searchTask.value.trim()) {
    const q = searchTask.value.toLowerCase().trim()
    tasks = tasks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.description && t.description.toLowerCase().includes(q))
    )
  }
  return tasks
}

const filteredMilestones = computed(() => {
  if (!searchTask.value.trim() && selectedCategory.value === 'Semua') {
    return clientMilestones.value
  }
  const q = searchTask.value.toLowerCase().trim()
  return clientMilestones.value.filter(m => {
    const titleMatch = !q || m.title.toLowerCase().includes(q)
    const tasks = getFilteredMilestoneTasks(m.id)
    return tasks.length > 0 || (titleMatch && selectedCategory.value === 'Semua')
  })
})

function getCategoryBadgeClass(category: string) {
  switch (category) {
    case 'Finansial':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    case 'Operasional':
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    case 'Legalitas':
      return 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    case 'Pemasaran':
      return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    default:
      return 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800'
  }
}

// Modal Tambah Milestone
const isAddMilestoneModalOpen = ref(false)
const newMilestone = ref({
  order: 1,
  title: '',
  description: '',
  targetDate: 'Bulan 1'
})

function openAddMilestoneModal() {
  const nextOrder = clientMilestones.value.length > 0
    ? Math.max(...clientMilestones.value.map(m => m.order || 0)) + 1
    : 1
  newMilestone.value = {
    order: nextOrder,
    title: '',
    description: '',
    targetDate: `Bulan ${nextOrder}`
  }
  isAddMilestoneModalOpen.value = true
}

function submitNewMilestone() {
  if (!newMilestone.value.title || !newMilestone.value.description) return

  const autoOrder = clientMilestones.value.length > 0
    ? Math.max(...clientMilestones.value.map(m => m.order || 0)) + 1
    : 1

  konsultanStore.addMilestone({
    clientId: clientId.value,
    order: newMilestone.value.order || autoOrder,
    title: newMilestone.value.title,
    description: newMilestone.value.description,
    targetDate: newMilestone.value.targetDate
  })

  isAddMilestoneModalOpen.value = false
}

function confirmDeleteMilestone(milestoneId: string) {
  if (confirm('Apakah Anda yakin ingin menghapus milestone ini beserta seluruh task di dalamnya?')) {
    konsultanStore.deleteMilestone(milestoneId)
  }
}

// Modal Tambah Task
const isAddTaskModalOpen = ref(false)
const newTask = ref({
  milestoneId: '',
  title: '',
  category: 'Finansial' as 'Finansial' | 'Operasional' | 'Pemasaran' | 'Legalitas' | 'Tata Kelola' | 'SDM',
  priority: 'Tinggi' as 'Tinggi' | 'Sedang' | 'Rendah',
  dueDate: '2 Minggu ke Depan',
  description: '',
  consultantNote: ''
})

function openAddTaskModal(targetMilestoneId: string | null) {
  const defaultMsId = targetMilestoneId || (clientMilestones.value[0]?.id || '')
  newTask.value = {
    milestoneId: defaultMsId,
    title: '',
    category: 'Finansial',
    priority: 'Tinggi',
    dueDate: '2 Minggu ke Depan',
    description: '',
    consultantNote: ''
  }
  isAddTaskModalOpen.value = true
}

function submitNewTask() {
  if (!newTask.value.title || !newTask.value.description || !newTask.value.milestoneId) return

  konsultanStore.addTask({
    clientId: clientId.value,
    milestoneId: newTask.value.milestoneId,
    title: newTask.value.title,
    description: newTask.value.description,
    category: newTask.value.category,
    priority: newTask.value.priority,
    dueDate: newTask.value.dueDate,
    consultantNote: newTask.value.consultantNote
  })

  isAddTaskModalOpen.value = false
}
</script>
