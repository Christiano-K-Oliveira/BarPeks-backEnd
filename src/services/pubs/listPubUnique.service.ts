import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Pub } from '../../entities';
import { AppError } from '../../errors';
import { iPubResponse } from '../../interfaces/pubs.interfaces';
import { pubsSchemaResponse } from '../../schemas/pubs.schemas';


export const listPubUniqueService = async (id: number): Promise<iPubResponse> => {
    const usuarioRepository: Repository<Pub> = AppDataSource.getRepository(Pub);

	const findPub: Pub | null = await usuarioRepository.findOneBy({
        id: id
    });

    if (!findPub) {
		throw new AppError('Bar não encontrado', 404);
	}
	const pub = pubsSchemaResponse.parse(findPub);
    
	return pub;
}