import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors';
import { iRegisteredClientRequest, iRegisteredClientResponse } from '../../../interfaces/registeredClients.interfaces';
import { Client, Pub, RegisteredClients } from '../../../entities';
import { registeredClientsSchemaResponse } from '../../../schemas/registeredClients.schemas';

export const createRegisterClientService = async (registerClientData: iRegisteredClientRequest, pubId: number): Promise<iRegisteredClientResponse> => {
    const registerClientRepository: Repository<RegisteredClients> = AppDataSource.getRepository(RegisteredClients);
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

	const pub: Pub | null = await pubRepository.findOneBy({
        id: pubId
    });

    const client: Client | null = await clientRepository.findOneBy({
        email: registerClientData.email
    });

    const findRegisterClient: RegisteredClients | null = await registerClientRepository.findOneBy({
        cpf: registerClientData.cpf
    })

    if (!pub) {
		throw new AppError('Bar não encontrado', 404);
	}

    if (!client) {
		throw new AppError('Cliente não encontrado', 404);
	}

    if(findRegisterClient){
        throw new AppError('Cliente já registrado', 409)
    }

    const data = {
        ...registerClientData,
        pub: pub,
        client: client,
    }

    const registerClient: iRegisteredClientRequest = registerClientRepository.create(data)
    await registerClientRepository.save(registerClient)

    const registerClientResponse = registeredClientsSchemaResponse.parse(registerClient)

    return registerClientResponse
}