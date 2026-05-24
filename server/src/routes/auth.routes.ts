import { Router } from "express";
import {
  login,
  logout,
  newAccessToken,
  ownMe,
  studentSignup,
} from "../controller/auth.controller";
import { validateRequest } from "../middleware/validRequest";
import {
  LoginRequest,
  loginRequestSchema,
  SignupRequest,
  studentSignupSchema,
} from "../types/auth.api";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post<{}, {}, SignupRequest>(
  "/studentSignup",
  validateRequest({ body: studentSignupSchema }),
  studentSignup,
);
router.post<{}, {}, LoginRequest>(
  "/login",
  validateRequest({ body: loginRequestSchema }),
  login,
);

router.get("/me", authMiddleware, ownMe);

router.get("/logout", authMiddleware, logout);

router.post("/refresh-accesss-token", newAccessToken);

export default router;
