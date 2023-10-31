import { z } from 'zod'

const registeredClientsSchemaRequest = z.object({
    name: z.string().max(150),
    cpf: z.string().min(11).max(11),
    email: z.string().email().max(80),
    telephone: z.string().min(11).max(11),
    points: z.string().max(6)
})

const registeredClientsUpdateSchemaRequest = z.object({
    name: z.string().max(150).optional(),
    cpf: z.string().min(11).max(11).optional(),
    email: z.string().email().max(80).optional(),
    telephone: z.string().min(11).max(11).optional(),
    points: z.string().max(6).optional(),
    link_qrcode: z.string().max(10).optional(),
    old_points: z.string().max(6).optional(),
})

const registeredClientsSchemaResponse = z.object({
    id: z.number(),
    name: z.string().max(150),
    cpf: z.string().min(11).max(11),
    email: z.string().email().max(80),
    telephone: z.string().min(11).max(11),
    points: z.string().max(6).default("0"),
    link_qrcode: z.string().max(10).nullish(),
    old_points: z.string().max(6).nullish(),
    pub: z.object({
        id: z.number(),
        name: z.string(),
        photo_url: z.string().nullish(),
    }),
    client: z.object({
        id: z.number(),
        name: z.string(),
        photo_url: z.string().nullish(),
    })
})

const listRegisteredClientsSchema = z.array(registeredClientsSchemaResponse)

const searchUniqueRegisterClientSchema = z.object({
    name: z.string().max(150).optional(),
    socialNumber: z.string().min(11).max(14).optional()
})

export { 
    registeredClientsSchemaRequest, 
    registeredClientsSchemaResponse, 
    registeredClientsUpdateSchemaRequest, 
    listRegisteredClientsSchema,
    searchUniqueRegisterClientSchema
}