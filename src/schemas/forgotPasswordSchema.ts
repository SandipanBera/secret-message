import { z } from "zod";
export const forgotPasswordSchema = z.object({
    newPassword: z.string().min(6, "Password must be 6 character long")
    .max(12, "Password is too long"),
    confirmPassword:z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], 
  })