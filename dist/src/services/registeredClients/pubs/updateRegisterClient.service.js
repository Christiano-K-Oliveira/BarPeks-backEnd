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
exports.updateRegisterClientService = void 0;
const data_source_1 = require("../../../data-source");
const errors_1 = require("../../../errors");
const entities_1 = require("../../../entities");
const registeredClients_schemas_1 = require("../../../schemas/registeredClients.schemas");
const updateRegisterClientService = (id, data, pubId) => __awaiter(void 0, void 0, void 0, function* () {
    const registerClientRepository = data_source_1.AppDataSource.getRepository(entities_1.RegisteredClients);
    const findRegisterClient = yield registerClientRepository.findOne({
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
        throw new errors_1.AppError("Registro de cliente não encontrado", 404);
    }
    const newDataRegisterClient = Object.assign(Object.assign({}, findRegisterClient), data);
    yield registerClientRepository.save(newDataRegisterClient);
    const registerClient = registeredClients_schemas_1.registeredClientsSchemaResponse.parse(newDataRegisterClient);
    return registerClient;
});
exports.updateRegisterClientService = updateRegisterClientService;
