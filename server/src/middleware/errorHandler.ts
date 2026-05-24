// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // 1. Custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: err.data ?? null,
      errors: [],
    });
  }

  // 2. Zod validation errors
  if (err instanceof ZodError) {
    const issues = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      data: null,
      errors: issues,
    });
  }

  // 3. Prisma known errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    let message = err.message;
    let data: any = null;

    if (err.code === "P2002") {
      const target = (err.meta as any)?.target ?? [];
      message = `Duplicate value for field(s): ${target.join(", ")}`;
      data = { fields: target };
    }

    console.log(err);

    return res.status(400).json({
      success: false,
      message,
      data,
      errors: [],
    });
  }

  // 4. Fallback unknown errors
  return res.status(500).json({
    success: false,
    message: err?.message || "Internal Server Error",
    data: null,
    errors: [],
  });
}
