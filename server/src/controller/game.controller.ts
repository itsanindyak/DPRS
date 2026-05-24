import gameService, { Levels } from "../services/game.service";
import { ApiResponce } from "../utils/ApiResponce";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";

export const createGame = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { gameName } = req.body;
    const result = await gameService.createGame({ name: gameName });
    res
      .status(200)
      .json(new ApiResponce(200, result, "Game inserted succesfully."));
  },
);

export const createLevelAndBadges = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const levelsFromBody = req.body.levels;
    const gameId = Number(req.params.gameId);

    const input: Levels = {
      gameId,
      levels: levelsFromBody.map((l: any) => ({
        name: l.levelName,
        badge: { title: l.badgeName },
      })),
    };

    const result = await gameService.createLevelAndBadges(input);

    res
      .status(200)
      .json(
        new ApiResponce(200, result, "Levels and badges created successfully."),
      );
  },
);

export const getAllGames = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await gameService.getAllGames();

    res
      .status(200)
      .json(new ApiResponce(200, result, "Fetched all games successfully"));
  },
);

export const getGame = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const gameId = Number(req.params.gameId);

    const result = await gameService.getGame({ id: gameId });

    res
      .status(200)
      .json(new ApiResponce(200, result, `Game fetched Succesfully`));
  },
);

export const gamesDropdown = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await gameService.gamesDropdown();

    res
      .status(200)
      .json(new ApiResponce(200, result, "Fetched all games successfully"));
  },
);

export const submitGameSession = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const levelName = req.params.levelName;

    const score = Number(req.body.score);

    const studentID = Number(req.user.accountId);

    const result = await gameService.submitSession({
      studentID,
      levelName,
      score,
    });

    res.status(200).json(new ApiResponce(200, result, "Submitted"));
  },
);
