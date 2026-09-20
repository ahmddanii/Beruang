import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
export const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Beruang Backend API is active",
    timestamp: new Date().toISOString(),
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Beruang API server running at http://localhost:${port}`);
  console.log(`📡 Health check: http://localhost:${port}/api/health`);
});
