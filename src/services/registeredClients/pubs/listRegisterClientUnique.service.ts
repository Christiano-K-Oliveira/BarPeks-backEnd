import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { iListRegisteredClients, iUniqueRegisteredClientRequest } from "../../../interfaces/registeredClients.interfaces";
import { RegisteredClients } from "../../../entities";
import { listRegisteredClientsSchema } from "../../../schemas/registeredClients.schemas";

export const listRegisterClientUniqueService = async (data: iUniqueRegisteredClientRequest, pubId: number): Promise<iListRegisteredClients> => {
  const registerClientRepository: Repository<RegisteredClients> = AppDataSource.getRepository(RegisteredClients);

  const findRegisteredClientsName: RegisteredClients[] | null = await registerClientRepository.findBy({
    name: data.name !== undefined ? data.name : "",
    pub: {
      id: pubId,
    },
  });

  const findRegisteredClientsCpf: RegisteredClients[] | null = await registerClientRepository.findBy({
    cpf: data.socialNumber !== undefined ? data.socialNumber : "",
    pub: {
      id: pubId,
    },
  });

  const findRegisteredClients: RegisteredClients[] | null = await registerClientRepository.findBy({
    name: data.name !== undefined ? data.name : "",
    cpf: data.socialNumber !== undefined ? data.socialNumber : "",
    pub: {
      id: pubId,
    },
  });

  if (findRegisteredClients.length === 0 && findRegisteredClientsName.length === 0 && findRegisteredClientsCpf.length === 0) {
    throw new AppError("Registro de cliente não encontrado", 404);
  }

  if (findRegisteredClientsName.length > 0) {
    const registeredClients = listRegisteredClientsSchema.parse(findRegisteredClientsName);

    return registeredClients;
  }

  if (findRegisteredClientsCpf.length > 0) {
    const registeredClients = listRegisteredClientsSchema.parse(findRegisteredClientsCpf);

    return registeredClients;
  }

  const registeredClients = listRegisteredClientsSchema.parse(findRegisteredClientsCpf);

  return registeredClients;
};
