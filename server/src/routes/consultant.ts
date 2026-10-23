import { Router, Response } from "express";
import { prisma } from "../index.js";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

/**
 * Helper untuk mendapatkan ID Konsultan yang aktif
 */
async function resolveConsultantId(req: AuthenticatedRequest): Promise<string | null> {
  if (req.user?.id) {
    const prof = await prisma.consultantProfile.findUnique({
      where: { userId: req.user.id },
      select: { id: true },
    });
    if (prof) return prof.id;
  }
  // Fallback demo untuk Dra. Maya Suryani
  const defaultProf = await prisma.consultantProfile.findFirst({
    select: { id: true },
  });
  return defaultProf?.id || "cons-prof-01";
}

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
router.get("/validations", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
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
router.post("/validations/:id/verify", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const report = await prisma.monthlyReport.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!report) {
      return res.status(404).json({ success: false, message: "Laporan bulanan tidak ditemukan." });
    }

    const updatedReport = await prisma.monthlyReport.update({
      where: { id },
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
router.post("/validations/:id/request-revision", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason, notes } = req.body;

    const revisionNote = reason || notes || "Perlu perbaikan kelengkapan bukti transaksi kas operasional.";

    const report = await prisma.monthlyReport.update({
      where: { id },
      data: {
        status: "revision_needed",
        notes: revisionNote,
      },
    });

    return res.json({
      success: true,
      message: "Permintaan revisi berhasil dikirimkan ke dashboard UMKM.",
      data: report,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal meminta revisi: " + err.message });
  }
});

/**
 * GET /api/consultant/requests
 * Menampilkan permintaan bimbingan baru dari UMKM
 */
router.get("/requests", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const requests = [
      {
        id: "req-01",
        umkmId: "cmvk-demo-01",
        businessName: "Kopi Senja Nusantara",
        ownerName: "Fikri Setiawan",
        sector: "Kuliner & FnB",
        city: "Bandung",
        revenue: 52400000,
        healthScore: 78,
        offeredFee: 1500000,
        durationMonths: 3,
        message: "Mohon bimbingan pendampingan untuk audit HPP dan perizinan sertifikasi halal 3 gerai.",
        requestedAt: "18 Oktober 2026",
        status: "PENDING",
      },
      {
        id: "req-02",
        umkmId: "cmvk-demo-02",
        businessName: "Batik Canting Nusantara",
        ownerName: "Ibu Nurul Hidayati",
        sector: "Kriya & Fesyen",
        city: "Pekalongan",
        revenue: 38000000,
        healthScore: 68,
        offeredFee: 1200000,
        durationMonths: 3,
        message: "Ingin merapikan pemisahan kas usaha batik dan belanja keluarga.",
        requestedAt: "20 Oktober 2026",
        status: "PENDING",
      },
    ];

    return res.json({
      success: true,
      message: "Daftar permohonan bimbingan berhasil dimuat.",
      data: requests,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat permintaan: " + err.message });
  }
});

/**
 * POST /api/consultant/requests/:id/accept
 */
router.post("/requests/:id/accept", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const consultantId = await resolveConsultantId(req);

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
 */
router.post("/requests/:id/reject", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

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

export default router;
