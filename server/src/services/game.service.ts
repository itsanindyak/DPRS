import { BadgeType, PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError";
import { date } from "zod";
import { mq } from "./rabbitmq.service";

export interface Levels {
  gameId: number;
  levels: {
    name: string;
    badge: { title: string; description?: string; iconUrl?: string };
  }[];
}

interface SubmitGameSession {
  studentID: number;
  levelName: string;
  score: number;
}

class GameService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createGame(input: { name: string }) {
    try {
      return this.prisma.$transaction(async (tx) => {
        const game = await tx.game.upsert({
          where: { title: input.name },
          update: {},
          create: { title: input.name },
        });

        return game;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Unknown error while creating game");
      }
      throw new Error("Unknown error while creating game");
    }
  }

  async getGame(input: { id: number }) {
    try {
      const game = await this.prisma.game.findUnique({
        where: { id: input.id },
        include: { _count: true, levels: true },
      });

      if (!game) {
        throw new AppError("Game not found", 404);
      }

      return game;
    } catch (error) {
      throw new AppError("Internal server error", 500);
    }
  }

  async getAllGames() {
    try {
      const games = await this.prisma.game.findMany({
        include: {
          levels: {
            include: {
              badge: true,
            },
          },
          _count: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return games;
    } catch (error: any) {
      throw new AppError("Internal server error", 500);
    }
  }

  async gamesDropdown() {
    try {
      const games = await this.prisma.game.findMany({
        select: {
          id: true,
          title: true,
        },
        orderBy: { title: "asc" }, // optional: alphabetical order
      });

      return games;
    } catch (error: any) {
      throw new AppError("Internal server error", 500);
    }
  }

  async createLevelAndBadges(input: Levels) {
    if (input.levels.length > 3) {
      throw new AppError("Maximum of 3 levels can be added at once", 404);
    }

    try {
      return this.prisma.$transaction(async (tx) => {
        const existingGame = await tx.game.findUnique({
          where: { id: input.gameId },
        });

        if (!existingGame) {
          throw new AppError("Game ID invalid", 400);
        }

        const createdLevels = [];

        for (const level of input.levels) {
          const createdBadge = await tx.badge.create({
            data: {
              title: level.badge.title,
              description: level.badge.description,
              iconUrl: level.badge.iconUrl,
              type: BadgeType.LEVEL,
            },
          });

          const createdLevel = await tx.level.create({
            data: {
              name: level.name,
              gameId: input.gameId,
              badgeId: createdBadge.id,
            },
            include: { badge: true },
          });

          createdLevels.push(createdLevel);
        }

        return createdLevels;
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new AppError(
          `Duplicate entry on field(s): ${(error.meta?.target as string[])?.join(", ")}`,
          400,
        );
      }
      throw new AppError(
        error?.message || "Unknown error while creating levels and badges",
        404,
      );
    }
  }

  async submitSession(input: SubmitGameSession) {
    const { studentID, levelName, score } = input;

    try {
      const session = await this.prisma.$transaction(async (tx: any) => {
        const student = await tx.student.findUnique({
          where: { accountId: studentID },
        });
        if (!student)
          throw new AppError(`Student with ID ${studentID} not found`, 404);

        const level = await tx.level.findUnique({
          where: { name: levelName },
          select: {
            id: true,
            gameId: true,
            badgeId: true,
            badge: true, // Include badge relation for validation
          },
        });

        if (!level) throw new AppError(`Level "${levelName}" not found`, 404);
        if (!level.badgeId)
          throw new AppError(
            `Level "${levelName}" has no associated badge`,
            404,
          );

        return tx.gameSession.create({
          data: {
            studentId: student.id,
            schoolId: student.schoolId,
            regionId: student.regionId,
            gameId: level.gameId,
            levelId: level.id,
            score,
            duration: 0,
            metadata: {},
          },
          select: {
            id: true,
            studentId: true,
            schoolId: true,
            regionId: true,
            gameId: true,
            levelId: true,
            score: true,
            duration: true,
            playedAt: true,
            level: {
              select: {
                id: true,
                badgeId: true,
                name: true,
              },
            },
          },
        });
      });

      if (!session) {
        throw new AppError("Session was not created", 500);
      }

      mq.publish("game.session.created", {
        studentID: session.studentId,
        score,
        badge: session.level?.badgeId || null,
      });

      return session;
    } catch (error) {
      throw new AppError(
        error instanceof Error ? error.message : String(error),
        404,
      );
    }
  }
}

export default new GameService(new PrismaClient());
