import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    include: {
      businessProfile: true,
      consultantProfile: true,
      investorProfile: true
    }
  })
  console.log('=== USERS IN DB ===')
  for (const u of users) {
    console.log({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      onboardingCompleted: u.onboardingCompleted,
      hasBusinessProfile: !!u.businessProfile,
      businessName: u.businessProfile?.name,
      businessStatus: u.businessProfile?.status
    })
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
