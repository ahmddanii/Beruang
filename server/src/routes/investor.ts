import { Router, Response } from "express";
import { prisma } from "../index.js";
import { optionalAuth, requireAuth, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

// Metadata tambahan untuk setiap profil UMKM di marketplace
const MARKETPLACE_METADATA: Record<string, {
  code: string;
  consultantName: string;
  establishedYear: number;
  pitchSummary: string;
  tags: string[];
  defaultMargin: number;
  defaultGrowth: number;
}> = {
  "umkm-01": {
    code: "BERU-KOP-01",
    consultantName: "Dra. Maya Suryani, M.M.",
    establishedYear: 2021,
    pitchSummary: "Spesialis kopi arabika-robusta dengan 3 gerai offline di Bandung. Margin kotor konsisten di atas 48% dengan SOP barista standar.",
    tags: ["F&B", "Ready for Funding", "Margin >45%", "Halal"],
    defaultMargin: 48.5,
    defaultGrowth: 34.2,
  },
  "biz-kopisenja-01": {
    code: "BERU-KOP-01",
    consultantName: "Dra. Maya Suryani, M.M.",
    establishedYear: 2021,
    pitchSummary: "Spesialis kopi arabika-robusta dengan 3 gerai offline di Bandung. Margin kotor konsisten di atas 48% dengan SOP barista standar.",
    tags: ["F&B", "Ready for Funding", "Margin >45%", "Halal"],
    defaultMargin: 48.5,
    defaultGrowth: 34.2,
  },
  "umkm-03": {
    code: "BERU-SMB-03",
    consultantName: "Bambang Sudarsono, S.E.",
    establishedYear: 2019,
    pitchSummary: "Pabrikasi sambal kemasan botol higienis dengan distribusi 120+ toko oleh-oleh se-Jawa Timur. Standar BPOM dan audit kas harian sangat rapi.",
    tags: ["FMCG", "Ready for Funding", "Margin >50%", "Ekspansi"],
    defaultMargin: 52.0,
    defaultGrowth: 42.0,
  },
  "umkm-05": {
    code: "BERU-KRP-05",
    consultantName: "Dra. Maya Suryani, M.M.",
    establishedYear: 2020,
    pitchSummary: "Inovasi keripik tempe sagu aneka rasa dengan izin P-IRT dan Halal. Memasok rutin modern market lokal di Malang dan Surabaya.",
    tags: ["Agroindustri", "Ready for Funding", "P-IRT", "Halal"],
    defaultMargin: 41.0,
    defaultGrowth: 28.5,
  },
  "umkm-07": {
    code: "BERU-BTK-07",
    consultantName: "Rahmat Hidayat, M.B.A.",
    establishedYear: 2018,
    pitchSummary: "Produksi batik cap & tulis bahan pewarna alam ramah lingkungan dengan ekspor berkala ke Jepang dan Australia. Laporan keuangan terverifikasi.",
    tags: ["Kriya Ekspor", "Ready for Funding", "Eco-Friendly", "Margin >50%"],
    defaultMargin: 55.4,
    defaultGrowth: 31.8,
  },
  "umkm-09": {
    code: "BERU-RDG-09",
    consultantName: "Dra. Maya Suryani, M.M.",
    establishedYear: 2020,
    pitchSummary: "Rendang kemasan retort pouch dengan daya tahan simpan 12 bulan tanpa pengawet. Tersertifikasi HACCP dan sertifikat Halal BPJPH.",
    tags: ["FMCG", "Ready for Funding", "HACCP", "Retort Pouch"],
    defaultMargin: 46.2,
    defaultGrowth: 38.6,
  },
  "umkm-12": {
    code: "BERU-HRB-12",
    consultantName: "Bambang Sudarsono, S.E.",
    establishedYear: 2017,
    pitchSummary: "Pengolahan simplisia jamu dan teh celup herbal organik dari petani lereng Merapi. Memiliki izin edar BPOM TR dan fasilitas lab higienis.",
    tags: ["Agroindustri", "Ready for Funding", "Organik", "BPOM TR"],
    defaultMargin: 49.0,
    defaultGrowth: 26.4,
  },
};

/**
 * Normalisasi ID untuk konsistensi frontend dan backend
 */
function toFrontendId(dbId: string): string {
  if (dbId === "biz-kopisenja-01") return "umkm-01";
  return dbId;
}

function toDbId(frontendId: string): string {
  if (frontendId === "umkm-01") return "biz-kopisenja-01";
  return frontendId;
}

/**
 * Mendapatkan user ID investor aktif (dengan fallback ke Hendro Wicaksono)
 */
async function resolveInvestorUserId(req: AuthenticatedRequest): Promise<string> {
  if (req.user?.id) return req.user.id;
  const defaultInvestor = await prisma.user.findFirst({
    where: { email: "hendro@nusantaraventures.com" },
    select: { id: true },
  });
  return defaultInvestor?.id || "usr-inv-01";
}

/**
 * GET /api/investor/marketplace
 * Katalog UMKM terakreditasi siap danai dengan filter sektor, kota, margin, tiket, dan pencarian.
 */
router.get("/marketplace", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const investorUserId = await resolveInvestorUserId(req);

    // Ambil semua bisnis yang statusnya READY_FOR_FUNDING (atau seluruh bisnis terdaftar)
    const businesses = await prisma.businessProfile.findMany({
      where: {
        status: "READY_FOR_FUNDING",
      },
      include: {
        assessment: true,
        monthlyReports: {
          orderBy: { year: "desc" },
          take: 3,
        },
        accessRequests: {
          where: { investorId: investorUserId },
        },
        watchlists: {
          where: { userId: investorUserId },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Format data sesuai interface MarketplaceUmkm yang diharapkan frontend
    const mappedList = businesses.map((b) => {
      const feId = toFrontendId(b.id);
      const meta = MARKETPLACE_METADATA[feId] || MARKETPLACE_METADATA[b.id] || {
        code: `BERU-${b.city.substring(0, 3).toUpperCase()}-01`,
        consultantName: "Dra. Maya Suryani, M.M.",
        establishedYear: 2021,
        pitchSummary: b.description || "UMKM terakreditasi Beruang dengan tata kelola kas tervalidasi.",
        tags: [b.sector, "Ready for Funding", "Halal"],
        defaultMargin: 45.0,
        defaultGrowth: 30.0,
      };

      // Hitung margin kotor dari laporan bulanan terbaru jika ada
      let marginPct = meta.defaultMargin;
      if (b.monthlyReports && b.monthlyReports.length > 0) {
        const latest = b.monthlyReports[0];
        if (latest.omzet > 0) {
          marginPct = parseFloat((((latest.omzet - latest.hpp) / latest.omzet) * 100).toFixed(1));
        }
      }

      // Cek status izin akses data room investor saat ini
      let accessStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED" = "NONE";
      if (b.accessRequests && b.accessRequests.length > 0) {
        const req = b.accessRequests[0];
        if (req.status === "APPROVED") accessStatus = "APPROVED";
        else if (req.status === "REJECTED") accessStatus = "REJECTED";
        else accessStatus = "PENDING";
      }

      // Cek apakah di-bookmark di watchlist
      const isBookmarked = b.watchlists && b.watchlists.length > 0;

      return {
        id: feId,
        name: b.name || b.brand,
        code: meta.code,
        sector: b.sector,
        city: b.city,
        establishedYear: meta.establishedYear,
        fundingTarget: b.fundingTarget || 250000000,
        marginPercentage: marginPct,
        growthYoY: meta.defaultGrowth,
        healthScore: b.assessment?.compositeScore || 78,
        certifiedAt: "18 Sep 2026",
        consultantName: meta.consultantName,
        pitchSummary: meta.pitchSummary,
        tags: meta.tags,
        accessStatus,
        bookmarked: isBookmarked,
      };
    });

    // Terapkan filter query jika diberikan
    const { sector, city, min_margin, ticket_size, search } = req.query as Record<string, string>;

    let filtered = mappedList;

    if (search && search.trim() !== "") {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.sector.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.pitchSummary.toLowerCase().includes(q)
      );
    }

    if (sector && sector !== "ALL") {
      filtered = filtered.filter((item) =>
        item.sector.toLowerCase().includes(sector.toLowerCase())
      );
    }

    if (city && city !== "ALL") {
      filtered = filtered.filter(
        (item) => item.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (min_margin && !isNaN(Number(min_margin))) {
      const min = Number(min_margin);
      filtered = filtered.filter((item) => item.marginPercentage >= min);
    }

    if (ticket_size && ticket_size !== "ALL") {
      if (ticket_size === "UNDER_250M") {
        filtered = filtered.filter((item) => item.fundingTarget <= 250000000);
      } else if (ticket_size === "250M_500M") {
        filtered = filtered.filter(
          (item) => item.fundingTarget > 250000000 && item.fundingTarget <= 500000000
        );
      } else if (ticket_size === "OVER_500M") {
        filtered = filtered.filter((item) => item.fundingTarget > 500000000);
      }
    }

    return res.json({
      success: true,
      message: "Marketplace UMKM berhasil dimuat.",
      data: filtered,
    });
  } catch (err: any) {
    console.error("❌ Error fetch marketplace:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal memuat marketplace UMKM: " + err.message,
    });
  }
});

/**
 * GET /api/investor/watchlist
 * Daftar UMKM yang disimpan/dibookmark oleh investor yang sedang aktif
 */
router.get("/watchlist", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const investorUserId = await resolveInvestorUserId(req);

    const watchlists = await prisma.investorWatchlist.findMany({
      where: { userId: investorUserId },
      include: {
        business: {
          include: {
            assessment: true,
            monthlyReports: { take: 1, orderBy: { year: "desc" } },
            accessRequests: { where: { investorId: investorUserId } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const data = watchlists.map((w) => {
      const b = w.business;
      const feId = toFrontendId(b.id);
      const meta = MARKETPLACE_METADATA[feId] || MARKETPLACE_METADATA[b.id] || {
        code: `BERU-${b.city.substring(0, 3).toUpperCase()}-01`,
        consultantName: "Dra. Maya Suryani, M.M.",
        establishedYear: 2021,
        pitchSummary: b.description || "UMKM terakreditasi Beruang.",
        tags: [b.sector, "Ready for Funding"],
        defaultMargin: 45.0,
        defaultGrowth: 30.0,
      };

      let accessStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED" = "NONE";
      if (b.accessRequests && b.accessRequests.length > 0) {
        const req = b.accessRequests[0];
        if (req.status === "APPROVED") accessStatus = "APPROVED";
        else if (req.status === "REJECTED") accessStatus = "REJECTED";
        else accessStatus = "PENDING";
      }

      return {
        id: feId,
        name: b.name || b.brand,
        code: meta.code,
        sector: b.sector,
        city: b.city,
        establishedYear: meta.establishedYear,
        fundingTarget: b.fundingTarget || 250000000,
        marginPercentage: meta.defaultMargin,
        growthYoY: meta.defaultGrowth,
        healthScore: b.assessment?.compositeScore || 78,
        certifiedAt: "18 Sep 2026",
        consultantName: meta.consultantName,
        pitchSummary: meta.pitchSummary,
        tags: meta.tags,
        accessStatus,
        bookmarked: true,
      };
    });

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    console.error("❌ Error fetch watchlist:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal memuat watchlist investor: " + err.message,
    });
  }
});

/**
 * POST /api/investor/bookmark/:businessId & POST /api/investor/watchlist/:businessId
 * Toggle simpan / hapus UMKM dari watchlist investor
 */
async function handleToggleBookmark(req: AuthenticatedRequest, res: Response) {
  try {
    const investorUserId = await resolveInvestorUserId(req);
    const targetParam = req.params.businessId || req.params.id;
    const dbBusinessId = toDbId(targetParam);

    // Cari bisnis di DB (dukung ID frontend maupun ID DB)
    const biz = await prisma.businessProfile.findFirst({
      where: {
        OR: [{ id: dbBusinessId }, { id: targetParam }],
      },
    });

    if (!biz) {
      return res.status(404).json({
        success: false,
        message: "Profil usaha tidak ditemukan.",
      });
    }

    // Periksa apakah sudah ada di watchlist
    const existing = await prisma.investorWatchlist.findUnique({
      where: {
        userId_businessId: {
          userId: investorUserId,
          businessId: biz.id,
        },
      },
    });

    if (existing) {
      // Hapus dari watchlist
      await prisma.investorWatchlist.delete({
        where: { id: existing.id },
      });
      return res.json({
        success: true,
        bookmarked: false,
        message: `${biz.brand || biz.name} dihapus dari Portofolio Pantau.`,
      });
    } else {
      // Tambahkan ke watchlist
      await prisma.investorWatchlist.create({
        data: {
          userId: investorUserId,
          businessId: biz.id,
        },
      });
      return res.json({
        success: true,
        bookmarked: true,
        message: `${biz.brand || biz.name} disimpan ke Portofolio Pantau!`,
      });
    }
  } catch (err: any) {
    console.error("❌ Error toggle bookmark:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui status watchlist: " + err.message,
    });
  }
}

router.post("/bookmark/:businessId", optionalAuth, handleToggleBookmark);
router.post("/watchlist/:businessId", optionalAuth, handleToggleBookmark);

/**
 * DELETE /api/investor/watchlist/:businessId
 * Hapus UMKM dari watchlist
 */
router.delete("/watchlist/:businessId", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const investorUserId = await resolveInvestorUserId(req);
    const targetParam = req.params.businessId;
    const dbBusinessId = toDbId(targetParam);

    const biz = await prisma.businessProfile.findFirst({
      where: {
        OR: [{ id: dbBusinessId }, { id: targetParam }],
      },
    });

    if (!biz) {
      return res.status(404).json({ success: false, message: "Usaha tidak ditemukan." });
    }

    await prisma.investorWatchlist.deleteMany({
      where: {
        userId: investorUserId,
        businessId: biz.id,
      },
    });

    return res.json({
      success: true,
      message: "Usaha berhasil dihapus dari Portofolio Pantau.",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal menghapus dari watchlist: " + err.message,
    });
  }
});

/**
 * POST /api/investor/requests
 * Pengajuan tiket minat modal & permohonan buka ruang data privat (VDR)
 */
router.post("/requests", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const investorUserId = await resolveInvestorUserId(req);
    const { businessId, proposedTicket, scheme, introMessage } = req.body;

    if (!businessId) {
      return res.status(422).json({
        success: false,
        message: "Parameter businessId wajib disertakan.",
      });
    }

    const dbBusinessId = toDbId(businessId);
    const biz = await prisma.businessProfile.findFirst({
      where: {
        OR: [{ id: dbBusinessId }, { id: businessId }],
      },
      include: { user: true },
    });

    if (!biz) {
      return res.status(404).json({
        success: false,
        message: "Profil usaha tujuan tidak ditemukan.",
      });
    }

    const ticketAmount = Number(proposedTicket) || 150000000;
    const investmentScheme = scheme || "REVENUE_SHARE";
    const notes = introMessage || "Tertarik menanamkan modal dan mempelajari laporan keuangan asli toko ini.";

    // Cari request yang sudah ada atau buat baru
    const existing = await prisma.accessRequest.findFirst({
      where: {
        investorId: investorUserId,
        businessId: biz.id,
      },
    });

    let accessRequest;
    if (existing) {
      accessRequest = await prisma.accessRequest.update({
        where: { id: existing.id },
        data: {
          proposedTicket: ticketAmount,
          investmentScheme,
          introMessage: notes,
          status: "PENDING",
          requestedAt: new Date(),
        },
      });
    } else {
      accessRequest = await prisma.accessRequest.create({
        data: {
          investorId: investorUserId,
          businessId: biz.id,
          proposedTicket: ticketAmount,
          investmentScheme,
          introMessage: notes,
          status: "PENDING",
        },
      });
    }

    // Ambil info nama investor
    const investorUser = await prisma.user.findUnique({
      where: { id: investorUserId },
      select: { name: true },
    });
    const invName = investorUser?.name || "Hendro Wicaksono (Investor)";

    // Buat in-app notifikasi untuk pemilik UMKM
    if (biz.userId) {
      await prisma.notification.create({
        data: {
          userId: biz.userId,
          title: "Minat Modal & Permohonan Akses VDR",
          message: `${invName} mengajukan minat tiket modal Rp ${(ticketAmount / 1000000).toLocaleString("id-ID")} Jt dan meminta izin membaca laporan keuangan privat tokomu.`,
          category: "INVESTOR",
          priority: "HIGH",
          link: "/dashboard/progres",
          actionLabel: "Tinjau Permohonan",
        },
      });
    }

    return res.status(201).json({
      success: true,
      message: `Permohonan izin akses data room ${biz.brand || biz.name} berhasil diajukan ke pemilik toko.`,
      data: {
        id: accessRequest.id,
        businessId: toFrontendId(biz.id),
        status: accessRequest.status,
        proposedTicket: accessRequest.proposedTicket,
        requestedAt: accessRequest.requestedAt,
      },
    });
  } catch (err: any) {
    console.error("❌ Error submit access request:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal mengajukan permohonan akses: " + err.message,
    });
  }
});

/**
 * GET /api/investor/umkm/:id
 * Detail lengkap UMKM untuk investor view
 */
router.get("/umkm/:id", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const investorUserId = await resolveInvestorUserId(req);
    const targetParam = req.params.id;
    const dbBusinessId = toDbId(targetParam);

    const biz = await prisma.businessProfile.findFirst({
      where: {
        OR: [{ id: dbBusinessId }, { id: targetParam }],
      },
      include: {
        assessment: true,
        monthlyReports: { orderBy: { year: "desc" }, take: 6 },
        accessRequests: { where: { investorId: investorUserId } },
        watchlists: { where: { userId: investorUserId } },
      },
    });

    if (!biz) {
      return res.status(404).json({
        success: false,
        message: "Profil UMKM tidak ditemukan.",
      });
    }

    const feId = toFrontendId(biz.id);
    const meta = MARKETPLACE_METADATA[feId] || MARKETPLACE_METADATA[biz.id] || {
      code: `BERU-${biz.city.substring(0, 3).toUpperCase()}-01`,
      consultantName: "Dra. Maya Suryani, M.M.",
      establishedYear: 2021,
      pitchSummary: biz.description || "UMKM terakreditasi Beruang.",
      tags: [biz.sector, "Ready for Funding"],
      defaultMargin: 48.5,
      defaultGrowth: 34.2,
    };

    let accessStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED" = "NONE";
    if (biz.accessRequests && biz.accessRequests.length > 0) {
      const r = biz.accessRequests[0];
      if (r.status === "APPROVED") accessStatus = "APPROVED";
      else if (r.status === "REJECTED") accessStatus = "REJECTED";
      else accessStatus = "PENDING";
    }

    return res.json({
      success: true,
      data: {
        id: feId,
        name: biz.name || biz.brand,
        code: meta.code,
        sector: biz.sector,
        city: biz.city,
        establishedYear: meta.establishedYear,
        fundingTarget: biz.fundingTarget || 250000000,
        marginPercentage: meta.defaultMargin,
        growthYoY: meta.defaultGrowth,
        healthScore: biz.assessment?.compositeScore || 78,
        certifiedAt: "18 Sep 2026",
        consultantName: meta.consultantName,
        pitchSummary: meta.pitchSummary,
        tags: meta.tags,
        accessStatus,
        bookmarked: biz.watchlists && biz.watchlists.length > 0,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat detail UMKM: " + err.message,
    });
  }
});

/**
 * GET /api/investor/data-room/:id
 * Endpoint proteksi Virtual Data Room (VDR) privat
 */
router.get("/data-room/:id", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const investorUserId = await resolveInvestorUserId(req);
    const targetParam = req.params.id;
    const dbBusinessId = toDbId(targetParam);

    const biz = await prisma.businessProfile.findFirst({
      where: {
        OR: [{ id: dbBusinessId }, { id: targetParam }],
      },
      include: {
        documents: true,
        monthlyReports: { orderBy: { year: "desc" }, take: 10 },
        assessment: true,
        accessRequests: { where: { investorId: investorUserId } },
      },
    });

    if (!biz) {
      return res.status(404).json({
        success: false,
        message: "Ruang data tidak ditemukan.",
      });
    }

    let accessStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED" = "NONE";
    if (biz.accessRequests && biz.accessRequests.length > 0) {
      accessStatus = biz.accessRequests[0].status as any;
    }

    // Buka akses jika status APPROVED atau jika user adalah pemilik / konsultan
    const isApproved = accessStatus === "APPROVED";

    return res.json({
      success: true,
      data: {
        businessId: toFrontendId(biz.id),
        name: biz.name || biz.brand,
        authorized: isApproved,
        accessStatus,
        documents: isApproved ? biz.documents : [],
        monthlyReports: isApproved ? biz.monthlyReports : [],
        assessment: biz.assessment,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat ruang data: " + err.message,
    });
  }
});

/**
 * GET /api/investor/stats
 * Telemetri ringkasan investor
 */
router.get("/stats", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const investorUserId = await resolveInvestorUserId(req);

    const totalDeals = await prisma.businessProfile.count({
      where: { status: "READY_FOR_FUNDING" },
    });

    const watchlistCount = await prisma.investorWatchlist.count({
      where: { userId: investorUserId },
    });

    const approvedAccessCount = await prisma.accessRequest.count({
      where: { investorId: investorUserId, status: "APPROVED" },
    });

    return res.json({
      success: true,
      data: {
        totalDeals,
        watchlistCount,
        approvedAccessCount,
        syndicateCapital: "Rp 1.5 Miliar",
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat statistik investor: " + err.message,
    });
  }
});

/**
 * In-memory preferences store for investor
 */
const investorPreferencesStore = new Map<string, { notifyWhatsapp: boolean; notifyEmailReport: boolean; preferredScheme: string; ticketRange: string }>();

/**
 * GET /api/investor/profile
 */
router.get("/profile", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const investorUserId = await resolveInvestorUserId(req);
    const investor = await prisma.investorProfile.findFirst({
      where: { userId: investorUserId },
      include: { user: true },
    });

    if (!investor) {
      return res.status(404).json({ success: false, message: "Profil investor tidak ditemukan." });
    }

    const prefs = investorPreferencesStore.get(investor.id) || {
      notifyWhatsapp: true,
      notifyEmailReport: true,
      preferredScheme: "REVENUE_SHARE",
      ticketRange: "150M-500M",
    };

    const parsedSectors = investor.sectors ? investor.sectors.split(",").map((s) => s.trim()) : ["Kuliner & Minuman (F&B)", "Ritel & FMCG"];

    return res.json({
      success: true,
      data: {
        id: investor.id,
        userId: investor.userId,
        name: investor.user.name,
        syndicate: investor.firmName,
        companyName: investor.firmName,
        firmName: investor.firmName,
        email: investor.user.email,
        phone: investor.phone || investor.user.phone || "081198765432",
        whatsapp: investor.whatsapp || investor.user.phone || "",
        website: investor.website || "",
        nibEntity: investor.nibEntity || "",
        npwpEntity: investor.npwpEntity || "",
        kycStatus: investor.kycStatus || (investor.isVerified ? "VERIFIED" : "PENDING"),
        avatar: investor.user.avatar,
        sectors: parsedSectors,
        minMargin: `${investor.minMargin || 35}%`,
        minTicket: investor.minTicket || 50000000,
        maxTicket: investor.maxTicket || 1000000000,
        investmentScheme: investor.investmentScheme || prefs.preferredScheme,
        city: investor.city,
        commitmentCapital: investor.commitmentCapital,
        investorType: investor.investorType || "Kelompok Modal",
        preferredScheme: prefs.preferredScheme,
        ticketRange: prefs.ticketRange,
        notifyWhatsapp: prefs.notifyWhatsapp,
        notifyEmailReport: prefs.notifyEmailReport,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat profil investor: " + err.message });
  }
});

/**
 * PUT /api/investor/profile
 */
router.put("/profile", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const investorUserId = await resolveInvestorUserId(req);
    const investor = await prisma.investorProfile.findFirst({
      where: { userId: investorUserId },
      include: { user: true },
    });

    if (!investor) {
      return res.status(404).json({ success: false, message: "Profil investor tidak ditemukan." });
    }

    const {
      name,
      syndicate,
      companyName,
      firmName,
      email,
      phone,
      whatsapp,
      website,
      nibEntity,
      npwpEntity,
      minTicket,
      maxTicket,
      investmentScheme,
      sectors,
      preferredSectors,
      preferredScheme,
      ticketRange,
      minMargin,
      investorType,
      city,
      notifyWhatsapp,
      notifyEmailReport,
    } = req.body;

    const resolvedFirm = companyName || syndicate || firmName;
    const resolvedSectors = preferredSectors || sectors;
    const sectorsStr = Array.isArray(resolvedSectors) ? resolvedSectors.join(", ") : (resolvedSectors ? String(resolvedSectors).trim() : undefined);

    const updated = await prisma.investorProfile.update({
      where: { id: investor.id },
      data: {
        ...(resolvedFirm ? { firmName: String(resolvedFirm).trim() } : {}),
        ...(sectorsStr ? { sectors: sectorsStr } : {}),
        ...(minMargin ? { minMargin: parseFloat(String(minMargin).replace(/[^0-9.]/g, "")) } : {}),
        ...(minTicket ? { minTicket: Number(minTicket) } : {}),
        ...(maxTicket ? { maxTicket: Number(maxTicket) } : {}),
        ...(investmentScheme ? { investmentScheme: String(investmentScheme).trim() } : {}),
        ...(investorType ? { investorType: String(investorType).trim() } : {}),
        ...(city ? { city: String(city).trim() } : {}),
        ...(phone ? { phone: String(phone).trim() } : {}),
        ...(whatsapp ? { whatsapp: String(whatsapp).trim() } : {}),
        ...(website ? { website: String(website).trim() } : {}),
        ...(nibEntity ? { nibEntity: String(nibEntity).trim() } : {}),
        ...(npwpEntity ? { npwpEntity: String(npwpEntity).trim() } : {}),
      },
      include: { user: true },
    });

    if (name || phone || email) {
      await prisma.user.update({
        where: { id: investor.userId },
        data: {
          ...(name ? { name: String(name).trim() } : {}),
          ...(phone ? { phone: String(phone).trim() } : {}),
          ...(email ? { email: String(email).trim().toLowerCase() } : {}),
        },
      });
    }

    const prev = investorPreferencesStore.get(investor.id) || {
      notifyWhatsapp: true,
      notifyEmailReport: true,
      preferredScheme: "REVENUE_SHARE",
      ticketRange: "150M-500M",
    };

    investorPreferencesStore.set(investor.id, {
      notifyWhatsapp: notifyWhatsapp ?? prev.notifyWhatsapp,
      notifyEmailReport: notifyEmailReport ?? prev.notifyEmailReport,
      preferredScheme: preferredScheme || prev.preferredScheme,
      ticketRange: ticketRange || prev.ticketRange,
    });

    return res.json({
      success: true,
      message: "Profil dan preferensi investor berhasil disimpan.",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui profil investor: " + err.message });
  }
});

/**
 * GET /api/investor/my-requests
 * Riwayat dan status permohonan akses data room privat investor
 */
router.get("/my-requests", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const investorUserId = await resolveInvestorUserId(req);
    const requests = await prisma.accessRequest.findMany({
      where: { investorId: investorUserId },
      include: {
        business: true,
      },
      orderBy: { requestedAt: "desc" },
    });

    return res.json({
      success: true,
      message: "Daftar permohonan akses data room berhasil dimuat.",
      data: requests.map((r) => ({
        id: r.id,
        businessId: r.businessId,
        businessName: r.business?.brand || r.business?.name || "UMKM",
        status: r.status,
        proposedTicket: r.proposedTicket,
        investmentScheme: r.investmentScheme,
        introMessage: r.introMessage,
        requestedAt: r.requestedAt,
        respondedAt: r.respondedAt,
      })),
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat permohonan akses: " + err.message });
  }
});

export default router;
