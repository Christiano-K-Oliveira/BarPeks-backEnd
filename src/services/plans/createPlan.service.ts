import { Repository } from "typeorm";
import { Plan, Pub } from "../../entities";
import { iPlanRequest, iPlanResponse } from "../../interfaces/plans.interfaces";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { plansSchemaResponse } from "../../schemas/plans.schemas";

export const createPlanService = async (planData: iPlanRequest): Promise<iPlanResponse> => {
    const planRepository: Repository<Plan> = AppDataSource.getRepository(Plan);
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);

	const pub: Pub | null = await pubRepository.findOneBy({
        id: planData.pub_id
    });


    if (!pub) {
		throw new AppError('Bar não encontrado', 404);
	}

    const data = {
        name: "Sem Plano",
        pub: pub
    }

    const plan = planRepository.create(data)
    await planRepository.save(plan)

    const planResponse = plansSchemaResponse.parse(plan)

    return planResponse
}