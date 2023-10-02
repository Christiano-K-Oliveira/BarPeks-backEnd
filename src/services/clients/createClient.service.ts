import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import { iClientRequest, iClientResponse } from '../../interfaces/clients.interfaces';
import { Client } from '../../entities';
import { clientsSchemaResponse } from '../../schemas/clients.schemas';

export const createClientService = async (clientData: iClientRequest): Promise<iClientResponse> => {
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);
    const checkEmailExist: Client | null = await clientRepository.findOneBy({
        email: clientData.email,
    })

    if (checkEmailExist) {
        throw new AppError('Este email já existe', 409);
    }

    const client: iClientRequest = clientRepository.create(clientData)
    await clientRepository.save(client)

    const clientResponse = clientsSchemaResponse.parse(client)

    return clientResponse
}