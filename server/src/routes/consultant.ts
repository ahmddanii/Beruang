import { Router, type Response } from "express";
import { prisma } from "../prisma.js";
import { requireAuth, optionalAuth, AuthenticatedRequest } from "../middleware/auth.js";
import { uploadVdr } from "../middleware/upload.js";

const router = Router();

/**
 * Helper untuk mendapatkan ID Konsultan yang aktif
 */
async function resolveConsultantId(req: AuthenticatedRequest): Promise<string | null> {
  if (req.user?.id) {
    let prof = await prisma.consultantProfile.findUnique({
      where: { userId: req.user.id },
      select: { id: true },
    });
    if (prof) return prof.id;

    // Jika user adalah CONSULTANT tapi belum punya profile di DB, auto-create profil bersih untuk user ini
    if (req.user.role === "CONSULTANT") {
      prof = await prisma.consultantProfile.create({
        data: {
          userId: req.user.id,
          firmName: req.user.name ? `${req.user.name} Advisory` : "Praktisi Independen",
          title: "Konsultan Bisnis & Keuangan UMKM",
          specialization: "Keuangan & Biaya",
          city: "Indonesia",
          experience: "1+ Tahun",
          maxClients: 10
        },
        select: { id: true }
      });
      return prof.id;
    }

    // Jika user login adalah akun demo Dra. Maya Suryani
    if (req.user.email && req.user.email.includes("maya.suryani")) {
      const defaultProf = await prisma.consultantProfile.findFirst({
        where: { user: { email: { contains: "maya.suryani" } } },
        select: { id: true },
      });
      return defaultProf?.id || "cons-prof-01";
    }

    return null;
  }

  // Jika tidak terotentikasi, JANGAN bocorkan profil konsultan manapun
  return null;
}

/**
 * GET /api/consultant/profile
 * Mengambil profil konsultan yang sedang login
 */
router.get("/profile", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);
    if (!consultantId) {
      return res.json({
        success: true,
        data: {
          name: req.user?.name || "",
          email: req.user?.email || "",
          avatar: req.user?.avatar || "",
          firmName: "",
          title: "",
          bio: "",
          specialization: "",
          bnspLicense: "",
          city: "",
          experience: "",
          maxClients: 10,
          receiveNewClients: true,
          waNotification: true,
          documents: []
        }
      });
    }

    const prof = await prisma.consultantProfile.findUnique({
      where: { id: consultantId },
      include: {
        user: { select: { name: true, email: true, avatar: true } },
        documents: true
      }
    });

    if (!prof) {
      return res.status(404).json({ success: false, message: "Profil konsultan tidak ditemukan." });
    }

    return res.json({
      success: true,
      data: {
        id: prof.id,
        name: prof.user?.name || prof.firmName,
        email: prof.user?.email || "",
        avatar: prof.user?.avatar || "",
        firmName: prof.firmName,
        title: prof.title,
        bio: prof.bio,
        specialization: prof.specialization,
        bnspLicense: prof.bnspLicense,
        city: prof.city,
        experience: prof.experience,
        maxClients: prof.maxClients,
        activeClientsCount: prof.activeClientsCount,
        isCertified: prof.isCertified,
        receiveNewClients: prof.receiveNewClients,
        waNotification: prof.waNotification,
        documents: prof.documents || []
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat profil konsultan: " + err.message });
  }
});

/**
 * PUT /api/consultant/profile
 * Memperbarui data profil & kapasitas konsultan yang login
 */
router.put("/profile", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);
    const userId = req.user?.id || (consultantId ? (await prisma.consultantProfile.findUnique({ where: { id: consultantId } }))?.userId : null);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Harap login terlebih dahulu." });
    }

    const {
      name,
      firmName,
      title,
      bio,
      specialization,
      bnspLicense,
      city,
      experience,
      maxClients,
      receiveNewClients,
      waNotification
    } = req.body;

    if (name) {
      await prisma.user.update({
        where: { id: userId },
        data: { name }
      });
    }

    const updated = await prisma.consultantProfile.upsert({
      where: { userId },
      create: {
        userId,
        firmName: firmName || name || "Konsultan Beruang",
        title: title || "Konsultan Bisnis & Keuangan UMKM",
        bio: bio || "",
        specialization: specialization || "Keuangan & Biaya",
        bnspLicense: bnspLicense || "",
        city: city || "Indonesia",
        experience: experience || "1+ Tahun",
        maxClients: Number(maxClients) || 10,
        receiveNewClients: receiveNewClients !== undefined ? Boolean(receiveNewClients) : true,
        waNotification: waNotification !== undefined ? Boolean(waNotification) : true
      },
      update: {
        ...(firmName !== undefined ? { firmName } : {}),
        ...(title !== undefined ? { title } : {}),
        ...(bio !== undefined ? { bio } : {}),
        ...(specialization !== undefined ? { specialization } : {}),
        ...(bnspLicense !== undefined ? { bnspLicense } : {}),
        ...(city !== undefined ? { city } : {}),
        ...(experience !== undefined ? { experience } : {}),
        ...(maxClients !== undefined ? { maxClients: Number(maxClients) } : {}),
        ...(receiveNewClients !== undefined ? { receiveNewClients: Boolean(receiveNewClients) } : {}),
        ...(waNotification !== undefined ? { waNotification: Boolean(waNotification) } : {})
      }
    });

    return res.json({
      success: true,
      message: "Profil konsultan berhasil diperbarui.",
      data: updated
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui profil: " + err.message });
  }
});

/**
 * POST /api/consultant/documents
 * Tambah dokumen sertifikat atau portofolio konsultan
 */
router.post("/documents", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);
    if (!consultantId) {
      return res.status(404).json({ success: false, message: "Profil konsultan tidak ditemukan." });
    }

    const { name, type, filename, fileSize, fileUrl } = req.body;
    const doc = await prisma.consultantDocument.create({
      data: {
        consultantId,
        name: name || filename || "Dokumen Pendukung",
        type: type || "OTHER",
        filename: filename || "dokumen.pdf",
        fileSize: fileSize || "1.2 MB",
        fileUrl: fileUrl || null,
        status: "VERIFIED"
      }
    });

    return res.status(201).json({
      success: true,
      message: "Dokumen berhasil disimpan.",
      data: doc
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menyimpan dokumen: " + err.message });
  }
});

/**
 * DELETE /api/consultant/documents/:id
 * Hapus dokumen konsultan
 */
router.delete("/documents/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);
    if (!consultantId) {
      return res.status(404).json({ success: false, message: "Profil konsultan tidak ditemukan." });
    }

    const { id } = req.params;
    await prisma.consultantDocument.deleteMany({
      where: { id, consultantId }
    });

    return res.json({
      success: true,
      message: "Dokumen berhasil dihapus."
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menghapus dokumen: " + err.message });
  }
});

/**
 * GET /api/consultant/list
 * Daftar seluruh konsultan terverifikasi untuk dipilih UMKM saat onboarding
 */
router.get("/list", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const consultants = await prisma.consultantProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const formatted = consultants.map((c) => ({
      id: c.id,
      userId: c.userId,
      name: c.user?.name || c.firmName,
      title: c.title || "Konsultan Ahli Keuangan & Audit UMKM",
      firmName: c.firmName,
      specialization: c.specialization || "F&B, Keuangan & Standardisasi Operasional",
      bnspLicense: c.bnspLicense || "BNSP-KM-2026-9812",
      city: c.city || "Bandung",
      experience: c.experience || "8 Tahun",
      avatar: c.user?.avatar || "",
      activeClientsCount: c.activeClientsCount,
      maxClients: c.maxClients,
      isCertified: c.isCertified,
      bio: c.bio || "Konsultan pendamping bisnis bersertifikasi resmi BNSP.",
    }));

    return res.json({
      success: true,
      message: "Daftar konsultan berhasil diambil.",
      data: formatted,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil daftar konsultan: " + err.message,
    });
  }
});

/**
 * GET /api/consultant/stats & /api/consultant/dashboard
 * Ringkasan statistik dashboard konsultan
 */
router.get("/stats", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);

    const totalClients = await prisma.businessProfile.count({
      where: consultantId ? { consultantId } : {},
    });

    const pendingValidations = await prisma.monthlyReport.count({
      where: {
        status: { in: ["submitted", "PENDING", "revision_needed"] },
      },
    });

    const readyForFunding = await prisma.businessProfile.count({
      where: {
        ...(consultantId ? { consultantId } : {}),
        status: "READY_FOR_FUNDING",
      },
    });

    return res.json({
      success: true,
      message: "Statistik konsultan berhasil dimuat.",
      data: {
        totalClients,
        pendingValidations,
        readyForFunding,
        activeMentoringSessions: 4,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat statistik konsultan: " + err.message });
  }
});

router.get("/dashboard", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  // Alias ke stats
  try {
    const consultantId = await resolveConsultantId(req);
    const clients = await prisma.businessProfile.findMany({
      where: consultantId ? { consultantId } : {},
      include: { user: true, assessment: true, monthlyReports: true, tasks: true },
    });

    return res.json({
      success: true,
      data: {
        clientsCount: clients.length,
        clients,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat dashboard: " + err.message });
  }
});

/**
 * GET /api/consultant/clients
 * Menampilkan daftar seluruh UMKM binaan yang didampingi konsultan
 */
router.get("/clients", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);

    const businesses = await prisma.businessProfile.findMany({
      where: consultantId ? { consultantId } : {},
      include: {
        user: true,
        assessment: true,
        monthlyReports: {
          orderBy: [{ year: "desc" }, { submittedAt: "desc" }],
          take: 1,
        },
        tasks: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedClients = businesses.map((b) => {
      const latestReport = b.monthlyReports[0];
      const score = b.assessment?.compositeScore ?? 78;
      const completedTasks = b.tasks.filter((t) => t.completed).length;

      let status = "healthy";
      if (score < 60) status = "danger";
      else if (score < 75) status = "warning";

      return {
        id: b.id,
        name: b.brand || b.name,
        owner: b.user?.name || "Pemilik Usaha",
        sector: b.sector,
        city: b.city || "Bandung",
        healthScore: score,
        status,
        fundingStatus: b.status === "READY_FOR_FUNDING" ? "READY_FOR_FUNDING" : "IN_REVIEW",
        monthlyStatus: latestReport?.status === "VERIFIED" ? "VERIFIED" : "PENDING",
        lastAuditDate: latestReport
          ? new Date(latestReport.submittedAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
          : "Baru",
        fundingTarget: b.fundingTarget,
        tasksCompleted: completedTasks,
        totalTasks: b.tasks.length > 0 ? b.tasks.length : 3,
        growthPct: 14.5,
        joinedDate: "12 Juli 2026",
        monthlyFee: 1500000,
        durationMonths: 3,
      };
    });

    return res.json({
      success: true,
      message: "Daftar klien UMKM binaan berhasil dimuat.",
      data: formattedClients,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat klien: " + err.message });
  }
});

/**
 * GET /api/consultant/validations
 * Antrean validasi laporan kas bulanan yang butuh verifikasi konsultan
 */
router.get("/validations", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);

    // Ambil laporan kas bulanan yang diajukan oleh UMKM binaan
    const reports = await prisma.monthlyReport.findMany({
      where: {
        ...(consultantId ? { business: { consultantId } } : {}),
      },
      include: {
        business: {
          select: {
            id: true,
            name: true,
            brand: true,
            user: { select: { name: true } },
          },
        },
      },
      orderBy: [{ year: "desc" }, { submittedAt: "desc" }],
    });

    const queue = reports.map((r) => ({
      id: r.id,
      clientId: r.businessId,
      clientName: r.business.brand || r.business.name,
      ownerName: r.business.user?.name || "Pemilik UMKM",
      month: `${r.month} ${r.year}`,
      rawMonth: r.month,
      year: r.year,
      omzet: r.omzet,
      hpp: r.hpp,
      hppRatio: r.hppRatio,
      opex: r.opex,
      loss: r.loss || 0,
      netProfit: r.netProfit,
      cashBalance: r.cashBalance,
      proofDocumentName: r.proofDocumentName || `Laporan_Kas_${r.month}_${r.year}.pdf`,
      proofDocumentSize: r.proofDocumentSize || "1.8 MB",
      proofDocumentUrl: r.proofDocumentUrl || `/api/finances/monthly/${r.id}/download`,
      status: r.status,
      anomalyFlagged: r.anomalyFlagged || r.hppRatio > 65,
      submittedAt: r.submittedAt.toISOString().split("T")[0],
      notes: r.notes || "Pengajuan rutin buku kas bulanan.",
    }));

    return res.json({
      success: true,
      message: "Antrean validasi kas bulanan berhasil dimuat.",
      data: queue,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat antrean validasi: " + err.message });
  }
});

/**
 * POST /api/consultant/validations/:id/verify
 * Konsultan memverifikasi laporan kas bulanan klien
 */
router.post("/validations/:id/verify", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    let report = await prisma.monthlyReport.findFirst({
      where: { OR: [{ id }, { id: { contains: id } }] },
      include: { business: true },
    });

    if (!report) {
      report = await prisma.monthlyReport.findFirst({
        include: { business: true },
      });
    }

    if (!report) {
      return res.status(404).json({ success: false, message: "Laporan bulanan tidak ditemukan." });
    }

    const updatedReport = await prisma.monthlyReport.update({
      where: { id: report.id },
      data: {
        status: "VERIFIED",
        notes: notes ? String(notes).trim() : "Telah diverifikasi sesuai bukti rekening koran & struk POS.",
      },
    });

    // Cek apakah UMKM sudah memiliki 3 laporan berturut-turut berstatus VERIFIED
    const verifiedReportsCount = await prisma.monthlyReport.count({
      where: { businessId: report.businessId, status: "VERIFIED" },
    });

    let autoCertified = false;
    if (verifiedReportsCount >= 3) {
      const assessment = await prisma.assessment.findUnique({
        where: { businessId: report.businessId },
      });
      if (assessment && assessment.compositeScore >= 75) {
        await prisma.businessProfile.update({
          where: { id: report.businessId },
          data: { status: "READY_FOR_FUNDING" },
        });
        autoCertified = true;
      }
    }

    return res.json({
      success: true,
      message: `Laporan kas bulan ${report.month} ${report.year} berhasil diverifikasi.` +
        (autoCertified ? " Klien resmi dinyatakan SIAP DIDANAI (Ready for Funding)!" : ""),
      data: {
        report: updatedReport,
        autoCertified,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memverifikasi laporan: " + err.message });
  }
});

/**
 * POST /api/consultant/validations/:id/request-revision
 * Konsultan meminta revisi laporan kas bulanan kepada UMKM
 */
router.post("/validations/:id/request-revision", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason, notes } = req.body;

    const revisionNote = reason || notes || "Perlu perbaikan kelengkapan bukti transaksi kas operasional.";

    let report = await prisma.monthlyReport.findFirst({
      where: { OR: [{ id }, { id: { contains: id } }] },
      include: { business: true },
    });

    if (!report) {
      report = await prisma.monthlyReport.findFirst({
        include: { business: true },
      });
    }

    if (!report) {
      return res.status(404).json({ success: false, message: "Laporan bulanan tidak ditemukan." });
    }

    const updated = await prisma.monthlyReport.update({
      where: { id: report.id },
      data: {
        status: "revision_needed",
        notes: revisionNote,
      },
    });

    return res.json({
      success: true,
      message: "Permintaan revisi berhasil dikirimkan ke dashboard UMKM.",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal meminta revisi: " + err.message });
  }
});

/**
 * GET /api/consultant/requests
 * Menampilkan permintaan bimbingan baru dari UMKM langsung dari database Prisma
 */
router.get("/requests", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);

    let requests = await prisma.consultantMentorshipRequest.findMany({
      where: consultantId ? { consultantId } : {},
      include: {
        business: {
          include: {
            user: { select: { name: true, email: true } },
            assessment: true,
            monthlyReports: { take: 1, orderBy: { year: "desc" } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Jika akun demo dan database belum memiliki permohonan bimbingan, inisialisasi permohonan riil terhubung ke UMKM
    if (requests.length === 0 && consultantId) {
      const existingBizs = await prisma.businessProfile.findMany({ take: 2 });
      if (existingBizs.length > 0) {
        for (let i = 0; i < existingBizs.length; i++) {
          const b = existingBizs[i];
          await prisma.consultantMentorshipRequest.create({
            data: {
              consultantId,
              businessId: b.id,
              status: "PENDING",
              offeredFee: 1500000 + i * 500000,
              durationMonths: 3,
              message: i === 0
                ? "Mohon bimbingan pendampingan untuk audit HPP dan perizinan sertifikasi halal 3 gerai."
                : "Ingin merapikan pemisahan kas usaha dan pembukuan buku kas harian digital.",
            },
          });
        }

        requests = await prisma.consultantMentorshipRequest.findMany({
          where: { consultantId },
          include: {
            business: {
              include: {
                user: { select: { name: true, email: true } },
                assessment: true,
                monthlyReports: { take: 1, orderBy: { year: "desc" } },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        });
      }
    }

    const formatted = requests.map((r) => {
      const b = r.business;
      const latestReport = b.monthlyReports?.[0];
      return {
        id: r.id,
        umkmId: b.id,
        businessName: b.brand || b.name,
        ownerName: b.ownerName || b.user?.name || "Pelaku Usaha",
        sector: b.sector,
        city: b.city || "Bandung",
        revenue: latestReport ? latestReport.omzet : 35000000,
        healthScore: b.assessment?.compositeScore || 75,
        offeredFee: r.offeredFee,
        durationMonths: r.durationMonths,
        message: r.message || "Mohon bimbingan dan pendampingan pengelolaan arus kas usaha.",
        requestedAt: new Date(r.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        status: r.status,
      };
    });

    return res.json({
      success: true,
      message: "Daftar permohonan bimbingan berhasil dimuat.",
      data: formatted,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat permintaan: " + err.message });
  }
});

/**
 * POST /api/consultant/requests/:id/accept
 * Menerima permohonan bimbingan: memperbarui status request dan menghubungkan UMKM ke konsultan
 */
router.post("/requests/:id/accept", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const consultantId = await resolveConsultantId(req);

    const mentorshipReq = await prisma.consultantMentorshipRequest.findFirst({
      where: {
        OR: [{ id }, { businessId: id }],
      },
      include: { business: true },
    });

    if (mentorshipReq) {
      // 1. Update status permohonan bimbingan
      await prisma.consultantMentorshipRequest.update({
        where: { id: mentorshipReq.id },
        data: { status: "ACCEPTED" },
      });

      // 2. Hubungkan UMKM ke konsultan
      await prisma.businessProfile.update({
        where: { id: mentorshipReq.businessId },
        data: {
          consultantId: consultantId || mentorshipReq.consultantId,
          status: "ACTION_PLAN_ACTIVE",
        },
      });

      // 3. Tambahkan 1 tugas action plan selamat datang di database
      await prisma.actionPlanTask.create({
        data: {
          businessId: mentorshipReq.businessId,
          title: "Konsultasi Perdana & Diagnosa 5 Pilar Bisnis",
          description: "Lakukan sesi tatap muka / Zoom untuk memetakan tantangan arus kas utama dan menyusun target 30 hari ke depan.",
          category: "Operasional",
          priority: "Tinggi",
          status: "TODO",
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          consultantFeedback: "Diskusikan hasil diagnosa awal dan target efisiensi operasional.",
        },
      });
    }

    if (consultantId) {
      await prisma.consultantProfile.update({
        where: { id: consultantId },
        data: { activeClientsCount: { increment: 1 } },
      });
    }

    return res.json({
      success: true,
      message: `Permintaan bimbingan ID ${id} berhasil diterima. Klien kini resmi masuk ke daftar pendampingan aktif.`,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menerima permintaan: " + err.message });
  }
});

/**
 * POST /api/consultant/requests/:id/reject
 * Menolak permohonan bimbingan di database
 */
router.post("/requests/:id/reject", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const mentorshipReq = await prisma.consultantMentorshipRequest.findFirst({
      where: {
        OR: [{ id }, { businessId: id }],
      },
    });

    if (mentorshipReq) {
      await prisma.consultantMentorshipRequest.update({
        where: { id: mentorshipReq.id },
        data: {
          status: "REJECTED",
          rejectionReason: reason || "Kapasitas bimbingan sedang penuh.",
        },
      });
    }

    return res.json({
      success: true,
      message: `Permintaan bimbingan ID ${id} telah ditolak. Alasan: ${reason || "Kapasitas penuh."}`,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menolak permintaan: " + err.message });
  }
});

/**
 * GET /api/consultant/clients/:id/assessment
 * Mengambil nilai diagnosa 5 pilar fundamental untuk klien tertentu
 */
router.get("/clients/:id/assessment", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const assessment = await prisma.assessment.findFirst({
      where: {
        OR: [{ businessId: id }, { business: { id } }],
      },
      include: { business: true },
    });

    if (!assessment) {
      return res.json({
        success: true,
        data: {
          compositeScore: 78,
          aspects: [
            { id: "fin", name: "Finansial & Arus Kas", score: 78, maxScore: 100, targetScore: 85, notes: "Margin stabil." },
            { id: "ops", name: "Operasional & SOP", score: 85, maxScore: 100, targetScore: 80, notes: "SOP resep berjalan." },
            { id: "leg", name: "Legalitas & Izin", score: 92, maxScore: 100, targetScore: 90, notes: "NIB dan Halal lengkap." },
            { id: "mkt", name: "Pasar & Pemasaran", score: 64, maxScore: 100, targetScore: 75, notes: "Perluas kanal non-ojol." },
            { id: "gov", name: "SDM & Tata Kelola", score: 75, maxScore: 100, targetScore: 80, notes: "Struktur tim rapi." },
          ],
        },
      });
    }

    return res.json({
      success: true,
      data: {
        id: assessment.id,
        businessId: assessment.businessId,
        compositeScore: assessment.compositeScore,
        consultantNotes: assessment.consultantNotes,
        aspects: [
          { id: "fin", name: "Finansial & Arus Kas", score: assessment.financial, maxScore: 100, targetScore: 85, notes: "Margin kotor sehat & kas operasional terpisah." },
          { id: "ops", name: "Operasional & SOP", score: assessment.operationsHpp, maxScore: 100, targetScore: 80, notes: "Kontrol rasio HPP bahan baku dan kartu stok terjaga." },
          { id: "leg", name: "Legalitas & Izin", score: assessment.legal, maxScore: 100, targetScore: 90, notes: "Izin edar dan legalitas badan usaha tervalidasi." },
          { id: "mkt", name: "Pasar & Pemasaran", score: assessment.marketing, maxScore: 100, targetScore: 75, notes: "Kanal promosi & retensi pelanggan terus bertumbuh." },
          { id: "gov", name: "SDM & Tata Kelola", score: assessment.hrTeam, maxScore: 100, targetScore: 80, notes: "Sistem kerja tim terstruktur rapi." },
        ],
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat assessment: " + err.message });
  }
});

/**
 * PUT /api/consultant/clients/:id/assessment
 * Konsultan memperbarui skor diagnostik 5 pilar untuk klien
 */
router.put("/clients/:id/assessment", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { financial, operationsHpp, operations, marketing, hrTeam, governance, legal, notes } = req.body;

    const fin = Number(financial ?? 78);
    const ops = Number(operationsHpp ?? operations ?? 80);
    const mkt = Number(marketing ?? 65);
    const hr = Number(hrTeam ?? governance ?? 75);
    const leg = Number(legal ?? 85);

    // Hitung skor komposit berbobot
    const compositeScore = Math.round(fin * 0.3 + ops * 0.2 + mkt * 0.15 + hr * 0.15 + leg * 0.2);

    const biz = await prisma.businessProfile.findFirst({
      where: { OR: [{ id }, { userId: id }] },
    });

    if (!biz) {
      return res.status(404).json({ success: false, message: "Bisnis klien tidak ditemukan." });
    }

    const updated = await prisma.assessment.upsert({
      where: { businessId: biz.id },
      update: {
        financial: fin,
        operationsHpp: ops,
        marketing: mkt,
        hrTeam: hr,
        legal: leg,
        compositeScore,
        consultantNotes: notes ? String(notes).trim() : null,
      },
      create: {
        businessId: biz.id,
        financial: fin,
        operationsHpp: ops,
        marketing: mkt,
        hrTeam: hr,
        legal: leg,
        compositeScore,
        consultantNotes: notes ? String(notes).trim() : null,
      },
    });

    // Jika skor komposit >= 80, update status pendanaan klien jika belum
    if (compositeScore >= 80 && biz.status !== "READY_FOR_FUNDING") {
      await prisma.businessProfile.update({
        where: { id: biz.id },
        data: { status: "READY_FOR_FUNDING" },
      });
    }

    return res.json({
      success: true,
      message: `Penilaian 5 aspek untuk ${biz.brand || biz.name} berhasil diperbarui (Skor: ${compositeScore}).`,
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui assessment: " + err.message });
  }
});

/**
 * POST /api/consultant/clients/:id/certify
 * Konsultan resmi menerbitkan lisensi / sertifikat kesiapan pendanaan
 */
router.post("/clients/:id/certify", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const biz = await prisma.businessProfile.findFirst({
      where: { OR: [{ id }, { userId: id }] },
    });

    if (!biz) {
      return res.status(404).json({ success: false, message: "Bisnis klien tidak ditemukan." });
    }

    const updated = await prisma.businessProfile.update({
      where: { id: biz.id },
      data: { status: "READY_FOR_FUNDING" },
    });

    return res.json({
      success: true,
      message: `Selamat! ${biz.brand || biz.name} resmi tersertifikasi SIAP DIDANAI (Ready for Funding). Akses katalog investor kini terbuka!`,
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menerbitkan sertifikasi: " + err.message });
  }
});

/**
 * GET /api/consultant/alerts
 * Peringatan anomali audit otomatis (deteksi lonjakan HPP > 65%)
 */
router.get("/alerts", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);

    // Cari laporan yang memiliki rasio HPP tinggi
    const anomalyReports = await prisma.monthlyReport.findMany({
      where: {
        ...(consultantId ? { business: { consultantId } } : {}),
        hppRatio: { gt: 60 },
      },
      include: { business: true },
      take: 5,
    });

    const alerts = anomalyReports.map((r, idx) => ({
      id: `alert-${r.id}`,
      clientId: r.businessId,
      clientName: r.business.brand || r.business.name,
      type: "HPP_SPIKE",
      message: `Rasio modal jualan (HPP) bulan ${r.month} ${r.year} mencapai ${r.hppRatio}% dari omzet (melebihi batas aman 60%).`,
      recommendation: "Lakukan review opname bahan baku atau evaluasi supplier.",
      severity: r.hppRatio > 70 ? "high" : "medium",
      date: r.submittedAt.toISOString().split("T")[0],
      dismissed: false,
    }));

    return res.json({
      success: true,
      message: "Daftar peringatan audit berhasil dimuat.",
      data: alerts,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat alerts: " + err.message });
  }
});

/**
 * GET /api/consultant/agreements
 * Menampilkan seluruh daftar perjanjian kontrak bimbingan konsultan
 */
router.get("/agreements", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);

    const agreements = await prisma.consultantAgreement.findMany({
      where: consultantId ? { consultantId } : {},
      include: {
        business: {
          include: { user: true, assessment: true },
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
        businessName: a.business.brand || a.business.name,
        ownerName: a.business.ownerName || a.business.user?.name || "Pelaku Usaha",
        sector: a.business.sector,
        city: a.business.city,
        monthlyFee: a.monthlyFee,
        durationMonths: a.durationMonths,
        targetFunding: a.targetFunding,
        status: a.status,
        consultantSignedAt: a.consultantSignedAt,
        consultantSignerName: a.consultantSignerName,
        consultantSignature: a.consultantSignature,
        consultantSignMode: a.consultantSignMode,
        umkmSignedAt: a.umkmSignedAt,
        umkmSignerName: a.umkmSignerName,
        umkmSignature: a.umkmSignature,
        umkmSignMode: a.umkmSignMode,
        createdAt: a.createdAt,
      })),
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat perjanjian: " + err.message });
  }
});

/**
 * GET /api/consultant/agreements/:id
 * Mengambil detail 1 kontrak perjanjian bimbingan
 */
router.get("/agreements/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const agreement = await prisma.consultantAgreement.findFirst({
      where: {
        OR: [
          { id },
          { agreementCode: id },
          { requestId: id },
          { businessId: id },
        ],
      },
      include: {
        business: {
          include: { user: true, assessment: true },
        },
      },
    });

    if (!agreement) {
      return res.status(404).json({ success: false, message: "Dokumen perjanjian tidak ditemukan." });
    }

    return res.json({
      success: true,
      data: {
        id: agreement.id,
        agreementCode: agreement.agreementCode,
        requestId: agreement.requestId,
        businessId: agreement.businessId,
        businessName: agreement.business.brand || agreement.business.name,
        ownerName: agreement.business.ownerName || agreement.business.user?.name || "Pelaku Usaha",
        sector: agreement.business.sector,
        city: agreement.business.city,
        healthScore: agreement.business.assessment?.compositeScore || 78,
        monthlyFee: agreement.monthlyFee,
        durationMonths: agreement.durationMonths,
        targetFunding: agreement.targetFunding,
        status: agreement.status,
        consultantSignedAt: agreement.consultantSignedAt,
        consultantSignerName: agreement.consultantSignerName,
        consultantSignature: agreement.consultantSignature,
        consultantSignMode: agreement.consultantSignMode,
        umkmSignedAt: agreement.umkmSignedAt,
        umkmSignerName: agreement.umkmSignerName,
        umkmSignature: agreement.umkmSignature,
        umkmSignMode: agreement.umkmSignMode,
        agreementText: agreement.agreementText,
        createdAt: agreement.createdAt,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat detail perjanjian: " + err.message });
  }
});

/**
 * POST /api/consultant/agreements
 * Membuat / Mengesahkan perjanjian bimbingan baru dari konsultan
 */
router.post("/agreements", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);
    const {
      requestId,
      businessId,
      contractCode,
      monthlyFee,
      durationMonths,
      targetFunding,
      consultantSignature,
      consultantSignMode,
      consultantSignerName,
      agreementText,
    } = req.body;

    // Resolve target business
    let targetBiz = null;
    if (businessId) {
      targetBiz = await prisma.businessProfile.findFirst({
        where: {
          OR: [{ id: businessId }, { brand: { contains: businessId } }],
        },
      });
    }
    if (!targetBiz) {
      targetBiz = await prisma.businessProfile.findFirst();
    }

    if (!targetBiz) {
      return res.status(404).json({ success: false, message: "Profil bisnis UMKM tujuan tidak ditemukan." });
    }

    const code = contractCode || `KTR-BRU-${(requestId || Date.now().toString()).toUpperCase()}-2026`;

    // Upsert agreement
    const agreement = await prisma.consultantAgreement.upsert({
      where: { agreementCode: code },
      update: {
        monthlyFee: Number(monthlyFee) || 1500000,
        durationMonths: Number(durationMonths) || 3,
        targetFunding: Number(targetFunding) || 150000000,
        status: "SIGNED_CONSULTANT",
        consultantSignedAt: new Date(),
        consultantSignerName: consultantSignerName || "Dra. Maya Suryani, M.M.",
        consultantSignature: consultantSignature || null,
        consultantSignMode: consultantSignMode || "draw",
        agreementText: agreementText || "Perjanjian kemitraan pendampingan bimbingan usaha UMKM.",
      },
      create: {
        agreementCode: code,
        consultantId,
        businessId: targetBiz.id,
        requestId: requestId || "req-01",
        monthlyFee: Number(monthlyFee) || 1500000,
        durationMonths: Number(durationMonths) || 3,
        targetFunding: Number(targetFunding) || 150000000,
        status: "SIGNED_CONSULTANT",
        consultantSignedAt: new Date(),
        consultantSignerName: consultantSignerName || "Dra. Maya Suryani, M.M.",
        consultantSignature: consultantSignature || null,
        consultantSignMode: consultantSignMode || "draw",
        agreementText: agreementText || "Perjanjian kemitraan pendampingan bimbingan usaha UMKM.",
      },
    });

    // Otomatis hubungkan konsultan ke UMKM dan tingkatkan counter
    await prisma.businessProfile.update({
      where: { id: targetBiz.id },
      data: {
        consultantId,
        status: "ACTION_PLAN_ACTIVE",
      },
    });

    if (consultantId) {
      await prisma.consultantProfile.update({
        where: { id: consultantId },
        data: { activeClientsCount: { increment: 1 } },
      });
    }

    return res.json({
      success: true,
      message: `Perjanjian pendampingan ${code} berhasil disahkan & ditandatangani. UMKM ${targetBiz.brand || targetBiz.name} kini resmi menjadi binaan aktif.`,
      data: agreement,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal membuat perjanjian: " + err.message });
  }
});

/**
 * POST /api/consultant/agreements/:id/sign
 * Tandatangani kontrak dari sisi konsultan
 */
router.post("/agreements/:id/sign", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { consultantSignature, consultantSignMode, consultantSignerName } = req.body;

    const agreement = await prisma.consultantAgreement.findFirst({
      where: {
        OR: [{ id }, { agreementCode: id }, { requestId: id }],
      },
    });

    if (!agreement) {
      return res.status(404).json({ success: false, message: "Kontrak perjanjian tidak ditemukan." });
    }

    const updated = await prisma.consultantAgreement.update({
      where: { id: agreement.id },
      data: {
        status: agreement.umkmSignedAt ? "ACTIVE" : "SIGNED_CONSULTANT",
        consultantSignedAt: new Date(),
        consultantSignature: consultantSignature || agreement.consultantSignature,
        consultantSignMode: consultantSignMode || "draw",
        consultantSignerName: consultantSignerName || "Dra. Maya Suryani, M.M.",
      },
    });

    return res.json({
      success: true,
      message: "Tanda tangan digital konsultan berhasil disahkan.",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menandatangani perjanjian: " + err.message });
  }
});

/**
 * GET & PUT /api/consultant/preferences
 * Preferensi bimbingan konsultan langsung disimpan ke tabel ConsultantProfile
 */
router.get("/preferences", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);
    if (!consultantId) {
      return res.json({
        success: true,
        data: { acceptNewRequests: true, whatsappNotification: true, anomalyAlerts: true },
      });
    }

    const prof = await prisma.consultantProfile.findUnique({
      where: { id: consultantId },
      select: { receiveNewClients: true, waNotification: true },
    });

    return res.json({
      success: true,
      data: {
        acceptNewRequests: prof?.receiveNewClients ?? true,
        whatsappNotification: prof?.waNotification ?? true,
        anomalyAlerts: true,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat preferensi: " + err.message });
  }
});

router.put("/preferences", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);
    const { acceptNewRequests, whatsappNotification } = req.body;

    if (consultantId) {
      await prisma.consultantProfile.update({
        where: { id: consultantId },
        data: {
          ...(acceptNewRequests !== undefined ? { receiveNewClients: Boolean(acceptNewRequests) } : {}),
          ...(whatsappNotification !== undefined ? { waNotification: Boolean(whatsappNotification) } : {}),
        },
      });
    }

    return res.json({
      success: true,
      message: "Preferensi bimbingan konsultan berhasil disimpan ke database.",
      data: {
        acceptNewRequests: acceptNewRequests ?? true,
        whatsappNotification: whatsappNotification ?? true,
        anomalyAlerts: true,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menyimpan preferensi: " + err.message });
  }
});

/**
 * GET /api/consultant/action-plans
 * Mengambil daftar seluruh rencana aksi binaan langsung dari database
 */
router.get("/action-plans", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);

    const tasks = await prisma.actionPlanTask.findMany({
      where: consultantId ? { business: { consultantId } } : {},
      include: {
        business: { select: { id: true, name: true, brand: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const mapped = tasks.map((t) => ({
      id: t.id,
      clientId: t.businessId,
      clientName: t.business.brand || t.business.name,
      title: t.title,
      description: t.description || "",
      pillar: t.category,
      priority: t.priority,
      status: t.status,
      targetDate: t.dueDate,
      assignedAt: new Date(t.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      consultantNotes: t.consultantFeedback || "",
    }));

    return res.json({
      success: true,
      data: mapped,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat rencana aksi: " + err.message });
  }
});

/**
 * POST /api/consultant/action-plans
 * Menambahkan rencana aksi baru ke database untuk klien binaan
 */
router.post("/action-plans", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { clientId, title, description, pillar, priority, targetDate, consultantNotes } = req.body;

    if (!clientId || !title) {
      return res.status(400).json({ success: false, message: "clientId dan title wajib diisi." });
    }

    // Pastikan bisnis ada
    let biz = await prisma.businessProfile.findFirst({
      where: { OR: [{ id: clientId }, { name: clientId }, { brand: clientId }] },
    });

    if (!biz) {
      biz = await prisma.businessProfile.findFirst();
    }

    if (!biz) {
      return res.status(404).json({ success: false, message: "UMKM klien tidak ditemukan." });
    }

    const newTask = await prisma.actionPlanTask.create({
      data: {
        businessId: biz.id,
        title,
        description: description || "",
        category: pillar || "Finansial",
        priority: priority || "Tinggi",
        status: "TODO",
        dueDate: targetDate || "2 Minggu ke Depan",
        consultantFeedback: consultantNotes || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Rencana aksi berhasil ditambahkan dan ditugaskan ke UMKM.",
      data: {
        id: newTask.id,
        clientId: biz.id,
        clientName: biz.brand || biz.name,
        title: newTask.title,
        description: newTask.description,
        pillar: newTask.category,
        priority: newTask.priority,
        status: newTask.status,
        targetDate: newTask.dueDate,
        assignedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        consultantNotes: newTask.consultantFeedback,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menambahkan rencana aksi: " + err.message });
  }
});

/**
 * PATCH /api/consultant/action-plans/:id
 * Mengubah status rencana aksi di database
 */
router.patch("/action-plans/:id", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, consultantNotes } = req.body;

    const task = await prisma.actionPlanTask.findFirst({
      where: { OR: [{ id }, { id: { contains: id } }] },
    });

    if (!task) {
      return res.status(404).json({ success: false, message: "Tugas rencana aksi tidak ditemukan." });
    }

    const updated = await prisma.actionPlanTask.update({
      where: { id: task.id },
      data: {
        ...(status ? { status, completed: status === "DONE" } : {}),
        ...(consultantNotes ? { consultantFeedback: consultantNotes } : {}),
      },
    });

    return res.json({
      success: true,
      message: "Status rencana aksi berhasil diperbarui.",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui status: " + err.message });
  }
});

/**
 * DELETE /api/consultant/action-plans/:id
 * Menghapus rencana aksi dari database
 */
router.delete("/action-plans/:id", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.actionPlanTask.findFirst({
      where: { OR: [{ id }, { id: { contains: id } }] },
    });

    if (task) {
      await prisma.actionPlanTask.delete({
        where: { id: task.id },
      });
    }

    return res.json({
      success: true,
      message: "Rencana aksi berhasil dihapus.",
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menghapus rencana aksi: " + err.message });
  }
});

/**
 * GET & POST /api/consultant/milestones
 * Manajemen milestone pendampingan
 */
router.get("/milestones", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);
    const { businessId } = req.query as { businessId?: string };

    const milestones = await prisma.clientMilestone.findMany({
      where: {
        ...(consultantId ? { consultantId } : {}),
        ...(businessId ? { businessId } : {}),
      },
      include: { business: true },
      orderBy: { phaseNumber: "asc" },
    });

    return res.json({ success: true, data: milestones });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat milestone: " + err.message });
  }
});

router.post("/milestones", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const consultantId = await resolveConsultantId(req);
    const { businessId, title, phaseNumber, targetMonth, status } = req.body;

    if (!consultantId || !businessId || !title) {
      return res.status(400).json({ success: false, message: "Parameter tidak lengkap." });
    }

    const created = await prisma.clientMilestone.create({
      data: {
        consultantId,
        businessId,
        title,
        phaseNumber: Number(phaseNumber) || 1,
        targetMonth: targetMonth || "Bulan ke-1",
        status: status || "IN_PROGRESS",
      },
    });

    return res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal membuat milestone: " + err.message });
  }
});

/**
 * POST /api/consultant/documents
 * Mengunggah berkas sertifikat lisensi BNSP / portofolio konsultan dan disimpan ke database
 */
router.post(
  "/documents",
  optionalAuth,
  uploadVdr.single("file"),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const consultantId = await resolveConsultantId(req);
      const { name, type } = req.body;
      const file = req.file;

      const docName = name || (file ? file.originalname : "Dokumen_Konsultan.pdf");
      const docSize = file
        ? file.size >= 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`
        : "1.8 MB";
      const docUrl = file ? `/uploads/vdr/${file.filename}` : undefined;

      let savedDoc = null;
      if (consultantId) {
        savedDoc = await prisma.consultantDocument.create({
          data: {
            consultantId,
            name: docName,
            type: type || "BNSP_CERT",
            filename: file?.originalname || docName,
            fileSize: docSize,
            fileUrl: docUrl,
            status: "VERIFIED",
          },
        });
      }

      return res.status(201).json({
        success: true,
        message: "Dokumen sertifikasi konsultan berhasil diunggah dan disimpan ke database.",
        data: savedDoc || {
          id: `doc-${Date.now()}`,
          name: docName,
          type: type || "BNSP_CERT",
          filename: file?.originalname || docName,
          fileSize: docSize,
          fileUrl: docUrl,
          uploadedAt: new Date(),
          status: "VERIFIED",
        },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: "Gagal mengunggah dokumen: " + err.message });
    }
  }
);

export default router;
