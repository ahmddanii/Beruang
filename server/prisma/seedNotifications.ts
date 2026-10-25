import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Rich In-App Notifications...");

  const umkmUser = await prisma.user.findFirst({ where: { role: "UMKM" } });
  const consultantUser = await prisma.user.findFirst({ where: { role: "CONSULTANT" } });
  const investorUser = await prisma.user.findFirst({ where: { role: "INVESTOR" } });

  if (!umkmUser || !consultantUser || !investorUser) {
    console.log("⚠️ Users not found, cannot seed notifications.");
    return;
  }

  const notifications = [
    // UMKM Notifications
    {
      id: "notif-umkm-1",
      userId: umkmUser.id,
      title: "Pesanan Baru ID: MSLES880",
      senderName: "Mitra Outlet 2 Bandung",
      actionDetail: "membuat pesanan pasokan kopi baru di Catatan Kas",
      quoteSnippet: '"Pesanan pasokan kopi dari outlet 2 senilai Rp3.450.000 telah masuk dan siap diproses."',
      message: "Pesanan pasokan kopi dari mitra outlet 2 senilai Rp3.450.000 telah masuk dan siap diproses.",
      category: "KAS",
      priority: "HIGH",
      link: "/dashboard/progres",
      actionLabel: "Lihat Kas",
      roleTarget: "UMKM",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      badgeCount: 2,
      iconType: "avatar",
      sectionGroup: "today",
      isRead: false,
    },
    {
      id: "notif-umkm-2",
      userId: umkmUser.id,
      title: "Tawaran Baru: Pengajuan Akses Modal",
      senderName: "Nusantara Capital Ventures",
      actionDetail: "mengajukan pembukaan ruang data untuk Akses Modal Rp250 Juta",
      quoteSnippet: '"Tertarik dengan rasio untung bersih dan kesiapan modal 82% Kopi Senja Nusantara."',
      message: "Nusantara Capital Ventures tertarik dengan profil tokomu dan mengajukan pembukaan ruang data modal Rp250 Juta.",
      category: "INVESTOR",
      priority: "HIGH",
      link: "/dashboard/permintaan-investor",
      actionLabel: "Tinjau Modal",
      roleTarget: "UMKM",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces",
      iconType: "deal",
      sectionGroup: "today",
      isRead: false,
    },
    {
      id: "notif-umkm-3",
      userId: umkmUser.id,
      title: "Catatan Kas Berhasil Tervalidasi",
      senderName: "Dra. Maya Suryani (Konsultan Pendamping)",
      actionDetail: "telah menyelesaikan pengecekan mingguan di Pergerakan Uang Toko",
      quoteSnippet: '"Laporan pergerakan uang toko telah diverifikasi tanpa selisih. Status tervalidasi sah."',
      message: "Laporan pergerakan uang toko telah selesai diverifikasi konsultan tanpa selisih. Status validasi tervalidasi.",
      category: "KONSULTAN",
      priority: "HIGH",
      link: "/dashboard/progres",
      actionLabel: "Lihat Kas",
      roleTarget: "UMKM",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces",
      iconType: "verified",
      sectionGroup: "today",
      isRead: false,
    },
    {
      id: "notif-umkm-4",
      userId: umkmUser.id,
      title: "Kata Sandi & Keamanan Berhasil Diperbarui",
      senderName: "Sistem Keamanan Toko",
      actionDetail: "telah memperbarui otentikasi login dan PIN kasir",
      quoteSnippet: '"Kredensial keamanan akun tokomu telah diperbarui dan aktif terlindungi."',
      message: "Kredensial keamanan akun dan PIN otentikasi tokomu telah berhasil diperbarui dan aktif.",
      category: "AKSI",
      priority: "NORMAL",
      link: "/dashboard/pengaturan",
      actionLabel: "Buka Akun",
      roleTarget: "UMKM",
      avatar: "/images/user-profile.png",
      iconType: "shield",
      sectionGroup: "today",
      isRead: true,
    },
    // Consultant Notifications
    {
      id: "notif-kon-1",
      userId: consultantUser.id,
      title: "Klien Mengajukan Pengecekan Kas",
      senderName: "Kopi Senja Nusantara (Klien)",
      actionDetail: "mengirimkan rekap catatan kas harian untuk divalidasi",
      quoteSnippet: '"Rekap kas mingguan outlet 1 dan outlet 2 siap diverifikasi konsultan."',
      message: "Kopi Senja Nusantara baru saja mengirim rekap catatan kas untuk diperiksa kelengkapannya.",
      category: "KONSULTAN",
      priority: "HIGH",
      link: "/konsultan/validasi",
      actionLabel: "Validasi Sekarang",
      roleTarget: "CONSULTANT",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      iconType: "verified",
      sectionGroup: "today",
      isRead: false,
    },
    {
      id: "notif-kon-2",
      userId: consultantUser.id,
      title: "Permohonan Bimbingan Masuk Baru",
      senderName: "Dapoer Renyah Nusantara",
      actionDetail: "mengajukan kontrak bimbingan 3 bulan untuk persiapan pendanaan",
      quoteSnippet: '"Memerlukan arahan audit HPP dan perizinan sertifikasi halal 3 gerai."',
      message: "Dapoer Renyah Nusantara mengajukan bimbingan pendampingan baru senilai Rp1.500.000/bln.",
      category: "KONSULTAN",
      priority: "HIGH",
      link: "/konsultan/klien?tab=permintaan",
      actionLabel: "Tinjau Permintaan",
      roleTarget: "CONSULTANT",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
      iconType: "deal",
      sectionGroup: "today",
      isRead: false,
    },
    // Investor Notifications
    {
      id: "notif-inv-1",
      userId: investorUser.id,
      title: "UMKM Tervalidasi Baru: Kopi Senja",
      senderName: "Kurasi UMKM Siap Didanai",
      actionDetail: "mempublikasikan profil UMKM tervalidasi baru di Katalog Usaha",
      quoteSnippet: '"UMKM sektor F&B dengan skor kesiapan modal 82% dan 3 outlet aktif telah siap ditinjau."',
      message: "UMKM sektor F&B dengan skor kesiapan modal 82% dan 3 outlet aktif telah siap ditinjau di katalog usaha.",
      category: "INVESTOR",
      priority: "NORMAL",
      link: "/investor",
      actionLabel: "Tinjau Profil Toko",
      roleTarget: "INVESTOR",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      iconType: "deal",
      sectionGroup: "today",
      isRead: false,
    },
  ];

  for (const n of notifications) {
    await prisma.notification.upsert({
      where: { id: n.id },
      update: {
        isRead: n.isRead,
        roleTarget: n.roleTarget,
        senderName: n.senderName,
        actionDetail: n.actionDetail,
        quoteSnippet: n.quoteSnippet,
        avatar: n.avatar,
        badgeCount: n.badgeCount,
        iconType: n.iconType,
        sectionGroup: n.sectionGroup,
      },
      create: n,
    });
  }

  console.log(`✅ Seeded ${notifications.length} rich notifications across all roles.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
