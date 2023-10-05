import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { RegisteredClients } from '../../../entities';

export const deleteRegisterClientService = async (id: number, registerClientId: number): Promise<void> => {
    const registerClientRepository: Repository<RegisteredClients> = AppDataSource.getRepository(RegisteredClients);

	const findRegisterClient: RegisteredClients | null = await registerClientRepository.findOneBy({
        id: id,
        pub: {
            id: registerClientId
        }
    });

    if (!findRegisterClient) {
		throw new AppError('Registro de cliente não encontrado', 404);
	}
    
    await registerClientRepository.remove(findRegisterClient);
}