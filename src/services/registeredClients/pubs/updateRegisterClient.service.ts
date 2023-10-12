import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { iRegisteredClientResponse, iUpdateRegisteredClient } from "../../../interfaces/registeredClients.interfaces";
import { RegisteredClients } from "../../../entities";
import { registeredClientsSchemaResponse } from "../../../schemas/registeredClients.schemas";

export const updateRegisterClientService = async (id: number, data: iUpdateRegisteredClient, pubId: number): Promise<iRegisteredClientResponse> => {
  const registerClientRepository: Repository<RegisteredClients> = AppDataSource.getRepository(RegisteredClients);

  const findRegisterClient: RegisteredClients | null = await registerClientRepository.findOne({
    where: {
      id: id,
      pub: {
        id: pubId,
      },
    },
    relations: {
      client: true,
      pub: true,
    }
  });

  if (!findRegisterClient) {
    throw new AppError("Registro de cliente não encontrado", 404);
  }

  const newDataRegisterClient = {
    ...findRegisterClient,
    ...data,
  };

  await registerClientRepository.save(newDataRegisterClient);

  const registerClient = registeredClientsSchemaResponse.parse(newDataRegisterClient);

  return registerClient;
};
