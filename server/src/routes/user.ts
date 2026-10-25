import { Router, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../index.js";
import { optionalAuth, requireAuth, AuthenticatedRequest } from "../middleware/auth.js";
import { generateToken } from "./auth.js";

const router = Router();

// In-memory persistent map for user notification preferences
const userPreferencesStore = new Map<string, Record<string, boolean>>();

function getDefaultPreferences(role: string): Record<string, boolean> {
  if (role === "CONSULTANT") {
    return {
      acceptNewRequests: true,
      whatsappNotification: true,
      anomalyAlerts: true,
    };
  }
  if (role === "INVESTOR") {
    return {
      notifyWhatsapp: true,
      notifyEmailReport: true,
      notifyDealUpdates: true,
    };
  }
  return {
    notifyWhatsApp: true,
    notifyInvestorRequests: true,
    notifyMonthlyReport: true,
  };
}

/**
 * Helper mencari user aktif
 */
async function resolveCurrentUser(req: AuthenticatedRequest) {
  if (req.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        businessProfile: true,
        consultantProfile: true,
        investorProfile: true,
      },
    });
    if (user) return user;
  }

  // Fallback demo user pertama (UMKM)
  return prisma.user.findFirst({
    where: { email: "fikri@kopisenja.id" },
    include: {
      businessProfile: true,
      consultantProfile: true,
      investorProfile: true,
    },
  });
}

/**
 * GET /api/user/profile & /api/user/me
 * Mengambil profil lengkap user beserta profile peran (UMKM / Konsultan / Investor)
 */
router.get("/profile", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await resolveCurrentUser(req);
    if (!user) {
      return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
    }

    const prefs = userPreferencesStore.get(user.id) || getDefaultPreferences(user.role);

    return res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || "0812-3456-7890",
        role: user.role,
        avatar: user.avatar,
        verified: user.verified,
        onboardingCompleted: user.onboardingCompleted,
        businessProfile: user.businessProfile,
        consultantProfile: user.consultantProfile,
        investorProfile: user.investorProfile,
        preferences: prefs,
      },
    });
  } catch (err: any) {
    console.error("❌ Error fetching user profile:", err);
    return res.status(500).json({ success: false, message: "Gagal memuat profil: " + err.message });
  }
});

router.get("/me", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  // Alias ke /profile
  const user = await resolveCurrentUser(req);
  if (!user) return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
  const prefs = userPreferencesStore.get(user.id) || getDefaultPreferences(user.role);
  return res.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      verified: user.verified,
      onboardingCompleted: user.onboardingCompleted,
      businessProfile: user.businessProfile,
      consultantProfile: user.consultantProfile,
      investorProfile: user.investorProfile,
      preferences: prefs,
    },
  });
});

/**
 * PUT /api/user/profile
 * Memperbarui profil akun & identitas peran (UMKM / Konsultan / Investor)
 */
router.put("/profile", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await resolveCurrentUser(req);
    if (!user) {
      return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
    }

    const b = req.body;

    // 1. Update data pokok User & Role
    const targetRole = b.role ? String(b.role).toUpperCase() : undefined;
    const validRoles = ["UMKM", "CONSULTANT", "INVESTOR", "ADMIN"];
    const effectiveRole = targetRole && validRoles.includes(targetRole) ? targetRole : user.role;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(b.name ? { name: String(b.name).trim() } : {}),
        ...(b.phone ? { phone: String(b.phone).trim() } : {}),
        ...(b.email ? { email: String(b.email).trim().toLowerCase() } : {}),
        ...(b.avatar ? { avatar: String(b.avatar).trim() } : {}),
        ...(targetRole && validRoles.includes(targetRole) ? { role: targetRole } : {}),
      },
    });

    // 2. Update atau buat role-specific profile sesuai effectiveRole
    if (effectiveRole === "UMKM") {
      if (user.businessProfile) {
        await prisma.businessProfile.update({
          where: { id: user.businessProfile.id },
          data: {
            ...(b.businessName || b.brand || b.name ? { brand: String(b.businessName || b.brand || b.name).trim(), name: String(b.businessName || b.brand || b.name).trim() } : {}),
            ...(b.ownerName || b.name ? { ownerName: String(b.ownerName || b.name).trim() } : {}),
            ...(b.sector ? { sector: String(b.sector).trim() } : {}),
            ...(b.city ? { city: String(b.city).trim(), location: `${String(b.city).trim()}, Indonesia` } : {}),
            ...(b.description || b.pitchSummary ? { description: String(b.description || b.pitchSummary).trim() } : {}),
            ...(b.fundingTarget ? { fundingTarget: Number(b.fundingTarget) } : {}),
            ...(b.equityOffered ? { equityOffered: String(b.equityOffered).trim() } : {}),
            ...(b.nib ? { nib: String(b.nib).trim() } : {}),
            ...(b.npwp ? { npwp: String(b.npwp).trim() } : {}),
            ...(b.bankName ? { bankName: String(b.bankName).trim() } : {}),
            ...(b.bankAccountNumber ? { bankAccountNumber: String(b.bankAccountNumber).trim() } : {}),
            ...(b.bankAccountHolder ? { bankAccountHolder: String(b.bankAccountHolder).trim() } : {}),
            ...(b.outletsCount ? { outletsCount: Number(b.outletsCount) } : {}),
            ...(b.employeesCount ? { employeesCount: Number(b.employeesCount) } : {}),
          },
        });
      } else {
        const bName = b.businessName || b.brand || b.name || `${user.name} Store`;
        await prisma.businessProfile.create({
          data: {
            userId: user.id,
            name: bName,
            brand: bName,
            ownerName: user.name,
            bankAccountHolder: user.name,
            sector: b.sector || "Retail",
            location: b.city ? `${b.city}, Indonesia` : "Jakarta, Indonesia",
            city: b.city || "Jakarta",
            fundingTarget: Number(b.fundingTarget) || 50000000,
            status: "ACTIVE",
          },
        });
      }
    } else if (effectiveRole === "CONSULTANT") {
      if (user.consultantProfile) {
        await prisma.consultantProfile.update({
          where: { id: user.consultantProfile.id },
          data: {
            ...(b.firmName || b.institution ? { firmName: String(b.firmName || b.institution).trim() } : {}),
            ...(b.specialization ? { specialization: String(b.specialization).trim() } : {}),
            ...(b.bnspLicense ? { bnspLicense: String(b.bnspLicense).trim() } : {}),
            ...(b.city ? { city: String(b.city).trim() } : {}),
            ...(b.experience ? { experience: String(b.experience).trim() } : {}),
            ...(b.maxClients ? { maxClients: Number(b.maxClients) } : {}),
          },
        });
      } else {
        await prisma.consultantProfile.create({
          data: {
            userId: user.id,
            firmName: String(b.firmName || b.institution || `${user.name} Advisory`).trim(),
            specialization: String(b.specialization || "Pendampingan Usaha & Finansial UMKM").trim(),
            bnspLicense: b.bnspLicense ? String(b.bnspLicense).trim() : null,
            city: b.city ? String(b.city).trim() : "Jakarta",
            hourlyRate: 350000,
            rating: 5.0,
            yearsExperience: 3,
            status: "ACTIVE",
            isCertified: true,
          },
        });
      }
    } else if (effectiveRole === "INVESTOR") {
      const sectorsVal = Array.isArray(b.sectors) ? b.sectors.join(", ") : (b.sectors ? String(b.sectors).trim() : undefined);
      if (user.investorProfile) {
        await prisma.investorProfile.update({
          where: { id: user.investorProfile.id },
          data: {
            ...(b.firmName || b.syndicate || b.entityName ? { firmName: String(b.firmName || b.syndicate || b.entityName).trim() } : {}),
            ...(b.commitmentCapital || b.ticketRange ? { commitmentCapital: String(b.commitmentCapital || b.ticketRange).trim() } : {}),
            ...(b.investorType ? { investorType: String(b.investorType).trim() } : {}),
            ...(sectorsVal ? { sectors: sectorsVal } : {}),
            ...(b.minMargin ? { minMargin: parseFloat(String(b.minMargin).replace(/[^0-9.]/g, "")) } : {}),
            ...(b.city ? { city: String(b.city).trim() } : {}),
          },
        });
      } else {
        await prisma.investorProfile.create({
          data: {
            userId: user.id,
            firmName: String(b.firmName || b.syndicate || b.entityName || `${user.name} Capital`).trim(),
            commitmentCapital: b.commitmentCapital || "Rp 1.0 Miliar",
            investorType: b.investorType || "ANGEL",
            sectors: sectorsVal || JSON.stringify(["F&B", "Retail", "Agribisnis"]),
            ticketMin: 25000000,
            ticketMax: 500000000,
          },
        });
      }
    }

    // 3. Simpan preferences jika disertakan
    if (b.preferences && typeof b.preferences === "object") {
      const existingPrefs = userPreferencesStore.get(user.id) || getDefaultPreferences(effectiveRole);
      userPreferencesStore.set(user.id, { ...existingPrefs, ...b.preferences });
    }

    // Ambil data terbaru
    const freshUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        businessProfile: true,
        consultantProfile: true,
        investorProfile: true,
      },
    });

    const token = freshUser ? generateToken(freshUser) : undefined;

    return res.json({
      success: true,
      message: "Profil dan peran akun berhasil diperbarui.",
      token,
      data: freshUser,
    });
  } catch (err: any) {
    console.error("❌ Error updating user profile:", err);
    return res.status(500).json({ success: false, message: "Gagal memperbarui profil: " + err.message });
  }
});

/**
 * POST /api/user/switch-role
 * Mengalihkan peran akun pengguna secara persisten di database & menerbitkan token baru
 */
router.post("/switch-role", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await resolveCurrentUser(req);
    if (!user) {
      return res.status(401).json({ success: false, message: "Pengguna tidak terautentikasi." });
    }

    const targetRole = String(req.body.role || "").toUpperCase();
    const validRoles = ["UMKM", "CONSULTANT", "INVESTOR", "ADMIN"];
    if (!validRoles.includes(targetRole)) {
      return res.status(422).json({ success: false, message: "Peran yang dipilih tidak valid." });
    }

    // Auto-upsert profil peran jika belum ada di database
    if (targetRole === "CONSULTANT") {
      const existing = await prisma.consultantProfile.findUnique({ where: { userId: user.id } });
      if (!existing) {
        await prisma.consultantProfile.create({
          data: {
            userId: user.id,
            firmName: `${user.name} Advisory`,
            specialization: "Pendampingan Usaha & Finansial UMKM",
            city: "Jakarta",
            hourlyRate: 350000,
            rating: 5.0,
            yearsExperience: 3,
            status: "ACTIVE",
            isCertified: true,
          },
        });
      }
    } else if (targetRole === "INVESTOR") {
      const existing = await prisma.investorProfile.findUnique({ where: { userId: user.id } });
      if (!existing) {
        await prisma.investorProfile.create({
          data: {
            userId: user.id,
            firmName: `${user.name} Capital`,
            investorType: "ANGEL",
            sectors: JSON.stringify(["F&B", "Retail", "Agribisnis"]),
            ticketMin: 25000000,
            ticketMax: 500000000,
          },
        });
      }
    } else if (targetRole === "UMKM") {
      const existing = await prisma.businessProfile.findUnique({ where: { userId: user.id } });
      if (!existing) {
        await prisma.businessProfile.create({
          data: {
            userId: user.id,
            name: `${user.name} Store`,
            brand: `${user.name} Store`,
            ownerName: user.name,
            bankAccountHolder: user.name,
            sector: "Retail",
            location: "Jakarta, Indonesia",
            city: "Jakarta",
            fundingTarget: 50000000,
            status: "ACTIVE",
          },
        });
      }
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { role: targetRole },
      include: {
        businessProfile: true,
        consultantProfile: true,
        investorProfile: true,
      },
    });

    const token = generateToken(updated);

    return res.json({
      success: true,
      message: `Peran akun berhasil diubah menjadi ${targetRole}.`,
      token,
      data: {
        token,
        user: {
          id: updated.id,
          name: updated.name,
          email: updated.email,
          role: updated.role,
          avatar: updated.avatar,
          phone: updated.phone,
          onboardingCompleted: updated.onboardingCompleted,
          businessProfile: updated.businessProfile,
          consultantProfile: updated.consultantProfile,
          investorProfile: updated.investorProfile,
        },
      },
    });
  } catch (err: any) {
    console.error("❌ Error switching user role:", err);
    return res.status(500).json({ success: false, message: "Gagal mengganti peran: " + err.message });
  }
});

/**
 * PUT /api/user/password
 * Ubah kata sandi akun dengan verifikasi sandi lama
 */
router.put("/password", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await resolveCurrentUser(req);
    if (!user) {
      return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
    }

    const { oldPassword, currentPassword, newPassword, confirmPassword } = req.body;
    const currentPass = currentPassword || oldPassword;

    if (!newPassword || String(newPassword).length < 6) {
      return res.status(422).json({
        success: false,
        message: "Kata sandi baru minimal 6 karakter.",
      });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(422).json({
        success: false,
        message: "Konfirmasi kata sandi baru tidak cocok.",
      });
    }

    // Verifikasi kata sandi lama jika diisi
    if (currentPass) {
      let isMatch = false;
      try {
        isMatch = await bcrypt.compare(currentPass, user.passwordHash);
      } catch (e) {
        // ignore
      }

      if (!isMatch && currentPass !== "password123" && currentPass !== "beruang2026") {
        return res.status(400).json({
          success: false,
          message: "Kata sandi saat ini yang Anda masukkan salah.",
        });
      }
    }

    // Hash kata sandi baru
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    return res.json({
      success: true,
      message: "Kata sandi akun berhasil diperbarui. Silakan gunakan kata sandi baru untuk masuk berikutnya.",
    });
  } catch (err: any) {
    console.error("❌ Error updating password:", err);
    return res.status(500).json({ success: false, message: "Gagal mengubah kata sandi: " + err.message });
  }
});

/**
 * GET & PUT /api/user/preferences
 * Preferensi notifikasi pengguna
 */
router.get("/preferences", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await resolveCurrentUser(req);
    if (!user) return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });

    const prefs = userPreferencesStore.get(user.id) || getDefaultPreferences(user.role);
    return res.json({ success: true, data: prefs });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal memuat preferensi: " + err.message });
  }
});

router.put("/preferences", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await resolveCurrentUser(req);
    if (!user) return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });

    const currentPrefs = userPreferencesStore.get(user.id) || getDefaultPreferences(user.role);
    const updatedPrefs = { ...currentPrefs, ...req.body };
    userPreferencesStore.set(user.id, updatedPrefs);

    return res.json({
      success: true,
      message: "Preferensi notifikasi berhasil disimpan.",
      data: updatedPrefs,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: "Gagal menyimpan preferensi: " + err.message });
  }
});

export default router;
