import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { iRescueHistoryRequest, iRescueHistoryResponse } from '../../../interfaces/rescueHistory.interfaces';
import { Client, Pub, RescueHistory } from '../../../entities';
import { rescueHistorySchemaResponse } from '../../../schemas/rescueHistory.schemas';

export const createRescueHistoryService = async (rescueHistoryData: iRescueHistoryRequest, clientId: number, pubId: number): Promise<iRescueHistoryResponse> => {
    const rescueHistoryRepository: Repository<RescueHistory> = AppDataSource.getRepository(RescueHistory);
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

	const pub: Pub | null = await pubRepository.findOneBy({
        id: pubId
    });

    const client: Client | null = await clientRepository.findOneBy({
        id: clientId
    });

    if (!pub) {
		throw new AppError('Bar não encontrado', 404);
	}

    if (!client) {
		throw new AppError('Cliente não encontrado', 404);
	}

    const data = {
        ...rescueHistoryData,
        pub: pub,
        client: client,
    }

    const rescueHistory: iRescueHistoryRequest = rescueHistoryRepository.create(data)
    await rescueHistoryRepository.save(rescueHistory)
    
    const rescueHistoryResponse = rescueHistorySchemaResponse.parse(rescueHistory)

    return rescueHistoryResponse
}