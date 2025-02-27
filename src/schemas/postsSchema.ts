import { z } from "zod";

export const postSchema = z.object({
  content: z.string(),
  mediaUrl: z.string().optional(),
});