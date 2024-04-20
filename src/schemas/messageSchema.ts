import { z } from "zod";
export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Message is too short")
    .max(256, "Message is too long"),
});
