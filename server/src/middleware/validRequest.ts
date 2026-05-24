import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError, ZodRawShape } from "zod";
import AppError from "../utils/AppError";

interface ValidateRequestOptions {
  params?: ZodObject<ZodRawShape>;
  query?: ZodObject<ZodRawShape>;
  body?: ZodObject<ZodRawShape>;
}

export function validateRequest(schemas: ValidateRequestOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = req.body ?? {};

      if (schemas.params) {
        req.params = (await schemas.params.parseAsync(
          req.params,
        )) as import("express-serve-static-core").ParamsDictionary;
      }

      if (schemas.query) {
        req.query = (await schemas.query.parseAsync(
          req.query as any,
        )) as import("qs").ParsedQs;
      }

      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map((e) => ({
          path: e.path.join(".") || "body",
          message: e.message,
        }));
        return next(new AppError("Validation failed", 400, issues));
      }
      next(error);
    }
  };
}
