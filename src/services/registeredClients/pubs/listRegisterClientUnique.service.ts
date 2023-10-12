import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { iListRegisteredClients, iUniqueRegisteredClientRequest } from "../../../interfaces/registeredClients.interfaces";
import { RegisteredClients } from "../../../entities";
import { listRegisteredClientsSchema } from "../../../schemas/registeredClients.schemas";

export const listRegisterClientUniqueService = async (data: iUniqueRegisteredClientRequest, pubId: number): Promise<iListRegisteredClients> => {
  const registerClientRepository: Repository<RegisteredClients> = AppDataSource.getRepository(RegisteredClients);

  const findRegisteredClientsName: RegisteredClients[] | null = await registerClientRepository.find({
    where: {
      name: data.name !== undefined ? data.name : "",
      pub: {
        id: pubId,
      },
    },
    relations: {
      client: true,
      pub: true
    }
  });

  const findRegisteredClientsCpf: RegisteredClients[] | null = await registerClientRepository.find({
    where: {
      cpf: data.socialNumber !== undefined ? data.socialNumber : "",
      pub: {
        id: pubId,
      },
    },
    relations: {
      client: true,
      pub: true
    },
  });

  const findRegisteredClients: RegisteredClients[] | null = await registerClientRepository.find({
    where: {
      name: data.name !== undefined ? data.name : "",
      cpf: data.socialNumber !== undefined ? data.socialNumber : "",
      pub: {
        id: pubId,
      },
    },
    relations: {
      pub: true,
      client: true,
    }
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
