import { z } from "zod";

export const createGameSchema = z.object({
  gameName: z
    .string("Game name is required.")
    .min(5, "At least 5 characters are required.")
    .max(100),
});

export type CreateGameRequest = z.infer<typeof createGameSchema>;

export const createLevelAndBadgeSchema = z.object({
  levels: z
    .array(
      z.object({
        levelName: z
          .string({
            message: "Level name is required",
          })
          .min(5, "Level name must be at least 5 characters")
          .max(30, "Level name must not exceed 30 characters"),
        badgeName: z
          .string({
            message: "Badge name is required",
          })
          .min(5, "Badge name must be at least 5 characters")
          .max(30, "Badge name must not exceed 30 characters"),
      }),
    )
    .min(1, "At least 1 level must be provided")
    .max(3, "Maximum of 3 levels can be added at once"), // same limit as in service
});

export type CreateLevelAndBadgeRequest = z.infer<
  typeof createLevelAndBadgeSchema
>;

export const submitGameSessionParams = z.object({
  gameID: z.string().refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0 && Number.isInteger(num);
    },
    {
      message: "gameId must be a positive integer",
    },
  ),
  levelName: z
    .string("Level name is required in params.")
    .min(1, "Level name cannot be empty")
    .max(50, "Level name must not exceed 50 characters"),
});
export type SubmitGameSessionParams = z.infer<typeof submitGameSessionParams>;

export const submitGameSessionBody = z.object({
  score: z
    .number("Score is required.")
    .int("Score must be a whole number.")
    .min(0, "Score cannot be negative.")
    .max(1000000, "Score cannot exceed 1,000,000."),
});
export type SubmitGameSessionBody = z.infer<typeof submitGameSessionBody>;
