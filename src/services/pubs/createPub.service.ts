import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Pub } from '../../entities';
import { AppError } from '../../errors';
import { iPubRequest, iPubResponse } from '../../interfaces/pubs.interfaces';
import { pubsSchemaResponse } from '../../schemas/pubs.schemas';

export const createPubService = async (pubData: iPubRequest): Promise<iPubResponse> => {
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);
    const checkEmailExist: Pub | null = await pubRepository.findOneBy({
        email: pubData.email,
        is_active: true,
    })

    if (checkEmailExist) {
        throw new AppError('Este email já existe', 409);
    }

    const pub: iPubRequest = pubRepository.create(pubData)
    await pubRepository.save(pub)

    const pubResponse = pubsSchemaResponse.parse(pub)

    return pubResponse
}