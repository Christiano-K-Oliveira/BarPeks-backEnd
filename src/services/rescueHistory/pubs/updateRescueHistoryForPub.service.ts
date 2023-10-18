import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { iRescueHistoryResponse, iUpdateRescueHistory } from "../../../interfaces/rescueHistory.interfaces";
import { RescueHistory } from "../../../entities";
import { rescueHistorySchemaResponse } from "../../../schemas/rescueHistory.schemas";

export const updateRescueHistoryForPubService = async (id: number, data: iUpdateRescueHistory, pubId: number): Promise<iRescueHistoryResponse> => {
  const rescueHistoryRepository: Repository<RescueHistory> = AppDataSource.getRepository(RescueHistory);

  const findRescueHistory: RescueHistory | null = await rescueHistoryRepository.findOne({
    where: {
      id: id,
      code_rescue: data.code_rescue!,
      pub: {
        id: pubId,
      }
    },
    relations: {
      client: true,
      pub: true,
    }
  });

  if (!findRescueHistory) {
    throw new AppError("Histórico de recompensa não encontrado", 404);
  }

  const newDataRescueHistory = {
    ...findRescueHistory,
    ...data,
  };

  await rescueHistoryRepository.save(newDataRescueHistory);

  const registerClient = rescueHistorySchemaResponse.parse(newDataRescueHistory);

  return registerClient;
};
