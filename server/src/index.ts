import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

import authRouter from "./routes/auth.js";
import financesRouter from "./routes/finances.js";
import vdrRouter from "./routes/vdr.js";
import umkmRouter from "./routes/umkm.js";
import consultantRouter from "./routes/consultant.js";
import investorRouter from "./routes/investor.js";
import onboardingRouter, { handleUmkmOnboarding, handleConsultantOnboarding, handleInvestorOnboarding } from "./routes/onboarding.js";
import adminRouter from "./routes/admin.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
export const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads directory serving
const uploadDir = path.resolve(__dirname, "../uploads");
app.use("/uploads", express.static(uploadDir));

// Health check route
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Beruang Express + Prisma Backend API is fully active",
    timestamp: new Date().toISOString(),
  });
});

// Mounted Routes
app.use("/api/auth", authRouter);
app.use("/api/onboarding", onboardingRouter);
app.post("/api/umkm/onboarding", handleUmkmOnboarding);
app.post("/api/consultant/onboarding", handleConsultantOnboarding);
app.post("/api/investor/onboarding", handleInvestorOnboarding);
app.use("/api/finances", financesRouter);
app.use("/api/umkm/monthly-reports", financesRouter);
app.use("/api/vdr", vdrRouter);
app.use("/api/umkm/documents", vdrRouter);
app.use("/api/umkm", umkmRouter);
app.use("/api/consultant", consultantRouter);
app.use("/api/investor", investorRouter);
app.use("/api/admin", adminRouter);

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("❌ Server Error:", err?.message || err);
  const status = err?.status || (err?.name === "MulterError" ? 400 : 500);
  res.status(status).json({
    success: false,
    message: err?.message || "Terjadi kesalahan pada pemrosesan berkas di server.",
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Beruang API server running at http://localhost:${port}`);
  console.log(`📡 Health check: http://localhost:${port}/api/health`);
  console.log(`📁 Uploads served from: ${uploadDir}`);
});
