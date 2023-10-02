import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import { Client } from '../../entities';

export const deleteClientService = async (id: number): Promise<void> => {
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

	const findClient: Client | null = await clientRepository.findOneBy({
        id: id
    });

    if (!findClient) {
		throw new AppError('Cliente não encontrado', 404);
	}
    
    await clientRepository.remove(findClient);
}