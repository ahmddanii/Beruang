import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const marketplaceBusinesses = [
  {
    id: "umkm-03",
    userId: "usr-umkm-03",
    userEmail: "rudy@sambal.id",
    userName: "Bu Rudy",
    brand: "Sambal Bu Rudy Asli",
    name: "Sambal Bu Rudy Asli",
    sector: "F&B (Oleh-oleh & FMCG)",
    location: "Surabaya, Jawa Timur",
    city: "Surabaya",
    establishedYear: 2019,
    description: "Pabrikasi sambal kemasan botol higienis dengan distribusi 120+ toko oleh-oleh se-Jawa Timur. Standar BPOM dan audit kas harian sangat rapi.",
    fundingTarget: 500000000,
    equityOffered: "10%",
    status: "READY_FOR_FUNDING",
    consultantName: "Bambang Sudarsono, S.E.",
    healthScore: 88,
    marginPercentage: 52.0,
    growthYoY: 42.0,
    code: "BERU-SMB-03",
    tags: ["FMCG", "Ready for Funding", "Margin >50%", "Ekspansi"],
  },
  {
    id: "umkm-05",
    userId: "usr-umkm-05",
    userEmail: "marem@tempe.id",
    userName: "Suprapto Marem",
    brand: "Keripik Tempe Marem",
    name: "Keripik Tempe Marem",
    sector: "Agroindustri & Camilan",
    location: "Malang, Jawa Timur",
    city: "Malang",
    establishedYear: 2020,
    description: "Inovasi keripik tempe sagu aneka rasa dengan izin P-IRT dan Halal. Memasok rutin modern market lokal di Malang dan Surabaya.",
    fundingTarget: 175000000,
    equityOffered: "15%",
    status: "READY_FOR_FUNDING",
    consultantName: "Dra. Maya Suryani, M.M.",
    healthScore: 76,
    marginPercentage: 41.0,
    growthYoY: 28.5,
    code: "BERU-KRP-05",
    tags: ["Agroindustri", "Ready for Funding", "P-IRT", "Halal"],
  },
  {
    id: "umkm-07",
    userId: "usr-umkm-07",
    userEmail: "prabu@batik.id",
    userName: "Raden Prabu",
    brand: "Batik Lawasan Prabu",
    name: "Batik Lawasan Prabu",
    sector: "Fashion & Kriya",
    location: "Solo, Jawa Tengah",
    city: "Solo",
    establishedYear: 2018,
    description: "Produksi batik cap & tulis bahan pewarna alam ramah lingkungan dengan ekspor berkala ke Jepang dan Australia. Laporan keuangan terverifikasi.",
    fundingTarget: 350000000,
    equityOffered: "12%",
    status: "READY_FOR_FUNDING",
    consultantName: "Rahmat Hidayat, M.B.A.",
    healthScore: 84,
    marginPercentage: 55.4,
    growthYoY: 31.8,
    code: "BERU-BTK-07",
    tags: ["Kriya Ekspor", "Ready for Funding", "Eco-Friendly", "Margin >50%"],
  },
  {
    id: "umkm-09",
    userId: "usr-umkm-09",
    userEmail: "etek@rendang.id",
    userName: "Mak Etek",
    brand: "Dapur Rendang Mak Etek",
    name: "Dapur Rendang Mak Etek",
    sector: "F&B (Oleh-oleh & FMCG)",
    location: "Padang, Sumatera Barat",
    city: "Padang",
    establishedYear: 2020,
    description: "Rendang kemasan retort pouch dengan daya tahan simpan 12 bulan tanpa pengawet. Tersertifikasi HACCP dan sertifikat Halal BPJPH.",
    fundingTarget: 220000000,
    equityOffered: "14%",
    status: "READY_FOR_FUNDING",
    consultantName: "Dra. Maya Suryani, M.M.",
    healthScore: 81,
    marginPercentage: 46.2,
    growthYoY: 38.6,
    code: "BERU-RDG-09",
    tags: ["FMCG", "Ready for Funding", "HACCP", "Retort Pouch"],
  },
  {
    id: "umkm-12",
    userId: "usr-umkm-12",
    userEmail: "merapi@herbal.id",
    userName: "Ahmad Merapi",
    brand: "Agro Herbal Merapi",
    name: "Agro Herbal Merapi",
    sector: "Agroindustri & Camilan",
    location: "Yogyakarta, D.I. Yogyakarta",
    city: "Yogyakarta",
    establishedYear: 2017,
    description: "Pengolahan simplisia jamu dan teh celup herbal organik dari petani lereng Merapi. Memiliki izin edar BPOM TR dan fasilitas lab higienis.",
    fundingTarget: 420000000,
    equityOffered: "10%",
    status: "READY_FOR_FUNDING",
    consultantName: "Bambang Sudarsono, S.E.",
    healthScore: 82,
    marginPercentage: 49.0,
    growthYoY: 26.4,
    code: "BERU-HRB-12",
    tags: ["Agroindustri", "Ready for Funding", "Organik", "BPOM TR"],
  },
];

async function seedMarketplace() {
  console.log("🌱 Seeding marketplace businesses...");
  const passwordHash = await bcrypt.hash("password123", 10);

  for (const b of marketplaceBusinesses) {
    // 1. User
    await prisma.user.upsert({
      where: { email: b.userEmail },
      update: { name: b.userName },
      create: {
        id: b.userId,
        name: b.userName,
        email: b.userEmail,
        passwordHash,
        role: "UMKM",
        phone: "08" + Math.floor(1000000000 + Math.random() * 9000000000),
        verified: true,
      },
    });

    // 2. BusinessProfile
    await prisma.businessProfile.upsert({
      where: { id: b.id },
      update: {
        brand: b.brand,
        name: b.name,
        sector: b.sector,
        city: b.city,
        location: b.location,
        fundingTarget: b.fundingTarget,
        status: b.status,
        description: b.description,
      },
      create: {
        id: b.id,
        userId: b.userId,
        brand: b.brand,
        name: b.name,
        sector: b.sector,
        location: b.location,
        city: b.city,
        description: b.description,
        fundingTarget: b.fundingTarget,
        equityOffered: b.equityOffered,
        status: b.status,
      },
    });

    // 3. Assessment
    await prisma.assessment.upsert({
      where: { businessId: b.id },
      update: { compositeScore: b.healthScore, isVerified: true },
      create: {
        businessId: b.id,
        financial: b.healthScore,
        operationsHpp: b.healthScore + 2,
        marketing: b.healthScore - 4,
        hrTeam: b.healthScore,
        legal: 90,
        compositeScore: b.healthScore,
        isVerified: true,
      },
    });

    // 4. Default VDR Documents
    const countDocs = await prisma.dataRoomDocument.count({ where: { businessId: b.id } });
    if (countDocs === 0) {
      await prisma.dataRoomDocument.createMany({
        data: [
          {
            businessId: b.id,
            name: `NIB & Legalitas Usaha - ${b.brand}.pdf`,
            category: "Legalitas",
            size: "1.4 MB",
            isConfidential: false,
          },
          {
            businessId: b.id,
            name: `Sertifikat Halal & Uji Mutu - ${b.brand}.pdf`,
            category: "Legalitas",
            size: "2.1 MB",
            isConfidential: false,
          },
          {
            businessId: b.id,
            name: `Rekening Koran Bank 6 Bulan - ${b.brand}.pdf`,
            category: "Keuangan",
            size: "3.8 MB",
            isConfidential: true,
          },
        ],
      });
    }
  }

  // Also ensure Investor Hendro has initial access request for Kopi Senja as demo
  const invUser = await prisma.user.findFirst({ where: { email: "hendro@nusantaraventures.com" } });
  if (invUser) {
    const existingReq = await prisma.accessRequest.findFirst({
      where: {
        investorId: invUser.id,
        businessId: "biz-kopisenja-01",
      },
    });
    if (!existingReq) {
      await prisma.accessRequest.create({
        data: {
          investorId: invUser.id,
          businessId: "biz-kopisenja-01",
          proposedTicket: 250000000,
          investmentScheme: "REVENUE_SHARE",
          introMessage: "Tertarik membuka ruang data privat untuk verifikasi akhir penyaluran modal sindikasi.",
          status: "APPROVED", // Approved by default for Kopi Senja demo
        },
      });
    }

    // Default bookmark for Kopi Senja
    const existingWatch = await prisma.investorWatchlist.findUnique({
      where: {
        userId_businessId: {
          userId: invUser.id,
          businessId: "biz-kopisenja-01",
        },
      },
    });
    if (!existingWatch) {
      await prisma.investorWatchlist.create({
        data: {
          userId: invUser.id,
          businessId: "biz-kopisenja-01",
        },
      });
    }
  }

  console.log("✅ Marketplace businesses seeded successfully!");
}

seedMarketplace()
  .catch((e) => console.error("Error seeding marketplace:", e))
  .finally(() => prisma.$disconnect());
