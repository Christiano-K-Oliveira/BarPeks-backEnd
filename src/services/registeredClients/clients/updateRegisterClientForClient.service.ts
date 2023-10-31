import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { iRegisteredClientResponse, iUpdateRegisteredClient } from '../../../interfaces/registeredClients.interfaces';
import { RegisteredClients } from '../../../entities';
import { registeredClientsSchemaResponse } from '../../../schemas/registeredClients.schemas';

export const updateRegisterClientForClientService = async (id: number, data: iUpdateRegisteredClient, clientId: number): Promise<iRegisteredClientResponse> => {
    const registerClientRepository: Repository<RegisteredClients> = AppDataSource.getRepository(RegisteredClients);

	const findRegisterClient: RegisteredClients | null = await registerClientRepository.findOne({
		where: {
			id: id,
			client: {
				id: clientId
			}
		},
		relations: {
			client: true,
			pub: true,
		}
    });

    if (!findRegisterClient) {
		throw new AppError('Registro de cliente não encontrado', 404);
	}
	if(parseInt(findRegisterClient.points) - parseInt(data.points!) < 0){
		throw new AppError('A pontuação não pode ser menor que zero.', 403)
	}

    const newDataRegisterClient = {
		...findRegisterClient,
		...data,
		points: data.points && parseInt(findRegisterClient.points) >= parseInt(data.points) ? (parseInt(findRegisterClient.points) - parseInt(data.points)).toString() : findRegisterClient.points
	};

	await registerClientRepository.save(newDataRegisterClient);
    
	const registerClient = registeredClientsSchemaResponse.parse(newDataRegisterClient);
    
	return registerClient;
}