import { z } from 'zod';

//Login Schema with Zod
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required!'),
  password: z.string().min(1, 'Password is required!').min(2, 'Password must be more than 2 characters'),
});
