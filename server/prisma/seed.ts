import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Beruang database seeding...");
  // Placeholder for seed scripts (mock UMKM, Consultant, and Investor accounts)
  console.log("✅ Seeding completed (or skipped if database is not yet migrated).");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
