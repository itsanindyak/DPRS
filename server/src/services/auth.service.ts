import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import AppError from "../utils/AppError";
import { PrismaClient, Role } from "@prisma/client";

const SALT_ROUNDS = 10;

class AuthService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async signupStudent(data: {
    email: string;
    password: string;
    schoolName: string;
    // className: string;
  }) {
    const { email, password, schoolName } = data;

    return this.prisma.$transaction(async (tx: any) => {
      const school = await tx.school.findFirst({
        where: { name: schoolName },
      });
      if (!school) throw new AppError("School not found", 404);

      // 🔎 Check if account with same email already exists
      const existingAccount = await tx.account.findFirst({
        where: { email },
      });
      if (existingAccount) throw new AppError("Email already in use", 400);

      // const classroom = await tx.classroom.findFirst({
      //   where: { name: className, schoolId: school.id },
      // });
      // if (!classroom)
      //   throw new AppError("Classroom not found for this school", 404);

      const hashed = await bcrypt.hash(password, SALT_ROUNDS);
      // const classroomID =10;

      const account = await tx.account.create({
        data: {
          email,
          password: hashed,
          role: "STUDENT",
          student: {
            create: {
              // classId: classroomID,
              schoolId: school.id,
              regionId: school.regionId,
            },
          },
        },
        include: { student: true },
      });

      const accessToken = jwt.sign(
        { accountId: account.id, role: account.role },
        env.jwt.secret,
        {
          expiresIn: "15m",
        },
      );

      const refreshToken = jwt.sign({ accountId: account.id }, env.jwt.secret, {
        expiresIn: "7d",
      });

      return {
        accountId: account.id,
        studentId: account.student.id,
        accessToken,
        refreshToken,
      };
    });
  }

  async login(data: { email: string; password: string }) {
    const { email, password } = data;

    return this.prisma.$transaction(async (tx: any) => {
      // 1. Find account by email
      const account = await tx.account.findUnique({
        where: { email },
        include: {
          student: true,
          adminMeta: { include: { school: true, region: true } },
        },
      });

      if (!account) throw new AppError("Invalid credentials", 401);

      // 2. Compare passwords
      const isMatch = await bcrypt.compare(password, account.password);

      if (!isMatch) throw new AppError("Invalid credentials", 401);

      // 3. Generate tokens
      const accessToken = jwt.sign(
        { accountId: account.id, role: account.role },
        env.jwt.secret,
        { expiresIn: "15m" },
      );

      const refreshToken = jwt.sign({ accountId: account.id }, env.jwt.secret, {
        expiresIn: "7d",
      });

      // 4. Save refresh token in DB
      await tx.refreshToken.create({
        data: {
          token: refreshToken,
          accountId: account.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });

      // 4️⃣ Role-specific details
      let roleDetails: Record<string, any> = {};

      switch (account.role) {
        case "STUDENT":
          roleDetails = {
            studentId: account.student?.id,
            // classId: account.student?.classId, // Removed, not in schema
            schoolId: account.student?.schoolId,
            regionId: account.student?.regionId,
          };
          break;

        case "SCHOOLADMIN":
          roleDetails = {
            schoolId: account.adminMeta?.schoolId,
            regionId: account.adminMeta?.school?.regionId,
          };
          break;

        case "REGIONALADMIN":
          roleDetails = {
            regionId: account.adminMeta?.regionId,
          };
          break;

        case "SUPERADMIN":
          roleDetails = {}; // no extra context needed
          break;
      }

      // 5️⃣ Final response
      return {
        accountId: account.id,
        email: account.email,
        role: account.role,
        roleDetails,
        accessToken,
        refreshToken,
      };
    });
  }

  async verify(id: number) {
    const account = await this.prisma.account.findUnique({
      where: { id: id },
      select: { id: true, role: true },
    });
    if (!account) {
      throw new AppError("User no longer exists", 401);
    }

    return account;
  }

  async ownMe(id: number) {
    try {
      const account = await this.prisma.account.findUnique({
        where: { id },
        include: {
          student: true,
          adminMeta: true,
        },
      });

      if (!account) {
        throw new AppError("User not found", 404);
      }

      // Base response
      let userData: any = {
        accountId: account.id,
        email: account.email,
        role: account.role,
      };

      // Enrich by role
      switch (account.role) {
        case "STUDENT":
          userData.student = account.student;
          break;

        case "SCHOOLADMIN":
          userData.adminMeta = {
            id: account.adminMeta?.id,
            schoolId: account.adminMeta?.schoolId,
            regionId: account.adminMeta?.regionId,
          };
          break;

        case "REGIONALADMIN":
          userData.adminMeta = {
            id: account.adminMeta?.id,
            regionId: account.adminMeta?.regionId,
          };
          break;

        case "SUPERADMIN":
          // no extra fields
          break;
      }

      return userData;
    } catch (err) {
      console.error(err);
      throw new AppError("Server error", 500);
    }
  }

  async newAccessTokenHandler(token: string) {
    try {
      // 1. Verify refresh token
      const payload = jwt.verify(token, env.jwt.secret) as {
        accountId: number;
      };

      // 2. Check if exists in DB
      const stored = await this.prisma.refreshToken.findUnique({
        where: { token: token },
        include: { account: true },
      });

      if (!stored || stored.expiresAt < new Date()) {
        throw new AppError("Invalid or expired refresh token", 401);
      }

      const role = stored.account.role;

      // 3. Generate new access token
      const accessToken = jwt.sign(
        { accountId: payload.accountId, role },
        env.jwt.secret,
        { expiresIn: "15m" },
      );

      return accessToken;
    } catch (err) {
      console.error(err);
      throw new AppError("Unauthorized", 401);
    }
  }
}

export default new AuthService(new PrismaClient());
