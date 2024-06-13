import { z } from "zod";
export const sendCodeSchema = z.object({
    email: z.string().email("Invalid email"),
})