import { z } from 'zod'

const plansSchemaRequest = z.object({
    name: z.string().max(150),
    pub_id: z.number(),
})

const plansSchemaResponse = z.object({
    id: z.number(),
    name: z.string().max(150),
    created_at: z.string(),
    updated_at: z.string(),
    pub: z.object({
        id: z.number()
    })
})

export { plansSchemaRequest, plansSchemaResponse }