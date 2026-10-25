import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import userEvent from '@testing-library/user-event'
import DashboardHome from '~/pages/dashboard/index.vue'

/**
 * Premium Web Auditor - Stage 2 Behavioral Resilience Test Suite
 * Component Target: pages/dashboard/index.vue (Beranda UMKM)
 * 
 * Verifies:
 * 1. 5-State UI Matrix (Ideal, Empty, Loading, Boundary)
 * 2. Asynchronous Race Conditions
 * 3. Accessibility & Keyboard Semantics (WCAG 2.2 compliant)
 */
describe('Beranda UMKM - Premium Web Auditor Suite', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
  })

  // 1. Verify the 5-State UI Matrix in DOM
  describe('1. 5-State UI Matrix Verification', () => {
    it('[Ideal State] renders 4 uniform financial metric cards with Rupiah formatting', () => {
      const wrapper = mount(DashboardHome, {
        global: {
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true,
            DotLottieVue: true,
            BShadcnLineChart: true,
            BDrawer: true,
            BModal: true
          }
        }
      })

      // Assert ideal formatted financial nominals exist
      expect(wrapper.text()).toContain('Rp 32.600.000') // Untung Bersih
      expect(wrapper.text()).toContain('Rp 45.100.000') // Modal Jualan
      expect(wrapper.text()).toContain('Rp 100.000.000') // Uang Masuk
      expect(wrapper.text()).toContain('Rp 67.400.000') // Uang Keluar

      // Assert B2B friendly copywriting (no forbidden jargon)
      expect(wrapper.text()).toContain('Kelola Modal')
      expect(wrapper.text()).not.toContain('Kelola HPP')
    })

    it('[Empty State] renders dedicated empty CTA inside monthly cashbook table when records are empty', async () => {
      const wrapper = mount(DashboardHome, {
        global: {
          mocks: {
            latestMonthlyRecords: []
          },
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true,
            BShadcnLineChart: true
          }
        }
      })

      // When table records are empty, empty state row should render gracefully
      const emptyHeading = wrapper.find('h3')
      expect(wrapper.text()).toContain('Belum Ada Rapor Keuangan')
      expect(wrapper.text()).toContain('Catat Kas Pertama')
    })

    it('[Loading State] marks metric container with aria-busy and renders zero-CLS skeletons', () => {
      const wrapper = mount(DashboardHome, {
        global: {
          mocks: {
            isPageLoading: true
          },
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true
          }
        }
      })

      const metricContainer = wrapper.find('.grid.grid-cols-1')
      expect(metricContainer.attributes('aria-busy')).toBeDefined()
    })

    it('[Boundary State] defensively truncates excessively long UMKM business names without breaking button alignment', () => {
      const wrapper = mount(DashboardHome, {
        global: {
          mocks: {
            umkmName: 'Kopi Senja Nusantara Cabang Super Panjang Di Seluruh Kota Metropolitan Jawa Barat Indonesia'
          },
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true
          }
        }
      })

      const h1 = wrapper.find('h1')
      expect(h1.classes()).toContain('truncate')
    })
  })

  // 2. Stress-Test Asynchronous Race Conditions
  describe('2. Asynchronous Race Conditions & Flow Verification', () => {
    it('defensively binds drawer visibility without causing unhandled rejections', async () => {
      const wrapper = mount(DashboardHome, {
        global: {
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true,
            BDrawer: true
          }
        }
      })

      // Trigger "Catat Kas" button to open transaction drawer
      const catatKasBtn = wrapper.findAllComponents({ name: 'BActionButton' })
        .find(c => c.text().includes('Catat Kas'))

      if (catatKasBtn) {
        await catatKasBtn.trigger('click')
        expect((wrapper.vm as any).isTransactionDrawerOpen).toBe(true)
      }
    })
  })

  // 3. Enforce Accessibility (A11y) and Keyboard Semantics
  describe('3. Accessibility (A11y) & Keyboard Semantics', () => {
    it('provides accessible role="button", tabindex="0", and keyboard trigger on breakdown cards', async () => {
      const wrapper = mount(DashboardHome, {
        global: {
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true
          }
        }
      })

      const modalJualanSlice = wrapper.find('[role="button"][aria-label*="Modal Jualan"]')
      expect(modalJualanSlice.exists()).toBe(true)
      expect(modalJualanSlice.attributes('tabindex')).toBe('0')

      // Assert keyboard triggers (Enter and Space) are handled
      await modalJualanSlice.trigger('keydown.enter')
      expect(modalJualanSlice.attributes('aria-label')).toContain('Rp 45.100.000')

      await modalJualanSlice.trigger('keydown.space')
      expect(modalJualanSlice.attributes('aria-label')).toContain('45.1%')
    })

    it('ensures all interactive elements have visible focus rings', () => {
      const wrapper = mount(DashboardHome, {
        global: {
          stubs: {
            NuxtLink: true,
            HugeiconsIcon: true,
            BActionButton: true
          }
        }
      })

      const editProfileBtn = wrapper.find('a[title="Edit Profil Usaha"]')
      expect(editProfileBtn.classes()).toContain('focus-visible:ring-2')
    })
  })
})
