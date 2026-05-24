import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError";

class BadgeService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async checkAndGrantBadges(payload: {
    studentID: number;
    badge: number | null;
    score: number;
  }) {
    const { studentID: studentId, badge: badgeId, score } = payload; // Destructure with correct names

    if (!badgeId) {
      console.log("❌ No badgeId provided, returning early");
      return;
    }

    if (score < 90) {
      console.log(
        `⚠️ Student ${studentId} did not meet badge requirement (score: ${score})`,
      );
      return;
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        const already = await tx.studentBadge.findUnique({
          where: { studentId_badgeId: { studentId, badgeId } },
        });

        if (already) {
          console.log(`ℹ️ Badge already exists for student ${studentId}`);
          return; // don't throw
        }

        const created = await tx.studentBadge.create({
          data: { studentId, badgeId, earnedAt: new Date() },
        });
      });
    } catch (err) {
      console.error("❌ Transaction failed:", err);
      throw err;
    }
  }
}

export default new BadgeService(new PrismaClient());
