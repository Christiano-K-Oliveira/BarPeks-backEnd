import { z } from 'zod';
import { loginEmailSchema, loginSchema } from '../schemas/login.schemas';

export type iLogin = z.infer<typeof loginSchema>
export type iLoginEmail = z.infer<typeof loginEmailSchema>