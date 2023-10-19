"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRescueHistoryForPubService = void 0;
const data_source_1 = require("../../../data-source");
const errors_1 = require("../../../errors");
const entities_1 = require("../../../entities");
const rescueHistory_schemas_1 = require("../../../schemas/rescueHistory.schemas");
const listRescueHistoryForPubService = (clientId, pubId) => __awaiter(void 0, void 0, void 0, function* () {
    const rescueHistoryRepository = data_source_1.AppDataSource.getRepository(entities_1.RescueHistory);
    const findRescueHistory = yield rescueHistoryRepository.find({
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
        throw new errors_1.AppError("Histórico de Recompensas não encontrado", 404);
    }
    const rescueHistory = rescueHistory_schemas_1.listRescueHistorySchema.parse(findRescueHistory);
    return rescueHistory;
});
exports.listRescueHistoryForPubService = listRescueHistoryForPubService;
