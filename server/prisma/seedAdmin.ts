import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmin() {
  console.log("🌱 Seeding Admin data & pending assignment UMKM...");
  const passwordHash = await bcrypt.hash("password123", 10);

  // 1. Super Admin User
  await prisma.user.upsert({
    where: { email: "admin@beruang.id" },
    update: { role: "ADMIN", verified: true },
    create: {
      id: "usr-adm-01",
      name: "Super Admin Beruang",
      email: "admin@beruang.id",
      passwordHash,
      role: "ADMIN",
      phone: "081100001111",
      avatar: "",
      verified: true,
      onboardingCompleted: true,
    },
  });

  // 2. Extra Consultants (Bambang Sudarsono & Dr. Hendra Gunawan)
  const cons2 = await prisma.user.upsert({
    where: { email: "bambang.sudarsono@beruang.id" },
    update: {},
    create: {
      id: "usr-cons-02",
      name: "Bambang Sudarsono, S.E.",
      email: "bambang.sudarsono@beruang.id",
      passwordHash,
      role: "CONSULTANT",
      phone: "081299887766",
      avatar: "",
      verified: true,
      onboardingCompleted: true,
      consultantProfile: {
        create: {
          id: "cons-prof-02",
          firmName: "Sudarsono Supply Chain Advisory",
          specialization: "Agro & Rantai Pasok",
          bnspLicense: "BNSP-KM-2026-6142",
          city: "Surabaya",
          experience: "10 Tahun",
          maxClients: 8,
          isCertified: true,
          activeClientsCount: 5,
        },
      },
    },
  });

  const cons3 = await prisma.user.upsert({
    where: { email: "hendra.gunawan@beruang.id" },
    update: {},
    create: {
      id: "usr-cons-03",
      name: "Dr. Hendra Gunawan",
      email: "hendra.gunawan@beruang.id",
      passwordHash,
      role: "CONSULTANT",
      phone: "081344556677",
      avatar: "",
      verified: true,
      onboardingCompleted: true,
      consultantProfile: {
        create: {
          id: "cons-prof-03",
          firmName: "Gunawan Tax & Legal Partners",
          specialization: "Kepatuhan Pajak & Hukum",
          bnspLicense: "BNSP-KM-2026-3091",
          city: "Jakarta",
          experience: "12 Tahun",
          maxClients: 10,
          isCertified: true,
          activeClientsCount: 6,
        },
      },
    },
  });

  // 3. User & Business Warung Soto Banjar H. Kadir (Unassigned UMKM)
  const sotoUser = await prisma.user.upsert({
    where: { email: "kadir@sotobanjar.id" },
    update: {},
    create: {
      id: "usr-umkm-soto",
      name: "H. Kadir",
      email: "kadir@sotobanjar.id",
      passwordHash,
      role: "UMKM",
      phone: "081255667788",
      avatar: "",
      verified: true,
      onboardingCompleted: true,
    },
  });

  const sotoBiz = await prisma.businessProfile.upsert({
    where: { id: "biz-sotobanjar-01" },
    update: {
      consultantId: null, // Pending assignment!
      status: "PROFILE_COMPLETE",
    },
    create: {
      id: "biz-sotobanjar-01",
      userId: sotoUser.id,
      brand: "Warung Soto Banjar H. Kadir",
      name: "Warung Soto Banjar H. Kadir",
      ownerName: "H. Kadir",
      sector: "Kuliner (F&B)",
      location: "Banjarmasin, Kalimantan Selatan",
      city: "Banjarmasin",
      description: "Kuliner soto banjar khas rempah tradisional dengan omzet stabil ~Rp 45.000.000/bln, menargetkan pembukaan gerai kedua dan sertifikasi higienis halal.",
      fundingTarget: 120000000,
      equityOffered: "15% Bagi Hasil",
      status: "PROFILE_COMPLETE",
      consultantId: null, // Pending assignment!
      outletsCount: 1,
      employeesCount: 6,
    },
  });

  // Assessment awal Soto Banjar
  await prisma.assessment.upsert({
    where: { businessId: sotoBiz.id },
    update: {},
    create: {
      businessId: sotoBiz.id,
      financial: 72,
      operationsHpp: 75,
      marketing: 65,
      hrTeam: 70,
      legal: 78,
      compositeScore: 72,
      isVerified: false,
    },
  });

  // 4. Riwayat Penugasan Sebelumnya
  const mayaProfile = await prisma.consultantProfile.findFirst({
    where: { firmName: { contains: "Suryani" } },
  });

  if (mayaProfile) {
    const kopiBiz = await prisma.businessProfile.findFirst({ where: { brand: { contains: "Kopi Senja" } } });
    if (kopiBiz) {
      const existingAssign = await prisma.consultantAssignment.findFirst({
        where: { businessId: kopiBiz.id, consultantId: mayaProfile.id },
      });
      if (!existingAssign) {
        await prisma.consultantAssignment.create({
          data: {
            businessId: kopiBiz.id,
            consultantId: mayaProfile.id,
            slaDays: 7,
            notes: "Fokus pada pendampingan standardisasi SOP barista dan audit HPP kopi susu.",
            assignedAt: new Date(Date.now() - 30 * 24 * 3600 * 1000),
          },
        });
      }
    }
  }

  console.log("✅ Admin data & pending assignment UMKM seeded successfully!");
}

seedAdmin()
  .catch((e) => console.error("Error seeding admin:", e))
  .finally(() => prisma.$disconnect());
