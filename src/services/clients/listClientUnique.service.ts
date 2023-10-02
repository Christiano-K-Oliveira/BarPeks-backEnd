import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import { iClientResponse } from '../../interfaces/clients.interfaces';
import { Client } from '../../entities';
import { clientsSchemaResponse } from '../../schemas/clients.schemas';

export const listClientUniqueService = async (id: number): Promise<iClientResponse> => {
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

	const findClient: Client | null = await clientRepository.findOneBy({
        id: id
    });

    if (!findClient) {
		throw new AppError('Cliente não encontrado', 404);
	}
	const client = clientsSchemaResponse.parse(findClient);
    
	return client;
}