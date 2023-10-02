import { DeepPartial } from 'typeorm';
import { z } from 'zod';
import { clientsSchemaRequest, clientsSchemaResponse } from '../schemas/clients.schemas';

export type iClientRequest = z.infer<typeof clientsSchemaRequest>
export type iClientResponse = z.infer<typeof clientsSchemaResponse>
export type iUpdateClient = DeepPartial<z.infer<typeof clientsSchemaResponse>>