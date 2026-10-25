import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedChat() {
  console.log("🌱 Seeding chat threads and messages...");

  // 1. Thread 01: Kopi Senja Nusantara
  const kopiBiz = await prisma.businessProfile.findFirst({
    where: { brand: { contains: "Kopi Senja" } },
  });

  const t1 = await prisma.chatThread.upsert({
    where: { id: "thread-01" },
    update: {},
    create: {
      id: "thread-01",
      businessId: kopiBiz?.id || "biz-kopisenja-01",
      umkmId: "umkm-01",
      investorId: "usr-inv-01",
      investorName: "Hendro Wicaksono",
      investorLembaga: "Nusantara Impact Angel Syndicate",
      investorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      dealStatus: "Tahap Due Diligence Kas",
      ticketDiscussed: 250000000,
      unreadInvestor: 0,
      unreadUmkm: 1,
      lastMessage: "Hendro: Berikut kami kirimkan draf awal surat minat investasi.",
      lastMessageAt: "8 Agu",
    },
  });

  const m1 = await prisma.chatMessage.count({ where: { threadId: t1.id } });
  if (m1 === 0) {
    await prisma.chatMessage.createMany({
      data: [
        {
          id: "msg-01",
          threadId: t1.id,
          senderRole: "INVESTOR",
          senderName: "Hendro Wicaksono",
          text: "Halo, salam kenal. Kami dari komite investasi telah meninjau profil tokomu di Beruang.",
          timestamp: "09:45",
        },
        {
          id: "msg-02",
          threadId: t1.id,
          senderRole: "UMKM",
          senderName: "Fikri Setiawan",
          text: "Halo Mas Hendro, salam kenal kembali! Terima kasih banyak atas apresiasinya.",
          timestamp: "09:58",
        },
        {
          id: "msg-03",
          threadId: t1.id,
          senderRole: "INVESTOR",
          senderName: "Hendro Wicaksono",
          text: "Kami sedang mengkaji proyeksi arus kas tokomu. Bisakah kami mendapatkan gambaran margin kotor 3 bulan terakhir?",
          timestamp: "10:15",
        },
        {
          id: "msg-04",
          threadId: t1.id,
          senderRole: "UMKM",
          senderName: "Fikri Setiawan",
          text: "Tentu, rata-rata margin kotor kami berada di 54.8% stabil dengan pencatatan kasir POS harian terverifikasi.",
          timestamp: "10:30",
          attachmentType: "METRIC",
          attachmentTitle: "Snapshot Margin Kotor Terverifikasi",
          attachmentSubtitle: "Rata-rata 3 Bulan",
          attachmentValue: "54.8%",
        },
        {
          id: "msg-05",
          threadId: t1.id,
          senderRole: "INVESTOR",
          senderName: "Hendro Wicaksono",
          text: "Hendro: Berikut kami kirimkan draf awal surat minat investasi untuk dipelajari bersama konsultan pendamping.",
          timestamp: "8 Agu",
          attachmentType: "DEAL_OFFER",
          attachmentTitle: "Surat Minat Investasi (Term Sheet)",
          attachmentSubtitle: "Skema Bagi Hasil 12% - 24 Bulan",
          attachmentValue: "Rp 250.000.000",
        },
      ],
    });
  }

  // 2. Thread 02: Sambal Bu Rudy
  const rudyBiz = await prisma.businessProfile.findFirst({
    where: { brand: { contains: "Sambal Bu Rudy" } },
  });

  const t2 = await prisma.chatThread.upsert({
    where: { id: "thread-02" },
    update: {},
    create: {
      id: "thread-02",
      businessId: rudyBiz?.id || "umkm-03",
      umkmId: "umkm-03",
      investorId: "usr-inv-01",
      investorName: "Raihan Fariz N.",
      investorLembaga: "Inkubator Bisnis UMKM",
      investorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      dealStatus: "Pendampingan Validasi",
      ticketDiscussed: 150000000,
      unreadInvestor: 0,
      unreadUmkm: 0,
      lastMessage: "Raihan Fariz: Kami mengenal satu sama lain dari program inkubasi.",
      lastMessageAt: "4 Mei",
    },
  });

  const m2 = await prisma.chatMessage.count({ where: { threadId: t2.id } });
  if (m2 === 0) {
    await prisma.chatMessage.createMany({
      data: [
        {
          id: "msg-11",
          threadId: t2.id,
          senderRole: "INVESTOR",
          senderName: "Raihan Fariz N.",
          text: "Raihan Fariz: Kami mengenal satu sama lain dari program inkubasi.",
          timestamp: "4 Mei 11:20",
        },
      ],
    });
  }

  // 3. Thread 03: Keripik Tempe Marem
  const tempeBiz = await prisma.businessProfile.findFirst({
    where: { brand: { contains: "Keripik Tempe" } },
  });

  const t3 = await prisma.chatThread.upsert({
    where: { id: "thread-03" },
    update: {},
    create: {
      id: "thread-03",
      businessId: tempeBiz?.id || "umkm-05",
      umkmId: "umkm-05",
      investorId: "usr-inv-01",
      investorName: "Shafa Rizqi Nur Wahidah",
      investorLembaga: "Pusat Legalitas Usaha",
      investorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      dealStatus: "Sertifikasi Terverifikasi",
      ticketDiscussed: 0,
      unreadInvestor: 0,
      unreadUmkm: 0,
      lastMessage: "Anda: halo, izin edar BPOM dan NIB sudah kami upload.",
      lastMessageAt: "14 Mar",
    },
  });

  const m3 = await prisma.chatMessage.count({ where: { threadId: t3.id } });
  if (m3 === 0) {
    await prisma.chatMessage.createMany({
      data: [
        {
          id: "msg-21",
          threadId: t3.id,
          senderRole: "UMKM",
          senderName: "Anda",
          text: "Anda: halo, izin edar BPOM dan NIB sudah kami upload.",
          timestamp: "14 Mar 09:15",
        },
      ],
    });
  }

  // 4. Thread 04: Maya Suryani (Konsultan Keuangan)
  const t4 = await prisma.chatThread.upsert({
    where: { id: "thread-04" },
    update: {},
    create: {
      id: "thread-04",
      businessId: kopiBiz?.id || "biz-kopisenja-01",
      umkmId: "umkm-01",
      investorId: "usr-cons-01",
      investorName: "Dra. Maya Suryani, M.M.",
      investorLembaga: "Konsultan Pendamping UMKM",
      investorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
      dealStatus: "Konsultasi Rutin",
      ticketDiscussed: 0,
      unreadInvestor: 0,
      unreadUmkm: 0,
      lastMessage: "Maya: Rapor keuangan bulan ini sudah selesai kami validasi.",
      lastMessageAt: "Kemarin",
    },
  });

  const m4 = await prisma.chatMessage.count({ where: { threadId: t4.id } });
  if (m4 === 0) {
    await prisma.chatMessage.createMany({
      data: [
        {
          id: "msg-31",
          threadId: t4.id,
          senderRole: "INVESTOR",
          senderName: "Dra. Maya Suryani, M.M.",
          text: "Maya: Rapor keuangan bulan ini sudah selesai kami validasi.",
          timestamp: "Kemarin",
        },
      ],
    });
  }

  console.log("✅ Chat threads and messages seeded successfully!");
}

seedChat()
  .catch((e) => console.error("Error seeding chat:", e))
  .finally(() => prisma.$disconnect());
