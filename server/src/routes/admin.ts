import { Router, Response } from "express";
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

export default router;
