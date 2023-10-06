import { DeepPartial } from 'typeorm';
import { z } from 'zod';
import { clientsSchemaRequest, clientsSchemaResponse, resetPasswordClientSchema } from '../schemas/clients.schemas';

export type iClientRequest = z.infer<typeof clientsSchemaRequest>
export type iClientResponse = z.infer<typeof clientsSchemaResponse>
export type iUpdateClient = DeepPartial<z.infer<typeof clientsSchemaResponse>>
export type iResetPasswordClient = z.infer<typeof resetPasswordClientSchema>