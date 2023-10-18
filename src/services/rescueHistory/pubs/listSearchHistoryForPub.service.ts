import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { iRescueHistoryResponse, iSearchRescueHistory } from "../../../interfaces/rescueHistory.interfaces";
import { RescueHistory } from "../../../entities";
import { rescueHistorySchemaResponse } from "../../../schemas/rescueHistory.schemas";

export const listSearchRescueHistoryForPubService = async (clientId: number, pubId: number, data: iSearchRescueHistory): Promise<iRescueHistoryResponse> => {
  const rescueHistoryRepository: Repository<RescueHistory> = AppDataSource.getRepository(RescueHistory);

  const findRescueHistory: RescueHistory | null = await rescueHistoryRepository.findOne({
    where: {
        code_rescue: data.code_rescue,
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

  const rescueHistory = rescueHistorySchemaResponse.parse(findRescueHistory);

  return rescueHistory
};