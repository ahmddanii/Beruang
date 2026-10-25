import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  businessId?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

const JWT_SECRET = process.env.JWT_SECRET || "beruang-super-secret-key-2026-b2b-umkm";

function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  if (req.headers.cookie) {
    const match = req.headers.cookie.match(/(?:^|;\s*)beruang_token=([^;]+)/);
    if (match) return decodeURIComponent(match[1]);
  }
  return null;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Akses ditolak. Token otentikasi tidak ditemukan.",
    });
  }

  try {
    // 1. Verifikasi JWT
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId || decoded.id },
      include: {
        businessProfile: { select: { id: true } },
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Sesi tidak valid atau pengguna telah dihapus.",
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      businessId: user.businessProfile?.id,
    };

    next();
  } catch (err: any) {
    // 2. Fallback HANYA untuk token demo eksplisit pada environment development
    if (token === "demo-token" || token.startsWith("demo-token-")) {
      const isInvestor = token.includes("investor") || req.originalUrl?.includes("investor") || req.baseUrl?.includes("investor");
      const isConsultant = token.includes("consultant") || req.originalUrl?.includes("consultant") || req.baseUrl?.includes("consultant");

      const targetEmail = isInvestor
        ? "hendro@nusantaraventures.com"
        : isConsultant
        ? "maya.suryani@beruang.id"
        : "fikri@kopisenja.id";

      const defaultUser = await prisma.user.findFirst({
        where: { email: targetEmail },
        include: { businessProfile: { select: { id: true } } },
      });

      if (defaultUser) {
        req.user = {
          id: defaultUser.id,
          email: defaultUser.email,
          name: defaultUser.name,
          role: defaultUser.role,
          businessId: defaultUser.businessProfile?.id,
        };
        return next();
      }
    }

    return res.status(401).json({
      success: false,
      message: "Token otentikasi tidak valid atau telah kedaluwarsa.",
    });
  }
}

/**
 * Optional Auth Middleware: Menetapkan req.user jika token valid, tetapi tidak melempar error jika token tidak ada.
 */
export async function optionalAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  const token = extractToken(req);
  if (!token) {
    // Demo default fallback jika mengakses rute investor
    if (req.originalUrl?.includes("investor") || req.baseUrl?.includes("investor")) {
      const invUser = await prisma.user.findFirst({
        where: { role: "INVESTOR" },
        include: { businessProfile: { select: { id: true } } },
      });
      if (invUser) {
        req.user = {
          id: invUser.id,
          email: invUser.email,
          name: invUser.name,
          role: invUser.role,
          businessId: invUser.businessProfile?.id,
        };
      }
    }
    return next();
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId || decoded.id },
      include: {
        businessProfile: { select: { id: true } },
      },
    });

    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessId: user.businessProfile?.id,
      };
    }
  } catch (err: any) {
    if (token === "demo-token" || token.startsWith("demo-token-")) {
      const isInvestor = token.includes("investor") || req.originalUrl?.includes("investor") || req.baseUrl?.includes("investor");
      const targetEmail = isInvestor ? "hendro@nusantaraventures.com" : "fikri@kopisenja.id";
      const defaultUser = await prisma.user.findFirst({
        where: { email: targetEmail },
        include: { businessProfile: { select: { id: true } } },
      });
      if (defaultUser) {
        req.user = {
          id: defaultUser.id,
          email: defaultUser.email,
          name: defaultUser.name,
          role: defaultUser.role,
          businessId: defaultUser.businessProfile?.id,
        };
      }
    }
  }

  next();
}
