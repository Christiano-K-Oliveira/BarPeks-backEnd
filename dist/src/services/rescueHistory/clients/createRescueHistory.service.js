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
exports.createRescueHistoryService = void 0;
const data_source_1 = require("../../../data-source");
const errors_1 = require("../../../errors");
const entities_1 = require("../../../entities");
const rescueHistory_schemas_1 = require("../../../schemas/rescueHistory.schemas");
const createRescueHistoryService = (rescueHistoryData, clientId, pubId) => __awaiter(void 0, void 0, void 0, function* () {
    const rescueHistoryRepository = data_source_1.AppDataSource.getRepository(entities_1.RescueHistory);
    const pubRepository = data_source_1.AppDataSource.getRepository(entities_1.Pub);
    const clientRepository = data_source_1.AppDataSource.getRepository(entities_1.Client);
    const pub = yield pubRepository.findOneBy({
        id: pubId
    });
    const client = yield clientRepository.findOneBy({
        id: clientId
    });
    if (!pub) {
        throw new errors_1.AppError('Bar não encontrado', 404);
    }
    if (!client) {
        throw new errors_1.AppError('Cliente não encontrado', 404);
    }
    const data = Object.assign(Object.assign({}, rescueHistoryData), { pub: pub, client: client });
    const rescueHistory = rescueHistoryRepository.create(data);
    yield rescueHistoryRepository.save(rescueHistory);
    const rescueHistoryResponse = rescueHistory_schemas_1.rescueHistorySchemaResponse.parse(rescueHistory);
    return rescueHistoryResponse;
});
exports.createRescueHistoryService = createRescueHistoryService;
