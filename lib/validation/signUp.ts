import { z } from "zod";
export const signUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export type SignUpType = z.infer<typeof signUpSchema>;
