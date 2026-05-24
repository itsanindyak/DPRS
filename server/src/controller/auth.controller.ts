import { asyncHandler } from "../utils/asyncHandler";
import AppError from "../utils/AppError";
import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { ApiResponce } from "../utils/ApiResponce";
import adminService from "../services/admin.service";
import { env } from "../config/env";

export const studentSignup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.signupStudent(req.body);

    const { refreshToken, accessToken, accountId, studentId } =
      result as unknown as {
        refreshToken: string;
        accessToken: string;
        accountId: string;
        studentId: string;
      };

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json(
        new ApiResponce(200, {
          accountId,
          studentId,
          accessToken,
        }),
      );
  },
);

export const regionalAdminSignup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, regionName } = req.body;

    const result = await adminService.createRegionalAdmin({
      email,
      regionName,
    });

    res.status(200).json(new ApiResponce(200, result));
  },
);

export const schoolAdminSignup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.createSchoolAdmin({
      email: req.body.email,
      schoolName: req.body.schoolName,
      creatorId: req.user!.accountId,
      creatorRole: req.user!.role,
    });
    res.status(200).json(new ApiResponce(200, result));
  },
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken, accountId, email, role, roleDetails } =
      await authService.login(req.body);

    const data = {
      accessToken,
      accountId,
      email,
      role,
      ...roleDetails,
    };

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .cookie("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(new ApiResponce(200, data));
  },
);

export const ownMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.ownMe(req.user.accountId);

    res.status(200).json(new ApiResponce(200, result));
  },
);

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    });

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  },
);

export const newAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookieToken = req.cookies.refreshToken;

    if (!cookieToken) throw new AppError("No token provided", 401);

    // Assuming you have a service to handle refresh logic
    const accessToken = await authService.newAccessTokenHandler(cookieToken);

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 15 * 60 * 1000,
      })
      .json(new ApiResponce(200, { accessToken }, "New access token issued"));
  },
);
