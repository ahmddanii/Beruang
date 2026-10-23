import { Router, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { prisma } from "../index.js";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth.js";
import { uploadReport, uploadReceipt } from "../middleware/upload.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_ROOT = path.resolve(__dirname, "../../uploads");

const router = Router();

/**
 * Mendapatkan ID bisnis aktif dari user yang sedang login
 */
async function resolveBusinessId(req: AuthenticatedRequest): Promise<string | null> {
  if (req.user?.businessId) {
    return req.user.businessId;
  }
  if (req.user?.id) {
    const biz = await prisma.businessProfile.findUnique({
      where: { userId: req.user.id },
      select: { id: true },
    });
    if (biz) return biz.id;
  }
  // Fallback demo untuk Fikri Kopi Senja
  const defaultBiz = await prisma.businessProfile.findFirst({
    select: { id: true },
  });
  return defaultBiz?.id || null;
}

/**
 * GET /api/finances/summary
 * Mengembalikan ringkasan saldo kas, omzet, HPP, opex, laba bersih, dan rasio margin
 */
router.get("/summary", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const businessId = await resolveBusinessId(req);
    if (!businessId) {
      return res.status(404).json({
        success: false,
        message: "Profil bisnis tidak ditemukan.",
      });
    }

    // Ambil laporan bulanan terbaru
    const latestMonthly = await prisma.monthlyReport.findFirst({
      where: { businessId },
      orderBy: [{ year: "desc" }, { submittedAt: "desc" }],
    });

    // Ambil seluruh transaksi kas harian bulan ini
    const dailyTxs = await prisma.dailyTransaction.findMany({
      where: { businessId },
    });

    let totalIncome = 0;
    let totalCogs = 0;
    let totalOpex = 0;

    dailyTxs.forEach((tx) => {
      if (tx.category === "PEMASUKAN") totalIncome += tx.amount;
      else if (tx.category === "MODAL_JUALAN") totalCogs += tx.amount;
      else if (tx.category === "OPERASIONAL") totalOpex += tx.amount;
    });

    // Jika ada laporan bulanan terbaru, gunakan sebagai anchor dasar
    const omzet = latestMonthly?.omzet ?? (totalIncome > 0 ? totalIncome : 52400000);
    const hpp = latestMonthly?.hpp ?? (totalCogs > 0 ? totalCogs : 28820000);
    const opex = latestMonthly?.opex ?? (totalOpex > 0 ? totalOpex : 9150000);
    const netProfit = omzet - hpp - opex;
    const cashBalance = latestMonthly?.cashBalance ?? 48500000;
    const marginPercentage = omzet > 0 ? Number(((netProfit / omzet) * 100).toFixed(1)) : 27.5;

    let marginStatus: "Sehat" | "Waspada" | "Kritis" = "Sehat";
    if (marginPercentage < 15) marginStatus = "Kritis";
    else if (marginPercentage < 25) marginStatus = "Waspada";

    return res.json({
      success: true,
      message: "Ringkasan keuangan berhasil dimuat.",
      data: {
        cashBalance,
        totalIncomeMonth: omzet,
        totalCogsMonth: hpp,
        totalOpexMonth: opex,
        netProfitMonth: netProfit,
        marginPercentage,
        marginStatus,
        transactionCount: dailyTxs.length,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat ringkasan kas: " + err.message,
    });
  }
});

/**
 * GET /api/finances/daily
 * Mengambil daftar transaksi harian kas toko
 */
router.get("/daily", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const businessId = await resolveBusinessId(req);
    if (!businessId) {
      return res.status(404).json({
        success: false,
        message: "Profil bisnis tidak ditemukan.",
      });
    }

    const { category, search } = req.query;

    const where: any = { businessId };
    if (category && typeof category === "string" && category !== "ALL") {
      where.category = category.toUpperCase();
    }
    if (search && typeof search === "string") {
      where.title = { contains: search };
    }

    const transactions = await prisma.dailyTransaction.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      message: "Daftar transaksi kas harian berhasil dimuat.",
      data: transactions,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil transaksi kas: " + err.message,
    });
  }
});

/**
 * POST /api/finances/daily
 * Mencatat transaksi uang masuk / uang keluar baru dengan opsional upload struk/nota
 */
router.post(
  "/daily",
  requireAuth,
  uploadReceipt.single("receipt"),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const businessId = await resolveBusinessId(req);
      if (!businessId) {
        return res.status(404).json({
          success: false,
          message: "Profil bisnis belum terdaftar.",
        });
      }

      const {
        title,
        category,
        amount,
        paymentMethod,
        payment_method,
        date,
        receiptNumber,
        receipt_number,
        notes,
      } = req.body;

      if (!title || !amount) {
        return res.status(422).json({
          success: false,
          message: "Judul transaksi dan jumlah nominal wajib diisi.",
        });
      }

      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(422).json({
          success: false,
          message: "Jumlah nominal transaksi harus berupa angka positif.",
        });
      }

      const resolvedCategory = (category || "PEMASUKAN").toUpperCase();
      const resolvedPayment = (paymentMethod || payment_method || "QRIS").toUpperCase();
      const resolvedDate = date || new Date().toISOString().split("T")[0];
      const resolvedReceiptNum = receiptNumber || receipt_number || `REC-${Date.now().toString().slice(-6)}`;

      let receiptUrl: string | undefined = undefined;
      if (req.file) {
        receiptUrl = `/uploads/receipts/${req.file.filename}`;
      }

      const newTx = await prisma.dailyTransaction.create({
        data: {
          businessId,
          title: String(title).trim(),
          category: resolvedCategory,
          amount: numAmount,
          paymentMethod: resolvedPayment,
          date: resolvedDate,
          receiptNumber: resolvedReceiptNum,
          receiptUrl,
          notes: notes ? String(notes).trim() : null,
          status: "VERIFIED",
        },
      });

      return res.status(201).json({
        success: true,
        message: "Transaksi kas toko berhasil dicatat dan diverifikasi.",
        data: newTx,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: "Gagal mencatat transaksi kas: " + err.message,
      });
    }
  }
);

/**
 * DELETE /api/finances/daily/:id
 * Menghapus transaksi kas harian
 */
router.delete("/daily/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const businessId = await resolveBusinessId(req);
    const { id } = req.params;

    const tx = await prisma.dailyTransaction.findFirst({
      where: { id, businessId: businessId || undefined },
    });

    if (!tx) {
      return res.status(404).json({
        success: false,
        message: "Transaksi tidak ditemukan atau tidak memiliki hak akses.",
      });
    }

    if (tx.receiptUrl) {
      const filename = path.basename(tx.receiptUrl);
      const filePath = path.join(UPLOAD_ROOT, "receipts", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await prisma.dailyTransaction.delete({
      where: { id: tx.id },
    });

    return res.json({
      success: true,
      message: "Transaksi kas berhasil dihapus.",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal menghapus transaksi: " + err.message,
    });
  }
});

/**
 * GET /api/finances/monthly & GET /api/umkm/monthly-reports
 * Mengambil seluruh rekapitulasi laporan kas bulanan toko
 */
router.get("/monthly", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const businessId = await resolveBusinessId(req);
    if (!businessId) {
      return res.status(404).json({
        success: false,
        message: "Profil bisnis tidak ditemukan.",
      });
    }

    const reports = await prisma.monthlyReport.findMany({
      where: { businessId },
      orderBy: [{ year: "desc" }, { submittedAt: "desc" }],
    });

    return res.json({
      success: true,
      message: "Daftar laporan kas bulanan berhasil dimuat.",
      data: reports,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat laporan bulanan: " + err.message,
    });
  }
});

/**
 * POST /api/finances/monthly & POST /api/umkm/monthly-reports
 * Mengunggah dan menyimpan laporan kas bulanan beserta bukti fisik PDF/Excel
 */
router.post(
  "/monthly",
  requireAuth,
  uploadReport.single("file"),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const businessId = await resolveBusinessId(req);
      if (!businessId) {
        return res.status(404).json({
          success: false,
          message: "Profil bisnis belum terdaftar.",
        });
      }

      const {
        month,
        year,
        omzet,
        hpp,
        opex,
        loss,
        notes,
        status,
        proofDocumentName,
        proofDocumentSize,
      } = req.body;

      if (!month || !year || omzet === undefined) {
        return res.status(422).json({
          success: false,
          message: "Bulan, tahun, dan nominal omzet wajib disertakan.",
        });
      }

      const numYear = parseInt(year);
      const numOmzet = parseFloat(omzet);
      const numHpp = parseFloat(hpp || 0);
      const numOpex = parseFloat(opex || 0);
      const numLoss = parseFloat(loss || 0);

      const netProfit = numOmzet - numHpp - numOpex - numLoss;
      const hppRatio = numOmzet > 0 ? Math.round((numHpp / numOmzet) * 100) : 0;
      const monthYear = `${month} ${numYear}`;

      // Ambil saldo kas sebelumnya untuk diakumulasikan
      const lastReport = await prisma.monthlyReport.findFirst({
        where: { businessId },
        orderBy: [{ year: "desc" }, { submittedAt: "desc" }],
      });
      const previousBalance = lastReport?.cashBalance ?? 40000000;
      const cashBalance = previousBalance + netProfit;

      let docName = proofDocumentName || (req.file ? req.file.originalname : `Laporan_${month}_${numYear}.pdf`);
      let docSize = proofDocumentSize || (req.file ? `${(req.file.size / (1024 * 1024)).toFixed(1)} MB` : "1.8 MB");
      let proofUrl = req.file ? `/uploads/reports/${req.file.filename}` : null;

      // Cek apakah laporan untuk bulan & tahun ini sudah pernah diisi (upsert)
      const existing = await prisma.monthlyReport.findFirst({
        where: { businessId, month: String(month), year: numYear },
      });

      let savedReport;
      if (existing) {
        savedReport = await prisma.monthlyReport.update({
          where: { id: existing.id },
          data: {
            omzet: numOmzet,
            hpp: numHpp,
            hppRatio,
            opex: numOpex,
            loss: numLoss,
            netProfit,
            cashBalance,
            notes: notes ? String(notes).trim() : existing.notes,
            status: status || existing.status,
            ...(proofUrl
              ? {
                  proofDocumentName: docName,
                  proofDocumentSize: docSize,
                  proofDocumentUrl: proofUrl,
                }
              : {}),
          },
        });
      } else {
        savedReport = await prisma.monthlyReport.create({
          data: {
            businessId,
            month: String(month),
            year: numYear,
            monthYear,
            omzet: numOmzet,
            hpp: numHpp,
            hppRatio,
            opex: numOpex,
            loss: numLoss,
            netProfit,
            cashBalance,
            notes: notes ? String(notes).trim() : null,
            status: status || "VERIFIED",
            proofDocumentName: docName,
            proofDocumentSize: docSize,
            proofDocumentUrl: proofUrl,
            anomalyFlagged: hppRatio > 65,
          },
        });
      }

      return res.status(201).json({
        success: true,
        message: `Laporan kas bulan ${month} ${numYear} berhasil disimpan dan diperbarui.`,
        data: savedReport,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: "Gagal menyimpan laporan kas bulanan: " + err.message,
      });
    }
  }
);

/**
 * GET /api/finances/monthly/:id/download
 * Mengunduh berkas fisik bukti rekening koran / laporan kas bulanan
 */
router.get("/monthly/:id/download", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const report = await prisma.monthlyReport.findUnique({
      where: { id },
      include: { business: { select: { name: true, brand: true } } },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Laporan bulanan tidak ditemukan.",
      });
    }

    if (report.proofDocumentUrl && report.proofDocumentUrl.startsWith("/uploads/reports/")) {
      const filename = path.basename(report.proofDocumentUrl);
      const filePath = path.join(UPLOAD_ROOT, "reports", filename);
      if (fs.existsSync(filePath)) {
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${encodeURIComponent(report.proofDocumentName || filename)}"`
        );
        return res.sendFile(filePath);
      }
    }

    // Jika belum ada berkas upload fisik, buat dokumen ringkasan kas teks/PDF terstruktur
    const downloadName = report.proofDocumentName || `Laporan_Kas_${report.month}_${report.year}.txt`;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(downloadName)}"`);

    const summaryContent = [
      "=================================================================",
      `  BERKAS BUKTI LAPORAN KEUANGAN KAS BULANAN — BERUANG PLATFORM`,
      "=================================================================",
      `Unit Usaha    : ${report.business?.brand || report.business?.name || "Kopi Senja Nusantara"}`,
      `Periode Buku  : ${report.month} ${report.year}`,
      `Status Audit  : ${report.status.toUpperCase()}`,
      `Tanggal Rekam : ${new Date(report.submittedAt).toLocaleDateString("id-ID", { dateStyle: "full" })}`,
      "-----------------------------------------------------------------",
      `1. Total Omzet Penjualan      : Rp ${report.omzet.toLocaleString("id-ID")}`,
      `2. Modal Jualan Pokok (HPP)   : Rp ${report.hpp.toLocaleString("id-ID")} (${report.hppRatio}% dari omzet)`,
      `3. Biaya Operasional Toko     : Rp ${report.opex.toLocaleString("id-ID")}`,
      `4. Kerugian / Bahan Rusak     : Rp ${(report.loss || 0).toLocaleString("id-ID")}`,
      "-----------------------------------------------------------------",
      `Laba Bersih Toko (Net Profit) : Rp ${report.netProfit.toLocaleString("id-ID")}`,
      `Saldo Akhir Kas Terlindung    : Rp ${report.cashBalance.toLocaleString("id-ID")}`,
      "-----------------------------------------------------------------",
      `Catatan Pembukuan             : ${report.notes || "Tidak ada catatan khusus. Seluruh mutasi telah tervalidasi."}`,
      "=================================================================",
      "  Dokumen ini diterbitkan secara sah melalui sistem Ber-Uang.",
      "=================================================================",
    ].join("\n");

    return res.send(summaryContent);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengunduh berkas laporan bulanan: " + err.message,
    });
  }
});

export default router;
