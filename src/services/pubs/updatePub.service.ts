import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Pub } from '../../entities';
import { AppError } from '../../errors';
import { iPasswordPub, iPubResponse, iResetPasswordPub, iUpdatePub } from '../../interfaces/pubs.interfaces';
import { pubsSchemaResponse } from '../../schemas/pubs.schemas';


export const updatePubService = async (id: number, data: iUpdatePub): Promise<iPubResponse> => {
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);

	const findPub: Pub | null = await pubRepository.findOneBy({
        id: id
    });

    if (!findPub) {
		throw new AppError('Bar não encontrado', 404);
	}

    const newDataPub = {
		...findPub,
		...data,
	};

	await pubRepository.save(newDataPub);
    
	const pub = pubsSchemaResponse.parse(newDataPub);
    
	return pub;
}

export const updateResetPasswordPubService = async (id: number, data: iResetPasswordPub): Promise<void> => {
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);

	const findPub: Pub | null = await pubRepository.findOneBy({
        id: id
    });

    if (!findPub) {
		throw new AppError('Bar não encontrado', 404);
	}

	const newDataPub = {
		...findPub,
		...data,
	};

	await pubRepository.save(newDataPub);
}

export const resetPasswordPubService = async (id: number, data: iPasswordPub): Promise<void> => {
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);

	const findPub: Pub | null = await pubRepository.findOneBy({
        id: id
    });

    if (!findPub) {
		throw new AppError('Bar não encontrado', 404);
	}

	const newDataPub = {
		...findPub,
		...data,
	};

	await pubRepository.save(newDataPub);
}