import { DeepPartial } from 'typeorm';
import { z } from 'zod';
import { listRescueHistorySchema, rescueHistorySchemaRequest, rescueHistorySchemaResponse, searchRescueHistoryForPubSchema, searchUniqueRescueHistorySchema } from '../schemas/rescueHistory.schemas';

export type iRescueHistoryRequest = z.infer<typeof rescueHistorySchemaRequest>
export type iRescueHistoryResponse = z.infer<typeof rescueHistorySchemaResponse>
export type iUpdateRescueHistory = DeepPartial<z.infer<typeof rescueHistorySchemaRequest>>
export type iListRescueHistory = z.infer<typeof listRescueHistorySchema>
export type iUniqueRescueHistoryRequest = z.infer<typeof searchUniqueRescueHistorySchema>
export type iSearchRescueHistory = z.infer<typeof searchRescueHistoryForPubSchema>