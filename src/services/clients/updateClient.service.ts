import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import { iClientResponse, iUpdateClient } from '../../interfaces/clients.interfaces';
import { Client } from '../../entities';
import { clientsSchemaResponse } from '../../schemas/clients.schemas';

export const updateClientService = async (id: number, data: iUpdateClient): Promise<iClientResponse> => {
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

	const findClient: Client | null = await clientRepository.findOneBy({
        id: id
    });

    if (!findClient) {
		throw new AppError('Cliente não encontrado', 404);
	}

    const newDataClient = {
		...findClient,
		...data,
	};

	await clientRepository.save(newDataClient);
    
	const client = clientsSchemaResponse.parse(newDataClient);
    
	return client;
}