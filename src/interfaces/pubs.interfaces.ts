import { DeepPartial } from 'typeorm';
import { z } from 'zod';
import { passwordPubSchema, pubsSchemaRequest, pubsSchemaResponse, resetPasswordPubSchema} from '../schemas/pubs.schemas';

export type iPubRequest = z.infer<typeof pubsSchemaRequest>
export type iPubResponse = z.infer<typeof pubsSchemaResponse>
export type iUpdatePub = DeepPartial<z.infer<typeof pubsSchemaResponse>>
export type iResetPasswordPub = z.infer<typeof resetPasswordPubSchema>
export type iPasswordPub = z.infer<typeof passwordPubSchema>
