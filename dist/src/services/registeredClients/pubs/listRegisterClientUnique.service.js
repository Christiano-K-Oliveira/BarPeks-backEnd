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
exports.listRegisterClientUniqueService = void 0;
const data_source_1 = require("../../../data-source");
const errors_1 = require("../../../errors");
const entities_1 = require("../../../entities");
const registeredClients_schemas_1 = require("../../../schemas/registeredClients.schemas");
const listRegisterClientUniqueService = (data, pubId) => __awaiter(void 0, void 0, void 0, function* () {
    const registerClientRepository = data_source_1.AppDataSource.getRepository(entities_1.RegisteredClients);
    const findRegisteredClientsName = yield registerClientRepository.find({
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
    const findRegisteredClientsCpf = yield registerClientRepository.find({
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
    const findRegisteredClients = yield registerClientRepository.find({
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
        throw new errors_1.AppError("Registro de cliente não encontrado", 404);
    }
    if (findRegisteredClientsName.length > 0) {
        const registeredClients = registeredClients_schemas_1.listRegisteredClientsSchema.parse(findRegisteredClientsName);
        return registeredClients;
    }
    if (findRegisteredClientsCpf.length > 0) {
        const registeredClients = registeredClients_schemas_1.listRegisteredClientsSchema.parse(findRegisteredClientsCpf);
        return registeredClients;
    }
    const registeredClients = registeredClients_schemas_1.listRegisteredClientsSchema.parse(findRegisteredClientsCpf);
    return registeredClients;
});
exports.listRegisterClientUniqueService = listRegisterClientUniqueService;
