import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { iListRegisteredClients } from '../../../interfaces/registeredClients.interfaces';
import { RegisteredClients } from '../../../entities';
import { listRegisteredClientsSchema } from '../../../schemas/registeredClients.schemas';

export const listRegisterClientService = async (pubId: number): Promise<iListRegisteredClients> => {
    const registerClientRepository: Repository<RegisteredClients> = AppDataSource.getRepository(RegisteredClients);

	const findRegisterClient: RegisteredClients[] = await registerClientRepository.find({
        where: {
            pub: {
                id: pubId
            }
        },
        relations: {
            client: true,
            pub: true,
        }
    });
	const registeredClients = listRegisteredClientsSchema.parse(findRegisterClient);
    
	return registeredClients;
}