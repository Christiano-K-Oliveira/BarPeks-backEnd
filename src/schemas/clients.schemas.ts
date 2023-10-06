import { z } from 'zod'

const clientsSchemaRequest = z.object({
    name: z.string().max(150),
    birth_date: z.string(),
    cpf: z.string().max(11),
    email: z.string().email().max(80),
    password: z.string().max(120),
    reset_password: z.string().nullish(),
    telephone: z.string().min(11).max(11),
})

const clientsUpdateSchemaRequest = z.object({
    name: z.string().max(150).optional(),
    birth_date: z.string().optional(),
    cpf: z.string().max(11).optional(),
    email: z.string().email().max(80).optional(),
    password: z.string().max(120).optional(),
    reset_password: z.string().nullish().optional(),
    telephone: z.string().min(11).max(11).optional(),
})

const clientsSchemaResponse = z.object({
    id: z.number(),
    name: z.string().max(150),
    birth_date: z.string(),
    cpf: z.string().max(11),
    email: z.string().email().max(80),
    telephone: z.string().min(11).max(11),
    photo_url: z.string().nullish()
})

const resetPasswordClientSchema = z.object({
    reset_password: z.string()
})

export { clientsSchemaRequest, clientsSchemaResponse, clientsUpdateSchemaRequest, resetPasswordClientSchema }