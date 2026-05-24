import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Define superadmin credentials
    const superAdminEmail = "bitwise@sih.com";
    const superAdminPassword = "bitwise"; // Change this in production
    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

    const result = await prisma.$transaction(async (tx: any) => {
      const existingAccount = await tx.account.findUnique({
        where: { email: superAdminEmail },
      });

      if (existingAccount) {
        console.log("Superadmin account already exists. Skipping creation.");
        return { created: false };
      }

      const superAdminAccount = await tx.account.create({
        data: {
          email: superAdminEmail,
          password: hashedPassword,
          role: "SUPERADMIN",
          verifiedAt: new Date(), // Optional: Auto-verify superadmin
        },
      });

      // Create AdminMeta entry for superadmin (no regionId or schoolId) - (1 DB call)
      const adminMeta = await tx.adminMeta.create({
        data: {
          accountId: superAdminAccount.id,
        },
      });

      return { created: true, email: superAdminEmail };
    });

    if (result.created) {
      console.log(
        "Superadmin account created successfully via transaction:",
        superAdminEmail,
      );
    }
  } catch (error) {
    console.error("Error seeding superadmin:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
