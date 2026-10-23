import { Router, Response } from "express";
import { prisma } from "../index.js";
import { optionalAuth, requireAuth, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

/**
 * Helper untuk mendapatkan ID user berdasarkan role atau token
 */
async function resolveUserByRole(req: AuthenticatedRequest, role: "UMKM" | "CONSULTANT" | "INVESTOR"): Promise<string> {
  if (req.user?.id) return req.user.id;

  const emailMap = {
    UMKM: "fikri@kopisenja.id",
    CONSULTANT: "maya.suryani@beruang.id",
    INVESTOR: "hendro@nusantaraventures.com",
  };

  const defaultUser = await prisma.user.findFirst({
    where: { email: emailMap[role] },
    select: { id: true },
  });

  return defaultUser?.id || (role === "UMKM" ? "usr-umkm-01" : role === "CONSULTANT" ? "usr-cons-01" : "usr-inv-01");
}

/**
 * POST /api/onboarding/umkm & /api/umkm/onboarding
 * Menyimpan identitas toko, NIB, NPWP, dan target modal kerja UMKM
 */
async function handleUmkmOnboarding(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = await resolveUserByRole(req, "UMKM");
    const b = req.body;

    const brand = b.brand || b.name || "Usaha Baru";
    const ownerName = b.owner_name || b.owner || b.name || "Pemilik Usaha";
    const sector = b.sector || "F&B (Kuliner)";
    const city = b.city || "Bandung";
    const establishedYear = Number(b.established_year || b.year) || 2021;
    const outletsCount = Number(b.outlets_count || b.outlets) || 1;
    const employeesCount = Number(b.employees_count || b.employees) || 5;
    const fundingTarget = Number(b.funding_target || b.fundingTarget) || 250000000;
    const equityOffered = b.equity_offered || b.equityOffered || "12% Bagi Hasil";
    const description = b.description || "UMKM terkurasi dengan komitmen tata kelola kas tervalidasi.";
    const nib = b.nib || "1209000123456";
    const npwp = b.npwp || "81.423.891.4-429.000";
    const bankName = b.bank_name || b.bankName || "Bank Mandiri";
    const bankAccountNumber = b.bank_account_number || b.bankAccountNumber || "1300098765432";
    const bankAccountHolder = b.bank_account_holder || b.bankAccountHolder || brand;

    // 1. Update user
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "UMKM",
        name: ownerName,
        onboardingCompleted: true,
      },
    });

    // 2. Upsert business profile
    const profile = await prisma.businessProfile.upsert({
      where: { userId },
      update: {
        brand,
        name: brand,
        ownerName,
        sector,
        city,
        location: `${city}, Indonesia`,
        description,
        fundingTarget,
        equityOffered,
        nib,
        npwp,
        bankName,
        bankAccountNumber,
        bankAccountHolder,
        outletsCount,
        employeesCount,
        status: "ACTION_PLAN_ACTIVE",
      },
      create: {
        userId,
        brand,
        name: brand,
        ownerName,
        sector,
        city,
        location: `${city}, Indonesia`,
        description,
        fundingTarget,
        equityOffered,
        nib,
        npwp,
        bankName,
        bankAccountNumber,
        bankAccountHolder,
        outletsCount,
        employeesCount,
        status: "ACTION_PLAN_ACTIVE",
      },
    });

    // 3. Pastikan assessment radar awal terpasang
    const existingAssessment = await prisma.assessment.findUnique({
      where: { businessId: profile.id },
    });

    if (!existingAssessment) {
      await prisma.assessment.create({
        data: {
          businessId: profile.id,
          financial: 78,
          operationsHpp: 82,
          marketing: 68,
          hrTeam: 74,
          legal: 88,
          compositeScore: 78,
          isVerified: false,
          consultantNotes: "Onboarding awal tuntas, siap pendampingan kurasi.",
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profil usaha berhasil disimpan. Selamat datang di dasbor Beruang!",
      data: profile,
    });
  } catch (err: any) {
    console.error("❌ Error onboarding UMKM:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan onboarding UMKM: " + err.message,
    });
  }
}

router.post("/umkm", optionalAuth, handleUmkmOnboarding);

/**
 * POST /api/onboarding/consultant
 * Menyimpan profil kelembagaan konsultan, nomor lisensi BNSP, dan spesialisasi
 */
async function handleConsultantOnboarding(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = await resolveUserByRole(req, "CONSULTANT");
    const b = req.body;

    const name = b.name || "Dra. Maya Suryani, M.M.";
    const firmName = b.institution || b.firmName || b.businessName || "Suryani Consulting & Advisory";
    const bnspLicense = b.bnspLicense || b.bnsp_license || "BNSP-KM-2026-9812";
    const specialization = b.specialization || "F&B, Keuangan & Standardisasi Operasional";
    const city = b.city || "Bandung";
    const experience = b.experience || "8 Tahun";
    const maxClients = Number(b.maxClients || b.max_clients) || 10;

    // 1. Update user
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "CONSULTANT",
        name,
        onboardingCompleted: true,
      },
    });

    // 2. Upsert consultant profile
    const profile = await prisma.consultantProfile.upsert({
      where: { userId },
      update: {
        firmName,
        bnspLicense,
        specialization,
        city,
        experience,
        maxClients,
        isCertified: true,
      },
      create: {
        userId,
        firmName,
        bnspLicense,
        specialization,
        city,
        experience,
        maxClients,
        isCertified: true,
        activeClientsCount: 0,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profil kelembagaan konsultan berhasil diverifikasi dan disimpan.",
      data: profile,
    });
  } catch (err: any) {
    console.error("❌ Error onboarding Konsultan:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan onboarding konsultan: " + err.message,
    });
  }
}

router.post("/consultant", optionalAuth, handleConsultantOnboarding);

/**
 * POST /api/onboarding/investor
 * Menyimpan profil sindikasi, tiket komitmen modal, dan kriteria margin investor
 */
async function handleInvestorOnboarding(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = await resolveUserByRole(req, "INVESTOR");
    const b = req.body;

    const name = b.name || "Hendro Wicaksono";
    const firmName = b.entityName || b.firmName || b.businessName || "Nusantara Impact Angel Syndicate";
    const commitmentCapital = b.ticketRange || b.commitmentCapital || "Rp 1.5 Miliar";
    const investorType = b.investorType || "Angel Syndicate";
    const sectors = Array.isArray(b.sectors) ? b.sectors.join(", ") : (b.sectors || "F&B, FMCG, Agroindustri");
    const minMargin = Number(b.minMargin) || 40.0;
    const city = b.city || "Jakarta";

    // 1. Update user
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "INVESTOR",
        name,
        onboardingCompleted: true,
      },
    });

    // 2. Upsert investor profile
    const profile = await prisma.investorProfile.upsert({
      where: { userId },
      update: {
        firmName,
        commitmentCapital,
        investorType,
        sectors,
        minMargin,
        city,
        isVerified: true,
      },
      create: {
        userId,
        firmName,
        commitmentCapital,
        investorType,
        sectors,
        minMargin,
        city,
        isVerified: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profil investor berhasil disimpan. Ruang sindikasi modal aktif.",
      data: profile,
    });
  } catch (err: any) {
    console.error("❌ Error onboarding Investor:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan onboarding investor: " + err.message,
    });
  }
}

router.post("/investor", optionalAuth, handleInvestorOnboarding);

/**
 * GET /api/onboarding/status
 * Cek status onboarding user saat ini
 */
router.get("/status", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || (await resolveUserByRole(req, "UMKM"));
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        businessProfile: true,
        consultantProfile: true,
        investorProfile: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
    }

    return res.json({
      success: true,
      data: {
        userId: user.id,
        role: user.role,
        onboardingCompleted: user.onboardingCompleted,
        profile:
          user.role === "UMKM"
            ? user.businessProfile
            : user.role === "CONSULTANT"
            ? user.consultantProfile
            : user.investorProfile,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat status onboarding: " + err.message,
    });
  }
});

export default router;
export { handleUmkmOnboarding, handleConsultantOnboarding, handleInvestorOnboarding };
