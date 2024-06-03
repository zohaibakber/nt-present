import { z } from "zod";

export const primeSchema = z.object({
  p: z.number(),
  q: z.number(),
});
