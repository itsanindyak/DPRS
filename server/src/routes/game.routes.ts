import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import {
  CreateGameRequest,
  createGameSchema,
  CreateLevelAndBadgeRequest,
  createLevelAndBadgeSchema,
  submitGameSessionBody,
  SubmitGameSessionBody,
  SubmitGameSessionParams,
  submitGameSessionParams,
} from "../types/game.api";
import { validateRequest } from "../middleware/validRequest";
import {
  createGame,
  createLevelAndBadges,
  gamesDropdown,
  getAllGames,
  getGame,
  submitGameSession,
} from "../controller/game.controller";

const gameRouter = Router();

gameRouter.post<{}, {}, CreateGameRequest>(
  "/createGame",
  authMiddleware,
  requireRole(["SUPERADMIN"]),
  validateRequest({ body: createGameSchema }),
  createGame,
);

gameRouter.post<{}, {}, CreateLevelAndBadgeRequest>(
  "/:gameId/createLevel",
  authMiddleware,
  requireRole(["SUPERADMIN"]),
  validateRequest({ body: createLevelAndBadgeSchema }),
  createLevelAndBadges,
);

gameRouter.post<SubmitGameSessionParams, {}, SubmitGameSessionBody>(
  "/submit/:gameID/:levelName",
  authMiddleware,
  requireRole(["STUDENT"]),
  validateRequest({
    params: submitGameSessionParams,
    body: submitGameSessionBody,
  }),
  submitGameSession,
);

gameRouter.get("/all", getAllGames);

gameRouter.get("/drop", gamesDropdown);

gameRouter.get("/:gameId", getGame);

// gameRouter.post(
//   "/submit",
//   authMiddleware,
//   requireRole(["STUDENT"]),
//   gameService.submitSession,
// );

export default gameRouter;
