<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100 select-none">
    <!-- 1. Top Controls -->
    <div class="flex items-center justify-end gap-2.5 pb-2 shrink-0">
      <!-- Primary 3D Action: Tambah Rencana Baru -->
      <button
        type="button"
        class="btn-3d-blue px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-poppins font-semibold shadow-xs cursor-pointer flex items-center gap-2"
        @click="isAddTaskModalOpen = true"
      >
        <HugeiconsIcon :icon="Add01Icon" :size="16" :stroke-width="2.2" />
        <span>Tambah Rencana Baru</span>
      </button>
    </div>

    <!-- 2. Editorial Header Banner (GoPay Tactile Card) -->
    <div class="gsap-header-card rounded-3xl card-tactile-gopay p-6 sm:p-7 relative overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F]">
      <!-- Background Ambient Glow -->
      <div class="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#2091AA]/10 dark:bg-[#2091AA]/15 blur-3xl pointer-events-none" />
      <div class="absolute right-36 -bottom-16 w-48 h-48 rounded-full bg-[#00AA13]/10 dark:bg-[#00AA13]/10 blur-3xl pointer-events-none" />

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4F7] dark:bg-[#2091AA]/20 text-[#2091AA] dark:text-[#50AABF] text-xs font-poppins font-semibold border border-[#2091AA]/20 dark:border-[#50AABF]/30">
            <HugeiconsIcon :icon="Task01Icon" :size="14" :stroke-width="2" />
            <span>Roadmap Kesiapan Usaha & Akses Modal</span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Rencana Aksi & Langkah Perbaikan Toko
          </h1>

          <p class="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            Daftar tugas taktis yang dirancang bersama konsultan pendamping tokomu untuk memperkuat tata kelola kas, efisiensi bahan baku, dan kelengkapan legalitas. Selesaikan langkah aksi untuk membuka akses modal kemitraan.
          </p>
        </div>

        <!-- Right Quick Stat Pills -->
        <div class="grid grid-cols-2 gap-3 shrink-0">
          <div class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-center min-w-[140px]">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Skor Bisnis</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="font-poppins font-extrabold text-2xl text-[#2091AA] dark:text-[#50AABF] tabular-nums">
                {{ umkmStore.overallHealthScore }}
              </span>
              <span class="text-xs text-neutral-400">/ 100</span>
            </div>
            <span class="text-[11px] text-[#00AA13] dark:text-emerald-400 font-medium mt-0.5">
              Siap Pendanaan
            </span>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-center min-w-[140px]">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Tugas Selesai</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="font-poppins font-extrabold text-2xl text-[#00AA13] dark:text-emerald-400 tabular-nums">
                {{ umkmStore.tasksProgressPct }}%
              </span>
            </div>
            <span class="text-[11px] text-neutral-400 mt-0.5">
              Tinggal 1 Langkah Lagi!
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Overall Progress Bar Card (Tactile GoPay) -->
    <div class="gsap-progress-card card-tactile-gopay rounded-2xl p-5 sm:p-6 space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Progres Kelulusan Rencana Aksi
          </h3>
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
            Dikit lagi lolos pendanaan! Selesaikan seluruh tugas untuk mendapatkan sertifikasi kesiapan investasi resmi.
          </p>
        </div>
        <span class="text-2xl sm:text-3xl font-poppins font-extrabold text-[#00AA13] dark:text-emerald-400 tabular-nums">
          {{ umkmStore.tasksProgressPct }}%
        </span>
      </div>

      <!-- Segmented Tactile Progress Bar -->
      <div class="w-full h-3 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative p-0.5">
        <div
          class="h-full rounded-full bg-gradient-to-r from-[#2091AA] via-[#00C058] to-[#00AA13] transition-all duration-700 ease-out shadow-xs"
          :style="{ width: `${umkmStore.tasksProgressPct}%` }"
        />
      </div>
    </div>

    <!-- 4. Macro View Switcher (Segmented Pill Switcher ala Beranda) -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div class="segmented-pill-container relative shrink-0">
        <!-- GSAP Animated Indicator -->
        <div
          ref="viewTabIndicatorRef"
          class="segmented-pill-indicator"
          aria-hidden="true"
        />

        <button
          type="button"
          :ref="el => setViewTabRef('tasks', el)"
          class="segmented-pill-btn"
          :class="activeView === 'tasks' ? 'is-active' : 'is-inactive'"
          @click="setActiveView('tasks')"
        >
          <HugeiconsIcon :icon="Task01Icon" :size="16" class="mr-1.5" />
          <span>Daftar Tugas & Milestone</span>
        </button>

        <button
          type="button"
          :ref="el => setViewTabRef('radar', el)"
          class="segmented-pill-btn"
          :class="activeView === 'radar' ? 'is-active' : 'is-inactive'"
          @click="setActiveView('radar')"
        >
          <HugeiconsIcon :icon="AnalyticsUpIcon" :size="16" class="mr-1.5" />
          <span>Evaluasi 5 Aspek Fundamental</span>
        </button>
      </div>

      <!-- Quick Category Filter Chips (When in Tasks View) -->
      <div v-if="activeView === 'tasks'" class="flex items-center gap-1.5 flex-wrap">
        <button
          v-for="cat in categoryFilters"
          :key="cat.id"
          type="button"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-poppins font-semibold transition-all cursor-pointer',
            selectedCategory === cat.id
              ? 'bg-[#2091AA] text-white shadow-2xs'
              : 'bg-white dark:bg-[#13161F] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          ]"
          @click="selectedCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- 5. VIEW 1: Milestones & Task Checklist (GoPay Tactile Cards) -->
    <div v-if="activeView === 'tasks'" class="space-y-6">
      <div
        v-for="milestone in umkmStore.milestones"
        :key="milestone.id"
        class="gsap-stagger-card card-tactile-gopay rounded-2xl p-5 sm:p-6 space-y-4"
      >
        <!-- Milestone Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/80 gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#E6F4F7] dark:bg-[#2091AA]/20 text-[#2091AA] dark:text-[#50AABF] font-poppins font-bold text-sm flex items-center justify-center border border-[#2091AA]/20 shrink-0">
              #{{ milestone.order }}
            </div>
            <div>
              <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                {{ milestone.title }}
              </h3>
              <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                {{ milestone.description }}
              </p>
            </div>
          </div>

          <!-- Completed Badge -->
          <span
            :class="[
              'inline-flex items-center gap-1.5 text-xs font-poppins font-bold px-3 py-1.5 rounded-xl border shrink-0',
              getMilestoneTasks(milestone.id).every(t => t.completed)
                ? 'bg-emerald-50 text-[#00AA13] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                : 'bg-neutral-50 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700'
            ]"
          >
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" />
            <span>{{ getMilestoneTasks(milestone.id).filter(t => t.completed).length }}/{{ getMilestoneTasks(milestone.id).length }} Selesai</span>
          </span>
        </div>

        <!-- Task Items List -->
        <div class="space-y-3">
          <div
            v-for="task in getFilteredMilestoneTasks(milestone.id)"
            :key="task.id"
            :class="[
              'p-4 rounded-xl card-tactile-gopay transition-all flex items-start justify-between gap-4 group border',
              task.completed
                ? 'bg-[#F4FAFE]/60 dark:bg-[#13161F]/60 border-neutral-200/60 dark:border-neutral-800 opacity-90'
                : 'hover:border-neutral-400 dark:hover:border-neutral-600'
            ]"
          >
            <!-- Left Checkbox & Text -->
            <div class="flex items-start gap-3.5 min-w-0 flex-1">
              <!-- Custom Checkbox Button -->
              <button
                type="button"
                :class="[
                  'w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all border cursor-pointer',
                  task.completed
                    ? 'bg-[#00AA13] border-[#00AA13] text-white shadow-2xs'
                    : 'bg-white dark:bg-[#18191E] border-neutral-300 dark:border-neutral-600 hover:border-[#2091AA]'
                ]"
                :aria-label="task.completed ? 'Batalkan selesai' : 'Tandai selesai'"
                @click="umkmStore.toggleTask(task.id)"
              >
                <HugeiconsIcon v-if="task.completed" :icon="CheckmarkCircle01Icon" :size="16" :stroke-width="2.5" />
              </button>

              <div class="min-w-0 flex-1 space-y-1">
                <!-- Category & Status Control Row for UMKM -->
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <div class="flex items-center gap-2">
                    <span
                      :class="[
                        'px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-poppins font-semibold border shrink-0',
                        getCategoryBadgeClass(task.category)
                      ]"
                    >
                      {{ task.category }}
                    </span>
                    <span v-if="task.completed || task.status === 'DONE'" class="text-[11px] text-[#00AA13] dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" />
                      <span>Langkah Selesai</span>
                    </span>
                    <span v-else-if="task.status === 'IN_PROGRESS'" class="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span>Sedang Dikerjakan</span>
                    </span>
                  </div>

                  <!-- Status Action Selector untuk UMKM (Pelaku Usaha) -->
                  <div class="flex items-center p-0.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-[11px]">
                    <button
                      type="button"
                      :class="[
                        'px-2.5 py-0.5 rounded-lg font-semibold transition-all cursor-pointer',
                        (task.status === 'TODO' || (!task.status && !task.completed))
                          ? 'bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white shadow-2xs font-bold'
                          : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                      ]"
                      @click.stop="umkmStore.setTaskStatus(task.id, 'TODO')"
                    >
                      Belum
                    </button>
                    <button
                      type="button"
                      :class="[
                        'px-2.5 py-0.5 rounded-lg font-semibold transition-all cursor-pointer',
                        task.status === 'IN_PROGRESS'
                          ? 'bg-amber-500 text-white shadow-2xs font-bold'
                          : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                      ]"
                      @click.stop="umkmStore.setTaskStatus(task.id, 'IN_PROGRESS')"
                    >
                      Proses
                    </button>
                    <button
                      type="button"
                      :class="[
                        'px-2.5 py-0.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1',
                        (task.status === 'DONE' || task.completed)
                          ? 'bg-[#00AA13] text-white shadow-2xs font-bold'
                          : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                      ]"
                      @click.stop="umkmStore.setTaskStatus(task.id, 'DONE')"
                    >
                      <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="11" :stroke-width="2.5" />
                      <span>Selesai</span>
                    </button>
                  </div>
                </div>

                <!-- Title Headline -->
                <h4
                  :class="[
                    'font-poppins font-bold text-sm sm:text-[15px] leading-snug',
                    task.completed
                      ? 'text-neutral-500 dark:text-neutral-400 line-through'
                      : 'text-neutral-900 dark:text-white'
                  ]"
                >
                  {{ task.title }}
                </h4>

                <!-- Description -->
                <p class="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                  {{ task.description }}
                </p>

                <!-- Footer: Deadline, Consultant Note & Button Lihat Bukti Berkas -->
                <div class="pt-2 flex items-center justify-between gap-3 flex-wrap">
                  <div class="flex items-center gap-4 flex-wrap text-[11px] sm:text-xs font-poppins text-neutral-500 dark:text-neutral-400">
                    <span class="flex items-center gap-1">
                      <HugeiconsIcon :icon="Clock01Icon" :size="13" />
                      <span>Tenggat: <strong class="text-neutral-700 dark:text-neutral-300">{{ task.dueDate }}</strong></span>
                    </span>

                    <span v-if="task.consultantNote" class="flex items-center gap-1 text-[#2091AA] dark:text-[#50AABF] font-medium">
                      <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="13" />
                      <span>Catatan: {{ task.consultantNote }}</span>
                    </span>
                  </div>

                  <!-- Button to Preview Document Evidence -->
                  <button
                    type="button"
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-poppins font-medium text-[#2091AA] dark:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
                    @click="openEvidenceModal(task)"
                  >
                    <HugeiconsIcon :icon="EyeIcon" :size="14" :stroke-width="2" />
                    <span>Lihat Bukti Berkas</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. VIEW 2: Evaluasi 5 Aspek Fundamental Usaha -->
    <div v-else class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Left: Interactive Radar Chart Card (7 cols) -->
        <div class="lg:col-span-7 card-tactile-gopay rounded-2xl p-6 sm:p-7 flex flex-col items-center">
          <div class="w-full flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/80 mb-6">
            <div>
              <h3 class="font-poppins font-bold text-lg sm:text-xl text-neutral-900 dark:text-white">
                Radar 5 Aspek Fundamental Toko
              </h3>
              <p class="text-xs font-poppins text-neutral-500 mt-0.5">
                Perbandingan capaian riil toko terhadap target kelulusan investor.
              </p>
            </div>
            <div class="flex items-center gap-4 text-xs font-poppins font-semibold shrink-0">
              <span class="flex items-center gap-1.5 text-[#2091AA] dark:text-[#50AABF]">
                <span class="w-2.5 h-2.5 rounded-full bg-[#2091AA]" />
                Capaian Toko
              </span>
              <span class="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <span class="w-2.5 h-2.5 rounded-full border border-amber-500 bg-amber-400/30" />
                Target Lolos
              </span>
            </div>
          </div>

          <BRadarChart
            :items="radarData"
            :size="340"
            show-target
          />

          <div class="mt-6 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 w-full text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 text-center flex items-center justify-center gap-2 font-poppins">
            <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="16" class="text-[#2091AA] dark:text-[#50AABF]" />
            <span>Validasi berkala bersama: <strong class="text-neutral-900 dark:text-white">{{ umkmStore.profile.consultantName }}</strong> ({{ umkmStore.profile.certifiedAt }})</span>
          </div>
        </div>

        <!-- Right: 5 Pillars Detailed Breakdown Cards (5 cols) -->
        <div class="lg:col-span-5 space-y-3.5">
          <div
            v-for="aspect in umkmStore.assessmentAspects"
            :key="aspect.id"
            class="p-4 rounded-xl card-tactile-gopay space-y-2 border"
          >
            <div class="flex items-center justify-between gap-3">
              <h4 class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                {{ aspect.name }}
              </h4>
              <span
                :class="[
                  'text-xs font-poppins font-bold px-2.5 py-1 rounded-full tabular-nums border shrink-0',
                  aspect.score >= aspect.targetScore
                    ? 'bg-emerald-50 text-[#00AA13] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                ]"
              >
                Skor: {{ aspect.score }}/{{ aspect.maxScore }}
              </span>
            </div>

            <p class="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              {{ aspect.notes }}
            </p>

            <div class="pt-1 flex items-center justify-between text-[11px] text-neutral-400 font-poppins border-t border-neutral-100 dark:border-neutral-800">
              <span>Target Minimal: {{ aspect.targetScore }} Poin</span>
              <span :class="aspect.score >= aspect.targetScore ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'">
                {{ aspect.score >= aspect.targetScore ? 'Target Terlampaui' : 'Perlu Diperkuat' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 7. Bottom Summary & Guidance Card (GoPay Tactile Card) -->
    <div class="gsap-stagger-card card-tactile-gopay rounded-2xl p-5 sm:p-6 border font-poppins">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex items-start gap-3.5 max-w-3xl">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#00AA13] flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shrink-0 mt-0.5">
            <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="20" />
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Tentang Roadmap Rencana Aksi & Kesiapan Usaha
              </h3>
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" />
                <span>Standar Kurasi Investor</span>
              </span>
            </div>
            <p class="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Daftar rencana aksi ini merupakan panduan langkah taktis yang dirancang bersama konsultan pendamping tokomu untuk memperkuat fondasi pencatatan kas, efisiensi operasional, dan kepatuhan legalitas usaha. Setiap bukti pelaksanaan yang diselesaikan dan diunggah akan diverifikasi langsung guna memastikan usahamu memenuhi standar kelayakan data room investor.
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Mini-Badges Row -->
      <div class="mt-4 pt-3.5 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
        <div class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#00AA13] shrink-0" />
          <span>Kurasi Terpandu Konsultan Resmi</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#2091AA] shrink-0" />
          <span>Verifikasi Bukti Dokumen Riil</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#0066D6] shrink-0" />
          <span>Terbuka untuk Akses Modal Kemitraan</span>
        </div>
      </div>
    </div>

    <!-- Hidden Input for Evidence File Upload -->
    <input
      ref="evidenceFileInputRef"
      type="file"
      class="hidden"
      accept=".pdf,.png,.jpg,.jpeg,.webp"
      @change="onEvidenceFileSelected"
    />

    <!-- 8. Modal Pratinjau Bukti Pelaksanaan Tugas (BModal Component) -->
    <BModal
      v-model="isEvidenceModalOpen"
      :title="selectedTaskForPreview ? `Bukti: ${selectedTaskForPreview.title}` : 'Pratinjau Bukti Pelaksanaan'"
      subtitle="Dokumen bukti langkah aksi resmi tersimpan dalam data room Beruang"
      size="lg"
    >
      <div v-if="selectedTaskEvidence" class="space-y-4 font-poppins">
        <!-- Interactive Preview Viewport -->
        <div class="relative rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-700/80 p-3 sm:p-5 overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
          <!-- Case A: Uploaded Image Proof -->
          <div
            v-if="selectedTaskEvidence.file?.previewUrl && (selectedTaskEvidence.file.fileType === 'image' || selectedTaskEvidence.file.previewUrl.startsWith('data:image/'))"
            class="w-full flex flex-col items-center"
          >
            <div class="relative group max-w-full overflow-hidden rounded-xl bg-white dark:bg-neutral-800 p-2 shadow-md border border-neutral-200 dark:border-neutral-700">
              <img
                :src="selectedTaskEvidence.file.previewUrl"
                :alt="selectedTaskEvidence.file.name"
                class="max-h-[460px] w-auto max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div class="absolute top-4 right-4 bg-black/75 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" class="text-emerald-400" />
                <span>Bukti Terunggah</span>
              </div>
            </div>
            <p class="text-[11px] text-neutral-500 mt-2">
              Pratinjau visual berkas bukti gambar yang telah diunggah
            </p>
          </div>

          <!-- Case B: Uploaded PDF with Live URL -->
          <div
            v-else-if="selectedTaskEvidence.file?.previewUrl && selectedTaskEvidence.file.fileType === 'pdf'"
            class="w-full"
          >
            <iframe
              :src="selectedTaskEvidence.file.previewUrl"
              class="w-full h-[460px] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white shadow-xs"
              title="Pratinjau PDF Bukti"
            ></iframe>
          </div>

          <!-- Case C: Authentic Venture-Grade Evidence Certificate Sheet -->
          <div
            v-else
            class="w-full max-w-xl bg-white text-neutral-900 rounded-2xl p-5 sm:p-7 shadow-lg border border-neutral-200 relative overflow-hidden font-poppins select-none"
          >
            <!-- Watermark Background -->
            <div class="absolute -right-10 -bottom-10 opacity-[0.04] pointer-events-none">
              <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.03-7 10.18-3.87-1.15-7-5.51-7-10.18V6.3l7-3.12z" />
              </svg>
            </div>

            <!-- Top Decorative Ribbon -->
            <div class="h-1.5 w-full bg-gradient-to-r from-[#2091AA] via-sky-400 to-[#00AA13] rounded-full mb-5"></div>

            <!-- Header -->
            <div class="text-center pb-4 border-b border-neutral-200">
              <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-[#00AA13] border border-emerald-200 mb-2">
                <HugeiconsIcon :icon="ShieldCheckIcon" :size="20" />
              </div>
              <p class="text-[10px] font-bold tracking-widest uppercase text-neutral-500">
                {{ selectedTaskEvidence.issuer }}
              </p>
              <h4 class="text-base sm:text-lg font-extrabold text-neutral-900 uppercase tracking-tight mt-0.5">
                {{ selectedTaskEvidence.title }}
              </h4>
              <p class="text-[11px] font-mono text-neutral-500 mt-1">
                KODE BUKTI: <span class="font-bold text-neutral-800">{{ selectedTaskEvidence.regNo }}</span>
              </p>
            </div>

            <!-- Body Content -->
            <div class="py-4 space-y-3 text-xs leading-relaxed">
              <p class="text-neutral-600 text-[11px]">
                Dokumen bukti pelaksanaan langkah aksi berikut telah divalidasi dan tersinkronisasi dalam data room Beruang:
              </p>

              <div class="p-3 rounded-xl bg-neutral-50 border border-neutral-200/90 space-y-2 text-[11px]">
                <div class="flex justify-between py-0.5">
                  <span class="text-neutral-500">Langkah Aksi:</span>
                  <span class="font-bold text-neutral-900 text-right max-w-[60%]">{{ selectedTaskForPreview?.title }}</span>
                </div>
                <div class="flex justify-between py-0.5">
                  <span class="text-neutral-500">Unit Usaha:</span>
                  <span class="font-semibold text-neutral-900">{{ umkmStore.profile.name || 'Kopi Senja Nusantara' }}</span>
                </div>
                <div class="flex justify-between py-0.5">
                  <span class="text-neutral-500">Klasifikasi Dokumen:</span>
                  <span class="font-semibold text-neutral-800">{{ selectedTaskEvidence.classification }}</span>
                </div>
                <div class="flex justify-between py-0.5">
                  <span class="text-neutral-500">Tanggal Pengesahan:</span>
                  <span class="font-semibold text-neutral-800">{{ selectedTaskEvidence.file?.uploadedAt || selectedTaskEvidence.date }}</span>
                </div>
              </div>
            </div>

            <!-- Footer Signatures & Stamp -->
            <div class="pt-3 border-t border-neutral-200 flex items-center justify-between text-[10px]">
              <!-- Left: Digital Seal Stamp -->
              <div class="flex items-center gap-2">
                <div class="w-12 h-12 rounded-full border-2 border-dashed border-emerald-600/70 text-[#00AA13] flex flex-col items-center justify-center p-1 text-[8px] font-black leading-tight text-center rotate-[-8deg] bg-emerald-50/50">
                  <span>BERUANG</span>
                  <span class="text-[7px]">VERIFIED</span>
                </div>
                <div>
                  <p class="font-bold text-neutral-800">Status Bukti</p>
                  <p class="text-emerald-700 font-semibold">Terverifikasi Sah</p>
                </div>
              </div>

              <!-- Right: Consultant Authority -->
              <div class="text-right">
                <p class="text-neutral-400">Pemeriksa Konsultan:</p>
                <p class="font-bold text-neutral-800 mt-2 underline decoration-neutral-300">
                  {{ umkmStore.profile.consultantName || 'Dra. Maya Suryani, M.M.' }}
                </p>
                <p class="text-[9px] text-neutral-500">Advisor Kurasi & Legalitas UMKM</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Document Details Breakdown Bar -->
        <div class="p-3.5 rounded-xl bg-white dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-700/80 space-y-2 text-xs">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2091AA]/10 text-[#2091AA] dark:text-[#50AABF] border border-[#2091AA]/20 shrink-0">
                {{ selectedTaskEvidence.file?.fileType === 'image' ? 'GAMBAR / SCAN' : 'PDF' }}
              </span>
              <p class="font-semibold text-neutral-900 dark:text-white truncate">
                {{ selectedTaskEvidence.file?.name }}
              </p>
            </div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 shrink-0">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
              <span>Terverifikasi Konsultan Beruang</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px]">
            <div>
              <span class="text-neutral-400">Ukuran:</span>
              <span class="ml-1 font-medium text-neutral-700 dark:text-neutral-300 tabular-nums">{{ selectedTaskEvidence.file?.size }}</span>
            </div>
            <div>
              <span class="text-neutral-400">Tenggat Target:</span>
              <span class="ml-1 font-medium text-neutral-700 dark:text-neutral-300">{{ selectedTaskForPreview?.dueDate }}</span>
            </div>
            <div>
              <span class="text-neutral-400">Waktu Verifikasi:</span>
              <span class="ml-1 font-medium text-neutral-700 dark:text-neutral-300">{{ selectedTaskEvidence.file?.uploadedAt }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Pinned Footer (Without Unduh Salinan) -->
      <template #footer>
        <div class="flex items-center justify-between w-full">
          <button
            type="button"
            class="btn-pill-gradient inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer transition-all shadow-2xs"
            @click="triggerEvidenceUpload(selectedTaskForPreview?.id)"
          >
            <HugeiconsIcon :icon="Upload04Icon" :size="14" :stroke-width="2" />
            <span>Unggah Ulang / Ganti Bukti</span>
          </button>

          <button
            type="button"
            class="px-5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-neutral-700 dark:text-neutral-300"
            @click="isEvidenceModalOpen = false"
          >
            Tutup
          </button>
        </div>
      </template>
    </BModal>

    <!-- Toast Notification -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-if="showSuccessToast"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-neutral-900/95 dark:bg-white/95 text-white dark:text-neutral-900 shadow-xl border border-neutral-700/60 dark:border-neutral-200/60 font-poppins text-xs font-medium backdrop-blur-md"
      >
        <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" />
        </div>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- 7. Modal Tambah Rencana Aksi Baru -->
    <BModal
      v-model="isAddTaskModalOpen"
      title="Tambah Rencana Aksi Baru"
      subtitle="Buat langkah perbaikan baru untuk didiskusikan bersama konsultan pendamping tokomu"
      size="md"
    >
      <form @submit.prevent="handleSaveNewTask" class="space-y-4 pt-1 font-poppins">
        <!-- Milestone Target -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Kelompok Milestone
          </label>
          <select
            v-model="newTaskForm.milestoneId"
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-poppins cursor-pointer"
          >
            <option v-for="m in umkmStore.milestones" :key="m.id" :value="m.id">
              Milestone #{{ m.order }}: {{ m.title }}
            </option>
          </select>
        </div>

        <!-- Kategori Tugas -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Kategori Aspek
          </label>
          <select
            v-model="newTaskForm.category"
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-poppins cursor-pointer"
          >
            <option value="Finansial">Finansial & Kas Toko</option>
            <option value="Operasional">Operasional & SOP</option>
            <option value="Legalitas">Legalitas & Perizinan</option>
            <option value="Tata Kelola">Tim & Tata Kelola</option>
            <option value="Pemasaran">Pemasaran & Penjualan</option>
          </select>
        </div>

        <!-- Judul Tugas -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Judul Tugas / Langkah Aksi
          </label>
          <input
            v-model="newTaskForm.title"
            type="text"
            required
            placeholder="Contoh: Buka rekening giro terpisah untuk cabang Dago"
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-poppins"
          />
        </div>

        <!-- Deskripsi Tugas -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Rincian & Instruksi Tugas
          </label>
          <textarea
            v-model="newTaskForm.description"
            rows="2"
            required
            placeholder="Jelaskan langkah nyata yang akan dikerjakan tim usahamu..."
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-poppins leading-relaxed"
          ></textarea>
        </div>

        <!-- Tenggat Waktu -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Target Tanggal Penyelesaian
          </label>
          <input
            v-model="newTaskForm.dueDate"
            type="text"
            required
            placeholder="Contoh: 30 Oktober 2026"
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-poppins"
          />
        </div>

        <div class="pt-3 flex items-center justify-end gap-3 border-t border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            class="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-poppins font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            @click="isAddTaskModalOpen = false"
          >
            Batal
          </button>
          <button
            type="submit"
            class="btn-3d-blue px-5 py-2.5 text-xs sm:text-sm font-poppins font-semibold cursor-pointer"
          >
            Simpan Langkah Aksi
          </button>
        </div>
      </form>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useUmkmStore } from '~/stores/umkm'
import gsap from 'gsap'
import BRadarChart from '~/components/base/BRadarChart.vue'
import BModal from '~/components/base/BModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Task01Icon,
  AnalyticsUpIcon,
  Add01Icon,
  CheckmarkCircle01Icon,
  CheckmarkBadge01Icon,
  Clock01Icon,
  EyeIcon,
  Upload04Icon,
  ShieldCheckIcon,
  FileValidationIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const umkmStore = useUmkmStore()

// State View & Tab Switcher
const activeView = ref<'tasks' | 'radar'>('tasks')
const viewTabIndicatorRef = ref<HTMLElement | null>(null)
const viewTabRefs = new Map<string, HTMLElement>()

function setViewTabRef(id: string, el: any) {
  if (el) viewTabRefs.set(id, el as HTMLElement)
}

function updateViewTabIndicator(immediate = false) {
  const indicatorEl = viewTabIndicatorRef.value
  if (!indicatorEl) return

  const targetEl = viewTabRefs.get(activeView.value)
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

function setActiveView(view: 'tasks' | 'radar') {
  activeView.value = view
  updateViewTabIndicator(false)
}

// Category Filters
const categoryFilters = [
  { id: 'ALL', label: 'Semua Kategori' },
  { id: 'Finansial', label: 'Finansial' },
  { id: 'Operasional', label: 'Operasional' },
  { id: 'Legalitas', label: 'Legalitas' },
  { id: 'Tata Kelola', label: 'Tata Kelola' }
] as const

const selectedCategory = ref<string>('ALL')

function getMilestoneTasks(milestoneId: string) {
  return umkmStore.tasks.filter(t => t.milestoneId === milestoneId)
}

function getFilteredMilestoneTasks(milestoneId: string) {
  const tasks = getMilestoneTasks(milestoneId)
  if (selectedCategory.value === 'ALL') return tasks
  return tasks.filter(t => t.category === selectedCategory.value)
}

function getCategoryBadgeClass(category: string) {
  switch (category) {
    case 'Finansial':
      return 'bg-blue-50 text-[#0066D6] border-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800'
    case 'Operasional':
      return 'bg-cyan-50 text-[#2091AA] border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-400 dark:border-cyan-800'
    case 'Legalitas':
      return 'bg-emerald-50 text-[#00AA13] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
    case 'Tata Kelola':
      return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
    default:
      return 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
  }
}

// Radar Chart Items
const radarData = computed(() => {
  return umkmStore.assessmentAspects.map(a => ({
    name: a.name.split(' ')[0],
    score: a.score,
    maxScore: a.maxScore,
    targetScore: a.targetScore
  }))
})

// Modal Add Task State
const isAddTaskModalOpen = ref(false)
const newTaskForm = ref({
  milestoneId: 'm1',
  category: 'Finansial' as 'Finansial' | 'Operasional' | 'Pemasaran' | 'Legalitas' | 'Tata Kelola',
  title: '',
  description: '',
  dueDate: '30 Oktober 2026'
})

async function handleSaveNewTask() {
  if (!newTaskForm.value.title.trim()) return

  await umkmStore.addTask({
    title: newTaskForm.value.title.trim(),
    description: newTaskForm.value.description.trim(),
    category: newTaskForm.value.category,
    dueDate: newTaskForm.value.dueDate.trim(),
    milestoneId: newTaskForm.value.milestoneId
  })

  newTaskForm.value = {
    milestoneId: 'm1',
    category: 'Finansial',
    title: '',
    description: '',
    dueDate: '30 Oktober 2026'
  }
  isAddTaskModalOpen.value = false
  triggerToast('Langkah aksi berhasil ditambahkan dan disinkronkan!')
}

// Toast State
const showSuccessToast = ref(false)
const toastMessage = ref('Bukti pelaksanaan berhasil disimpan!')
let toastTimeout: any = null

function triggerToast(message: string) {
  if (toastTimeout) clearTimeout(toastTimeout)
  toastMessage.value = message
  showSuccessToast.value = true
  toastTimeout = setTimeout(() => {
    showSuccessToast.value = false
  }, 3000)
}

// Task Evidence & Interactive Preview State
const defaultTaskEvidence: Record<string, any> = {
  't-1': {
    title: 'Rekening Koran Operasional Usaha',
    issuer: 'PT Bank Mandiri (Persero) Tbk · KCP Fatmawati',
    regNo: 'MDR/KORAN/2026/0912',
    classification: 'Rekening Giro Khusus Operasional Gerai',
    date: '10 Juli 2026',
    file: {
      name: 'Rekening_Koran_Mandiri_KopiSenja_2026.pdf',
      size: '1.2 MB',
      uploadedAt: '10 Juli 2026',
      isVerified: true
    }
  },
  't-2': {
    title: 'Dokumentasi Display Halal & NIB di Gerai',
    issuer: 'BPJPH Kemenag RI & OSS RBA Kementerian Investasi',
    regNo: 'OSS-RBA-91283019283 / ID321100019283',
    classification: 'Perizinan Usaha & Kepatuhan Konsumen',
    date: '25 Juli 2026',
    file: {
      name: 'Bukti_Display_Halal_NIB_Kasir.pdf',
      size: '2.1 MB',
      uploadedAt: '25 Juli 2026',
      isVerified: true
    }
  },
  't-3': {
    title: 'Lembar Opname Kartu Stok Bahan Baku',
    issuer: 'SOP Manajemen Persediaan Gerai Kopi Senja',
    regNo: 'SOP-STOK-WK42/2026',
    classification: 'Pengendalian Biaya Bahan & Efisiensi Modal Jualan',
    date: '15 Agustus 2026',
    file: {
      name: 'Kartu_Stok_Mingguan_Outlet_1-3.pdf',
      size: '980 KB',
      uploadedAt: '15 Agustus 2026',
      isVerified: true
    }
  },
  't-4': {
    title: 'Perjanjian Kontrak Pasokan Bahan Baku',
    issuer: 'CV Mitra Agro Kopi Nusantara & Gerai Kopi Senja',
    regNo: 'SPK-SUPPLIER-08/2026',
    classification: 'Stabilitas Harga Bahan Baku 6 Bulan',
    date: '30 Agustus 2026',
    file: {
      name: 'Kontrak_Supplier_Bahan_Baku_2026.pdf',
      size: '1.6 MB',
      uploadedAt: '30 Agustus 2026',
      isVerified: true
    }
  },
  't-5': {
    title: 'Rekapitulasi POS & Rekonsiliasi Kasir',
    issuer: 'Sistem Kasir POS Beruang & Rekening Bank',
    regNo: 'REKAP-POS-SEP/2026',
    classification: 'Pencatatan Penjualan Harian & Kas Masuk',
    date: '05 Oktober 2026',
    file: {
      name: 'Rekap_POS_September_2026.pdf',
      size: '1.4 MB',
      uploadedAt: '05 Oktober 2026',
      isVerified: true
    }
  },
  't-6': {
    title: 'Executive Pitch Deck & Financial Model',
    issuer: 'Tim Kurasi Investor & Akselerasi Pendanaan Beruang',
    regNo: 'DATA-ROOM-PITCH/2026',
    classification: 'Kesiapan Pitching & Akses Modal Kemitraan',
    date: '12 Oktober 2026',
    file: {
      name: 'PitchDeck_KopiSenja_Draft.pdf',
      size: '3.4 MB',
      uploadedAt: '12 Oktober 2026',
      isVerified: true
    }
  }
}

const taskEvidenceMap = ref<Record<string, any>>({ ...defaultTaskEvidence })
const isEvidenceModalOpen = ref(false)
const selectedTaskForPreview = ref<any>(null)
const evidenceFileInputRef = ref<HTMLInputElement | null>(null)
const currentUploadTaskId = ref<string | null>(null)

const selectedTaskEvidence = computed(() => {
  if (!selectedTaskForPreview.value) return null
  const taskId = selectedTaskForPreview.value.id
  if (!taskEvidenceMap.value[taskId]) {
    taskEvidenceMap.value[taskId] = {
      title: `Bukti Pelaksanaan - ${selectedTaskForPreview.value.title}`,
      issuer: 'Konsultan & Tim Operasional Gerai',
      regNo: `EVD/${taskId.toUpperCase()}/2026`,
      classification: 'Dokumentasi Kepatuhan Langkah Aksi',
      date: selectedTaskForPreview.value.dueDate || 'Oktober 2026',
      file: {
        name: `Bukti_Dokumen_${taskId}.pdf`,
        size: '1.1 MB',
        uploadedAt: 'Hari ini',
        isVerified: true
      }
    }
  }
  return taskEvidenceMap.value[taskId]
})

function openEvidenceModal(task: any) {
  selectedTaskForPreview.value = task
  isEvidenceModalOpen.value = true
}

function triggerEvidenceUpload(taskId?: string) {
  currentUploadTaskId.value = taskId || selectedTaskForPreview.value?.id || null
  if (evidenceFileInputRef.value) {
    evidenceFileInputRef.value.value = ''
    evidenceFileInputRef.value.click()
  }
}

function onEvidenceFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0] || !currentUploadTaskId.value) return

  const file = input.files[0]
  const sizeFormatted = file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(file.size / 1024)} KB`

  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  const objectUrl = URL.createObjectURL(file)

  const taskId = currentUploadTaskId.value
  if (!taskEvidenceMap.value[taskId]) {
    taskEvidenceMap.value[taskId] = {
      title: `Bukti Pelaksanaan - ${selectedTaskForPreview.value?.title || taskId}`,
      issuer: 'Unggahan Pengguna Terverifikasi',
      regNo: `EVD/${taskId.toUpperCase()}/2026`,
      classification: 'Dokumentasi Kepatuhan Langkah Aksi',
      date: 'Hari ini'
    }
  }

  taskEvidenceMap.value[taskId].file = {
    name: file.name,
    size: sizeFormatted,
    uploadedAt: 'Hari ini',
    isVerified: true,
    previewUrl: objectUrl,
    fileType: isImage ? 'image' : isPdf ? 'pdf' : 'document'
  }

  if (file.size < 2 * 1024 * 1024) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (taskEvidenceMap.value[taskId]?.file && e.target?.result) {
        taskEvidenceMap.value[taskId].file.previewUrl = e.target.result as string
        saveEvidenceToStorage()
      }
    }
    reader.readAsDataURL(file)
  } else {
    saveEvidenceToStorage()
  }

  triggerToast(`Bukti berkas "${file.name}" berhasil diunggah!`)
  currentUploadTaskId.value = null
}

function initEvidenceFromStorage() {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('umkm_task_evidence')
      if (saved) {
        const parsed = JSON.parse(saved)
        Object.keys(parsed).forEach(k => {
          taskEvidenceMap.value[k] = { ...taskEvidenceMap.value[k], ...parsed[k] }
        })
      }
    } catch (e) {
      console.warn('Gagal memuat bukti tugas dari storage', e)
    }
  }
}

function saveEvidenceToStorage() {
  if (typeof window !== 'undefined') {
    try {
      const toSave: Record<string, any> = {}
      Object.keys(taskEvidenceMap.value).forEach(k => {
        const ev = taskEvidenceMap.value[k]
        const canPersistPreview = ev.file?.previewUrl && ev.file.previewUrl.startsWith('data:') && ev.file.previewUrl.length < 1500000
        toSave[k] = {
          ...ev,
          file: ev.file ? {
            name: ev.file.name,
            size: ev.file.size,
            uploadedAt: ev.file.uploadedAt,
            isVerified: ev.file.isVerified,
            fileType: ev.file.fileType,
            previewUrl: canPersistPreview ? ev.file.previewUrl : undefined
          } : null
        }
      })
      localStorage.setItem('umkm_task_evidence', JSON.stringify(toSave))
    } catch (e) {
      console.warn('Gagal menyimpan bukti tugas ke storage', e)
    }
  }
}

let handleResize: (() => void) | null = null

onMounted(() => {
  initEvidenceFromStorage()
  umkmStore.fetchTasks()
  umkmStore.fetchAssessment()
  umkmStore.fetchProfile()

  nextTick(() => {
    updateViewTabIndicator(true)
  })
  setTimeout(() => updateViewTabIndicator(true), 150)

  handleResize = () => updateViewTabIndicator(true)
  window.addEventListener('resize', handleResize)

  // GSAP Smooth Stagger Entrance (Restrained & Elegant)
  gsap.from('.gsap-header-card', {
    opacity: 0,
    y: 12,
    duration: 0.45,
    ease: 'power2.out'
  })

  gsap.from('.gsap-progress-card', {
    opacity: 0,
    y: 12,
    duration: 0.45,
    delay: 0.08,
    ease: 'power2.out'
  })

  gsap.from('.gsap-stagger-card', {
    opacity: 0,
    y: 12,
    duration: 0.4,
    stagger: 0.06,
    delay: 0.12,
    ease: 'power2.out'
  })
})

onBeforeUnmount(() => {
  if (handleResize) {
    window.removeEventListener('resize', handleResize)
    handleResize = null
  }
})
</script>
