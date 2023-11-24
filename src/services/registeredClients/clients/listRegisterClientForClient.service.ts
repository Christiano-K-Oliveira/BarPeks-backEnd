import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { iRegisteredClientResponse, iUniqueRegisteredClientRequest } from '../../../interfaces/registeredClients.interfaces';
import { Pub, RegisteredClients } from '../../../entities';
import { registeredClientsSchemaResponse } from '../../../schemas/registeredClients.schemas';

export const listRegisterClientUniqueForClientService = async (data: iUniqueRegisteredClientRequest, clientId: number): Promise<iRegisteredClientResponse> => {
    const registerClientRepository: Repository<RegisteredClients> = AppDataSource.getRepository(RegisteredClients);
	const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);

	const findPub: Pub | null = await pubRepository.findOneBy({
		name: data.name ? data.name : '',
		social_number: data.socialNumber ? data.socialNumber : ''
	})
	
	if(!findPub){
		throw new AppError('Bar não encontrado', 404)
	}

	const findRegisteredClients: RegisteredClients | null = await registerClientRepository.findOne({
		where: {
			client: {
				id: clientId,
			},
		},
		relations: {
			pub: true,
			client: true,
		}
	});

	const registerClient = registeredClientsSchemaResponse.parse(findRegisteredClients);
	
	return registerClient;
}