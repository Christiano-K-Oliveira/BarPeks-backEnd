import { z } from 'zod'

const rescueHistorySchemaRequest = z.object({
    status: z.string().default('disponivel'),
    reward_name: z.string().max(80),
})

const rescueHistorysUpdateSchemaRequest = z.object({
    status: z.string().optional(),
    reward_name: z.string().max(80).optional(),
})

const rescueHistorySchemaResponse = z.object({
    id: z.number(),
    status: z.string(),
    date: z.string(),
    reward_name: z.string().max(80),
    pub: z.object({
        id: z.number(),
        name: z.string().max(150),
        socialNumber: z.string().max(14)
    }),
    client: z.object({
        id: z.number(),
        name: z.string().max(150),
        cpf: z.string().max(11)
    })
})

const listRescueHistorySchema = z.array(rescueHistorySchemaResponse)

const searchUniqueRescueHistorySchema = z.object({
    name: z.string().max(150).optional(),
    socialNumber: z.string().min(11).max(14).optional()
})

export { 
    rescueHistorySchemaRequest, 
    rescueHistorySchemaResponse, 
    rescueHistorysUpdateSchemaRequest, 
    listRescueHistorySchema,
    searchUniqueRescueHistorySchema
}