import { Repository } from "typeorm";
import { iPlanResponse } from "../../interfaces/plans.interfaces";
import { Plan } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { plansSchemaResponse } from "../../schemas/plans.schemas";

export const listPlanUniqueService = async (pubId: number): Promise<iPlanResponse> => {
    const planRepository: Repository<Plan> = AppDataSource.getRepository(Plan);

	const findPlans: Plan | null = await planRepository.findOne({
		where: {
			pub: {
				id: pubId
			},
		},
		relations: {
			pub: true
		}
    });

    if (!findPlans) {
		throw new AppError('Plano não encontrado', 404);
	}
	const plan = plansSchemaResponse.parse(findPlans);
    
	return plan;
}