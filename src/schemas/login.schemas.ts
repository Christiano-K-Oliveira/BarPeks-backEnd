import { z } from 'zod'

const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})

const loginEmailSchema = z.object({
    email: z.string()
})

export { loginSchema, loginEmailSchema }