import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { RescueHistory } from '../../../entities';

export const deleteRescueHistoryService = async (id: number, clientId: number): Promise<void> => {
    const rescueHistoryRepository: Repository<RescueHistory> = AppDataSource.getRepository(RescueHistory);

	const findRescueHistory: RescueHistory | null = await rescueHistoryRepository.findOneBy({
        id: id,
        client: {
            id: clientId
        }
    });

    if (!findRescueHistory) {
		throw new AppError('Histórico de recompensa não encontrado', 404);
	}
    
    await rescueHistoryRepository.remove(findRescueHistory);
}