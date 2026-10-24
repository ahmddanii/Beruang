import { ref } from 'vue'

export type Language = 'id' | 'en'

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Top Bar
    settings_title: 'Pengaturan Akun & Preferensi',
    back: 'Kembali',
    save_settings: 'Simpan Pengaturan',
    save_all: 'Simpan Seluruh Pengaturan',
    saving: 'Menyimpan...',
    saved_success: 'Pengaturan berhasil disimpan!',
    saved_success_desc: 'Perubahan pada akun dan preferensi tokomu telah berhasil diperbarui.',
    close: 'Tutup',
    save_field: 'Simpan',
    field_saved: 'Tersimpan ✓',

    // Top Highlight Banner
    banner_title: 'Ingin mengubah nama brand, foto banner, jumlah outlet, atau narasi bisnis toko?',
    banner_desc: 'Data identitas bisnis publik dan etalase toko dikelola langsung di halaman Profil Usaha.',
    banner_action: 'Buka Profil Usaha',

    // Theme Selector
    theme_title: 'Tampilan & Skema Warna',
    theme_desc: 'Pilih skema warna antarmuka kerja Beruang sesuai kenyamanan mata Anda.',
    theme_active: 'Aktif',
    theme_light: 'Mode Terang',
    theme_light_desc: 'Kanvas putih & ice-blue, kontras jernih di siang hari.',
    theme_dark: 'Mode Gelap',
    theme_dark_desc: 'Kanvas obsidian, teduh & nyaman saat minim cahaya.',
    theme_system: 'Otomatis (Sistem)',
    theme_system_desc: 'Menyesuaikan otomatis dengan preferensi perangkat OS Anda.',

    // Security Section
    sec_security_title: 'Keamanan & Kredensial Akun',
    sec_security_desc: 'Kelola alamat email masuk, verifikasi nomor WhatsApp resmi, dan proteksi kata sandi.',
    email_label: 'Alamat Email Akun',
    email_verified: 'Email telah terverifikasi via OTP',
    email_otp_required_hint: 'Klik Simpan untuk mengirim kode OTP verifikasi ke email baru.',
    phone_label: 'Nomor WhatsApp Utama',
    phone_hint: 'Digunakan untuk konfirmasi keamanan dan pengiriman kode verifikasi.',
    password_title: 'Kata Sandi Akun',
    password_desc: 'Terakhir diperbarui 24 hari lalu. Disarankan memakai minimal 8 karakter kombinasi.',
    change_password_btn: 'Ganti Kata Sandi',
    close_password_btn: 'Tutup Form Sandi',
    current_password: 'Kata Sandi Saat Ini',
    new_password: 'Kata Sandi Baru',
    confirm_password: 'Ulangi Kata Sandi Baru',
    save_password_btn: 'Simpan Sandi Baru',
    two_factor_title: 'Verifikasi 2 Langkah (2FA WhatsApp OTP)',
    two_factor_desc: 'Kirimkan kode OTP pengaman ke nomor WhatsApp setiap kali masuk dari peramban baru.',
    sessions_title: 'Sesi Perangkat Aktif',
    sessions_desc: 'Gawai yang saat ini terhubung dan memiliki akses login ke akun tokomu.',
    disconnect_others: 'Putuskan Sesi Lain',
    current_session: 'Sesi Ini',
    active_now: 'Aktif Sekarang',
    active_hours_ago: 'Terakhir aktif 3 jam lalu',
    terminate_btn: 'Keluarkan',

    // Notification Section
    sec_notify_title: 'Pengingat Rekonsiliasi & Transaksi',
    sec_notify_desc: 'Pilih pemberitahuan apa saja yang dikirimkan ke saluran WhatsApp dan Email tokomu.',
    notify_cash_title: 'Pengingat Tanggal Pelaporan Kas Bulanan (Tiap Tanggal 25)',
    notify_cash_desc: 'Kirimkan pengingat H-3 sebelum akhir bulan agar pembukuan kas dan nota penjualan siap diverifikasi bersama konsultan.',
    notify_ai_title: 'Peringatan Dini Lonjakan Biaya AI (Anomaly Alert)',
    notify_ai_desc: 'Beri tahu secara instan bila sistem mendeteksi lonjakan pengeluaran operasional mencurigakan atau penurunan margin laba kotor toko.',
    notify_investor_title: 'Permohonan Akses Dokumen dari Calon Investor',
    notify_investor_desc: 'Kirimkan pemberitahuan seketika ada pemodal terakreditasi yang mengajukan izin untuk membuka berkas privat di Data Room tokomu.',
    notify_task_title: 'Pembaruan Checklist Tugas dari Konsultan Bisnis',
    notify_task_desc: 'Notifikasi ketika konsultan menambahkan atau menandai selesai tugas rencana aksi bimbingan usaha Anda.',

    // Privacy Section
    sec_privacy_title: 'Visibilitas Toko di Marketplace Investor',
    sec_privacy_desc: 'Kontrol bagaimana bisnis Anda ditemukan oleh investor terdaftar di katalog peluang Beruang.',
    visibility_public_title: 'Publik Terverifikasi (Direkomendasikan)',
    visibility_public_desc: 'Profil bisnis tampil lengkap dengan nama brand, kota, dan sektor. Dokumen sensitif tetap terlindungi di Data Room dan wajib persetujuan Anda.',
    visibility_anon_title: 'Samarkan Nama Brand (Semi-Anonim)',
    visibility_anon_desc: 'Investor hanya melihat sektor dan indikator pertumbuhan metrik keuangan tanpa mengetahui nama brand toko Anda sebelum mengajukan izin perkenalan.',
    visibility_hidden_title: 'Sembunyikan Sementara dari Katalog',
    visibility_hidden_desc: 'Toko tidak muncul di pencarian investor. Hanya Anda dan konsultan pendamping yang dapat melihat perkembangan usaha.',
    watermark_title: 'Watermark Otomatis Berkas Privat (Anti-Bocor)',
    watermark_desc: 'Sematkan stempel nama lembaga investor dan waktu unduh pada berkas PDF laporan kas dan rekening koran yang diunduh.',
    expiry_label: 'Masa Berlaku Izin Akses Default',
    expiry_14: '14 Hari Kalender',
    expiry_30: '30 Hari Kalender (Standar)',
    expiry_60: '60 Hari Kalender',
    expiry_perm: 'Permanen (Hingga dicabut manual)',

    // Regional Section
    sec_regional_title: 'Preferensi Regional & Pembukuan',
    sec_regional_desc: 'Format mata uang resmi, pilihan bahasa antarmuka, dan sinkronisasi zona waktu transaksi.',
    currency_label: 'Mata Uang Pembukuan',
    timezone_label: 'Zona Waktu Operasional',
    language_label: 'Bahasa Antarmuka Aplikasi',
    lang_id: 'Bahasa Indonesia (ID)',
    lang_en: 'English (EN)',

    // Danger Zone Section
    sec_danger_title: 'Zona Waspada & Penghapusan Akun',
    sec_danger_desc: 'Tindakan di bagian ini berdampak langsung terhadap riwayat bimbingan dan data tokomu.',
    deactivate_title: 'Nonaktifkan Sementara Akun Toko',
    deactivate_desc: 'Menjeda akses bimbingan dan menyembunyikan profil tokomu dari seluruh investor hingga kamu mengaktifkannya kembali.',
    deactivate_btn: 'Nonaktifkan Toko',
    delete_title: 'Hapus Akun & Data Usaha Secara Permanen',
    delete_desc: 'Seluruh riwayat pencatatan kas, hasil radar assessment, dan berkas di Data Room akan dimusnahkan selamanya.',
    delete_btn: 'Hapus Akun Permanen',

    // Modals
    modal_deactivate_title: 'Nonaktifkan Toko Sementara?',
    modal_deactivate_desc: 'Profil tokomu akan disembunyikan dari katalog investor. Kamu tetap bisa login dan mengaktifkannya kembali kapan saja melalui menu pengaturan.',
    modal_deactivate_check: 'Saya mengerti bahwa profil toko tidak dapat dilihat oleh calon investor selama dinonaktifkan.',
    modal_deactivate_confirm: 'Ya, Nonaktifkan Toko',
    modal_cancel: 'Batal',

    modal_delete_title: 'Hapus Akun & Data Usaha Permanen?',
    modal_delete_desc: 'PERINGATAN: Tindakan ini permanen dan tidak dapat dibatalkan. Seluruh riwayat pencatatan kas, grafik transformasi, dokumen di Ruang Data, dan sertifikasi bimbingan akan dihapus selamanya dari server.',
    modal_delete_type_instruction: 'Ketik kata "HAPUS" di bawah untuk mengonfirmasi:',
    modal_delete_placeholder: 'Ketik HAPUS di sini...',
    modal_delete_confirm: 'Musnahkan & Hapus Akun',

    // Modal OTP Ubah Email
    modal_email_otp_title: 'Verifikasi Alamat Email Baru',
    modal_email_otp_desc: 'Kami telah mengirimkan 6 digit kode OTP rahasia ke alamat email baru Anda:',
    modal_email_otp_hint: 'Masukkan 6 digit kode OTP untuk mengonfirmasi perubahan email:',
    modal_email_otp_demo_tip: 'Kode Simulasi OTP',
    modal_email_otp_autofill: 'Isi Otomatis',
    modal_email_otp_resend_wait: 'Kirim ulang dalam',
    modal_email_otp_resend_action: 'Kirim Ulang Kode OTP',
    modal_email_otp_confirm: 'Verifikasi & Simpan Email',
    modal_email_otp_verifying: 'Memverifikasi...',
    modal_email_otp_invalid: 'Kode OTP yang dimasukkan salah. Silakan coba lagi.',
    modal_email_otp_success: 'Alamat email akun berhasil diverifikasi dan diperbarui!',

    // Navigation & Layout
    nav_beranda: 'Beranda',
    nav_catatan_kas: 'Catatan Kas',
    nav_kelola_usaha: 'Kelola Usaha',
    nav_rencana_aksi: 'Rencana Aksi',
    nav_profil_usaha: 'Profil Usaha',
    nav_radar_kesiapan: 'Radar Kesiapan',
    nav_permodalan: 'Permodalan',
    nav_cari_investor: 'Cari Investor',
    nav_pesan: 'Pesan',
    nav_notifikasi: 'Notifikasi',
    nav_pengaturan: 'Pengaturan',
    nav_logout: 'Keluar',
    nav_quick_access: 'Akses Cepat UMKM',
    nav_menu_lainnya: 'Menu Lainnya',
    nav_tutup_menu: 'Tutup Menu',
    nav_pilih_peran: 'Pilih Peran',
    nav_switch_to: 'Beralih ke',

    // Quick Access Tiles
    qa_catat_kas: 'Catat Kas',
    qa_mutasi_harian: 'Mutasi Harian',
    qa_rencana_aksi: 'Rencana Aksi',
    qa_radar_kesiapan: 'Radar Kesiapan',
    qa_profil_usaha: 'Profil Usaha',
    qa_pesan_investor: 'Pesan Mitra',
    qa_cari_modal: 'Cari Modal',
    qa_pengaturan: 'Pengaturan',

    // Common Buttons & Actions
    btn_catat_kas: 'Catat Kas Toko',
    btn_catat_kas_singkat: 'Catat Kas',
    btn_simpan: 'Simpan',
    btn_batal: 'Batal',
    btn_tutup: 'Tutup',
    btn_cari: 'Cari',
    btn_unduh: 'Unduh',
    btn_kembali: 'Kembali',
    btn_kirim: 'Kirim',
    btn_semua: 'Semua',
    btn_filter: 'Filter',
    btn_terapkan: 'Terapkan',
    btn_ubah_sampul: 'Ubah Sampul',
    btn_ganti_banner: 'Ganti Banner',
    btn_atur_ulang_banner: 'Atur Ulang Banner',
    btn_lihat_penuh: 'Lihat Foto Penuh',

    // Notifications
    notif_title: 'Notifikasi',
    notif_tab_all: 'Semua',
    notif_tab_order: 'Pesanan',
    notif_tab_cash: 'Kas',
    notif_tab_investor: 'Investor',
    notif_tab_system: 'Sistem',
    notif_mark_all_read: 'Tandai Semua Dibaca',
    notif_refresh: 'Segarkan Notifikasi',
    notif_settings: 'Pengaturan Notifikasi',
    notif_view_all: 'Lihat semua notifikasi',
    notif_empty: 'Belum ada notifikasi baru',

    // Chat / Messages
    chat_title: 'Pesan',
    chat_search_placeholder: 'Cari pesan atau nama mitra...',
    chat_tab_all: 'Semua Percakapan',
    chat_tab_all_short: 'Semua',
    chat_tab_konsultan: 'Konsultan Pendamping',
    chat_tab_konsultan_short: 'Konsultan',
    chat_tab_pemodal: 'Mitra Pemodal',
    chat_tab_pemodal_short: 'Pemodal',
    chat_empty_title: 'Tidak ada percakapan',
    chat_empty_desc: 'Ubah kata kunci pencarian atau ganti filter kategori.',
    chat_input_placeholder: 'Tulis pesan untuk kelanjutan pendanaan atau konsultasi...',
    chat_quick_reply: 'Balasan Cepat:',
    chat_verified: 'Terverifikasi',
    chat_partner_details: 'Rincian Mitra',
    chat_back_btn: 'Kembali ke Daftar Pesan',
    chat_mark_all_read: 'Tandai Semua Dibaca',
    chat_progress_tugas: 'Progress Tugas',

    // Progres / Catatan Kas
    progres_title: 'Catatan Kas Toko',
    progres_tab_mutasi: 'Buku Mutasi Kas Harian',
    progres_tab_mutasi_short: 'Mutasi Kas',
    progres_tab_bulanan: 'Rekap Kas Bulanan',
    progres_tab_bulanan_short: 'Rekap Bulanan',
    progres_tab_tren: 'Grafik Pergerakan Uang',
    progres_tab_tren_short: 'Grafik Tren',
    progres_stat_masuk: 'Uang Masuk Toko',
    progres_stat_keluar: 'Biaya Operasional',
    progres_stat_sisa: 'Sisa Saldo Kas',
    progres_stat_laba: 'Untung Bersih',
    progres_table_title: 'Daftar Mutasi Transaksi Kas Harian',
    progres_table_desc: 'Setiap catatan transaksi uang masuk dan keluar tersinkronisasi dengan bukti nota kasir.',
    progres_search_placeholder: 'Cari transaksi kasir, nota, kategori...',

    // Banner & Profile
    banner_crop_title: 'Sesuaikan & Potong Banner',
    banner_crop_desc: 'Geser dan atur posisi gambar sesuai ukuran tampilan banner tokomu.',
    banner_apply: 'Terapkan Banner',
    banner_center: 'Tengah',
    banner_top: 'Atas',
    banner_bottom: 'Bawah',
    banner_hint: 'Geser untuk mengatur posisi · Gunakan tombol atau slider untuk sesuaikan'
  },
  en: {
    // Top Bar
    settings_title: 'Account Settings & Preferences',
    back: 'Back',
    save_settings: 'Save Settings',
    save_all: 'Save All Settings',
    saving: 'Saving...',
    saved_success: 'Settings successfully saved!',
    saved_success_desc: 'Your account changes and store preferences have been updated.',
    close: 'Close',
    save_field: 'Save',
    field_saved: 'Saved ✓',

    // Top Highlight Banner
    banner_title: 'Want to update brand name, store banner, outlet count, or business pitch?',
    banner_desc: 'Public business credentials and store storefronts are managed directly in the Business Profile page.',
    banner_action: 'Open Business Profile',

    // Theme Selector
    theme_title: 'Appearance & Color Scheme',
    theme_desc: 'Select the Beruang workspace color scheme that best suits your eyes.',
    theme_active: 'Active',
    theme_light: 'Light Mode',
    theme_light_desc: 'Clean white & ice-blue canvas with crisp daytime contrast.',
    theme_dark: 'Dark Mode',
    theme_dark_desc: 'Deep obsidian canvas, soothing & comfortable in low light.',
    theme_system: 'Automatic (System)',
    theme_system_desc: 'Automatically synchronizes with your device OS preferences.',

    // Security Section
    sec_security_title: 'Security & Account Credentials',
    sec_security_desc: 'Manage your login email, verify your official WhatsApp contact, and secure your password.',
    email_label: 'Account Email Address',
    email_verified: 'Email verified via OTP',
    email_otp_required_hint: 'Click Save to send OTP verification code to your new email.',
    phone_label: 'Primary WhatsApp Number',
    phone_hint: 'Used for security confirmations and verification codes.',
    password_title: 'Account Password',
    password_desc: 'Last updated 24 days ago. We recommend at least 8 combined characters.',
    change_password_btn: 'Change Password',
    close_password_btn: 'Close Password Form',
    current_password: 'Current Password',
    new_password: 'New Password',
    confirm_password: 'Confirm New Password',
    save_password_btn: 'Save New Password',
    two_factor_title: 'Two-Factor Authentication (2FA WhatsApp OTP)',
    two_factor_desc: 'Send a security OTP to your WhatsApp whenever logging in from a new browser.',
    sessions_title: 'Active Device Sessions',
    sessions_desc: 'Devices currently logged in and authorized to access your store account.',
    disconnect_others: 'Log Out Other Devices',
    current_session: 'Current Session',
    active_now: 'Active Now',
    active_hours_ago: 'Last active 3 hours ago',
    terminate_btn: 'Log Out',

    // Notification Section
    sec_notify_title: 'Reconciliation & Transaction Reminders',
    sec_notify_desc: 'Choose which alerts and notifications are delivered to your WhatsApp and Email channels.',
    notify_cash_title: 'Monthly Cash Reporting Reminder (Every 25th)',
    notify_cash_desc: 'Receive reminders 3 days before month-end so cash reports and sales receipts are ready for consultant audit.',
    notify_ai_title: 'Early AI Expense Spike Alert (Anomaly Alert)',
    notify_ai_desc: 'Get notified immediately if the system detects unusual operational expense spikes or gross margin drops.',
    notify_investor_title: 'Document Access Request from Prospective Investors',
    notify_investor_desc: 'Instant alert whenever an accredited funder requests permission to unlock your Private Data Room.',
    notify_task_title: 'Task Checklist Updates from Business Consultant',
    notify_task_desc: 'Receive updates when your mentor assigns or approves action plan milestones.',

    // Privacy Section
    sec_privacy_title: 'Store Visibility in Investor Marketplace',
    sec_privacy_desc: 'Control how your business is discovered by verified investors in Beruang curated deals.',
    visibility_public_title: 'Verified Public (Recommended)',
    visibility_public_desc: 'Full business profile displayed with brand name, city, and sector. Sensitive documents remain guarded in Data Room.',
    visibility_anon_title: 'Mask Brand Name (Semi-Anonymous)',
    visibility_anon_desc: 'Investors only see sector and financial performance metrics without revealing your store name before NDA approval.',
    visibility_hidden_title: 'Temporarily Hide from Catalog',
    visibility_hidden_desc: 'Store hidden from investor searches. Only you and your assigned consultant can view progress.',
    watermark_title: 'Automatic Private File Watermarking (Leak-Proof)',
    watermark_desc: 'Embed investor syndicate name and download timestamp on every downloaded PDF cash report and bank statement.',
    expiry_label: 'Default Access Permission Expiry',
    expiry_14: '14 Calendar Days',
    expiry_30: '30 Calendar Days (Standard)',
    expiry_60: '60 Calendar Days',
    expiry_perm: 'Permanent (Until manually revoked)',

    // Regional Section
    sec_regional_title: 'Regional & Accounting Preferences',
    sec_regional_desc: 'Official bookkeeping currency, interface language, and operational timezone.',
    currency_label: 'Bookkeeping Currency',
    timezone_label: 'Operational Timezone',
    language_label: 'Interface Language',
    lang_id: 'Indonesian (ID)',
    lang_en: 'English (EN)',

    // Danger Zone Section
    sec_danger_title: 'Danger Zone & Account Termination',
    sec_danger_desc: 'Actions in this section permanently affect your mentorship record and store data.',
    deactivate_title: 'Temporarily Deactivate Store Account',
    deactivate_desc: 'Pauses mentorship access and hides your store from all investors until you reactivate it.',
    deactivate_btn: 'Deactivate Store',
    delete_title: 'Permanently Delete Account & Business Data',
    delete_desc: 'All historical cash records, radar business assessments, and Data Room files will be destroyed forever.',
    delete_btn: 'Permanently Delete Account',

    // Modals
    modal_deactivate_title: 'Temporarily Deactivate Store?',
    modal_deactivate_desc: 'Your store profile will be hidden from investor discovery. You can log in and reactivate anytime in settings.',
    modal_deactivate_check: 'I understand that my store profile cannot be viewed by prospective investors while deactivated.',
    modal_deactivate_confirm: 'Yes, Deactivate Store',
    modal_cancel: 'Cancel',

    modal_delete_title: 'Permanently Delete Account & Store Data?',
    modal_delete_desc: 'WARNING: This action is permanent and cannot be undone. All cash entries, transformation charts, Data Room files, and mentorship certifications will be erased from our servers.',
    modal_delete_type_instruction: 'Type the word "HAPUS" below to confirm deletion:',
    modal_delete_placeholder: 'Type HAPUS here...',
    modal_delete_confirm: 'Destroy & Delete Account Permanently',

    // Modal OTP Change Email
    modal_email_otp_title: 'Verify New Email Address',
    modal_email_otp_desc: 'We have sent a 6-digit security OTP code to your new email address:',
    modal_email_otp_hint: 'Enter the 6-digit OTP code to confirm your email update:',
    modal_email_otp_demo_tip: 'Demo OTP Code',
    modal_email_otp_autofill: 'Auto Fill',
    modal_email_otp_resend_wait: 'Resend code in',
    modal_email_otp_resend_action: 'Resend OTP Code',
    modal_email_otp_confirm: 'Verify & Save Email',
    modal_email_otp_verifying: 'Verifying...',
    modal_email_otp_invalid: 'Invalid OTP code entered. Please try again.',
    modal_email_otp_success: 'Account email address successfully verified and updated!',

    // Navigation & Layout
    nav_beranda: 'Dashboard',
    nav_catatan_kas: 'Cash Ledger',
    nav_kelola_usaha: 'Manage Business',
    nav_rencana_aksi: 'Action Plan',
    nav_profil_usaha: 'Store Profile',
    nav_radar_kesiapan: 'Readiness Radar',
    nav_permodalan: 'Funding & Capital',
    nav_cari_investor: 'Find Investors',
    nav_pesan: 'Messages',
    nav_notifikasi: 'Notifications',
    nav_pengaturan: 'Settings',
    nav_logout: 'Log Out',
    nav_quick_access: 'Quick Actions',
    nav_menu_lainnya: 'More Menu',
    nav_tutup_menu: 'Close Menu',
    nav_pilih_peran: 'Switch Role',
    nav_switch_to: 'Switch to',

    // Quick Access Tiles
    qa_catat_kas: 'Add Cash',
    qa_mutasi_harian: 'Daily Cash',
    qa_rencana_aksi: 'Action Plan',
    qa_radar_kesiapan: 'Readiness Radar',
    qa_profil_usaha: 'Store Profile',
    qa_pesan_investor: 'Chat Partners',
    qa_cari_modal: 'Find Funding',
    qa_pengaturan: 'Settings',

    // Common Buttons & Actions
    btn_catat_kas: 'Record Store Cash',
    btn_catat_kas_singkat: 'Add Entry',
    btn_simpan: 'Save',
    btn_batal: 'Cancel',
    btn_tutup: 'Close',
    btn_cari: 'Search',
    btn_unduh: 'Download',
    btn_kembali: 'Back',
    btn_kirim: 'Send',
    btn_semua: 'All',
    btn_filter: 'Filter',
    btn_terapkan: 'Apply',
    btn_ubah_sampul: 'Change Banner',
    btn_ganti_banner: 'Upload Banner',
    btn_atur_ulang_banner: 'Reposition Banner',
    btn_lihat_penuh: 'View Full Photo',

    // Notifications
    notif_title: 'Notifications',
    notif_tab_all: 'All',
    notif_tab_order: 'Orders',
    notif_tab_cash: 'Cash',
    notif_tab_investor: 'Investors',
    notif_tab_system: 'System',
    notif_mark_all_read: 'Mark All Read',
    notif_refresh: 'Refresh Alerts',
    notif_settings: 'Notification Settings',
    notif_view_all: 'View all notifications',
    notif_empty: 'No new notifications',

    // Chat / Messages
    chat_title: 'Messages',
    chat_search_placeholder: 'Search messages or partners...',
    chat_tab_all: 'All Conversations',
    chat_tab_all_short: 'All',
    chat_tab_konsultan: 'Business Mentors',
    chat_tab_konsultan_short: 'Mentors',
    chat_tab_pemodal: 'Investor Partners',
    chat_tab_pemodal_short: 'Investors',
    chat_empty_title: 'No conversations',
    chat_empty_desc: 'Try a different search term or category filter.',
    chat_input_placeholder: 'Type a message regarding funding or mentorship...',
    chat_quick_reply: 'Quick Replies:',
    chat_verified: 'Verified',
    chat_partner_details: 'Partner Details',
    chat_back_btn: 'Back to Messages',
    chat_mark_all_read: 'Mark All Read',
    chat_progress_tugas: 'Action Tasks',

    // Progres / Catatan Kas
    progres_title: 'Store Cash Ledger',
    progres_tab_mutasi: 'Daily Cash Movement',
    progres_tab_mutasi_short: 'Cash Journal',
    progres_tab_bulanan: 'Monthly Cash Summary',
    progres_tab_bulanan_short: 'Monthly Summary',
    progres_tab_tren: 'Cash Flow Analytics',
    progres_tab_tren_short: 'Flow Analytics',
    progres_stat_masuk: 'Store Inflow',
    progres_stat_keluar: 'Operating Expenses',
    progres_stat_sisa: 'Cash Balance',
    progres_stat_laba: 'Net Profit Margin',
    progres_table_title: 'Daily Cash Flow Transactions',
    progres_table_desc: 'Every registered cash inflow and outflow transaction synchronized with cash register receipts.',
    progres_search_placeholder: 'Search cashier transactions, notes, categories...',

    // Banner & Profile
    banner_crop_title: 'Adjust & Crop Banner',
    banner_crop_desc: 'Pan and scale the image to fit your store banner dimensions.',
    banner_apply: 'Apply Banner',
    banner_center: 'Center',
    banner_top: 'Top',
    banner_bottom: 'Bottom',
    banner_hint: 'Drag to reposition · Use buttons or slider to scale'
  }
}

export function useLanguage() {
  const currentLang = useState<Language>('beruang-app-lang', () => 'id')

  const setLanguage = (lang: Language) => {
    currentLang.value = lang
    if (import.meta.client) {
      try {
        localStorage.setItem('beruang-lang', lang)
        document.documentElement.setAttribute('lang', lang)
      } catch {
        // no-op
      }
    }
  }

  const initLanguage = () => {
    if (!import.meta.client) return
    try {
      const saved = localStorage.getItem('beruang-lang') as Language | null
      if (saved === 'id' || saved === 'en') {
        currentLang.value = saved
        document.documentElement.setAttribute('lang', saved)
      }
    } catch {
      // no-op
    }
  }

  const t = (key: string): string => {
    const langDict = translations[currentLang.value] || translations.id
    return langDict[key] || translations.id[key] || key
  }

  return {
    currentLang,
    setLanguage,
    initLanguage,
    t
  }
}
