import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { Role } from "@prisma/client";

export function requireRole(allowed: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError("Not authenticated", 401));

    if (!allowed.includes(req.user.role))
      return next(new AppError("Forbidden: insufficient role", 403));

    next();
  };
}
