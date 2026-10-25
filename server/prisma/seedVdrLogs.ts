import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding VDR Audit Logs...");

  const business = await prisma.businessProfile.findFirst({
    where: { id: "biz-kopisenja-01" },
  });

  const doc = await prisma.dataRoomDocument.findFirst({
    where: { businessId: business?.id },
  });

  const investor = await prisma.user.findFirst({
    where: { role: "INVESTOR" },
  });

  const consultant = await prisma.user.findFirst({
    where: { role: "CONSULTANT" },
  });

  if (!business) {
    console.log("⚠️ Business profile not found, skipping.");
    return;
  }

  const logs = [
    {
      id: "log-vdr-01",
      documentId: doc?.id || null,
      userId: investor?.id || null,
      userName: investor?.name || "Hendro Wicaksono",
      userRole: "INVESTOR",
      userLembaga: "Nusantara Impact Angel Syndicate",
      businessId: business.id,
      docTitle: doc?.name || "Laporan Keuangan Kompilasi 2025-2026",
      action: "DOWNLOAD",
      ipAddress: "182.253.110.42",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0.0.0",
      accessedAt: new Date(Date.now() - 45 * 60 * 1000), // 45 mins ago
    },
    {
      id: "log-vdr-02",
      documentId: doc?.id || null,
      userId: investor?.id || null,
      userName: investor?.name || "Hendro Wicaksono",
      userRole: "INVESTOR",
      userLembaga: "Nusantara Impact Angel Syndicate",
      businessId: business.id,
      docTitle: "Rekening Koran Giro Operasional 6 Bulan",
      action: "VIEW",
      ipAddress: "182.253.110.42",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0.0.0",
      accessedAt: new Date(Date.now() - 50 * 60 * 1000), // 50 mins ago
    },
    {
      id: "log-vdr-03",
      documentId: null,
      userId: consultant?.id || null,
      userName: consultant?.name || "Dra. Maya Suryani, M.M.",
      userRole: "CONSULTANT",
      userLembaga: "Maya Advisory Partner",
      businessId: business.id,
      docTitle: "NIB Berbasis Risiko & Sertifikat Halal BPJPH",
      action: "PREVIEW",
      ipAddress: "36.72.214.18",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      accessedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Kemarin
    },
  ];

  for (const l of logs) {
    await prisma.vdrAuditLog.upsert({
      where: { id: l.id },
      update: {},
      create: l,
    });
  }

  console.log(`✅ Seeded ${logs.length} VDR audit logs successfully.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
