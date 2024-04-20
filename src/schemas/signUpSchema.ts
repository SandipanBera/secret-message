import { z } from "zod";
export const UsernameValidation = z
  .string()
  .min(4, "Username must be at least 4 characters long")
  .max(16, "Username is too long")
  .regex(/^[a-zA-Z0-9]+$/, "Username not contain any special character");
export const signUpSchema = z.object({
  username: UsernameValidation,
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(6, "Password must be 6 character long")
    .max(12, "Password is too long"),
});
