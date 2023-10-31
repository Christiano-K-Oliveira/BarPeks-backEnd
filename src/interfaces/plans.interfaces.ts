import { DeepPartial } from 'typeorm';
import { z } from 'zod';
import { plansSchemaRequest, plansSchemaResponse } from '../schemas/plans.schemas';

export type iPlanRequest = z.infer<typeof plansSchemaRequest>
export type iPlanResponse = z.infer<typeof plansSchemaResponse>
export type iUpdatePlan = DeepPartial<z.infer<typeof plansSchemaRequest>>