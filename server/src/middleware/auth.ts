import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import AppError from "../utils/AppError";
import { Role } from "@prisma/client";
import authService from "../services/auth.service";

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.accessToken;
  let token: string | undefined;

  if (cookieToken) token = cookieToken;
  else if (authHeader) {
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0]))
      return next(new AppError("Malformed Authorization header", 401));
    token = parts[1];
  }

  if (!token) return next(new AppError("No token provided", 401));

  try {
    const decoded = jwt.verify(token, env.jwt.secret) as {
      accountId: number;
      role: Role;
    };

    if (!decoded.accountId || !decoded.role)
      return next(new AppError("Invalid token payload", 401));

    const account = await authService.verify(decoded.accountId);

    if (account.role !== decoded.role)
      return next(new AppError("Role mismatch", 401));

    req.user = decoded; // TS now knows req.user exists

    next();
  } catch {
    return next(new AppError("Invalid or expired token", 401));
  }
}
