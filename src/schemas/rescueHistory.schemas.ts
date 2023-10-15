import { z } from 'zod'

const rescueHistorySchemaRequest = z.object({
    status: z.string().default('disponivel'),
    reward_name: z.string().max(80),
    code_rescue: z.string().max(10),
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
    code_rescue: z.string().max(10),
    rescue_date: z.string().max(20).nullish(),
    pub: z.object({
        id: z.number(),
        name: z.string().max(150),
        social_number: z.string().max(14)
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

const searchRescueHistoryForPubSchema = z.object({
    code_rescue: z.string().max(10),
})

export { 
    rescueHistorySchemaRequest, 
    rescueHistorySchemaResponse, 
    rescueHistorysUpdateSchemaRequest, 
    listRescueHistorySchema,
    searchUniqueRescueHistorySchema,
    searchRescueHistoryForPubSchema
}