import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Beruang database seeding...");

  // Password hash default: password123
  const passwordHash = await bcrypt.hash("password123", 10);

  // 1. User UMKM
  const umkmUser = await prisma.user.upsert({
    where: { email: "fikri@kopisenja.id" },
    update: {},
    create: {
      id: "usr-umkm-01",
      name: "Fikri Setiawan",
      email: "fikri@kopisenja.id",
      passwordHash,
      role: "UMKM",
      phone: "081234567890",
      avatar: "",
      verified: true,
    },
  });

  // 2. User Konsultan
  const consultantUser = await prisma.user.upsert({
    where: { email: "maya.suryani@beruang.id" },
    update: {},
    create: {
      id: "usr-cons-01",
      name: "Dra. Maya Suryani, M.M.",
      email: "maya.suryani@beruang.id",
      passwordHash,
      role: "CONSULTANT",
      phone: "081398765432",
      avatar: "",
      verified: true,
      consultantProfile: {
        create: {
          id: "cons-prof-01",
          firmName: "Suryani Consulting & Advisory",
          specialization: "F&B, Keuangan & Standardisasi Operasional",
          isCertified: true,
          activeClientsCount: 8,
        },
      },
    },
  });

  // 3. User Investor
  await prisma.user.upsert({
    where: { email: "hendro@nusantaraventures.com" },
    update: {},
    create: {
      id: "usr-inv-01",
      name: "Hendro Wicaksono",
      email: "hendro@nusantaraventures.com",
      passwordHash,
      role: "INVESTOR",
      phone: "081122334455",
      avatar: "",
      verified: true,
      investorProfile: {
        create: {
          id: "inv-prof-01",
          firmName: "Nusantara Angel Syndicate",
          commitmentCapital: "Rp 1.5 Miliar",
          isVerified: true,
        },
      },
    },
  });

  // 4. User Admin
  await prisma.user.upsert({
    where: { email: "admin@beruang.id" },
    update: {},
    create: {
      id: "usr-adm-01",
      name: "Super Admin Beruang",
      email: "admin@beruang.id",
      passwordHash,
      role: "ADMIN",
      phone: "081900112233",
      avatar: "",
      verified: true,
    },
  });

  // 5. BusinessProfile Kopi Senja Nusantara
  const business = await prisma.businessProfile.upsert({
    where: { userId: umkmUser.id },
    update: {},
    create: {
      id: "biz-kopisenja-01",
      userId: umkmUser.id,
      brand: "Kopi Senja Nusantara",
      name: "Kopi Senja Nusantara",
      sector: "Kuliner & Minuman (F&B)",
      location: "Bandung, Jawa Barat",
      city: "Bandung",
      description: "Spesialis kopi susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi gerai cloud kitchen dan standardisasi roastery terpusat.",
      fundingTarget: 250000000,
      equityOffered: "12%",
      status: "READY_FOR_FUNDING",
      consultantId: "cons-prof-01",
      nib: "1209000123456",
      npwp: "81.423.891.4-429.000",
      outletsCount: 3,
      employeesCount: 14,
    },
  });

  // 6. Assessment 5 Aspek
  await prisma.assessment.upsert({
    where: { businessId: business.id },
    update: {},
    create: {
      businessId: business.id,
      financial: 78,
      operationsHpp: 85,
      marketing: 64,
      hrTeam: 75,
      legal: 92,
      compositeScore: 79,
      isVerified: true,
      consultantNotes: "Margin kotor stabil di atas 45%, disiplin pembukuan harian sangat baik.",
    },
  });

  // 7. Action Plan Tasks
  const sampleTasks = [
    { title: "Pisahkan Rekening Pribadi dan Usaha", category: "Finansial", dueDate: "10 Juli 2026", completed: true, status: "DONE" },
    { title: "Lengkapi Izin Edar & NIB Berbasis Risiko", category: "Legalitas", dueDate: "25 Juli 2026", completed: true, status: "DONE" },
    { title: "Standardisasi Kartu Stok Mingguan", category: "Operasional", dueDate: "15 Agustus 2026", completed: true, status: "DONE" },
    { title: "Perbarui Kontrak Supplier Bahan Baku", category: "Finansial", dueDate: "30 Agustus 2026", completed: true, status: "DONE" },
    { title: "Input Progres Finansial Rutin Bulan September", category: "Finansial", dueDate: "05 Oktober 2026", completed: true, status: "DONE" },
    { title: "Simulasi Pitching & Data Room Briefing", category: "Tata Kelola", dueDate: "12 Oktober 2026", completed: false, status: "TODO" },
  ];

  for (const t of sampleTasks) {
    await prisma.actionPlanTask.create({
      data: {
        businessId: business.id,
        title: t.title,
        category: t.category,
        dueDate: t.dueDate,
        completed: t.completed,
        status: t.status,
      },
    });
  }

  // 8. Monthly Reports (Jan - Okt)
  const monthlyData = [
    { month: "Januari", year: 2026, omzet: 42000000, hpp: 19000000, opex: 11000000, netProfit: 12000000, cashBalance: 28000000 },
    { month: "Februari", year: 2026, omzet: 45000000, hpp: 20500000, opex: 11500000, netProfit: 13000000, cashBalance: 33000000 },
    { month: "Maret", year: 2026, omzet: 49000000, hpp: 22000000, opex: 12000000, netProfit: 15000000, cashBalance: 39000000 },
    { month: "April", year: 2026, omzet: 53000000, hpp: 24000000, opex: 12500000, netProfit: 16500000, cashBalance: 45000000 },
    { month: "Mei", year: 2026, omzet: 58000000, hpp: 26000000, opex: 13500000, netProfit: 18500000, cashBalance: 52000000 },
    { month: "Juni", year: 2026, omzet: 64000000, hpp: 28500000, opex: 14500000, netProfit: 21000000, cashBalance: 59000000 },
    { month: "Juli", year: 2026, omzet: 72000000, hpp: 32000000, opex: 16000000, netProfit: 24000000, cashBalance: 66000000 },
    { month: "Agustus", year: 2026, omzet: 82000000, hpp: 36500000, opex: 17500000, netProfit: 28000000, cashBalance: 71000000, proofName: "Mutasi_Kasir_POS_Agustus_2026.pdf" },
    { month: "September", year: 2026, omzet: 91000000, hpp: 40500000, opex: 19500000, netProfit: 31000000, cashBalance: 73500000, proofName: "Rekap_Omzet_September_2026.xlsx" },
    { month: "Oktober", year: 2026, omzet: 100000000, hpp: 45100000, opex: 22300000, netProfit: 32600000, cashBalance: 75500000, proofName: "Laporan_Kas_Oktober_2026.pdf" },
  ];

  for (const m of monthlyData) {
    await prisma.monthlyReport.create({
      data: {
        businessId: business.id,
        month: m.month,
        year: m.year,
        monthYear: `${m.year}-${String(monthlyData.indexOf(m) + 1).padStart(2, "0")}`,
        omzet: m.omzet,
        hpp: m.hpp,
        hppRatio: Math.round((m.hpp / m.omzet) * 100),
        opex: m.opex,
        loss: 0,
        netProfit: m.netProfit,
        cashBalance: m.cashBalance,
        status: "VERIFIED",
        proofDocumentName: m.proofName || `Laporan_Kas_${m.month}_${m.year}.pdf`,
        proofDocumentSize: "1.8 MB",
        notes: `Rekap kas ${m.month} ${m.year} terverifikasi klir.`,
      },
    });
  }

  // 9. Data Room Documents (VDR)
  const sampleVdrDocs = [
    { name: "Nomor Induk Berusaha (NIB)", category: "Legalitas", size: "1.2 MB", isConfidential: false },
    { name: "Sertifikat Halal Resmi BPJPH", category: "Legalitas", size: "2.4 MB", isConfidential: false },
    { name: "Rekening Koran Usaha (6 Bulan Terakhir)", category: "Keuangan", size: "4.8 MB", isConfidential: true },
    { name: "Surat Keterangan Usaha (SKU) Kelurahan", category: "Perizinan", size: "850 KB", isConfidential: false },
    { name: "SOP Barista & Resep Formula Menu", category: "Operasional", size: "3.1 MB", isConfidential: true },
  ];

  for (const doc of sampleVdrDocs) {
    await prisma.dataRoomDocument.create({
      data: {
        businessId: business.id,
        name: doc.name,
        category: doc.category,
        size: doc.size,
        isConfidential: doc.isConfidential,
        fileUrl: `/api/vdr/documents/sample/${encodeURIComponent(doc.name)}.pdf`,
      },
    });
  }

  // 10. Sample Daily Transactions
  const sampleTxs = [
    { date: "18 Okt 2026", title: "Penjualan Kasir Shift Pagi - Gerai 1", category: "PEMASUKAN", amount: 2450000, paymentMethod: "QRIS", receiptNumber: "NOTA/2026/10/18-01" },
    { date: "18 Okt 2026", title: "Restock Biji Kopi Arabika 10kg", category: "MODAL_JUALAN", amount: 1350000, paymentMethod: "TRANSFER", receiptNumber: "NOTA/2026/10/18-02" },
    { date: "17 Okt 2026", title: "Gula Aren Organik 20 Liter", category: "MODAL_JUALAN", amount: 620000, paymentMethod: "TUNAI", receiptNumber: "NOTA/2026/10/17-01" },
    { date: "17 Okt 2026", title: "Penjualan Kasir Shift Sore - Gerai 2", category: "PEMASUKAN", amount: 3120000, paymentMethod: "QRIS", receiptNumber: "NOTA/2026/10/17-02" },
    { date: "16 Okt 2026", title: "Listrik & Internet Wi-Fi Gerai", category: "OPERASIONAL", amount: 850000, paymentMethod: "TRANSFER", receiptNumber: "NOTA/2026/10/16-01" },
  ];

  for (const tx of sampleTxs) {
    await prisma.dailyTransaction.create({
      data: {
        businessId: business.id,
        date: tx.date,
        title: tx.title,
        category: tx.category,
        amount: tx.amount,
        paymentMethod: tx.paymentMethod,
        receiptNumber: tx.receiptNumber,
        status: "VERIFIED",
      },
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
