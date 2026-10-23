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
        whatsapp: (biz as any).whatsapp || biz.user?.phone || "+62 812-3456-7890",
        instagram: (biz as any).instagram || "kopisenja.nusantara",
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat profil: " + err.message });
  }
});

/**
 * GET /api/umkm/products
 */
router.get("/products", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(404).json({ success: false, message: "Profil usaha belum ditemukan." });
    }
    const products = await (prisma as any).featuredProduct.findMany({
      where: { businessId: biz.id },
      orderBy: { createdAt: "desc" },
    });
    return res.json({
      success: true,
      data: products,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat produk: " + err.message });
  }
});

/**
 * POST /api/umkm/products
 */
router.post("/products", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(404).json({ success: false, message: "Profil usaha belum ditemukan." });
    }
    const { name, categoryBadge, price, grossMargin, monthlyVolume, description, imageUrl } = req.body;
    if (!name || !String(name).trim()) {
      return res.status(422).json({ success: false, message: "Nama produk wajib diisi." });
    }
    const product = await (prisma as any).featuredProduct.create({
      data: {
        businessId: biz.id,
        name: String(name).trim(),
        categoryBadge: categoryBadge || "Menu Andalan",
        price: Number(price) || 0,
        grossMargin: Number(grossMargin) || 45.0,
        monthlyVolume: Number(monthlyVolume) || 100,
        description: description ? String(description).trim() : null,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=350&auto=format&fit=crop&q=80",
      },
    });
    return res.status(201).json({
      success: true,
      message: "Produk unggulan berhasil ditambahkan ke database.",
      data: product,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal membuat produk: " + err.message });
  }
});

/**
 * DELETE /api/umkm/products/:id
 */
router.delete("/products/:id", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await (prisma as any).featuredProduct.delete({ where: { id } });
    return res.json({ success: true, message: "Produk berhasil dihapus dari database." });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menghapus produk: " + err.message });
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
      whatsapp,
      instagram,
      address,
    } = req.body;

    const resolvedOwner = ownerName || owner_name;
    const resolvedBrand = brand || name;
    const resolvedPhone = phone || whatsapp;
    const resolvedLocation = address
      ? `${String(address).trim()}, ${city || biz.city || 'Indonesia'}`
      : city
      ? `${String(city).trim()}, Indonesia`
      : undefined;

    const updated = await prisma.businessProfile.update({
      where: { id: biz.id },
      data: {
        ...(resolvedBrand ? { brand: String(resolvedBrand).trim(), name: String(resolvedBrand).trim() } : {}),
        ...(resolvedOwner ? { ownerName: String(resolvedOwner).trim() } : {}),
        ...(description ? { description: String(description).trim() } : {}),
        ...(pitchSummary || pitch_summary ? { description: String(pitchSummary || pitch_summary).trim() } : {}),
        ...(sector ? { sector: String(sector).trim() } : {}),
        ...(city ? { city: String(city).trim() } : {}),
        ...(resolvedLocation ? { location: resolvedLocation } : {}),
        ...(whatsapp ? { whatsapp: String(whatsapp).trim() } : {}),
        ...(instagram ? { instagram: String(instagram).trim() } : {}),
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

    if (biz.userId && (resolvedOwner || resolvedPhone)) {
      await prisma.user.update({
        where: { id: biz.userId },
        data: {
          ...(resolvedOwner ? { name: String(resolvedOwner).trim() } : {}),
          ...(resolvedPhone ? { phone: String(resolvedPhone).trim() } : {}),
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
router.get("/tasks", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
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
 * GET /api/umkm/milestones
 */
router.get("/milestones", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  return res.json({
    success: true,
    data: [
      { id: "m1", order: 1, title: "Fondasi Pencatatan & Legalitas", description: "Standardisasi rekening usaha, NIB, dan kartu stok" },
      { id: "m2", order: 2, title: "Efisiensi Biaya & HPP", description: "Negosiasi supplier bahan baku dan pengendalian efisiensi produksi" },
      { id: "m3", order: 3, title: "Validasi & Sertifikasi Investor", description: "3 bulan pelaporan bersih dan audit kesiapan pendanaan" },
    ],
  });
});

/**
 * POST /api/umkm/tasks
 * Menambah tugas rencana aksi baru ke database
 */
router.post("/tasks", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(404).json({ success: false, message: "Profil belum ditemukan." });
    }

    const {
      title,
      description,
      category,
      priority,
      dueDate,
      due_date,
      status,
      completed,
    } = req.body;

    if (!title || !String(title).trim()) {
      return res.status(422).json({ success: false, message: "Judul rencana aksi wajib diisi." });
    }

    const newTask = await prisma.actionPlanTask.create({
      data: {
        businessId: biz.id,
        title: String(title).trim(),
        description: description ? String(description).trim() : null,
        category: category || "Finansial",
        priority: priority || "Sedang",
        dueDate: dueDate || due_date || "30 Hari ke Depan",
        status: status || "TODO",
        completed: Boolean(completed) || false,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Rencana aksi berhasil ditambahkan ke database.",
      data: newTask,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal membuat tugas: " + err.message });
  }
});

/**
 * PATCH /api/umkm/tasks/:id/toggle
 * Toggle status penyelesaian tugas (menyelesaikan error 404 pada checkbox rencana aksi)
 */
router.patch("/tasks/:id/toggle", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    const { id } = req.params;
    const { completed, status } = req.body;

    let targetId = id;
    let existing = await prisma.actionPlanTask.findUnique({ where: { id: targetId } });

    // Fallback defensif jika ID frontend berupa indeks lokal (misal: 't-1', 't-4')
    if (!existing && biz && id.startsWith("t-")) {
      const allTasks = await prisma.actionPlanTask.findMany({
        where: { businessId: biz.id },
        orderBy: { createdAt: "asc" },
      });
      const idx = parseInt(id.replace("t-", "")) - 1;
      if (idx >= 0 && idx < allTasks.length) {
        targetId = allTasks[idx].id;
        existing = allTasks[idx];
      }
    }

    if (!existing) {
      return res.status(404).json({ success: false, message: "Tugas tidak ditemukan." });
    }

    const resolvedCompleted = completed !== undefined ? Boolean(completed) : !existing.completed;
    const resolvedStatus = status || (resolvedCompleted ? "DONE" : "TODO");

    const updated = await prisma.actionPlanTask.update({
      where: { id: targetId },
      data: {
        completed: resolvedCompleted,
        status: resolvedStatus,
      },
    });

    return res.json({
      success: true,
      message: "Status tugas berhasil diperbarui di database.",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui status tugas: " + err.message });
  }
});

/**
 * PUT /api/umkm/tasks/:id
 */
router.put("/tasks/:id", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    const { id } = req.params;
    const {
      title,
      description,
      completed,
      status,
      priority,
      dueDate,
      due_date,
      evidenceName,
      evidenceUrl,
      evidenceSize,
      notes,
      umkmNotes,
    } = req.body;

    let targetId = id;
    let existing = await prisma.actionPlanTask.findUnique({ where: { id: targetId } });

    if (!existing && biz && id.startsWith("t-")) {
      const allTasks = await prisma.actionPlanTask.findMany({
        where: { businessId: biz.id },
        orderBy: { createdAt: "asc" },
      });
      const idx = parseInt(id.replace("t-", "")) - 1;
      if (idx >= 0 && idx < allTasks.length) {
        targetId = allTasks[idx].id;
        existing = allTasks[idx];
      }
    }

    if (!existing) {
      return res.status(404).json({ success: false, message: "Tugas tidak ditemukan." });
    }

    const task = await prisma.actionPlanTask.update({
      where: { id: targetId },
      data: {
        ...(title ? { title: String(title).trim() } : {}),
        ...(description !== undefined ? { description: String(description).trim() } : {}),
        ...(completed !== undefined ? { completed: Boolean(completed) } : {}),
        ...(status ? { status: String(status) } : {}),
        ...(priority ? { priority: String(priority) } : {}),
        ...(dueDate || due_date ? { dueDate: String(dueDate || due_date) } : {}),
        ...(evidenceName ? { evidenceName: String(evidenceName) } : {}),
        ...(evidenceUrl ? { evidenceUrl: String(evidenceUrl) } : {}),
        ...(evidenceSize ? { evidenceSize: String(evidenceSize) } : {}),
        ...(notes || umkmNotes ? { umkmNotes: String(notes || umkmNotes).trim() } : {}),
      },
    });

    return res.json({
      success: true,
      message: "Tugas berhasil diperbarui di database.",
      data: task,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui tugas: " + err.message });
  }
});

/**
 * DELETE /api/umkm/tasks/:id
 */
router.delete("/tasks/:id", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.actionPlanTask.delete({ where: { id } });
    return res.json({ success: true, message: "Tugas berhasil dihapus dari database." });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menghapus tugas: " + err.message });
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
