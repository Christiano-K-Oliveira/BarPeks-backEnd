import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { iListRescueHistory, iUniqueRescueHistoryRequest } from "../../../interfaces/rescueHistory.interfaces";
import { Client, RescueHistory } from "../../../entities";
import { listRescueHistorySchema, rescueHistorySchemaResponse } from "../../../schemas/rescueHistory.schemas";

export const listRescueHistoryForPubService = async (data: iUniqueRescueHistoryRequest, pubId: number): Promise<iListRescueHistory> => {
  const rescueHistoryRepository: Repository<RescueHistory> = AppDataSource.getRepository(RescueHistory);
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const findClientName: Client | null = await clientRepository.findOneBy({
    name: data.name ? data.name : "",
  });

  const findClientCpf: Client | null = await clientRepository.findOneBy({
    cpf: data.socialNumber ? data.socialNumber : "",
  });

  const findClient: Client | null = await clientRepository.findOneBy({
    name: data.socialNumber ? data.socialNumber : "",
    cpf: data.socialNumber ? data.socialNumber : "",
  });

  if (!findClientName && !findClientCpf && !findClient) {
    throw new AppError("Cliente não encontrado", 404);
  }

  if (findClientName) {
    const findRescueHistory: RescueHistory[] | null = await rescueHistoryRepository.findBy({
      pub: {
        id: pubId,
      },
      client: {
        id: findClientName.id,
      },
    });

    const rescueHistory = listRescueHistorySchema.parse(findRescueHistory);

    return rescueHistory;
  }

  if (findClientCpf) {
    const findRescueHistory: RescueHistory[] | null = await rescueHistoryRepository.findBy({
      pub: {
        id: pubId,
      },
      client: {
        id: findClientCpf.id,
      },
    });

    const rescueHistory = listRescueHistorySchema.parse(findRescueHistory);

    return rescueHistory;
  }

  const findRescueHistory: RescueHistory[] | null = await rescueHistoryRepository.findBy({
    pub: {
      id: pubId,
    },
    client: {
      id: findClient ? findClient.id : 0,
    },
  });

  const rescueHistory = listRescueHistorySchema.parse(findRescueHistory);

  return rescueHistory;
};
