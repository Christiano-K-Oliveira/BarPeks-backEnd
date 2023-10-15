import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { iListRescueHistory } from "../../../interfaces/rescueHistory.interfaces";
import { Client, RescueHistory } from "../../../entities";
import { listRescueHistorySchema } from "../../../schemas/rescueHistory.schemas";

export const listRescueHistoryForPubService = async (clientId: number, pubId: number): Promise<iListRescueHistory> => {
  const rescueHistoryRepository: Repository<RescueHistory> = AppDataSource.getRepository(RescueHistory);

  const findRescueHistory: RescueHistory[] | null = await rescueHistoryRepository.find({
    where: {
      pub: {
        id: pubId,
      },
      client: {
        id: clientId,
      },
    },
    relations: {
      client: true,
      pub: true,
    }
  });
  

  if (!findRescueHistory) {
    throw new AppError("Histórico de Recompensas não encontrado", 404);
  }

  const rescueHistory = listRescueHistorySchema.parse(findRescueHistory);

  return rescueHistory;
};
