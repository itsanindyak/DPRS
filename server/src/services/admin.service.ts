import { Prisma, PrismaClient, Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError";

export interface CreateSchoolAdminInput {
  creatorId: number; // from req.user.id
  creatorRole: Role; // from req.user.role
  email: string;
  schoolName: string;
}

const SALT_ROUNDS = 10;

// Helper function to create a random password of n characters
function generatePassword(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

class AdminService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createRegionalAdmin(data: { email: string; regionName: string }) {
    const { email, regionName } = data;

    return this.prisma.$transaction(async (tx) => {
      // 1. create or fetch region in a single call
      const region = await tx.region.upsert({
        where: { name: regionName },
        update: {}, // nothing to update if exists
        create: { name: regionName },
      });

      const password = generatePassword(10);

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      try {
        await tx.account.create({
          data: {
            email,
            password: hashedPassword,
            role: "REGIONALADMIN",
            adminMeta: { create: { regionId: region.id } },
          },
        });

        return { email, password };
      } catch (err: any) {
        if (err.code === "P2002") {
          throw new AppError("Email already in use", 409);
        }
        throw err;
      }
    });
  }

  async createSchoolAdmin(input: CreateSchoolAdminInput) {
    const existing = await this.prisma.account.findUnique({
      where: { email: input.email },
    });
    if (existing)
      throw new AppError("Account with this email already exists", 409);

    try {
      return this.prisma.$transaction(async (tx) => {
        // 1. Only REGIONALADMIN allowed
        if (input.creatorRole !== "REGIONALADMIN") {
          throw new AppError(
            "Only regional admins can create school admins",
            403,
          );
        }

        const creatorMeta = await tx.account.findUnique({
          where: { id: input.creatorId },
          select: { adminMeta: { select: { regionId: true } } },
        });

        if (!creatorMeta) {
          throw new AppError("Regional admin has no region assigned", 403);
        }
        const regionId = creatorMeta.adminMeta?.regionId;

        if (regionId == null) {
          throw new AppError("Regional admin has no region assigned", 403);
        }

        const school = await tx.school.upsert({
          where: {
            name_regionId: { name: input.schoolName, regionId },
          },
          update: {},
          create: { name: input.schoolName, regionId },
        });

        // 4. If school already has an admin, delete old account
        const oldAdmin = await tx.adminMeta.findUnique({
          where: { schoolId: school.id },
          include: { account: true },
        });

        if (oldAdmin) {
          await tx.refreshToken.deleteMany({
            where: { accountId: oldAdmin.accountId },
          });
          await tx.adminMeta.delete({ where: { id: oldAdmin.id } });
          await tx.account.delete({ where: { id: oldAdmin.accountId } });
        }

        const password = generatePassword(10);

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const account = await tx.account.create({
          data: {
            email: input.email,
            password: hashedPassword,
            role: "SCHOOLADMIN",
            adminMeta: {
              create: { schoolId: school.id },
            },
          },
          include: { adminMeta: true },
        });

        return {
          accountId: account.email,
          password,
        };
      });
    } catch (err: any) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        throw new AppError("Email already in use", 409);
      }
      throw err;
    }
  }
}

export default new AdminService(new PrismaClient());
