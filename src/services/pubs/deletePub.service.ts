import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Pub } from '../../entities';
import { AppError } from '../../errors';

export const deletePubService = async (id: number): Promise<void> => {
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);

	const findPub: Pub | null = await pubRepository.findOneBy({
        id: id
    });

    if (!findPub) {
		throw new AppError('Bar não encontrado', 404);
	}
    
    await pubRepository.remove(findPub);
}