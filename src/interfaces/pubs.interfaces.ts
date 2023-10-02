import { DeepPartial } from 'typeorm';
import { z } from 'zod';
import { pubsSchemaRequest, pubsSchemaResponse} from '../schemas/pubs.schemas';

export type iPubRequest = z.infer<typeof pubsSchemaRequest>
export type iPubResponse = z.infer<typeof pubsSchemaResponse>
export type iUpdatePub = DeepPartial<z.infer<typeof pubsSchemaResponse>>