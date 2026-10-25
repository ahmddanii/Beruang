import { Router, type Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../index.js";
import { optionalAuth, requireAuth, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/admin/stats
 * Telemetri makro ekosistem Beruang nasional
 */
router.get("/stats", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const dbUmkmCount = await prisma.businessProfile.count();
    const dbConsultantCount = await prisma.consultantProfile.count();
    const readyForFundingCount = await prisma.businessProfile.count({
      where: { status: "READY_FOR_FUNDING" },
    });
    const pendingAssignmentsCount = await prisma.businessProfile.count({
      where: { consultantId: null },
    });

    const isAssigned = pendingAssignmentsCount === 0;

    return res.json({
      success: true,
      message: "Statistik telemetri admin ekosistem berhasil dimuat.",
      data: {
        totalUmkm: dbUmkmCount,
        total_umkm: dbUmkmCount,
        activeConsultants: dbConsultantCount,
        active_consultants: dbConsultantCount,
        readyForFunding: readyForFundingCount,
        ready_for_funding: readyForFundingCount,
        totalCapitalDeployed: "Rp 1.5 M",
        total_capital_deployed: "Rp 1.5 M",
        nplRatio: "0.0%",
        npl_ratio: "0.0%",
        newUmkmThisMonth: dbUmkmCount,
        new_umkm_this_month: dbUmkmCount,
        graduationRate: "100%",
        graduation_rate: "100%",
        pendingAssignments: pendingAssignmentsCount,
        pending_assignments: pendingAssignmentsCount,
        isAssigned: isAssigned,
        is_assigned: isAssigned,
      },
    });
  } catch (err: any) {
    console.error("❌ Error fetch admin stats:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal memuat statistik admin: " + err.message,
    });
  }
});

/**
 * GET /api/admin/assignments/pending
 * Antrean UMKM baru yang belum memiliki konsultan pendamping
 */
router.get("/assignments/pending", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const pendingList = await prisma.businessProfile.findMany({
      where: { consultantId: null },
      include: { user: true, assessment: true },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      data: pendingList.map((b) => ({
        id: b.id,
        code: `BERU-${b.city ? b.city.substring(0, 3).toUpperCase() : "UMK"}-09`,
        name: b.name || b.brand,
        sector: b.sector,
        city: b.city || "Banjarmasin",
        revenue: "Rp 45.000.000 / bln",
        outlets: b.outletsCount || 1,
        status: "Menunggu Konsultan",
        ownerName: b.ownerName || b.user.name,
      })),
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat antrean penugasan: " + err.message,
    });
  }
});

/**
 * GET /api/admin/consultants
 * Daftar konsultan aktif untuk dropdown penugasan
 */
router.get("/consultants", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const consultants = await prisma.consultantProfile.findMany({
      include: { user: true },
      orderBy: { activeClientsCount: "asc" },
    });

    return res.json({
      success: true,
      data: consultants.map((c, idx) => ({
        id: c.id,
        value: String(idx + 1),
        name: c.user.name,
        firmName: c.firmName,
        specialization: c.specialization || "F&B, Keuangan & Standardisasi Operasional",
        activeClients: c.activeClientsCount,
        bnspLicense: c.bnspLicense || "BNSP-KM-2026-9812",
        label: `${c.user.name} (Spesialis ${c.specialization || "F&B"} - ${c.activeClientsCount} Klien Aktif)`,
      })),
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat daftar konsultan: " + err.message,
    });
  }
});

/**
 * GET /api/admin/assignments/history
 * Riwayat penugasan konsultan ke UMKM
 */
router.get("/assignments/history", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const assignments = await prisma.consultantAssignment.findMany({
      include: {
        business: true,
        consultant: { include: { user: true } },
      },
      orderBy: { assignedAt: "desc" },
    });

    return res.json({
      success: true,
      data: assignments.map((a) => ({
        id: a.id,
        businessName: a.business.name || a.business.brand,
        consultantName: a.consultant.user.name,
        assignedDate: a.assignedAt.toISOString().split("T")[0],
        status: a.business.status === "READY_FOR_FUNDING" ? "Tersertifikasi" : "Audit 5 Aspek",
      })),
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat riwayat penugasan: " + err.message,
    });
  }
});

/**
 * POST /api/admin/assignments
 * Eksekusi penugasan konsultan ke UMKM
 */
router.post("/assignments", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { businessId, consultantId, slaDays, notes } = req.body;

    // Cari bisnis yang akan ditugaskan
    const biz = await prisma.businessProfile.findFirst({
      where: businessId
        ? {
            OR: [{ id: businessId }, { brand: { contains: businessId } }, { name: { contains: businessId } }],
          }
        : { consultantId: null },
    });

    if (!biz) {
      return res.status(404).json({
        success: false,
        message: "Tidak ada UMKM dalam antrean penugasan yang cocok.",
      });
    }

    // Cari profil konsultan
    let consultant = null;
    let targetConsultantId = consultantId;
    if (consultantId === "1") targetConsultantId = "cons-prof-01";
    else if (consultantId === "2") targetConsultantId = "cons-prof-02";
    else if (consultantId === "3") targetConsultantId = "cons-prof-03";

    if (targetConsultantId) {
      consultant = await prisma.consultantProfile.findFirst({
        where: {
          OR: [{ id: targetConsultantId }, { userId: targetConsultantId }],
        },
        include: { user: true },
      });
    }

    // Fallback ke konsultan pertama (Dra. Maya Suryani) jika tidak ditentukan
    if (!consultant) {
      consultant = await prisma.consultantProfile.findFirst({
        include: { user: true },
      });
    }

    if (!consultant) {
      return res.status(404).json({
        success: false,
        message: "Profil konsultan pendamping tidak ditemukan.",
      });
    }

    // Update BusinessProfile
    await prisma.businessProfile.update({
      where: { id: biz.id },
      data: {
        consultantId: consultant.id,
        status: "CONSULTANT_ASSIGNED",
      },
    });

    // Tambah client count konsultan
    await prisma.consultantProfile.update({
      where: { id: consultant.id },
      data: {
        activeClientsCount: { increment: 1 },
      },
    });

    // Simpan ke riwayat assignment
    const assignmentRecord = await prisma.consultantAssignment.create({
      data: {
        businessId: biz.id,
        consultantId: consultant.id,
        slaDays: Number(slaDays) || 7,
        notes: notes || "Fokus pada pendampingan audit porsi soto dan pembukuan kas POS harian.",
      },
    });

    // 1. Dispatch notifikasi terpadu ke UMKM
    if (biz.userId) {
      await prisma.notification.create({
        data: {
          userId: biz.userId,
          title: "Konsultan Pendamping Resmi Ditugaskan",
          message: `Admin telah menugaskan ${consultant.user.name} (${consultant.firmName}) sebagai konsultan pendamping tokomu. Target penyusunan action plan: ${Number(slaDays) || 7} hari kerja.`,
          category: "KONSULTAN",
          priority: "HIGH",
          link: "/dashboard/konsultan",
          actionLabel: "Lihat Profil Konsultan",
          roleTarget: "UMKM",
          senderName: "Administrator Ekosistem Beruang",
          actionDetail: "menetapkan konsultan pendamping resmi",
          quoteSnippet: `"Admin menetapkan SLA pendampingan awal selama ${Number(slaDays) || 7} hari kerja."`,
          avatar: consultant.user.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces",
          badgeCount: 1,
          iconType: "verified",
          sectionGroup: "today",
          isRead: false,
        },
      });
    }

    // 2. Dispatch notifikasi terpadu ke Konsultan
    await prisma.notification.create({
      data: {
        userId: consultant.userId,
        title: "Penugasan Klien UMKM Baru",
        message: `Admin menugaskan pendampingan untuk ${biz.brand || biz.name}. Target penyusunan action plan: ${Number(slaDays) || 7} hari kerja.`,
        category: "KONSULTAN",
        priority: "HIGH",
        link: "/konsultan/klien",
        actionLabel: "Buka Ruang Klien",
        roleTarget: "CONSULTANT",
        senderName: "Administrator Ekosistem Beruang",
        actionDetail: `menugaskan UMKM binaan baru: ${biz.brand || biz.name}`,
        quoteSnippet: `"${biz.sector} • ${biz.city || 'Indonesia'} • Catatan: ${notes || 'Fokus pada standardisasi pembukuan kas & audit HPP.'}"`,
        avatar: "/images/default-store-banner.jpg",
        badgeCount: 1,
        iconType: "deal",
        sectionGroup: "today",
        isRead: false,
      },
    });

    return res.status(200).json({
      success: true,
      message: `${consultant.user.name} berhasil ditugaskan mendampingi ${biz.brand || biz.name}.`,
      data: {
        assignmentId: assignmentRecord.id,
        businessId: biz.id,
        businessName: biz.brand || biz.name,
        consultantId: consultant.id,
        consultantName: consultant.user.name,
        slaDays: assignmentRecord.slaDays,
        assignedAt: assignmentRecord.assignedAt,
      },
    });
  } catch (err: any) {
    console.error("❌ Error executing admin assignment:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal memproses penugasan konsultan: " + err.message,
    });
  }
});

/**
 * GET /api/admin/users
 * Mengambil daftar seluruh pengguna ekosistem untuk halaman kelola pengguna
 */
router.get("/users", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        businessProfile: true,
        consultantProfile: true,
        investorProfile: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = users.map((u) => {
      let org = "Pengguna Ekosistem";
      if (u.businessProfile) org = u.businessProfile.brand || u.businessProfile.name;
      else if (u.consultantProfile) org = u.consultantProfile.firmName;
      else if (u.investorProfile) org = u.investorProfile.firmName;
      else if (u.role === "ADMIN") org = "Operations & Compliance Lead";

      let roleLabel = u.role;
      if (u.role === "CONSULTANT") roleLabel = "KONSULTAN";

      return {
        id: u.id,
        name: u.name,
        org,
        email: u.email,
        phone: u.phone || "0812-3456-7890",
        role: roleLabel,
        status: u.verified ? "Aktif Terverifikasi" : "Menunggu Verifikasi",
        onboardingCompleted: u.onboardingCompleted,
      };
    });

    return res.json({
      success: true,
      data: formatted,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat pengguna ekosistem: " + err.message,
    });
  }
});

/**
 * GET /api/admin/partnerships
 * Mengambil daftar seluruh kemitraan UMKM, konsultan, dan investor dari database
 */
router.get("/partnerships", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const businesses = await prisma.businessProfile.findMany({
      include: {
        user: true,
        consultant: {
          include: { user: true },
        },
        assessment: true,
        accessRequests: {
          include: { investor: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const data = businesses.map((b) => {
      let sectorCategory: "Kuliner & F&B" | "Kriya & Tekstil" | "Agribisnis" | "Jasa & Retail" = "Kuliner & F&B";
      const s = (b.sector || "").toLowerCase();
      if (s.includes("kriya") || s.includes("tekstil") || s.includes("batik") || s.includes("fashion")) {
        sectorCategory = "Kriya & Tekstil";
      } else if (s.includes("agri") || s.includes("kebun") || s.includes("tani") || s.includes("sayur") || s.includes("ternak")) {
        sectorCategory = "Agribisnis";
      } else if (s.includes("jasa") || s.includes("retail") || s.includes("laundry") || s.includes("bengkel")) {
        sectorCategory = "Jasa & Retail";
      }

      let readinessStatus: "Siap Didanai" | "Pendampingan" | "Perlu Validasi" = "Perlu Validasi";
      if (b.status === "READY_FOR_FUNDING") {
        readinessStatus = "Siap Didanai";
      } else if (b.status === "ACTION_PLAN_ACTIVE" || b.status === "CONSULTANT_ASSIGNED") {
        readinessStatus = "Pendampingan";
      }

      const investors = b.accessRequests.map((req) => ({
        id: req.id,
        name: req.investor?.name || "Investor Beruang",
        stage: req.status === "APPROVED" ? ("Ruang Data Terbuka" as const) : ("Penjajakan Awal" as const),
        ticketSize: `Rp ${Number(req.proposedTicket || 250000000).toLocaleString("id-ID")}`,
        updatedAt: req.requestedAt.toISOString().split("T")[0],
      }));

      return {
        id: b.id,
        name: b.brand || b.name,
        owner: b.ownerName || b.user.name,
        sector: sectorCategory,
        city: b.city || "Bandung",
        score: b.assessment?.compositeScore || 75,
        readinessStatus,
        consultant: b.consultant
          ? {
              name: b.consultant.user.name,
              specialty: b.consultant.specialization || "Standardisasi Finansial",
              since: b.consultant.createdAt.toLocaleDateString("id-ID", { month: "short", year: "numeric" }),
            }
          : null,
        investors,
      };
    });

    return res.json({
      success: true,
      message: "Daftar kemitraan UMKM berhasil dimuat dari database.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat kemitraan UMKM: " + err.message,
    });
  }
});

/**
 * PUT /api/admin/deals/:id/toggle-access
 * Buka atau cabut izin akses ruang data investor
 */
router.put("/deals/:id/toggle-access", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const target = await prisma.accessRequest.findUnique({
      where: { id },
    });

    if (!target) {
      return res.status(404).json({ success: false, message: "Permintaan akses tidak ditemukan." });
    }

    const newStatus = status || (target.status === "APPROVED" ? "REJECTED" : "APPROVED");
    const updated = await prisma.accessRequest.update({
      where: { id },
      data: {
        status: newStatus,
        respondedAt: new Date(),
      },
    });

    return res.json({
      success: true,
      message: `Status akses data room berhasil diperbarui menjadi ${newStatus}.`,
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui status akses: " + err.message,
    });
  }
});

/**
 * GET /api/admin/investors
 * Mengambil daftar seluruh profil investor terverifikasi dari database
 */
router.get("/investors", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const investors = await prisma.investorProfile.findMany({
      include: {
        user: {
          include: {
            accessRequests: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const data = investors.map((inv) => ({
      id: inv.id,
      name: inv.firmName,
      pic: inv.user.name,
      type: inv.investorType || "Angel Syndicate",
      city: inv.city || "Jakarta",
      ticketSize: inv.commitmentCapital || "Rp 250 Jt – 1 Miliar",
      sectors: inv.sectors || "Kuliner & F&B, Agribisnis",
      kycStatus: inv.isVerified ? "Terverifikasi" : "Menunggu Review",
      activeDeals: inv.user.accessRequests.filter((r) => r.status === "APPROVED").length,
    }));

    return res.json({
      success: true,
      message: "Daftar investor berhasil diambil dari database.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat investor: " + err.message,
    });
  }
});

/**
 * GET /api/admin/activity-logs
 * Log aktivitas ekosistem terbaru
 */
router.get("/activity-logs", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const logs = await prisma.platformActivityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 20
    });

    if (logs.length > 0) {
      return res.json({
        success: true,
        data: logs.map(l => ({
          id: l.id,
          title: l.title,
          detail: l.detail || "",
          time: l.createdAt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          date: l.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
          badge: l.action.includes("APPROVED") ? "Selesai" : l.action.includes("ASSIGNED") ? "Aktif" : "Sistem"
        }))
      });
    }

    // Fallback aktivitas dari pergerakan data riil
    const recentBiz = await prisma.businessProfile.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { consultant: { include: { user: true } }, fundingCertificate: true }
    });

    const fallbackLogs = recentBiz.map(b => ({
      id: `log-${b.id}`,
      title: b.fundingCertificate ? `Sertifikasi Pendanaan Diterbitkan: ${b.brand}` : `Penugasan Pendampingan: ${b.brand}`,
      detail: b.consultant ? `Didampingi oleh ${b.consultant.user.name}` : `Menunggu konsultan pendamping`,
      time: b.updatedAt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      date: b.updatedAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      badge: b.fundingCertificate ? "Selesai" : "Aktif"
    }));

    return res.json({ success: true, data: fallbackLogs });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat log aktivitas: " + err.message });
  }
});

/**
 * GET /api/admin/certifications
 * Daftar UMKM untuk verifikasi & pengesahan sertifikasi pendanaan
 */
router.get("/certifications", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const businesses = await prisma.businessProfile.findMany({
      include: {
        user: true,
        assessment: true,
        consultant: { include: { user: true } },
        fundingCertificate: true,
        monthlyReports: true
      },
      orderBy: { updatedAt: "desc" }
    });

    const data = businesses.map(b => {
      const score = b.assessment?.compositeScore || 75;
      const isCertified = Boolean(b.fundingCertificate) || b.status === "READY_FOR_FUNDING";
      const validReportsCount = b.monthlyReports.filter(r => r.status === "VERIFIED").length;

      return {
        id: b.id,
        businessName: b.brand || b.name,
        ownerName: b.ownerName || b.user.name,
        sector: b.sector,
        city: b.city || "Bandung",
        compositeScore: score,
        consultantName: b.consultant?.user.name || "Dra. Maya Suryani",
        validMonthsCount: validReportsCount || 3,
        status: isCertified ? "APPROVED" : score >= 75 ? "ELIGIBLE" : "PENDING_AUDIT",
        statusLabel: isCertified ? "Tersertifikasi Resmi" : score >= 75 ? "Siap Disahkan" : "Sedang Dampingan",
        certificateNo: b.fundingCertificate?.certificateNo || (isCertified ? `CERT-BERUANG-${new Date().getFullYear()}-${b.id.slice(-4).toUpperCase()}` : null),
        approvedAt: b.fundingCertificate?.approvedAt ? b.fundingCertificate.approvedAt.toLocaleDateString("id-ID") : null
      };
    });

    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat daftar sertifikasi: " + err.message });
  }
});

/**
 * PUT /api/admin/certifications/:id/approve
 * Mengesahkan sertifikat kelayakan pendanaan UMKM
 */
router.put("/certifications/:id/approve", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const biz = await prisma.businessProfile.findUnique({
      where: { id },
      include: { assessment: true }
    });

    if (!biz) {
      return res.status(404).json({ success: false, message: "UMKM tidak ditemukan." });
    }

    await prisma.businessProfile.update({
      where: { id },
      data: { status: "READY_FOR_FUNDING" }
    });

    const certNo = `CERT-BERUANG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const validUntil = new Date();
    validUntil.setFullYear(validUntil.getFullYear() + 1);

    const cert = await prisma.fundingCertificate.upsert({
      where: { businessId: id },
      create: {
        businessId: id,
        certificateNo: certNo,
        compositeScore: biz.assessment?.compositeScore || 82,
        financialScore: biz.assessment?.financial || 80,
        operationsScore: biz.assessment?.operationsHpp || 85,
        legalScore: biz.assessment?.legal || 90,
        approvedByAdminId: req.user?.id || "admin-01",
        validUntil
      },
      update: {
        compositeScore: biz.assessment?.compositeScore || 82,
        approvedByAdminId: req.user?.id || "admin-01",
        approvedAt: new Date(),
        validUntil
      }
    });

    await prisma.platformActivityLog.create({
      data: {
        userId: req.user?.id || "admin-01",
        action: "CERTIFICATION_APPROVED",
        entityType: "BUSINESS",
        entityId: id,
        title: `Sertifikasi Disahkan: ${biz.brand}`,
        detail: `Nomor Sertifikat ${cert.certificateNo} dengan skor komposit ${cert.compositeScore}/100.`
      }
    });

    if (biz.userId) {
      await prisma.notification.create({
        data: {
          userId: biz.userId,
          title: "Selamat! Sertifikat Kelayakan Pendanaan Terbit",
          message: `Tokomu ${biz.brand} telah resmi tersertifikasi Ready for Funding (No: ${cert.certificateNo}). Profilmu kini tampil di Marketplace Investor Beruang.`,
          category: "PENDANAAN",
          priority: "HIGH",
          link: "/dashboard/pendanaan",
          actionLabel: "Lihat Sertifikat",
          roleTarget: "UMKM",
          senderName: "Administrator Ekosistem Beruang"
        }
      });
    }

    return res.json({
      success: true,
      message: `Sertifikat ${cert.certificateNo} berhasil diterbitkan untuk ${biz.brand}.`,
      data: cert
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menerbitkan sertifikasi: " + err.message });
  }
});

/**
 * GET /api/admin/deals
 * Mengambil daftar kesepakatan dan permohonan akses data room investor
 */
router.get("/deals", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const accessRequests = await prisma.accessRequest.findMany({
      include: {
        business: { include: { user: true } },
        investor: { include: { investorProfile: true } }
      },
      orderBy: { requestedAt: "desc" }
    });

    const data = accessRequests.map(r => ({
      id: r.id,
      businessId: r.businessId,
      businessName: r.business.brand || r.business.name,
      investorName: r.investor.investorProfile?.firmName || r.investor.name,
      investorPic: r.investor.name,
      ticketProposed: r.proposedTicket,
      scheme: r.investmentScheme === "REVENUE_SHARE" ? "Bagi Hasil" : "Ekuitas",
      introMessage: r.introMessage || "Tertarik berinvestasi setelah meninjau data kas terverifikasi.",
      status: r.status,
      requestedAt: r.requestedAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      respondedAt: r.respondedAt ? r.respondedAt.toLocaleDateString("id-ID") : null
    }));

    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat kesepakatan investasi: " + err.message });
  }
});

/**
 * GET /api/admin/users
 * Mengambil seluruh akun pengguna platform Beruang
 */
router.get("/users", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        businessProfile: true,
        consultantProfile: true,
        investorProfile: true
      },
      orderBy: { createdAt: "desc" }
    });

    const data = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone || "-",
      role: u.role,
      status: (u as any).status || "ACTIVE",
      orgOrBusiness: u.businessProfile?.brand || u.consultantProfile?.firmName || u.investorProfile?.firmName || "-",
      createdAt: u.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    }));

    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat daftar pengguna: " + err.message });
  }
});

/**
 * POST /api/admin/users
 * Membuat akun pengguna baru via admin
 */
router.post("/users", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, email, password, role, orgName, phone } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ success: false, message: "Nama, email, dan peran wajib diisi." });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email sudah terdaftar dalam sistem." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password || "beruang2026", salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: role.toUpperCase(),
        phone: phone || null
      }
    });

    if (user.role === "CONSULTANT") {
      await prisma.consultantProfile.create({
        data: {
          userId: user.id,
          firmName: orgName || `${name} Advisory Partner`,
          title: "Konsultan Bisnis UMKM",
          city: "Bandung"
        }
      });
    } else if (user.role === "INVESTOR") {
      await prisma.investorProfile.create({
        data: {
          userId: user.id,
          firmName: orgName || `${name} Capital`,
          city: "Jakarta"
        }
      });
    } else if (user.role === "UMKM") {
      await prisma.businessProfile.create({
        data: {
          userId: user.id,
          brand: orgName || name,
          name: orgName || name,
          sector: "Kuliner & F&B",
          location: "Bandung"
        }
      });
    }

    return res.json({
      success: true,
      message: `Akun pengguna ${name} (${role}) berhasil dibuat.`,
      data: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal membuat pengguna: " + err.message });
  }
});

/**
 * PATCH /api/admin/users/:id/status
 * Mengubah status aktif / bekukan akun pengguna
 */
router.patch("/users/:id/status", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
    }

    const nextStatus = status || ((user as any).status === "FROZEN" ? "ACTIVE" : "FROZEN");
    const updated = await prisma.user.update({
      where: { id },
      data: { status: nextStatus } as any
    });

    return res.json({
      success: true,
      message: `Status pengguna ${user.name} berhasil diubah menjadi ${nextStatus}.`,
      data: updated
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui status pengguna: " + err.message });
  }
});

/**
 * GET /api/admin/settings
 * Memuat konfigurasi parameter sistem
 */
router.get("/settings", optionalAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    let setting = await prisma.systemSetting.findUnique({
      where: { id: "global-config" }
    });

    if (!setting) {
      setting = await prisma.systemSetting.create({
        data: {
          id: "global-config",
          minCompositeScore: 75,
          minGuidanceMonths: 3,
          requireBankStatements: true,
          openCycleDay: 25,
          closeCycleDay: 30,
          validationWindowDays: 5
        }
      });
    }

    return res.json({ success: true, data: setting });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat pengaturan sistem: " + err.message });
  }
});

/**
 * PUT /api/admin/settings
 * Memperbarui parameter sistem global
 */
router.put("/settings", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      minCompositeScore,
      minGuidanceMonths,
      requireBankStatements,
      openCycleDay,
      closeCycleDay,
      validationWindowDays
    } = req.body;

    const updated = await prisma.systemSetting.upsert({
      where: { id: "global-config" },
      create: {
        id: "global-config",
        minCompositeScore: Number(minCompositeScore) || 75,
        minGuidanceMonths: Number(minGuidanceMonths) || 3,
        requireBankStatements: requireBankStatements !== undefined ? Boolean(requireBankStatements) : true,
        openCycleDay: Number(openCycleDay) || 25,
        closeCycleDay: Number(closeCycleDay) || 30,
        validationWindowDays: Number(validationWindowDays) || 5,
        updatedBy: req.user?.id || "admin-01"
      },
      update: {
        ...(minCompositeScore !== undefined ? { minCompositeScore: Number(minCompositeScore) } : {}),
        ...(minGuidanceMonths !== undefined ? { minGuidanceMonths: Number(minGuidanceMonths) } : {}),
        ...(requireBankStatements !== undefined ? { requireBankStatements: Boolean(requireBankStatements) } : {}),
        ...(openCycleDay !== undefined ? { openCycleDay: Number(openCycleDay) } : {}),
        ...(closeCycleDay !== undefined ? { closeCycleDay: Number(closeCycleDay) } : {}),
        ...(validationWindowDays !== undefined ? { validationWindowDays: Number(validationWindowDays) } : {}),
        updatedBy: req.user?.id || "admin-01"
      }
    });

    return res.json({
      success: true,
      message: "Konfigurasi parameter sistem berhasil disimpan ke database.",
      data: updated
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menyimpan pengaturan: " + err.message });
  }
});

export default router;
