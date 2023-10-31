import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { iRegisteredClientResponse, iUniqueRegisteredClientRequest } from '../../../interfaces/registeredClients.interfaces';
import { Pub, RegisteredClients } from '../../../entities';
import { registeredClientsSchemaResponse } from '../../../schemas/registeredClients.schemas';

export const listRegisterClientUniqueForClientService = async (data: iUniqueRegisteredClientRequest, clientId: number): Promise<iRegisteredClientResponse> => {
    const registerClientRepository: Repository<RegisteredClients> = AppDataSource.getRepository(RegisteredClients);
	const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);

	const findPubName: Pub | null = await pubRepository.findOneBy({
		name: data.name ? data.name : ''
	})

	const findPubSocialNumber: Pub | null = await pubRepository.findOneBy({
		social_number: data.socialNumber ? data.socialNumber : ''
	}) 

	const findPub: Pub | null = await pubRepository.findOneBy({
		name: data.socialNumber ? data.socialNumber : '',
		social_number: data.socialNumber ? data.socialNumber : ''
	})
	
	if(!findPubName && !findPubSocialNumber && !findPub){
		throw new AppError('Bar não encontrado', 404)
	}

	if(findPub){
		const findRegisteredClients: RegisteredClients | null = await registerClientRepository.findOne({
			where: {
				pub: {
					id: findPub.id
				},
				client: {
					id: clientId
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

	if(findPubSocialNumber){
		const findRegisteredClients: RegisteredClients | null = await registerClientRepository.findOne({
			where: {
				pub: {
					id: findPubSocialNumber.id
				},
				client: {
					id: clientId
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

	const findRegisteredClients: RegisteredClients | null = await registerClientRepository.findOne({
		where: {
			pub: {
				id: findPubName ? findPubName.id : 0
			},
			client: {
				id: clientId
			}
		},
		relations: {
			pub: true,
			client: true,
		}
	});

	const registerClient = registeredClientsSchemaResponse.parse(findRegisteredClients);
		
	return registerClient;
}