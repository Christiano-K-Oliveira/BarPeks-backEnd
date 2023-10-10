import { z } from 'zod'

const pubsSchemaRequest = z.object({
    name: z.string().max(150),
    social_number: z.string().max(14),
    email: z.string().email().max(80),
    password: z.string().max(120),
    reset_password: z.string().nullish(),
    telephone: z.string().min(11).max(11),
    address: z.string().max(150),
    state: z.string().max(60),
    city: z.string().max(60),
    postal_code: z.string().max(8),
    is_active: z.boolean().default(true)
})

const pubsUpdateSchemaRequest = z.object({
    name: z.string().max(150).optional(),
    social_number: z.string().max(14).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    telephone: z.string().min(11).max(11).optional(),
    address: z.string().max(150).optional(),
    state: z.string().max(60).optional(),
    city: z.string().max(60).optional(),
    postal_code: z.string().max(8).optional(),
})

const pubsSchemaResponse = z.object({
    id: z.number(),
    name: z.string().max(150),
    social_number: z.string().max(14),
    email: z.string().email().max(80),
    telephone: z.string().min(11).max(11),
    address: z.string().max(150),
    state: z.string().max(60),
    city: z.string().max(60),
    postal_code: z.string().max(8),
    photo_url: z.string().nullish(),
})

const resetPasswordPubSchema = z.object({
    reset_password: z.string()
})

const passwordPubSchema = z.object({
    password: z.string().max(120)
})


export { 
    pubsSchemaRequest, 
    pubsSchemaResponse, 
    pubsUpdateSchemaRequest, 
    resetPasswordPubSchema,
    passwordPubSchema
}