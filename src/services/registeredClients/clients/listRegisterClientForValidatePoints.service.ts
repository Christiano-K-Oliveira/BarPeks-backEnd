import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { RegisteredClients } from "../../../entities";
import { AppError } from "../../../errors";
import { registeredClientsSchemaResponse } from "../../../schemas/registeredClients.schemas";

const listRegisterClientForValidatePointsService = async (qrcode: string, clientId: number) => {
    const registerClientRepository: Repository<RegisteredClients> = AppDataSource.getRepository(RegisteredClients);

	const findRegisterClient: RegisteredClients | null = await registerClientRepository.findOne({
		where: {
            link_qrcode: qrcode,
			client: {
				id: clientId,
			},
		},
		relations: {
			client: true,
			pub: true,
		}
    });

    if (!findRegisterClient) {
		throw new AppError('Registro de cliente não encontrado', 404);
	}

    const registerClient = registeredClientsSchemaResponse.parse(findRegisterClient);

    return registerClient
}

export { listRegisterClientForValidatePointsService }