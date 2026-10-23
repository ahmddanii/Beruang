import { Router, Response } from "express";
import { prisma } from "../index.js";
import { optionalAuth, requireAuth, AuthenticatedRequest } from "../middleware/auth.js";
import { uploadAvatar } from "../middleware/upload.js";

const router = Router();

async function resolveBusiness(req: AuthenticatedRequest) {
  if (req.user?.businessId) {
    const b = await prisma.businessProfile.findUnique({
      where: { id: req.user.businessId },
      include: { user: true, assessment: true, tasks: true },
    });
    if (b) return b;
  }
  if (req.user?.id) {
    const b = await prisma.businessProfile.findUnique({
      where: { userId: req.user.id },
      include: { user: true, assessment: true, tasks: true },
    });
    if (b) return b;
  }
  // Fallback demo
  return prisma.businessProfile.findFirst({
    include: { user: true, assessment: true, tasks: true },
  });
}

/**
 * GET /api/umkm/profile
 */
router.get("/profile", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(404).json({ success: false, message: "Profil usaha belum ditemukan." });
    }

    return res.json({
      success: true,
      data: {
        id: biz.id,
        name: biz.name,
        brand: biz.brand,
        ownerName: biz.ownerName || biz.user?.name || "Fikri Setiawan",
        ownerAvatarUrl: biz.user?.avatar || "",
        sector: biz.sector,
        city: biz.city,
        location: biz.location,
        establishedYear: 2021,
        outletsCount: biz.outletsCount,
        employeesCount: biz.employeesCount,
        fundingTarget: biz.fundingTarget,
        equityOffered: biz.equityOffered,
        description: biz.description,
        pitchSummary: biz.description,
        status: biz.status,
        consultantName: "Dra. Maya Suryani, M.M.",
        nextMentoring: biz.nextMentoring,
        nib: biz.nib,
        npwp: biz.npwp,
        bankName: biz.bankName,
        bankAccountNumber: biz.bankAccountNumber,
        bankAccountHolder: biz.bankAccountHolder,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat profil: " + err.message });
  }
});

/**
 * PUT /api/umkm/profile
 */
router.put("/profile", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(404).json({ success: false, message: "Profil usaha tidak ditemukan." });
    }

    const {
      name,
      brand,
      ownerName,
      owner_name,
      description,
      pitchSummary,
      pitch_summary,
      sector,
      city,
      fundingTarget,
      funding_target,
      equityOffered,
      equity_offered,
      nib,
      npwp,
      bankName,
      bank_name,
      bankAccountNumber,
      bank_account_number,
      bankAccountHolder,
      bank_account_holder,
      outletsCount,
      outlets_count,
      employeesCount,
      employees_count,
      phone,
    } = req.body;

    const resolvedOwner = ownerName || owner_name;
    const resolvedBrand = brand || name;

    const updated = await prisma.businessProfile.update({
      where: { id: biz.id },
      data: {
        ...(resolvedBrand ? { brand: String(resolvedBrand).trim(), name: String(resolvedBrand).trim() } : {}),
        ...(resolvedOwner ? { ownerName: String(resolvedOwner).trim() } : {}),
        ...(description ? { description: String(description).trim() } : {}),
        ...(pitchSummary || pitch_summary ? { description: String(pitchSummary || pitch_summary).trim() } : {}),
        ...(sector ? { sector: String(sector).trim() } : {}),
        ...(city ? { city: String(city).trim(), location: `${String(city).trim()}, Indonesia` } : {}),
        ...(fundingTarget != null ? { fundingTarget: parseFloat(fundingTarget) } : funding_target != null ? { fundingTarget: parseFloat(funding_target) } : {}),
        ...(equityOffered || equity_offered ? { equityOffered: String(equityOffered || equity_offered).trim() } : {}),
        ...(nib ? { nib: String(nib).trim() } : {}),
        ...(npwp ? { npwp: String(npwp).trim() } : {}),
        ...(bankName || bank_name ? { bankName: String(bankName || bank_name).trim() } : {}),
        ...(bankAccountNumber || bank_account_number ? { bankAccountNumber: String(bankAccountNumber || bank_account_number).trim() } : {}),
        ...(bankAccountHolder || bank_account_holder ? { bankAccountHolder: String(bankAccountHolder || bank_account_holder).trim() } : {}),
        ...(outletsCount != null ? { outletsCount: Number(outletsCount) } : outlets_count != null ? { outletsCount: Number(outlets_count) } : {}),
        ...(employeesCount != null ? { employeesCount: Number(employeesCount) } : employees_count != null ? { employeesCount: Number(employees_count) } : {}),
      },
    });

    if (biz.userId && (resolvedOwner || phone)) {
      await prisma.user.update({
        where: { id: biz.userId },
        data: {
          ...(resolvedOwner ? { name: String(resolvedOwner).trim() } : {}),
          ...(phone ? { phone: String(phone).trim() } : {}),
        },
      });
    }

    return res.json({
      success: true,
      message: "Profil UMKM berhasil diperbarui.",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui profil: " + err.message });
  }
});

/**
 * POST /api/umkm/profile/avatar
 */
router.post(
  "/profile/avatar",
  requireAuth,
  uploadAvatar.single("avatar"),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      let avatarUrl = req.body.avatarUrl || req.body.avatar_url;

      if (req.file) {
        avatarUrl = `/uploads/avatars/${req.file.filename}`;
      }

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { avatar: avatarUrl || "" },
        });
      }

      return res.json({
        success: true,
        message: "Foto profil berhasil diperbarui.",
        data: { avatarUrl },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: "Gagal memperbarui foto profil: " + err.message });
    }
  }
);

/**
 * POST /api/umkm/profile/banner
 */
router.post(
  "/profile/banner",
  requireAuth,
  uploadAvatar.single("banner"),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      let bannerUrl = req.body.bannerUrl || req.body.banner_url;
      if (req.file) {
        bannerUrl = `/uploads/avatars/${req.file.filename}`;
      }

      return res.json({
        success: true,
        message: "Sampul profil berhasil diperbarui.",
        data: { bannerUrl },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: "Gagal memperbarui banner: " + err.message });
    }
  }
);

/**
 * GET /api/umkm/assessment
 */
router.get("/assessment", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(404).json({ success: false, message: "Profil belum ditemukan." });
    }

    const assessment = await prisma.assessment.findUnique({
      where: { businessId: biz.id },
    });

    const data = assessment || {
      financial: 78,
      operationsHpp: 85,
      marketing: 64,
      hrTeam: 75,
      legal: 92,
      compositeScore: 79,
    };

    return res.json({
      success: true,
      data: {
        compositeScore: data.compositeScore,
        aspects: [
          { id: "fin", name: "Kesehatan Finansial & Kas", score: data.financial, maxScore: 100, targetScore: 85 },
          { id: "ops", name: "Operasional & Kontrol HPP", score: data.operationsHpp, maxScore: 100, targetScore: 80 },
          { id: "mkt", name: "Pemasaran & Penjualan", score: data.marketing, maxScore: 100, targetScore: 75 },
          { id: "hr", name: "Tim & Tata Kelola", score: data.hrTeam, maxScore: 100, targetScore: 80 },
          { id: "leg", name: "Legalitas & Kepatuhan", score: data.legal, maxScore: 100, targetScore: 90 },
        ],
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat assessment: " + err.message });
  }
});

/**
 * GET /api/umkm/tasks
 */
router.get("/tasks", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(404).json({ success: false, message: "Profil belum ditemukan." });
    }

    const tasks = await prisma.actionPlanTask.findMany({
      where: { businessId: biz.id },
      orderBy: { createdAt: "asc" },
    });

    return res.json({
      success: true,
      data: tasks,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat tugas rencana aksi: " + err.message });
  }
});

/**
 * PUT /api/umkm/tasks/:id
 */
router.put("/tasks/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { completed, status, evidenceName, evidenceUrl } = req.body;

    const task = await prisma.actionPlanTask.update({
      where: { id },
      data: {
        ...(completed !== undefined ? { completed: Boolean(completed) } : {}),
        ...(status ? { status: String(status) } : {}),
        ...(evidenceName ? { evidenceName: String(evidenceName) } : {}),
        ...(evidenceUrl ? { evidenceUrl: String(evidenceUrl) } : {}),
      },
    });

    return res.json({
      success: true,
      message: "Tugas berhasil diperbarui.",
      data: task,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui tugas: " + err.message });
  }
});

/**
 * GET /api/umkm/investor-requests
 */
router.get("/investor-requests", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(404).json({ success: false, message: "Profil belum ditemukan." });
    }

    const requests = await prisma.accessRequest.findMany({
      where: { businessId: biz.id },
      include: { investor: true },
      orderBy: { requestedAt: "desc" },
    });

    return res.json({
      success: true,
      data: requests.map((r) => ({
        id: r.id,
        investorId: r.investorId,
        investorName: r.investor.name,
        firmName: "Nusantara Impact Angel Syndicate",
        avatar: r.investor.avatar,
        requestedAt: r.requestedAt.toISOString().split("T")[0],
        status: r.status,
        proposedTicket: r.proposedTicket,
        introMessage: r.introMessage || "Tertarik mendanai ekspansi outlet kopi.",
      })),
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat permintaan investor: " + err.message });
  }
});

/**
 * PUT /api/umkm/investor-requests/:id/respond
 */
router.put("/investor-requests/:id/respond", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.accessRequest.update({
      where: { id },
      data: {
        status: status === "APPROVED" ? "APPROVED" : "REJECTED",
        respondedAt: new Date(),
      },
    });

    return res.json({
      success: true,
      message: `Permintaan akses berhasil di-${status === "APPROVED" ? "setujui" : "tolak"}.`,
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui status permintaan: " + err.message });
  }
});

/**
 * GET /api/umkm/agreements & /api/umkm/agreement
 * Melihat perjanjian kemitraan pendampingan aktif UMKM
 */
router.get("/agreements", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(404).json({ success: false, message: "Profil usaha belum ditemukan." });
    }

    const agreements = await prisma.consultantAgreement.findMany({
      where: { businessId: biz.id },
      include: {
        consultant: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      data: agreements.map((a) => ({
        id: a.id,
        agreementCode: a.agreementCode,
        requestId: a.requestId,
        businessId: a.businessId,
        consultantName: a.consultantSignerName || a.consultant?.user?.name || "Dra. Maya Suryani, M.M.",
        consultantFirm: a.consultant?.firmName || "Maya Advisory Partner",
        monthlyFee: a.monthlyFee,
        durationMonths: a.durationMonths,
        targetFunding: a.targetFunding,
        status: a.status,
        consultantSignedAt: a.consultantSignedAt,
        consultantSignature: a.consultantSignature,
        umkmSignedAt: a.umkmSignedAt,
        umkmSignerName: a.umkmSignerName,
        umkmSignature: a.umkmSignature,
        createdAt: a.createdAt,
      })),
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat perjanjian: " + err.message });
  }
});

router.get("/agreement", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    const agreement = await prisma.consultantAgreement.findFirst({
      where: biz ? { businessId: biz.id } : {},
      include: {
        consultant: {
          include: { user: true },
        },
        business: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!agreement) {
      return res.status(404).json({ success: false, message: "Belum ada perjanjian pendampingan aktif." });
    }

    return res.json({
      success: true,
      data: {
        id: agreement.id,
        agreementCode: agreement.agreementCode,
        requestId: agreement.requestId,
        businessId: agreement.businessId,
        businessName: agreement.business.brand || agreement.business.name,
        consultantName: agreement.consultantSignerName || agreement.consultant?.user?.name || "Dra. Maya Suryani, M.M.",
        consultantFirm: agreement.consultant?.firmName || "Maya Advisory Partner",
        monthlyFee: agreement.monthlyFee,
        durationMonths: agreement.durationMonths,
        targetFunding: agreement.targetFunding,
        status: agreement.status,
        consultantSignedAt: agreement.consultantSignedAt,
        consultantSignature: agreement.consultantSignature,
        umkmSignedAt: agreement.umkmSignedAt,
        umkmSignerName: agreement.umkmSignerName,
        umkmSignature: agreement.umkmSignature,
        createdAt: agreement.createdAt,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat perjanjian: " + err.message });
  }
});

/**
 * POST /api/umkm/agreements/:id/sign
 * UMKM menandatangani perjanjian kemitraan secara digital
 */
router.post("/agreements/:id/sign", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { umkmSignature, umkmSignMode, umkmSignerName } = req.body;

    const agreement = await prisma.consultantAgreement.findFirst({
      where: {
        OR: [{ id }, { agreementCode: id }],
      },
    });

    if (!agreement) {
      return res.status(404).json({ success: false, message: "Perjanjian tidak ditemukan." });
    }

    const updated = await prisma.consultantAgreement.update({
      where: { id: agreement.id },
      data: {
        status: "ACTIVE",
        umkmSignedAt: new Date(),
        umkmSignature: umkmSignature || agreement.umkmSignature,
        umkmSignMode: umkmSignMode || "draw",
        umkmSignerName: umkmSignerName || "Fikri Setiawan",
      },
    });

    return res.json({
      success: true,
      message: "Perjanjian kemitraan resmi disetujui dan ditandatangani oleh UMKM. Status pembinaan kini AKTIF.",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menandatangani perjanjian: " + err.message });
  }
});

export default router;
