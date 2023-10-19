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
exports.updateRegisterClientForClientService = void 0;
const data_source_1 = require("../../../data-source");
const errors_1 = require("../../../errors");
const entities_1 = require("../../../entities");
const registeredClients_schemas_1 = require("../../../schemas/registeredClients.schemas");
const updateRegisterClientForClientService = (id, data, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const registerClientRepository = data_source_1.AppDataSource.getRepository(entities_1.RegisteredClients);
    const findRegisterClient = yield registerClientRepository.findOne({
        where: {
            id: id,
            client: {
                id: clientId
            }
        },
        relations: {
            client: true,
            pub: true,
        }
    });
    if (!findRegisterClient) {
        throw new errors_1.AppError('Registro de cliente não encontrado', 404);
    }
    if (parseInt(findRegisterClient.points) - parseInt(data.points)) {
        throw new errors_1.AppError('A pontuação não pode ser menor que zero.', 403);
    }
    const newDataRegisterClient = Object.assign(Object.assign(Object.assign({}, findRegisterClient), data), { points: data.points && parseInt(findRegisterClient.points) >= parseInt(data.points) ? (parseInt(findRegisterClient.points) - parseInt(data.points)).toString() : findRegisterClient.points });
    yield registerClientRepository.save(newDataRegisterClient);
    const registerClient = registeredClients_schemas_1.registeredClientsSchemaResponse.parse(newDataRegisterClient);
    return registerClient;
});
exports.updateRegisterClientForClientService = updateRegisterClientForClientService;
