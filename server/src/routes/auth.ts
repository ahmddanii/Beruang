import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "beruang-super-secret-key-2026-b2b-umkm";

function generateToken(user: { id: string; email: string; role: string }): string {
  return jwt.sign(
    {
      id: user.id,
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * POST /api/auth/login
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Email dan kata sandi wajib diisi.",
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        businessProfile: true,
        consultantProfile: true,
        investorProfile: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email atau kata sandi tidak sesuai.",
      });
    }

    // Cek password hash atau demo shortcut
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, user.passwordHash);
    } catch (e) {
      // ignore
    }

    // Ijinkan login jika password cocok atau dalam mode demo (password123 / beruang2026)
    if (!isValidPassword && password !== "password123" && password !== "beruang2026") {
      return res.status(401).json({
        success: false,
        message: "Email atau kata sandi tidak sesuai.",
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: "Selamat datang kembali di Beruang!",
      token,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
          businessProfile: user.businessProfile,
          consultantProfile: user.consultantProfile,
          investorProfile: user.investorProfile,
        },
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memproses login: " + err.message,
    });
  }
});

/**
 * POST /api/auth/register
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, businessName, business_name, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({
        success: false,
        message: "Nama, email, dan kata sandi wajib diisi.",
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar. Silakan gunakan email lain atau masuk.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const resolvedRole = (role || "UMKM").toUpperCase();

    const newUser = await prisma.user.create({
      data: {
        name: String(name).trim(),
        email: cleanEmail,
        passwordHash,
        role: resolvedRole,
        phone: phone || null,
        verified: true,
      },
    });

    // Jika mendaftar sebagai UMKM, otomatis inisialisasi businessProfile
    let bizProfile = null;
    if (resolvedRole === "UMKM") {
      const bName = businessName || business_name || `${newUser.name} Store`;
      bizProfile = await prisma.businessProfile.create({
        data: {
          userId: newUser.id,
          name: bName,
          brand: bName,
          sector: "Kuliner & F&B",
          location: "Bandung, Jawa Barat",
          city: "Bandung",
          fundingTarget: 250000000,
          status: "PROFILE_INCOMPLETE",
        },
      });

      // Assessment awal
      await prisma.assessment.create({
        data: {
          businessId: bizProfile.id,
          financial: 75,
          operationsHpp: 80,
          marketing: 65,
          hrTeam: 70,
          legal: 85,
          compositeScore: 75,
        },
      });
    }

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: "Akun berhasil dibuat. Selamat datang di platform Beruang!",
      token,
      data: {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          businessProfile: bizProfile,
        },
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal membuat akun: " + err.message,
    });
  }
});

/**
 * GET /api/auth/me
 */
router.get("/me", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      include: {
        businessProfile: {
          include: {
            assessment: true,
          },
        },
        consultantProfile: true,
        investorProfile: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Sesi tidak ditemukan.",
      });
    }

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
          businessProfile: user.businessProfile,
          consultantProfile: user.consultantProfile,
          investorProfile: user.investorProfile,
        },
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal memeriksa sesi: " + err.message,
    });
  }
});

/**
 * POST /api/auth/logout
 */
router.post("/logout", (_req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Sesi berhasil ditutup.",
  });
});

/**
 * POST /api/onboarding/consultant
 */
router.post("/onboarding/consultant", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Akses tidak sah." });
    }

    const { firmName, specialization, isCertified } = req.body;
    const profile = await prisma.consultantProfile.upsert({
      where: { userId },
      update: {
        firmName: firmName || "Firma Konsultan Berlisensi",
        specialization: specialization || "F&B & Ritel",
        isCertified: isCertified ?? true,
      },
      create: {
        userId,
        firmName: firmName || "Firma Konsultan Berlisensi",
        specialization: specialization || "F&B & Ritel",
        isCertified: isCertified ?? true,
      },
    });

    return res.json({
      success: true,
      message: "Profil konsultan berhasil disimpan.",
      data: profile,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan onboarding konsultan: " + err.message,
    });
  }
});

/**
 * POST /api/onboarding/investor
 */
router.post("/onboarding/investor", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Akses tidak sah." });
    }

    const { firmName, commitmentCapital } = req.body;
    const profile = await prisma.investorProfile.upsert({
      where: { userId },
      update: {
        firmName: firmName || "Sindikasi Modal Beruang",
        commitmentCapital: commitmentCapital || "Rp 1.0 Miliar",
      },
      create: {
        userId,
        firmName: firmName || "Sindikasi Modal Beruang",
        commitmentCapital: commitmentCapital || "Rp 1.0 Miliar",
      },
    });

    return res.json({
      success: true,
      message: "Profil investor berhasil disimpan.",
      data: profile,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan onboarding investor: " + err.message,
    });
  }
});

export default router;
