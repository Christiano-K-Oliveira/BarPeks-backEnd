import { DeepPartial } from 'typeorm';
import { z } from 'zod';
import { listRegisteredClientsSchema, registeredClientsSchemaRequest, registeredClientsSchemaResponse, searchUniqueRegisterClientSchema } from '../schemas/registeredClients.schemas';

export type iRegisteredClientRequest = z.infer<typeof registeredClientsSchemaRequest>
export type iRegisteredClientResponse = z.infer<typeof registeredClientsSchemaResponse>
export type iUpdateRegisteredClient = DeepPartial<z.infer<typeof registeredClientsSchemaRequest>>
export type iListRegisteredClients = z.infer<typeof listRegisteredClientsSchema>
export type iUniqueRegisteredClientRequest = z.infer<typeof searchUniqueRegisterClientSchema>
