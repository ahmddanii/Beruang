import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RencanaAksiPage from '~/pages/dashboard/rencana-aksi.vue'
import PenilaianPage from '~/pages/dashboard/penilaian.vue'

describe('Batch 1: Rencana Aksi & Cek Kesehatan Unit Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('1. Rencana Aksi (rencana-aksi.vue)', () => {
    it('renders the standardized 1-row header with Rencana Aksi title and action controls', () => {
      const wrapper = mount(RencanaAksiPage, {
        global: {
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true,
            BPillTabs: true,
            BModal: true
          }
        }
      })

      // Title should be present
      expect(wrapper.text()).toContain('Rencana Aksi')
      // 4 Clean Metric Cards should be present
      expect(wrapper.text()).toContain('Total Langkah')
      expect(wrapper.text()).toContain('Langkah Selesai')
      expect(wrapper.text()).toContain('Kelulusan Aksi')
      expect(wrapper.text()).toContain('Kesiapan Modal')
    })

    it('displays task checklist milestones without forbidden jargon and has add plan trigger', () => {
      const wrapper = mount(RencanaAksiPage, {
        global: {
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true,
            BPillTabs: true,
            BModal: true
          }
        }
      })

      // Check copywriting compliance (no forbidden jargon)
      expect(wrapper.text()).not.toContain('Kelola HPP')
      expect(wrapper.text()).not.toContain('Audit Kas')
      expect(wrapper.text()).toContain('Progres Kelulusan Rencana Aksi')
    })
  })

  describe('2. Cek Kesehatan (penilaian.vue)', () => {
    it('renders standardized 1-row header with Cek Kesehatan and 4 clean metric cards', () => {
      const wrapper = mount(PenilaianPage, {
        global: {
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true,
            BRadarChart: true,
            BModal: true
          }
        }
      })

      // Page Title
      expect(wrapper.text()).toContain('Cek Kesehatan')
      // Metric Cards
      expect(wrapper.text()).toContain('Indeks Kesehatan')
      expect(wrapper.text()).toContain('Pilar Unggulan')
      expect(wrapper.text()).toContain('Status Validasi')
      expect(wrapper.text()).toContain('Konsultan')
    })

    it('renders 5 fundamental business pillars evaluation section with action links', () => {
      const wrapper = mount(PenilaianPage, {
        global: {
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true,
            BRadarChart: true,
            BModal: true
          }
        }
      })

      expect(wrapper.text()).toContain('Radar 5 Aspek Fundamental Toko')
      expect(wrapper.text()).toContain('Rincian Evaluasi 5 Pilar Bisnis')
      expect(wrapper.text()).toContain('PREDIKAT KESEHATAN BISNIS')
      expect(wrapper.text()).toContain('GRADE A TERVERIFIKASI')
    })
  })
})
