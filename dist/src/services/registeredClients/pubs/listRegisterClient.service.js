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
exports.listRegisterClientService = void 0;
const data_source_1 = require("../../../data-source");
const entities_1 = require("../../../entities");
const registeredClients_schemas_1 = require("../../../schemas/registeredClients.schemas");
const listRegisterClientService = (pubId) => __awaiter(void 0, void 0, void 0, function* () {
    const registerClientRepository = data_source_1.AppDataSource.getRepository(entities_1.RegisteredClients);
    const findRegisterClient = yield registerClientRepository.find({
        where: {
            pub: {
                id: pubId
            }
        },
        relations: {
            client: true,
            pub: true,
        }
    });
    const registeredClients = registeredClients_schemas_1.listRegisteredClientsSchema.parse(findRegisterClient);
    return registeredClients;
});
exports.listRegisterClientService = listRegisterClientService;
