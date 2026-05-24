import { Router } from "express";
import {
  regionalAdminSignup,
  schoolAdminSignup,
  studentSignup,
} from "../controller/auth.controller";
import { requireRole } from "../middleware/role";
import { authMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validRequest";
import {
  createRegionAdminSchema,
  createSchoolAdminSchema,
  RegionalAdminSignupRequest,
} from "../types/auth.api";

const router = Router();

router.post<{}, {}, RegionalAdminSignupRequest>(
  "/addRegionalAdmin",
  authMiddleware,
  requireRole(["SUPERADMIN"]),
  validateRequest({ body: createRegionAdminSchema }),
  regionalAdminSignup,
);

router.post(
  "/addSchoolAdmin",
  authMiddleware,
  requireRole(["REGIONALADMIN"]),
  validateRequest({ body: createSchoolAdminSchema }),
  schoolAdminSignup,
);

export default router;
