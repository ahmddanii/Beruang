import { Router, Response } from "express";
import { prisma } from "../index.js";
import { optionalAuth, requireAuth, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

/**
 * Normalisasi ID bisnis
 */
function toFrontendId(dbId?: string | null): string {
  if (!dbId) return "umkm-01";
  if (dbId === "biz-kopisenja-01") return "umkm-01";
  return dbId;
}

function toDbId(frontendId: string): string {
  if (frontendId === "umkm-01") return "biz-kopisenja-01";
  return frontendId;
}

/**
 * Format ChatMessage dari database
 */
function formatMessage(m: any) {
  let attachment = undefined;
  if (m.attachmentType && m.attachmentTitle) {
    attachment = {
      type: m.attachmentType as "METRIC" | "DOCUMENT" | "DEAL_OFFER",
      title: m.attachmentTitle,
      subtitle: m.attachmentSubtitle || "",
      value: m.attachmentValue || "",
    };
  }

  return {
    id: m.id,
    senderRole: m.senderRole as "INVESTOR" | "UMKM",
    senderName: m.senderName,
    text: m.text,
    timestamp: m.timestamp,
    attachment,
  };
}

/**
 * Format ChatThread dari database
 */
function formatThread(t: any) {
  const feId = toFrontendId(t.businessId || t.umkmId);
  const biz = t.business;

  return {
    id: t.id,
    businessId: t.businessId || feId,
    umkmId: feId,
    umkmName: biz?.brand || biz?.name || (feId === "umkm-01" ? "Kopi Senja Nusantara" : "UMKM Binaan Beruang"),
    umkmOwner: biz?.ownerName || (feId === "umkm-01" ? "Fikri Setiawan (Founder)" : "Pengelola Toko"),
    umkmSector: biz?.sector || "F&B (Coffee & Drinks)",
    umkmCity: biz?.city || "Bandung",
    umkmAvatar: "/images/default-store-banner.jpg",
    umkmHealthScore: biz?.assessment?.compositeScore || (feId === "umkm-01" ? 79 : 0),
    umkmMargin: feId === "umkm-01" ? 48.5 : 0,
    investorId: t.investorId || "usr-inv-01",
    investorName: t.investorName || "Hendro Wicaksono",
    investorLembaga: t.investorLembaga || "Nusantara Impact Angel Syndicate",
    investorAvatar: t.investorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    contactName: t.investorName || "Hendro Wicaksono",
    contactAvatar: t.investorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    category: "prioritas" as const,
    online: true,
    dealStatus: t.dealStatus || "Tahap Due Diligence Kas",
    ticketDiscussed: t.ticketDiscussed || 250000000,
    unreadInvestor: t.unreadInvestor || 0,
    unreadUmkm: t.unreadUmkm || 0,
    unreadCount: (t.unreadInvestor || 0) + (t.unreadUmkm || 0),
    lastMessage: t.lastMessage || "Percakapan aktif.",
    lastMessageAt: t.lastMessageAt || "Baru saja",
    messages: (t.messages || []).map(formatMessage),
  };
}

/**
 * Pastikan database memiliki thread percakapan bawaan untuk demo & operasional
 */
async function ensureSeedThreads() {
  try {
    const count = await prisma.chatThread.count();
    if (count > 0) return;

    const biz = await prisma.businessProfile.findFirst({
      where: { OR: [{ id: "biz-kopisenja-01" }, { brand: { contains: "Kopi Senja" } }] },
    });
    const businessId = biz?.id || undefined;

    // 1. Thread East Ventures (Franklyn Galvin Lodo)
    await prisma.chatThread.create({
      data: {
        id: "thread-01",
        businessId,
        investorId: "usr-inv-01",
        investorName: "Franklyn Galvin Lodo",
        investorLembaga: "East Ventures Associate",
        investorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        dealStatus: "Tahap Due Diligence Kas",
        ticketDiscussed: 250000000,
        unreadInvestor: 0,
        unreadUmkm: 1,
        lastMessage: "Franklyn: Kami sedang mengkaji proyeksi arus kas tokomu.",
        lastMessageAt: "8 Agu",
        messages: {
          create: [
            {
              id: "m-01",
              senderRole: "INVESTOR",
              senderName: "Franklyn Galvin Lodo",
              text: "Halo, salam kenal. Kami dari komite investasi telah meninjau profil tokomu di Beruang.",
              timestamp: "09:45",
            },
            {
              id: "m-02",
              senderRole: "UMKM",
              senderName: "Fikri Setiawan",
              text: "Halo Mas Franklyn, salam kenal kembali! Terima kasih banyak atas apresiasinya.",
              timestamp: "09:58",
            },
            {
              id: "m-03",
              senderRole: "INVESTOR",
              senderName: "Franklyn Galvin Lodo",
              text: "Franklyn: Kami sedang mengkaji proyeksi arus kas tokomu.",
              timestamp: "8 Agu",
            },
          ],
        },
      },
    });

    // 2. Thread Inkubator Bisnis (Raihan Fariz N.)
    await prisma.chatThread.create({
      data: {
        id: "thread-02",
        businessId,
        investorId: "usr-inv-02",
        investorName: "Raihan Fariz N.",
        investorLembaga: "Inkubator Bisnis UMKM",
        investorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        dealStatus: "Pendampingan Validasi",
        ticketDiscussed: 150000000,
        unreadInvestor: 0,
        unreadUmkm: 0,
        lastMessage: "Raihan Fariz: Kami mengenal satu sama lain dari program inkubasi.",
        lastMessageAt: "4 Mei",
        messages: {
          create: [
            {
              id: "m-11",
              senderRole: "INVESTOR",
              senderName: "Raihan Fariz N.",
              text: "Raihan Fariz: Kami mengenal satu sama lain dari program inkubasi.",
              timestamp: "4 Mei 11:20",
            },
          ],
        },
      },
    });

    // 3. Thread Konsultan Keuangan (Dra. Maya Suryani)
    await prisma.chatThread.create({
      data: {
        id: "thread-04",
        businessId,
        investorId: "usr-cons-01",
        investorName: "Dra. Maya Suryani",
        investorLembaga: "Konsultan Keuangan Beruang",
        investorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
        dealStatus: "Konsultasi Rutin",
        ticketDiscussed: 0,
        unreadInvestor: 0,
        unreadUmkm: 0,
        lastMessage: "Maya: Rapor keuangan bulan ini sudah selesai kami validasi.",
        lastMessageAt: "Kemarin",
        messages: {
          create: [
            {
              id: "m-31",
              senderRole: "INVESTOR",
              senderName: "Dra. Maya Suryani",
              text: "Maya: Rapor keuangan bulan ini sudah selesai kami validasi.",
              timestamp: "Kemarin",
            },
          ],
        },
      },
    });
    console.log("✅ Seeded default ChatThreads into database.");
  } catch (err: any) {
    console.warn("⚠️ Warning auto-seeding chat threads:", err.message);
  }
}

/**
 * GET /api/chat/threads
 * Mengambil daftar percakapan aktif antar UMKM dan Investor
 */
router.get("/threads", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    await ensureSeedThreads();

    let whereClause: any = {};
    if (req.user?.role === "UMKM") {
      const isDemo = req.user.email?.toLowerCase() === "fikri@kopisenja.id" || req.user.id === "usr-demo-01";
      if (!isDemo) {
        const biz = await prisma.businessProfile.findFirst({ where: { userId: req.user.id } });
        if (biz) {
          whereClause = { businessId: biz.id };
        }
      }
    }

    const threads = await prisma.chatThread.findMany({
      where: whereClause,
      include: {
        business: {
          include: {
            assessment: true,
          },
        },
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return res.json({
      success: true,
      message: "Daftar percakapan berhasil dimuat.",
      data: threads.map(formatThread),
    });
  } catch (err: any) {
    console.error("❌ Error fetch chat threads:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal memuat percakapan: " + err.message,
    });
  }
});

/**
 * GET /api/chat/threads/:id/messages
 * Riwayat pesan dalam satu thread
 */
router.get("/threads/:id/messages", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const messages = await prisma.chatMessage.findMany({
      where: { threadId: id },
      orderBy: { createdAt: "asc" },
    });

    return res.json({
      success: true,
      message: "Riwayat pesan berhasil dimuat.",
      data: messages.map(formatMessage),
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat pesan thread: " + err.message,
    });
  }
});

/**
 * POST /api/chat/threads/:id/messages
 * Kirim pesan baru (teks biasa atau lampiran Term Sheet / Metrik)
 */
router.post("/threads/:id/messages", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { text, attachment, attachment_type, attachmentType, attachmentTitle, attachmentSubtitle, attachmentValue } = req.body;

    if (!text || text.trim() === "") {
      return res.status(422).json({
        success: false,
        message: "Teks pesan tidak boleh kosong.",
      });
    }

    let thread = await prisma.chatThread.findUnique({
      where: { id },
    });

    if (!thread) {
      await ensureSeedThreads();
      thread = await prisma.chatThread.findUnique({
        where: { id },
      });
    }

    if (!thread) {
      // Auto-create thread if dynamically initiated
      thread = await prisma.chatThread.create({
        data: {
          id,
          dealStatus: "Diskusi Penjajakan",
          ticketDiscussed: 150000000,
          lastMessage: text.trim(),
        },
      });
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    // Tentukan pengirim berdasarkan user aktif
    const userRole = req.user?.role || "UMKM";
    const senderRole = userRole === "INVESTOR" ? "INVESTOR" : "UMKM";
    const senderName = req.user?.name || (senderRole === "INVESTOR" ? thread.investorName || "Hendro Wicaksono" : "Fikri Setiawan");

    const attachObj = attachment || {};
    const attachType = attachmentType || attachment_type || attachObj.type || null;
    const attachTitle = attachmentTitle || attachObj.title || null;
    const attachSubtitle = attachmentSubtitle || attachObj.subtitle || null;
    const attachVal = attachmentValue || attachObj.value || null;

    // Simpan pesan baru
    const newMsg = await prisma.chatMessage.create({
      data: {
        threadId: id,
        senderRole,
        senderName,
        text: text.trim(),
        timestamp: timeStr,
        attachmentType: attachType,
        attachmentTitle: attachTitle,
        attachmentSubtitle: attachSubtitle,
        attachmentValue: attachVal,
      },
    });

    // Perbarui status thread dan unread counter lawan bicara
    await prisma.chatThread.update({
      where: { id },
      data: {
        lastMessage: text.trim(),
        lastMessageAt: timeStr,
        unreadUmkm: senderRole === "INVESTOR" ? { increment: 1 } : thread.unreadUmkm,
        unreadInvestor: senderRole === "UMKM" ? { increment: 1 } : thread.unreadInvestor,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Pesan berhasil dikirimkan.",
      data: formatMessage(newMsg),
    });
  } catch (err: any) {
    console.error("❌ Error sending chat message:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal mengirim pesan: " + err.message,
    });
  }
});

/**
 * PATCH /api/chat/threads/:id/read
 * Menandai pesan telah dibaca
 */
router.patch("/threads/:id/read", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userRole = req.user?.role || "UMKM";

    await prisma.chatThread.update({
      where: { id },
      data: {
        ...(userRole === "INVESTOR" ? { unreadInvestor: 0 } : { unreadUmkm: 0 }),
      },
    });

    return res.json({
      success: true,
      message: "Pesan ditandai telah dibaca.",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui status baca: " + err.message,
    });
  }
});

/**
 * POST /api/chat/threads
 * Membuat thread percakapan baru dengan UMKM dari profil atau katalog
 */
router.post("/threads", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { businessId, initialMessage } = req.body;
    if (!businessId) {
      return res.status(422).json({ success: false, message: "businessId wajib diisi." });
    }

    const dbBusinessId = toDbId(businessId);
    const biz = await prisma.businessProfile.findFirst({
      where: {
        OR: [{ id: dbBusinessId }, { id: businessId }],
      },
      include: { user: true, assessment: true },
    });

    // Cek apakah thread sudah ada
    const existing = await prisma.chatThread.findFirst({
      where: {
        OR: [
          { businessId: biz?.id },
          { umkmId: businessId },
          { businessId: dbBusinessId },
        ],
      },
      include: {
        business: { include: { assessment: true } },
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (existing) {
      return res.json({
        success: true,
        message: "Thread percakapan ditemukan.",
        data: formatThread(existing),
      });
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const initText = initialMessage || "Halo! Kami melihat profil usaha Anda di katalog Beruang dan tertarik untuk menjalin diskusi terkait kesiapan pendanaan.";

    // Buat thread baru
    const newThread = await prisma.chatThread.create({
      data: {
        businessId: biz?.id || dbBusinessId,
        umkmId: businessId,
        investorId: req.user?.id || "usr-inv-01",
        investorName: req.user?.name || "Hendro Wicaksono",
        investorLembaga: "Nusantara Impact Angel Syndicate",
        dealStatus: "Tahap Penjajakan Awal",
        ticketDiscussed: biz?.fundingTarget || 150000000,
        unreadInvestor: 0,
        unreadUmkm: 1,
        lastMessage: initText,
        lastMessageAt: timeStr,
        messages: {
          create: {
            senderRole: "INVESTOR",
            senderName: req.user?.name || "Hendro Wicaksono",
            text: initText,
            timestamp: timeStr,
          },
        },
      },
      include: {
        business: { include: { assessment: true } },
        messages: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Percakapan baru berhasil dibuat.",
      data: formatThread(newThread),
    });
  } catch (err: any) {
    console.error("❌ Error starting chat thread:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal membuat thread percakapan: " + err.message,
    });
  }
});

export default router;
