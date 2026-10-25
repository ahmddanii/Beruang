import { Router, Response } from "express";
import { prisma } from "../index.js";
import { optionalAuth, requireAuth, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

/**
 * Helper untuk mendapatkan ID user terotentikasi
 */
async function resolveUserByRole(req: AuthenticatedRequest): Promise<string> {
  if (req.user?.id) return req.user.id;
  throw new Error("UNAUTHORIZED");
}

/**
 * POST /api/onboarding/umkm & /api/umkm/onboarding
 * Menyimpan identitas toko, NIB, NPWP, dan target modal kerja UMKM
 */
async function handleUmkmOnboarding(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Sesi otentikasi tidak ditemukan atau telah kedaluwarsa. Silakan masuk kembali.",
      });
    }

    const userId = req.user.id;
    const b = req.body;

    const brand = b.brand || b.name || "Usaha Baru";
    const ownerName = b.owner_name || b.owner || b.name || req.user.name || "Pemilik Usaha";
    const sector = b.sector || "F&B (Kuliner)";
    const city = b.city || "Bandung";
    const establishedYear = Number(b.established_year || b.year) || new Date().getFullYear();
    const outletsCount = Number(b.outlets_count || b.outlets) || 1;
    const employeesCount = Number(b.employees_count || b.employees) || 1;
    const fundingTarget = Number(b.funding_target || b.fundingTarget) || 0;
    const equityOffered = b.equity_offered || b.equityOffered || "";
    const description = b.description ? String(b.description).trim() : "";
    const nib = b.nib ? String(b.nib).trim() : null;
    const npwp = b.npwp ? String(b.npwp).trim() : null;
    const bankName = b.bank_name || b.bankName || null;
    const bankAccountNumber = b.bank_account_number || b.bankAccountNumber || null;
    const bankAccountHolder = b.bank_account_holder || b.bankAccountHolder || brand;

    const consultantId = b.consultant_id || b.consultantId || null;

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
        consultantId: consultantId || undefined,
        status: consultantId ? "CONSULTANT_ASSIGNED" : "ACTION_PLAN_ACTIVE",
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
        consultantId: consultantId || undefined,
        status: consultantId ? "CONSULTANT_ASSIGNED" : "ACTION_PLAN_ACTIVE",
      },
    });

    // 3. Jika konsultan dipilih, buat relasi assignment dan increment klien aktif
    if (consultantId) {
      const existingAssignment = await prisma.consultantAssignment.findFirst({
        where: { businessId: profile.id, consultantId },
      });

      if (!existingAssignment) {
        await prisma.consultantAssignment.create({
          data: {
            consultantId,
            businessId: profile.id,
            slaDays: 7,
            notes: `Pendampingan bisnis dimulai resmi pasca-onboarding oleh ${ownerName}.`,
          },
        });

        await prisma.consultantProfile.update({
          where: { id: consultantId },
          data: { activeClientsCount: { increment: 1 } },
        }).catch(() => {});
      }
    }

    // 4. Pastikan assessment radar awal terpasang
    const existingAssessment = await prisma.assessment.findUnique({
      where: { businessId: profile.id },
    });

    if (!existingAssessment) {
      await prisma.assessment.create({
        data: {
          businessId: profile.id,
          financial: 55,
          operationsHpp: 50,
          marketing: 45,
          hrTeam: 50,
          legal: 60,
          compositeScore: 52,
          isVerified: false,
          consultantNotes: "Asesmen baseline awal tokomu. Jadwalkan audit 5 aspek bersama konsultan pembimbing untuk memperkuat kesiapan modal usahamu.",
        },
      });
    }

    // 5. Buat 3 langkah rencana aksi (Action Plan) awal untuk UMKM baru
    const tasksCount = await prisma.actionPlanTask.count({
      where: { businessId: profile.id },
    });

    if (tasksCount === 0) {
      await prisma.actionPlanTask.createMany({
        data: [
          {
            businessId: profile.id,
            title: "Lengkapi Profil Usaha & Unggah Foto Toko",
            category: "Tata Kelola",
            dueDate: "3 Hari ke Depan",
            status: "TODO",
            completed: false,
            consultantFeedback: "Profil usaha yang lengkap memperkuat kepercayaan investor.",
          },
          {
            businessId: profile.id,
            title: "Catat Pemasukan & Pengeluaran Kas Pertama",
            category: "Finansial",
            dueDate: "Minggu Ini",
            status: "TODO",
            completed: false,
            consultantFeedback: "Mulai biasakan mencatat seluruh uang masuk dan modal bahan harian.",
          },
          {
            businessId: profile.id,
            title: "Jadwalkan Sesi Perdana Bersama Konsultan Pendamping",
            category: "Pendampingan",
            dueDate: "1 Minggu ke Depan",
            status: "TODO",
            completed: false,
            consultantFeedback: "Konsultasikan target efisiensi HPP dan standarisasi kesiapan tokomu.",
          },
        ],
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

router.post("/umkm", requireAuth, handleUmkmOnboarding);

/**
 * POST /api/onboarding/consultant
 * Menyimpan profil kelembagaan konsultan, nomor lisensi BNSP, dan spesialisasi
 */
async function handleConsultantOnboarding(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Sesi otentikasi tidak ditemukan atau telah kedaluwarsa. Silakan masuk kembali.",
      });
    }

    const userId = req.user.id;
    const b = req.body;

    const name = b.name || req.user.name || "Dra. Maya Suryani, M.M.";
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

router.post("/consultant", requireAuth, handleConsultantOnboarding);

/**
 * POST /api/onboarding/investor
 * Menyimpan profil sindikasi, tiket komitmen modal, dan kriteria margin investor
 */
async function handleInvestorOnboarding(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Sesi otentikasi tidak ditemukan atau telah kedaluwarsa. Silakan masuk kembali.",
      });
    }

    const userId = req.user.id;
    const b = req.body;

    const name = b.name || req.user.name || "Hendro Wicaksono";
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

router.post("/investor", requireAuth, handleInvestorOnboarding);

/**
 * GET /api/onboarding/status
 * Cek status onboarding user saat ini
 */
router.get("/status", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
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
