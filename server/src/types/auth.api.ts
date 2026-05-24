import z from "zod";

export const studentSignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
  schoolName: z.string().min(1, "School name is required"),
});
export type SignupRequest = z.infer<typeof studentSignupSchema>;

export const loginRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const createRegionAdminSchema = z.object({
  email: z.string().email("Invalid email address"),
  regionName: z.string().min(1, "Region name is required"),
});

export type RegionalAdminSignupRequest = z.infer<
  typeof createRegionAdminSchema
>;

export const createSchoolAdminSchema = z.object({
  email: z.string().email("Invalid email address"),
  schoolName: z.string().min(1, "School name is required"),
});

export type SchoolAdminSignupRequest = z.infer<typeof createSchoolAdminSchema>;
