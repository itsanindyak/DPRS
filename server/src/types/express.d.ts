import { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: { accountId: number; role: Role }; // optional because not all requests have auth
    }
  }
}
