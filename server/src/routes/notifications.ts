import { Router, Response } from "express";
import { prisma } from "../index.js";
import { optionalAuth, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

/**
 * Format timestamp relatif
 */
function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "Baru saja";
  if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays === 1) return "Kemarin";
  return `${diffDays} hari lalu`;
}

/**
 * Format output AppNotification
 */
function formatNotification(n: any) {
  const isToday = (Date.now() - new Date(n.createdAt).getTime()) < 24 * 60 * 60 * 1000;

  return {
    id: n.id,
    title: n.title,
    message: n.message,
    category: n.category as "KONSULTAN" | "INVESTOR" | "KESEHATAN" | "KAS" | "AKSI",
    priority: n.priority as "HIGH" | "NORMAL",
    timestamp: formatRelativeTime(n.createdAt),
    date: n.createdAt.toISOString(),
    isRead: n.isRead,
    link: n.link,
    actionLabel: n.actionLabel || "Lihat Kas",
    roleTarget: n.roleTarget || "ALL",
    senderName: n.senderName || "Sistem Beruang",
    actionDetail: n.actionDetail || "",
    quoteSnippet: n.quoteSnippet || "",
    avatar: n.avatar || "/images/user-profile.png",
    badgeCount: n.badgeCount || 0,
    iconType: n.iconType || "avatar",
    sectionGroup: n.sectionGroup || (isToday ? "today" : "yesterday"),
  };
}

/**
 * GET /api/notifications
 * Mengambil daftar notifikasi terpadu untuk pengguna yang aktif
 */
router.get("/", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userRole = req.user?.role || "UMKM";
    const userId = req.user?.id;
    const isDemo = req.user?.email === "fikri@kopisenja.id";

    let notifications: any[] = [];
    if (userId) {
      if (isDemo) {
        // Akun demo Fikri Setiawan (Kopi Senja Nusantara)
        notifications = await prisma.notification.findMany({
          where: {
            OR: [
              { userId },
              { roleTarget: userRole }
            ]
          },
          orderBy: { createdAt: "desc" },
        });
      } else {
        // Akun pengguna riil: HANYA notifikasi miliknya sendiri secara ketat
        notifications = await prisma.notification.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
        });
      }
    } else {
      // Guest atau belum login: KOSONGKAN notifikasi (tidak membocorkan data dummy)
      notifications = [];
    }

    return res.json({
      success: true,
      message: "Daftar notifikasi berhasil dimuat.",
      data: notifications.map(formatNotification),
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat notifikasi: " + err.message });
  }
});

/**
 * PATCH /api/notifications/:id/read
 * Menandai satu notifikasi telah dibaca
 */
router.patch("/:id/read", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const notif = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notif) {
      return res.status(404).json({ success: false, message: "Notifikasi tidak ditemukan." });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    return res.json({
      success: true,
      message: "Notifikasi telah ditandai dibaca.",
      data: formatNotification(updated),
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui status notifikasi: " + err.message });
  }
});

/**
 * PATCH /api/notifications/mark-all-read
 * Menandai seluruh notifikasi telah dibaca
 */
router.patch("/mark-all-read", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role || "UMKM";

    if (userId) {
      await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
      });
    } else {
      await prisma.notification.updateMany({
        where: {
          OR: [{ roleTarget: userRole }, { roleTarget: "ALL" }],
          isRead: false,
        },
        data: { isRead: true },
      });
    }

    return res.json({
      success: true,
      message: "Seluruh notifikasi berhasil ditandai telah dibaca.",
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menandai semua notifikasi: " + err.message });
  }
});

/**
 * DELETE /api/notifications/:id
 * Menghapus notifikasi
 */
router.delete("/:id", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.notification.delete({
      where: { id },
    });

    return res.json({
      success: true,
      message: "Notifikasi berhasil dihapus.",
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menghapus notifikasi: " + err.message });
  }
});

/**
 * POST /api/notifications
 * Dispatcher untuk membuat notifikasi baru secara programatis
 */
router.post("/", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      message,
      category,
      priority,
      link,
      actionLabel,
      roleTarget,
      senderName,
      actionDetail,
      quoteSnippet,
      avatar,
      iconType,
    } = req.body;

    const defaultUser = await prisma.user.findFirst();

    const created = await prisma.notification.create({
      data: {
        userId: req.user?.id || defaultUser?.id || "usr-umkm-01",
        title: title || "Pemberitahuan Baru",
        message: message || "Ada pembaruan status pada tokomu.",
        category: category || "KAS",
        priority: priority || "NORMAL",
        link: link || "/dashboard/progres",
        actionLabel: actionLabel || "Lihat Kas",
        roleTarget: roleTarget || "ALL",
        senderName: senderName || "Sistem Beruang",
        actionDetail: actionDetail || "",
        quoteSnippet: quoteSnippet || "",
        avatar: avatar || "/images/user-profile.png",
        iconType: iconType || "avatar",
        sectionGroup: "today",
        isRead: false,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Notifikasi berhasil dibuat.",
      data: formatNotification(created),
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal membuat notifikasi: " + err.message });
  }
});

export default router;
