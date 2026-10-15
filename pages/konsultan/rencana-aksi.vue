<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-sans">
    
    <!-- 1. HEADER BANNER: Action Plan Management -->
    <div class="p-1.5 sm:p-2 rounded-3xl bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div class="space-y-2 max-w-2xl relative z-10 text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0081A0]/10 dark:bg-[#0081A0]/20 text-[#0081A0] dark:text-[#2091AA] text-xs font-bold border border-[#0081A0]/20">
            <span class="w-2 h-2 rounded-full bg-[#0081A0] animate-pulse" />
            <span>Pendampingan Terstruktur</span>
          </div>

          <h1 class="text-2xl sm:text-3xl lg:text-[32px] font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            Rencana Aksi UMKM Binaan
          </h1>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
            Berikan arahan taktis, prioritas perbaikan, dan target konkret bagi setiap UMKM yang kamu bina agar kesiapan pembiayaannya terakselerasi dengan aman.
          </p>
        </div>

        <!-- Action Button: + Tambah Action Plan -->
        <div class="flex items-center gap-3 shrink-0">
          <button
            type="button"
            class="px-5 py-3 rounded-2xl bg-[#0081A0] hover:bg-[#006D87] text-white font-heading font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            @click="openAddModal()"
          >
            <HugeiconsIcon :icon="Add01Icon" :size="18" :stroke-width="2.5" />
            <span>Beri Action Plan Baru</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. QUICK TELEMETRY STATS -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total Aksi</span>
          <div class="w-8 h-8 rounded-xl bg-[#0081A0]/10 text-[#0081A0] dark:text-[#2091AA] flex items-center justify-center">
            <HugeiconsIcon :icon="Task01Icon" :size="16" :stroke-width="2" />
          </div>
        </div>
        <p class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tabular-nums">
          {{ totalPlansCount }}
        </p>
        <span class="text-[11px] text-neutral-500 mt-1 block">Seluruh UMKM binaan</span>
      </div>

      <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Menunggu Mulai</span>
          <div class="w-8 h-8 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center">
            <HugeiconsIcon :icon="Clock01Icon" :size="16" :stroke-width="2" />
          </div>
        </div>
        <p class="text-2xl sm:text-3xl font-extrabold text-neutral-700 dark:text-neutral-300 tabular-nums">
          {{ todoPlansCount }}
        </p>
        <span class="text-[11px] text-neutral-500 mt-1 block">Belum disentuh klien</span>
      </div>

      <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Sedang Berjalan</span>
          <div class="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <HugeiconsIcon :icon="AnalyticsUpIcon" :size="16" :stroke-width="2" />
          </div>
        </div>
        <p class="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
          {{ inProgressPlansCount }}
        </p>
        <span class="text-[11px] text-neutral-500 mt-1 block">Dalam eksekusi aktif</span>
      </div>

      <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Selesai Terverifikasi</span>
          <div class="w-8 h-8 rounded-xl bg-[#00AA13]/10 text-[#00AA13] dark:text-[#22C55E] flex items-center justify-center">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" :stroke-width="2" />
          </div>
        </div>
        <p class="text-2xl sm:text-3xl font-extrabold text-[#00AA13] dark:text-[#22C55E] tabular-nums">
          {{ donePlansCount }}
        </p>
        <span class="text-[11px] text-neutral-500 mt-1 block">Milestone tercapai</span>
      </div>
    </div>

    <!-- 3. FILTER, CLIENT SELECTOR & SEARCH -->
    <div class="card-tactile-gopay p-4 sm:p-5 rounded-3xl space-y-4">
      <div class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <!-- Client Selector Dropdown -->
        <div class="flex flex-wrap items-center gap-2">
          <label class="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <HugeiconsIcon :icon="UserGroupIcon" :size="14" :stroke-width="2" />
            <span>Pilih Klien:</span>
          </label>
          <div class="relative">
            <select
              v-model="selectedClientId"
              class="px-3.5 py-1.5 rounded-full border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs font-semibold text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20 cursor-pointer"
            >
              <option value="ALL">Semua Klien Binaan ({{ konsultanStore.clients.length }})</option>
              <option v-for="client in konsultanStore.clients" :key="client.id" :value="client.id">
                {{ client.name }} ({{ client.owner }})
              </option>
            </select>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full lg:w-72">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <HugeiconsIcon :icon="Search01Icon" :size="16" :stroke-width="2" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari judul atau topik aksi..."
            class="w-full pl-10 pr-4 py-1.5 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/20"
          />
        </div>
      </div>

      <!-- Secondary Filter Pills: Status & Pilar -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-200/80 dark:border-white/5">
        <!-- Status Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            v-for="st in statusFilters"
            :key="st.key"
            type="button"
            :class="[
              'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer',
              selectedStatus === st.key
                ? 'bg-[#0081A0] text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            ]"
            @click="selectedStatus = st.key"
          >
            {{ st.label }}
          </button>
        </div>

        <!-- Pillar Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            v-for="p in pillarFilters"
            :key="p.key"
            type="button"
            :class="[
              'px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer border',
              selectedPillar === p.key
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-xs'
                : 'bg-transparent text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
            ]"
            @click="selectedPillar = p.key"
          >
            {{ p.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 4. ACTION PLAN CARDS LIST -->
    <div v-if="filteredPlans.length > 0" class="space-y-4">
      <div
        v-for="plan in filteredPlans"
        :key="plan.id"
        class="card-tactile-gopay p-5 sm:p-6 rounded-3xl transition-all duration-200 relative overflow-hidden group text-left"
      >
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-200/70 dark:border-white/5">
          <!-- Client & Metadata Badges -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Client Pill -->
            <NuxtLink
              :to="`/konsultan/klien/${plan.clientId}`"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#1A1D26] border border-neutral-200 dark:border-white/10 text-xs font-bold text-neutral-800 dark:text-neutral-100 hover:text-[#0081A0] dark:hover:text-[#2091AA] transition-colors shadow-2xs"
            >
              <HugeiconsIcon :icon="Store01Icon" :size="13" :stroke-width="2" class="text-[#0081A0]" />
              <span>{{ plan.clientName }}</span>
            </NuxtLink>

            <!-- Pillar Badge -->
            <span
              :class="[
                'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border',
                getPillarClass(plan.pillar)
              ]"
            >
              <span>{{ plan.pillar }}</span>
            </span>

            <!-- Priority Badge -->
            <span
              :class="[
                'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border',
                getPriorityClass(plan.priority)
              ]"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="getPriorityDot(plan.priority)" />
              <span>Prioritas {{ plan.priority }}</span>
            </span>
          </div>

          <!-- Target Date & Actions -->
          <div class="flex items-center gap-3 self-end lg:self-auto">
            <div class="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <HugeiconsIcon :icon="Calendar01Icon" :size="14" :stroke-width="1.8" />
              <span>Target: <strong class="text-neutral-700 dark:text-neutral-200 font-semibold">{{ plan.targetDate }}</strong></span>
            </div>

            <!-- Delete Plan Trigger -->
            <button
              type="button"
              class="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
              title="Hapus Action Plan"
              @click="confirmDeletePlan(plan)"
            >
              <HugeiconsIcon :icon="Delete02Icon" :size="16" :stroke-width="1.8" />
            </button>
          </div>
        </div>

        <!-- Plan Content -->
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-base sm:text-lg font-heading font-bold text-neutral-900 dark:text-white leading-snug">
              {{ plan.title }}
            </h3>

            <!-- Status Indicator Dropdown / Toggle -->
            <div class="shrink-0">
              <div class="inline-flex items-center p-0.5 rounded-xl bg-neutral-100 dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/10">
                <button
                  type="button"
                  :class="[
                    'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    plan.status === 'TODO'
                      ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-white font-bold shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  ]"
                  @click="updateStatus(plan.id, 'TODO')"
                >
                  Belum
                </button>
                <button
                  type="button"
                  :class="[
                    'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    plan.status === 'IN_PROGRESS'
                      ? 'bg-amber-500 text-white font-bold shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  ]"
                  @click="updateStatus(plan.id, 'IN_PROGRESS')"
                >
                  Proses
                </button>
                <button
                  type="button"
                  :class="[
                    'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1',
                    plan.status === 'DONE'
                      ? 'bg-[#00AA13] text-white font-bold shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  ]"
                  @click="updateStatus(plan.id, 'DONE')"
                >
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" :stroke-width="2.5" />
                  <span>Selesai</span>
                </button>
              </div>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
            {{ plan.description }}
          </p>

          <!-- Consultant Notes Box (if any) -->
          <div
            v-if="plan.consultantNotes"
            class="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40 flex items-start gap-2.5 text-xs text-sky-900 dark:text-sky-200"
          >
            <HugeiconsIcon :icon="NoteIcon" :size="16" :stroke-width="2" class="text-[#0081A0] shrink-0 mt-0.5" />
            <div class="space-y-0.5">
              <span class="font-bold text-[11px] uppercase tracking-wider text-[#0081A0] block">Catatan Bimbingan:</span>
              <p class="leading-relaxed">{{ plan.consultantNotes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="card-tactile-gopay p-12 rounded-3xl text-center space-y-4 max-w-lg mx-auto"
    >
      <div class="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
        <HugeiconsIcon :icon="Task01Icon" :size="32" :stroke-width="1.8" />
      </div>
      <div class="space-y-1">
        <h4 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Tidak Ada Action Plan Ditemukan
        </h4>
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          Belum ada rencana aksi yang cocok dengan filter yang dipilih. Silakan ubah filter atau buat action plan baru.
        </p>
      </div>
      <button
        type="button"
        class="px-4 py-2 rounded-xl bg-[#0081A0] text-white font-heading font-bold text-xs shadow-xs hover:bg-[#006D87] transition-all cursor-pointer"
        @click="openAddModal()"
      >
        + Buat Action Plan Baru
      </button>
    </div>

    <!-- 5. MODAL: TAMBAH ACTION PLAN BARU -->
    <Teleport to="body">
      <div
        v-if="isAddModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/50 backdrop-blur-xs animate-in fade-in duration-150"
      >
        <div
          class="relative w-full max-w-xl bg-white dark:bg-[#13161F] rounded-3xl shadow-2xl border border-neutral-200 dark:border-white/10 overflow-hidden font-sans text-left animate-in zoom-in-95 duration-200"
        >
          <!-- Modal Header -->
          <div class="px-6 py-5 border-b border-neutral-200/80 dark:border-white/10 flex items-center justify-between bg-neutral-50/60 dark:bg-[#1A1D26]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#0081A0]/10 text-[#0081A0] dark:text-[#2091AA] flex items-center justify-center">
                <HugeiconsIcon :icon="Task01Icon" :size="20" :stroke-width="2" />
              </div>
              <div>
                <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                  Beri Action Plan Baru
                </h3>
                <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Instruksikan langkah terarah untuk UMKM binaanmu
                </p>
              </div>
            </div>

            <button
              type="button"
              class="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors cursor-pointer"
              @click="isAddModalOpen = false"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" :stroke-width="2" />
            </button>
          </div>

          <!-- Modal Body Form -->
          <form @submit.prevent="handleSubmitPlan" class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <!-- Pilih Klien UMKM -->
            <div>
              <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Pilih Klien UMKM Binaan <span class="text-red-500">*</span>
              </label>
              <select
                v-model="newPlanForm.clientId"
                required
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20 cursor-pointer"
              >
                <option value="" disabled>-- Pilih UMKM Binaan --</option>
                <option v-for="c in konsultanStore.clients" :key="c.id" :value="c.id">
                  {{ c.name }} • Founder: {{ c.owner }} ({{ c.sector }})
                </option>
              </select>
            </div>

            <!-- Judul Action Plan -->
            <div>
              <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Judul Tugas / Rencana Aksi <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newPlanForm.title"
                type="text"
                required
                placeholder="Contoh: Pisahkan Rekening Usaha & Daftarkan NIB"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
              />
            </div>

            <!-- Pilar & Prioritas (2 columns) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                  Pilar Bisnis <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="newPlanForm.pillar"
                  required
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20 cursor-pointer"
                >
                  <option value="Keuangan">Keuangan (Arus Kas, Margin, HPP)</option>
                  <option value="Operasional">Operasional & Standar Mutu</option>
                  <option value="Legalitas">Legalitas & Sertifikasi (NIB, Halal)</option>
                  <option value="Pemasaran">Pemasaran & Saluran Penjualan</option>
                  <option value="SDM">SDM & Struktur Tim</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                  Tingkat Prioritas <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="newPlanForm.priority"
                  required
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20 cursor-pointer"
                >
                  <option value="Tinggi">Tinggi (Mendesak & Kritis)</option>
                  <option value="Sedang">Sedang (Penting Bertahap)</option>
                  <option value="Rendah">Rendah (Penyempurnaan)</option>
                </select>
              </div>
            </div>

            <!-- Target Tanggal Selesai -->
            <div>
              <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Target Tanggal Selesai <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newPlanForm.targetDate"
                type="text"
                required
                placeholder="Contoh: 30 Okt 2026 atau 2 Minggu ke Depan"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
              />
            </div>

            <!-- Deskripsi Langkah Aksi -->
            <div>
              <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Panduan Langkah Aksi untuk UMKM <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="newPlanForm.description"
                rows="3"
                required
                placeholder="Tuliskan petunjuk teknis yang jelas agar pemilik usaha mengerti apa yang harus dieksekusi..."
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20 resize-none"
              />
            </div>

            <!-- Catatan Khusus Konsultan -->
            <div>
              <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Catatan Khusus Konsultan (Opsional)
              </label>
              <input
                v-model="newPlanForm.consultantNotes"
                type="text"
                placeholder="Misal: Format form sudah dikirim via WhatsApp"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
              />
            </div>

            <!-- Action Buttons -->
            <div class="pt-4 border-t border-neutral-200/80 dark:border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                class="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                @click="isAddModalOpen = false"
              >
                Batal
              </button>
              <button
                type="submit"
                class="px-5 py-2.5 rounded-xl bg-[#0081A0] hover:bg-[#006D87] text-white font-heading font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Simpan & Tugaskan ke UMKM
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- 6. TOAST NOTIFICATION -->
    <Teleport to="body">
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xl border border-neutral-700 dark:border-neutral-200 animate-in slide-in-from-bottom-5 duration-200"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" :stroke-width="2.5" class="text-[#00AA13]" />
        <span class="text-xs sm:text-sm font-semibold">{{ toastMessage }}</span>
      </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKonsultanStore, type ActionPlanItem } from '~/stores/konsultan'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Task01Icon,
  Add01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  AnalyticsUpIcon,
  UserGroupIcon,
  Store01Icon,
  Search01Icon,
  Calendar01Icon,
  Delete02Icon,
  NoteIcon,
  Cancel01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()

// Filter State
const selectedClientId = ref<string>('ALL')
const selectedStatus = ref<string>('ALL')
const selectedPillar = ref<string>('ALL')
const searchQuery = ref<string>('')

// Telemetry Counts
const totalPlansCount = computed(() => konsultanStore.actionPlans.length)
const todoPlansCount = computed(() => konsultanStore.actionPlans.filter(p => p.status === 'TODO').length)
const inProgressPlansCount = computed(() => konsultanStore.actionPlans.filter(p => p.status === 'IN_PROGRESS').length)
const donePlansCount = computed(() => konsultanStore.actionPlans.filter(p => p.status === 'DONE').length)

// Filter Options
const statusFilters = [
  { key: 'ALL', label: 'Semua Status' },
  { key: 'TODO', label: 'Belum Mulai' },
  { key: 'IN_PROGRESS', label: 'Sedang Proses' },
  { key: 'DONE', label: 'Selesai' }
]

const pillarFilters = [
  { key: 'ALL', label: 'Semua Pilar' },
  { key: 'Keuangan', label: 'Keuangan' },
  { key: 'Operasional', label: 'Operasional' },
  { key: 'Legalitas', label: 'Legalitas' },
  { key: 'Pemasaran', label: 'Pemasaran' },
  { key: 'SDM', label: 'SDM' }
]

// Filtered Action Plans
const filteredPlans = computed(() => {
  return konsultanStore.actionPlans.filter(p => {
    // Filter Client
    if (selectedClientId.value !== 'ALL' && p.clientId !== selectedClientId.value) {
      return false
    }

    // Filter Status
    if (selectedStatus.value !== 'ALL' && p.status !== selectedStatus.value) {
      return false
    }

    // Filter Pillar
    if (selectedPillar.value !== 'ALL' && p.pillar !== selectedPillar.value) {
      return false
    }

    // Search Query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchTitle = p.title.toLowerCase().includes(q)
      const matchDesc = p.description.toLowerCase().includes(q)
      const matchClient = p.clientName.toLowerCase().includes(q)
      if (!matchTitle && !matchDesc && !matchClient) {
        return false
      }
    }

    return true
  })
})

// Modal & Form State
const isAddModalOpen = ref(false)
const toastMessage = ref('')

const newPlanForm = ref({
  clientId: '',
  title: '',
  description: '',
  pillar: 'Keuangan' as 'Keuangan' | 'Operasional' | 'Legalitas' | 'Pemasaran' | 'SDM',
  priority: 'Tinggi' as 'Tinggi' | 'Sedang' | 'Rendah',
  targetDate: '',
  consultantNotes: ''
})

function openAddModal(clientId?: string) {
  newPlanForm.value = {
    clientId: clientId || (konsultanStore.clients[0]?.id || ''),
    title: '',
    description: '',
    pillar: 'Keuangan',
    priority: 'Tinggi',
    targetDate: '2 Minggu ke Depan',
    consultantNotes: ''
  }
  isAddModalOpen.value = true
}

function handleSubmitPlan() {
  if (!newPlanForm.value.clientId || !newPlanForm.value.title || !newPlanForm.value.description) return

  konsultanStore.addActionPlan({
    clientId: newPlanForm.value.clientId,
    title: newPlanForm.value.title,
    description: newPlanForm.value.description,
    pillar: newPlanForm.value.pillar,
    priority: newPlanForm.value.priority,
    targetDate: newPlanForm.value.targetDate,
    consultantNotes: newPlanForm.value.consultantNotes
  })

  isAddModalOpen.value = false
  showToast('Action Plan berhasil dibuat dan ditugaskan ke klien!')
}

function updateStatus(planId: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE') {
  konsultanStore.updateActionPlanStatus(planId, status)
  showToast(status === 'DONE' ? 'Milestone ditandai selesai!' : 'Status rencana aksi diperbarui')
}

function confirmDeletePlan(plan: ActionPlanItem) {
  if (confirm(`Apakah kamu yakin ingin menghapus action plan "${plan.title}"?`)) {
    konsultanStore.deleteActionPlan(plan.id)
    showToast('Action Plan berhasil dihapus')
  }
}

function showToast(msg: string) {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 3500)
}

function getPillarClass(pillar: string) {
  switch (pillar) {
    case 'Keuangan':
      return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    case 'Operasional':
      return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    case 'Legalitas':
      return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    case 'Pemasaran':
      return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    case 'SDM':
      return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
    default:
      return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200'
  }
}

function getPriorityClass(priority: string) {
  switch (priority) {
    case 'Tinggi':
      return 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
    case 'Sedang':
      return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    case 'Rendah':
      return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
    default:
      return 'bg-neutral-100 text-neutral-700 border-neutral-200'
  }
}

function getPriorityDot(priority: string) {
  switch (priority) {
    case 'Tinggi':
      return 'bg-rose-500'
    case 'Sedang':
      return 'bg-amber-500'
    case 'Rendah':
      return 'bg-neutral-400'
    default:
      return 'bg-neutral-400'
  }
}
</script>
