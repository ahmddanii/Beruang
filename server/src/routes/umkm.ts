import { Router, Response } from "express";
import { prisma } from "../index.js";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth.js";
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
router.get("/profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
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
        ownerName: biz.user?.name || "Fikri Ramadhan",
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
        consultantName: "Maya Safitri, SE, M.Ak",
        nextMentoring: biz.nextMentoring,
        nib: biz.nib,
        npwp: biz.npwp,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat profil: " + err.message });
  }
});

/**
 * PUT /api/umkm/profile
 */
router.put("/profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(404).json({ success: false, message: "Profil usaha tidak ditemukan." });
    }

    const { name, brand, description, pitchSummary, pitch_summary, sector, city, fundingTarget, funding_target } = req.body;
    const updated = await prisma.businessProfile.update({
      where: { id: biz.id },
      data: {
        ...(name ? { name: String(name).trim() } : {}),
        ...(brand ? { brand: String(brand).trim() } : {}),
        ...(description ? { description: String(description).trim() } : {}),
        ...(pitchSummary || pitch_summary ? { description: String(pitchSummary || pitch_summary).trim() } : {}),
        ...(sector ? { sector: String(sector).trim() } : {}),
        ...(city ? { city: String(city).trim() } : {}),
        ...(fundingTarget || funding_target ? { fundingTarget: parseFloat(fundingTarget || funding_target) } : {}),
      },
    });

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

export default router;
