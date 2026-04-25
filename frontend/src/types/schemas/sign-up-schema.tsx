import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
