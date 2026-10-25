import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Consultant Agreements (MoU)...");

  const business = await prisma.businessProfile.findFirst({
    where: { id: "biz-kopisenja-01" },
  });

  const consultant = await prisma.consultantProfile.findFirst();

  if (!business || !consultant) {
    console.log("⚠️ Business or consultant profile not found, skipping seed.");
    return;
  }

  // Sample SVG / Data URL for realistic visual representation
  const sampleSignature = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='60'><path d='M10,40 Q40,10 70,35 T130,20 T170,45' stroke='%230081A0' stroke-width='2.5' fill='none'/></svg>";

  await prisma.consultantAgreement.upsert({
    where: { agreementCode: "KTR-BRU-REQ01-2026" },
    update: {},
    create: {
      id: "agr-01",
      agreementCode: "KTR-BRU-REQ01-2026",
      consultantId: consultant.id,
      businessId: business.id,
      requestId: "req-01",
      monthlyFee: 1500000,
      durationMonths: 3,
      targetFunding: 250000000,
      status: "ACTIVE",
      consultantSignedAt: new Date("2026-08-15T09:30:00Z"),
      consultantSignerName: "Dra. Maya Suryani, M.M.",
      consultantSignature: sampleSignature,
      consultantSignMode: "draw",
      umkmSignedAt: new Date("2026-08-16T14:15:00Z"),
      umkmSignerName: "Fikri Setiawan",
      umkmSignature: sampleSignature,
      umkmSignMode: "draw",
      agreementText: "Perjanjian kemitraan pendampingan bimbingan usaha berbasis 5 pilar fundamental kelayakan modal usaha.",
    },
  });

  console.log("✅ Seeded ConsultantAgreement KTR-BRU-REQ01-2026 successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
