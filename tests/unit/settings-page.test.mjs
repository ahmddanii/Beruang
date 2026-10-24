import { describe, it } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

describe('Settings Pages & Design System Contracts', () => {
  const settingsFiles = [
    'pages/dashboard/pengaturan.vue',
    'pages/konsultan/pengaturan.vue',
    'pages/investor/pengaturan.vue',
    'pages/admin/pengaturan.vue'
  ]

  it('all 4 role settings pages exist on disk', () => {
    for (const file of settingsFiles) {
      assert.ok(fs.existsSync(file), `Expected ${file} to exist`)
    }
    assert.ok(fs.existsSync('components/settings/ThemeMockupSelector.vue'), 'ThemeMockupSelector.vue must exist')
  })

  it('all settings pages enforce hideHeader: true and layout: dashboard', () => {
    for (const file of settingsFiles) {
      const content = fs.readFileSync(file, 'utf8')
      assert.ok(content.includes("hideHeader: true"), `${file} must define hideHeader: true`)
      assert.ok(content.includes("layout: 'dashboard'"), `${file} must define layout: 'dashboard'`)
    }
  })

  it('enforces 100% Hugeicons usage (0 raw <svg> tags) in settings pages & theme selector', () => {
    const allFiles = [...settingsFiles, 'components/settings/ThemeMockupSelector.vue']
    for (const file of allFiles) {
      const content = fs.readFileSync(file, 'utf8')
      const hasRawSvg = /<svg[\s>]/i.test(content)
      assert.strictEqual(hasRawSvg, false, `${file} contains raw <svg> tags; must use HugeiconsIcon`)
      assert.ok(content.includes('HugeiconsIcon'), `${file} must use HugeiconsIcon component`)
    }
  })

  it('enforces zero drop-shadow rule across all settings pages and components', () => {
    const allFiles = [...settingsFiles, 'components/settings/ThemeMockupSelector.vue']
    for (const file of allFiles) {
      const content = fs.readFileSync(file, 'utf8')
      const unwantedShadow = /shadow-(?:sm|md|lg|xl|2xl)/.test(content)
      assert.strictEqual(unwantedShadow, false, `${file} must not contain drop-shadow classes`)
    }
  })

  it('BActionButton supports red and red-outline variants with white button layout foundation', () => {
    const btnContent = fs.readFileSync('components/base/BActionButton.vue', 'utf8')
    assert.ok(btnContent.includes("'red'"), 'BActionButton must support variant red')
    assert.ok(btnContent.includes("'red-outline'"), 'BActionButton must support variant red-outline')
    assert.ok(btnContent.includes('btn-pill-action-red'), 'BActionButton must bind btn-pill-action-red')
    assert.ok(btnContent.includes('btn-pill-action-red-outline'), 'BActionButton must bind btn-pill-action-red-outline')

    const cssContent = fs.readFileSync('assets/css/main.css', 'utf8')
    assert.ok(cssContent.includes('.btn-pill-action-red-outline'), 'main.css must define .btn-pill-action-red-outline')
    assert.ok(cssContent.includes('.btn-pill-action-red'), 'main.css must define .btn-pill-action-red')
  })

  it('UMKM Danger Zone container uses BActionButton red variants and double verification modals', () => {
    const content = fs.readFileSync('pages/dashboard/pengaturan.vue', 'utf8')
    assert.ok(content.includes('variant="red-outline"'), 'Danger zone must use BActionButton with red-outline')
    assert.ok(content.includes('variant="red"'), 'Danger zone must use BActionButton with red')
    assert.ok(content.includes('isDeactivateModalOpen'), 'Deactivate double-verification modal state must exist')
    assert.ok(content.includes('isDeleteModalOpen'), 'Permanent delete double-verification modal state must exist')
    assert.ok(content.includes("'HAPUS'"), 'Permanent delete must require typing HAPUS')
  })

  it('notification checklist is simplified with white button hover state and clean indicators', () => {
    const content = fs.readFileSync('pages/dashboard/pengaturan.vue', 'utf8')
    assert.ok(content.includes('hover:bg-[#F8FAFC]'), 'Checklist items must use white button hover effect (hover:bg-[#F8FAFC])')
    assert.ok(content.includes('Tick02Icon') || content.includes('CheckmarkCircle01Icon'), 'Checklist items must use crisp checkmark indicator')
    assert.ok(content.includes('dark:border-[#00C058]'), 'Checklist items must harmonize green across dark mode')
  })

  it('ThemeMockupSelector eliminates layout shift bug via constant border-2 and standardized heights', () => {
    const content = fs.readFileSync('components/settings/ThemeMockupSelector.vue', 'utf8')
    assert.ok(content.includes('border-2'), 'Mockup selector buttons must maintain constant border-2')
    assert.ok(content.includes('min-h-[210px]'), 'Mockup selector buttons must have standardized minimum height')
    assert.ok(content.includes('min-h-[44px]'), 'Mockup selector text blocks must have standardized min-height to prevent jumping')
    assert.ok(content.includes('shrink-0'), 'Mockup containers must use shrink-0')
  })

  it('all settings pages implement GSAP entrance animations with proper lifecycle cleanup', () => {
    for (const file of settingsFiles) {
      const content = fs.readFileSync(file, 'utf8')
      assert.ok(content.includes("from 'gsap'"), `${file} must import gsap`)
      assert.ok(content.includes('gsap.context'), `${file} must use gsap.context`)
      assert.ok(content.includes('onMounted'), `${file} must animate onMounted`)
      assert.ok(content.includes('onUnmounted'), `${file} must clean up onUnmounted`)
      assert.ok(content.includes('revert()'), `${file} must revert gsapCtx onUnmounted`)
    }
  })

  it('useLanguage composable provides bilingual settings dictionary keys', () => {
    const content = fs.readFileSync('composables/useLanguage.ts', 'utf8')
    const requiredKeys = [
      'settings_title',
      'banner_title',
      'banner_desc',
      'banner_action',
      'theme_title',
      'sec_security_title',
      'sec_notify_title',
      'sec_privacy_title',
      'sec_regional_title',
      'sec_danger_title',
      'deactivate_btn',
      'delete_btn',
      'save_all',
      'modal_email_otp_title',
      'modal_email_otp_confirm',
      'modal_email_otp_invalid'
    ]
    for (const key of requiredKeys) {
      assert.ok(content.includes(`'${key}'`) || content.includes(`${key}:`), `useLanguage must include key '${key}'`)
    }
  })

  it('email modification triggers OTP modal verification flow with tactile 6-digit inputs', () => {
    const content = fs.readFileSync('pages/dashboard/pengaturan.vue', 'utf8')
    assert.ok(content.includes('isEmailOtpModalOpen'), 'Pengaturan must define isEmailOtpModalOpen state')
    assert.ok(content.includes('openEmailOtpModal'), 'Pengaturan must define openEmailOtpModal handler')
    assert.ok(content.includes('verifyAndSaveEmail'), 'Pengaturan must define verifyAndSaveEmail method')
    assert.ok(content.includes('otpDigits'), 'Pengaturan must define otpDigits array for 6 inputs')
    assert.ok(content.includes('currentGeneratedOtp'), 'Pengaturan must support generated OTP code')
    assert.ok(content.includes('autoFillOtp'), 'Pengaturan must provide autoFillOtp helper for test simulation')
    assert.ok(content.includes('MailValidation01Icon'), 'Pengaturan must display MailValidation01Icon in OTP modal')
    assert.ok(content.includes('startOtpCountdown'), 'Pengaturan must run OTP resend countdown timer')
    assert.ok(content.includes('modal_email_otp_title'), 'Modal must use localized modal_email_otp_title')
  })

  it('2FA WhatsApp OTP and Auto Watermark use sliding Toggle Switch (role="switch") design', () => {
    const content = fs.readFileSync('pages/dashboard/pengaturan.vue', 'utf8')
    const switchMatches = content.match(/role="switch"/g) || []
    assert.ok(switchMatches.length >= 2, 'pages/dashboard/pengaturan.vue must contain at least 2 sliding toggle switches (2FA & Auto Watermark)')
    assert.ok(content.includes(':aria-checked="accountForm.twoFactorEnabled"'), '2FA must bind aria-checked to accountForm.twoFactorEnabled')
    assert.ok(content.includes(':aria-checked="privacyForm.autoWatermark"'), 'Watermark must bind aria-checked to privacyForm.autoWatermark')
    assert.ok(content.includes('translate-x-5'), 'Toggle switch thumb must slide via translate-x-5')
  })
})
