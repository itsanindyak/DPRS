import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ limit: "20kb", extended: true }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req: Request, res: Response) => {
  res.send(`You are in bitwise server!`);
});

import authRouter from "./routes/auth.routes";
import adminRouter from "./routes/admin.routes";
import gameRouter from "./routes/game.routes";

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/game", gameRouter);

app.use(errorHandler);

export { app };
