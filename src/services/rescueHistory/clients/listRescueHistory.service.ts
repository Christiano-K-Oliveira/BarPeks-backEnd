import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { iListRescueHistory } from '../../../interfaces/rescueHistory.interfaces';
import { RescueHistory } from '../../../entities';
import { listRescueHistorySchema } from '../../../schemas/rescueHistory.schemas';

export const listRescueHistoryService = async (clientId: number): Promise<iListRescueHistory> => {
    const registerClientRepository: Repository<RescueHistory> = AppDataSource.getRepository(RescueHistory);

	const findRegisterClient: RescueHistory[] = await registerClientRepository.findBy({
        client: {
            id: clientId
        }
    });
	const rescueHRescueHistory = listRescueHistorySchema.parse(findRegisterClient);
    
	return rescueHRescueHistory;
}