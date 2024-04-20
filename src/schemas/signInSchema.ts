import { z } from "zod";
export const sigInSchema = z.object({
  username: z.string(),
  password: z.string(),
});
