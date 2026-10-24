import { Router, Response } from "express";
import { prisma } from "../index.js";
import { optionalAuth, requireAuth, AuthenticatedRequest } from "../middleware/auth.js";
import { uploadAvatar } from "../middleware/upload.js";

const router = Router();

async function resolveBusiness(req: AuthenticatedRequest) {
  if (req.user?.businessId) {
    const b = await prisma.businessProfile.findUnique({
      where: { id: req.user.businessId },
      include: { user: true, assessment: true, tasks: true, consultant: { include: { user: true } } },
    });
    if (b) return b;
  }
  if (req.user?.id) {
    let b = await prisma.businessProfile.findUnique({
      where: { userId: req.user.id },
      include: { user: true, assessment: true, tasks: true, consultant: { include: { user: true } } },
    });
    if (!b && (req.user.role === "UMKM" || !req.user.role)) {
      b = await prisma.businessProfile.create({
        data: {
          userId: req.user.id,
          brand: req.user.name ? `Usaha ${req.user.name}` : "Usaha Saya",
          name: req.user.name ? `Usaha ${req.user.name}` : "Usaha Saya",
          status: "DRAFT",
          outletsCount: 1,
          employeesCount: 1,
          fundingTarget: 0,
        },
        include: { user: true, assessment: true, tasks: true, consultant: { include: { user: true } } },
      });
    }
    if (b) return b;
  }
  // Fallback demo HANYA untuk Fikri demo akun
  if (req.user?.email === "fikri@kopisenja.id") {
    return prisma.businessProfile.findFirst({
      where: { brand: "Kopi Senja Nusantara" },
      include: { user: true, assessment: true, tasks: true, consultant: { include: { user: true } } },
    });
  }
  return null;
}

/**
 * GET /api/umkm/profile
 */
router.get("/profile", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.status(200).json({
        success: false,
        needsOnboarding: true,
        message: "Profil usaha belum dibuat. Silakan selesaikan onboarding terlebih dahulu.",
        data: null,
      });
    }

    const consultantName = biz.consultant?.user?.name || biz.consultant?.firmName || (biz.consultantId ? "Konsultan Pendamping" : "Belum Ditugaskan");

    return res.json({
      success: true,
      data: {
        id: biz.id,
        name: biz.name,
        brand: biz.brand,
        ownerName: biz.ownerName || biz.user?.name || "Pemilik Usaha",
        ownerAvatarUrl: biz.user?.avatar || "",
        sector: biz.sector || "",
        city: biz.city || "",
        location: biz.location || "",
        establishedYear: (biz as any).establishedYear ?? (biz as any).established_year ?? null,
        outletsCount: biz.outletsCount ?? 1,
        employeesCount: biz.employeesCount ?? 1,
        fundingTarget: biz.fundingTarget ?? 0,
        equityOffered: biz.equityOffered || "",
        description: biz.description || "",
        pitchSummary: biz.description || "",
        status: biz.status,
        consultantId: biz.consultantId,
        consultantName,
        nextMentoring: biz.nextMentoring || "",
        nib: biz.nib || "",
        npwp: biz.npwp || "",
        bankName: biz.bankName || "",
        bankAccountNumber: biz.bankAccountNumber || "",
        bankAccountHolder: biz.bankAccountHolder || "",
        whatsapp: (biz as any).whatsapp || biz.user?.phone || "",
        instagram: (biz as any).instagram || "",
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
        ...(description !== undefined ? { description: String(description).trim() } : pitchSummary || pitch_summary ? { description: String(pitchSummary || pitch_summary).trim() } : {}),
        ...(sector ? { sector: String(sector).trim() } : {}),
        ...(city ? { city: String(city).trim() } : {}),
        ...(resolvedLocation ? { location: resolvedLocation } : {}),
        ...(whatsapp !== undefined ? { whatsapp: String(whatsapp).trim() } : {}),
        ...(instagram !== undefined ? { instagram: String(instagram).trim() } : {}),
        ...(fundingTarget != null ? { fundingTarget: parseFloat(fundingTarget) } : funding_target != null ? { fundingTarget: parseFloat(funding_target) } : {}),
        ...(equityOffered || equity_offered ? { equityOffered: String(equityOffered || equity_offered).trim() } : {}),
        ...(nib !== undefined ? { nib: String(nib).trim() } : {}),
        ...(npwp !== undefined ? { npwp: String(npwp).trim() } : {}),
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
router.get("/assessment", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    const assessment = biz
      ? await prisma.assessment.findUnique({
        where: { businessId: biz.id },
      })
      : null;

    if (!assessment) {
      return res.json({
        success: true,
        data: {
          hasAssessment: false,
          compositeScore: 0,
          isVerified: false,
          aspects: [
            { id: "fin", name: "Keuangan & Pergerakan Uang", score: 0, maxScore: 100, targetScore: 85, description: "Pemisahan rekening pribadi dengan kas toko dan disiplin pencatatan transaksi" },
            { id: "ops", name: "Operasional & Standar Kerja", score: 0, maxScore: 100, targetScore: 80, description: "Kerapian stok bahan baku, resep standar penyajian, dan efisiensi sisa bahan" },
            { id: "mkt", name: "Pasar & Pemasaran", score: 0, maxScore: 100, targetScore: 75, description: "Jumlah pelanggan setia, frekuensi pesanan berulang, dan penjualan langsung" },
            { id: "leg", name: "Legalitas & Izin Usaha", score: 0, maxScore: 100, targetScore: 90, description: "Kelengkapan dokumen resmi NIB OSS RBA, NPWP toko, dan sertifikat halal" },
            { id: "gov", name: "Tim & Pembagian Tugas", score: 0, maxScore: 100, targetScore: 80, description: "Kejelasan peran tim, jadwal shift kerja, dan evaluasi hasil tim" },
          ],
        },
      });
    }

    return res.json({
      success: true,
      data: {
        hasAssessment: true,
        compositeScore: assessment.compositeScore,
        isVerified: assessment.isVerified,
        aspects: [
          { id: "fin", name: "Keuangan & Pergerakan Uang", score: assessment.financial, maxScore: 100, targetScore: 85, description: "Pemisahan rekening pribadi dengan kas toko dan disiplin pencatatan transaksi" },
          { id: "ops", name: "Operasional & Standar Kerja", score: assessment.operationsHpp, maxScore: 100, targetScore: 80, description: "Kerapian stok bahan baku, resep standar penyajian, dan efisiensi sisa bahan" },
          { id: "mkt", name: "Pasar & Pemasaran", score: assessment.marketing, maxScore: 100, targetScore: 75, description: "Jumlah pelanggan setia, frekuensi pesanan berulang, dan penjualan langsung" },
          { id: "leg", name: "Legalitas & Izin Usaha", score: assessment.legal, maxScore: 100, targetScore: 90, description: "Kelengkapan dokumen resmi NIB OSS RBA, NPWP toko, dan sertifikat halal" },
          { id: "gov", name: "Tim & Pembagian Tugas", score: assessment.hrTeam, maxScore: 100, targetScore: 80, description: "Kejelasan peran tim, jadwal shift kerja, dan evaluasi hasil tim" },
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
      return res.json({ success: true, data: [] });
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
 * GET /api/umkm/funding-gate
 * Mengambil status verifikasi 4 syarat gerbang kesiapan modal (Funding Gate) secara riil
 */
router.get("/funding-gate", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const isDemo = req.user?.email === "fikri@kopisenja.id";
    const biz = await resolveBusiness(req);

    // 1. Jika belum ada profil bisnis atau guest yang bukan demo
    if (!biz && !isDemo) {
      return res.json({
        success: true,
        data: {
          passedCount: 0,
          totalCount: 4,
          isReadyForFunding: false,
          status: "IN_PROGRESS",
          certifiedAt: null,
          consultantName: "Belum Ditugaskan",
          fundingTarget: 0,
          pendingRequestsCount: 0,
          criteria: [
            {
              id: "fundamental_score",
              title: "Skor Fundamental ≥ 75 Poin",
              description: "Skor agregat 5 aspek (Finansial, Operasional, Pasar, Legalitas, dan Tata Kelola) telah mencapai ambang batas kelulusan minimal 75.",
              passed: false,
              currentValue: 0,
              targetValue: 75,
              statusLabel: "Capaian: 0/100 (Belum Melakukan Asesmen)",
            },
            {
              id: "cash_consistency",
              title: "Konsistensi Pelaporan Kas ≥ 3 Bulan",
              description: "Telah mencatat dan memverifikasi laporan pergerakan uang toko secara rutin minimal 3 bulan tanpa anomali kritis.",
              passed: false,
              currentValue: 0,
              targetValue: 3,
              statusLabel: "0 Bulan Tervalidasi (Minimal 3 Bulan)",
            },
            {
              id: "legal_compliance",
              title: "Kelengkapan Legalitas Dasar",
              description: "Nomor Induk Berusaha (NIB) berbasis risiko terdaftar dan sertifikat perizinan aktif.",
              passed: false,
              currentValue: "-",
              targetValue: "NIB Aktif",
              statusLabel: "NIB Belum Diisi / Belum Terbit",
            },
            {
              id: "consultant_recommendation",
              title: "Rekomendasi Konsultan Pendamping",
              description: "Persetujuan resmi dari konsultan bahwa tokomu siap dihubungkan dengan sindikasi modal investor.",
              passed: false,
              currentValue: "Belum Ada",
              targetValue: "Disetujui Konsultan",
              statusLabel: "Belum Memiliki Konsultan Pendamping",
            },
          ],
        },
      });
    }

    // 2. Jika akun demo Kopi Senja Fikri Setiawan
    if (isDemo || biz?.brand === "Kopi Senja Nusantara") {
      return res.json({
        success: true,
        data: {
          passedCount: 4,
          totalCount: 4,
          isReadyForFunding: true,
          status: "READY_FOR_FUNDING",
          certifiedAt: "18 September 2026",
          consultantName: "Dra. Maya Suryani, M.M.",
          fundingTarget: 250000000,
          pendingRequestsCount: 2,
          criteria: [
            {
              id: "fundamental_score",
              title: "Skor Fundamental ≥ 75 Poin",
              description: "Skor agregat 5 aspek (Finansial, Operasional, Pasar, Legalitas, dan Tata Kelola) telah mencapai ambang batas kelulusan minimal 75.",
              passed: true,
              currentValue: 82,
              targetValue: 75,
              statusLabel: "Capaian: 82/100 (Lolos)",
            },
            {
              id: "cash_consistency",
              title: "Konsistensi Pelaporan Kas ≥ 3 Bulan",
              description: "Telah mencatat dan memverifikasi laporan pergerakan uang toko secara rutin minimal 3 bulan tanpa anomali kritis.",
              passed: true,
              currentValue: 5,
              targetValue: 3,
              statusLabel: "5 Bulan Berturut Tervalidasi (Lolos)",
            },
            {
              id: "legal_compliance",
              title: "Kelengkapan Legalitas Dasar",
              description: "Nomor Induk Berusaha (NIB) berbasis risiko terdaftar dan sertifikat perizinan aktif.",
              passed: true,
              currentValue: "1209000123456",
              targetValue: "NIB Aktif",
              statusLabel: "NIB & Sertifikat Halal Terbit (Lolos)",
            },
            {
              id: "consultant_recommendation",
              title: "Rekomendasi Konsultan Pendamping",
              description: "Persetujuan resmi dari konsultan bahwa tokomu siap dihubungkan dengan sindikasi modal investor.",
              passed: true,
              currentValue: "Dra. Maya Suryani, M.M.",
              targetValue: "Disetujui Konsultan",
              statusLabel: "Disetujui oleh Dra. Maya Suryani (Lolos)",
            },
          ],
        },
      });
    }

    // 3. Evaluasi Riil dari Database untuk UMKM Pengguna Baru / Riil
    const businessId = biz!.id;

    // Kriteria 1: Skor Fundamental ≥ 75
    const assessment = await prisma.assessment.findUnique({
      where: { businessId },
    });
    const compositeScore = assessment?.compositeScore ?? 0;
    const isScoreVerified = Boolean(assessment?.isVerified);
    const isScorePassed = compositeScore >= 75 && isScoreVerified;

    // Kriteria 2: Konsistensi Pelaporan Kas ≥ 3 Bulan (status: VERIFIED)
    const verifiedMonthsCount = await prisma.monthlyReport.count({
      where: {
        businessId,
        status: { in: ["VERIFIED", "verified"] },
      },
    });
    const isCashPassed = verifiedMonthsCount >= 3;

    // Kriteria 3: Kelengkapan Legalitas Dasar (NIB minimal 8 digit)
    const nibValue = biz!.nib?.trim() || "";
    const isLegalPassed = nibValue.length >= 8;

    // Kriteria 4: Rekomendasi Konsultan Pendamping (punya konsultan & status READY_FOR_FUNDING)
    const consultantName = biz!.consultant?.user?.name || biz!.consultant?.firmName || "Konsultan Pendamping";
    const hasConsultant = Boolean(biz!.consultantId);
    const isReadyStatus = (biz as any).fundingStatus === "READY_FOR_FUNDING" || biz!.status === "READY_FOR_FUNDING";
    const isConsultantPassed = hasConsultant && isReadyStatus;

    // Permintaan Investor Menunggu
    const pendingRequestsCount = await prisma.accessRequest.count({
      where: {
        businessId,
        status: "PENDING",
      },
    });

    const criteria = [
      {
        id: "fundamental_score",
        title: "Skor Fundamental ≥ 75 Poin",
        description: "Skor agregat 5 aspek (Finansial, Operasional, Pasar, Legalitas, dan Tata Kelola) telah mencapai ambang batas kelulusan minimal 75.",
        passed: isScorePassed,
        currentValue: compositeScore,
        targetValue: 75,
        statusLabel: isScorePassed
          ? `Capaian: ${compositeScore}/100 (Lolos)`
          : compositeScore > 0
          ? `Capaian: ${compositeScore}/100 (${!isScoreVerified ? "Menunggu Audit Konsultan" : "Belum Memenuhi"})`
          : "Capaian: 0/100 (Belum Melakukan Asesmen)",
      },
      {
        id: "cash_consistency",
        title: "Konsistensi Pelaporan Kas ≥ 3 Bulan",
        description: "Telah mencatat dan memverifikasi laporan pergerakan uang toko secara rutin minimal 3 bulan tanpa anomali kritis.",
        passed: isCashPassed,
        currentValue: verifiedMonthsCount,
        targetValue: 3,
        statusLabel: isCashPassed
          ? `${verifiedMonthsCount} Bulan Tervalidasi (Lolos)`
          : `${verifiedMonthsCount} Bulan Tervalidasi (Minimal 3 Bulan)`,
      },
      {
        id: "legal_compliance",
        title: "Kelengkapan Legalitas Dasar",
        description: "Nomor Induk Berusaha (NIB) berbasis risiko terdaftar dan sertifikat perizinan aktif.",
        passed: isLegalPassed,
        currentValue: nibValue || "-",
        targetValue: "NIB Aktif",
        statusLabel: isLegalPassed
          ? `NIB Terdaftar (${nibValue}) (Lolos)`
          : "NIB Belum Diisi / Belum Lengkap",
      },
      {
        id: "consultant_recommendation",
        title: "Rekomendasi Konsultan Pendamping",
        description: "Persetujuan resmi dari konsultan bahwa tokomu siap dihubungkan dengan sindikasi modal investor.",
        passed: isConsultantPassed,
        currentValue: hasConsultant ? consultantName : "Belum Ada",
        targetValue: "Disetujui Konsultan",
        statusLabel: isConsultantPassed
          ? `Disetujui oleh ${consultantName} (Lolos)`
          : hasConsultant
          ? "Menunggu Validasi Konsultan Pendamping"
          : "Belum Memiliki Konsultan Pendamping",
      },
    ];

    const passedCount = criteria.filter((c) => c.passed).length;
    const isReadyForFunding = passedCount === 4;

    return res.json({
      success: true,
      data: {
        passedCount,
        totalCount: 4,
        isReadyForFunding,
        status: isReadyForFunding ? "READY_FOR_FUNDING" : "IN_PROGRESS",
        certifiedAt: isReadyForFunding ? biz!.updatedAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null,
        consultantName: hasConsultant ? consultantName : "Belum Ditugaskan",
        fundingTarget: biz!.fundingTarget || 0,
        pendingRequestsCount,
        criteria,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal mengevaluasi funding gate: " + err.message });
  }
});

/**
 * GET /api/umkm/investor-requests
 */
router.get("/investor-requests", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const biz = await resolveBusiness(req);
    if (!biz) {
      return res.json({ success: true, data: [] });
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
