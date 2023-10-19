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
exports.listRegisterClientUniqueForClientService = void 0;
const data_source_1 = require("../../../data-source");
const errors_1 = require("../../../errors");
const entities_1 = require("../../../entities");
const registeredClients_schemas_1 = require("../../../schemas/registeredClients.schemas");
const listRegisterClientUniqueForClientService = (data, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const registerClientRepository = data_source_1.AppDataSource.getRepository(entities_1.RegisteredClients);
    const pubRepository = data_source_1.AppDataSource.getRepository(entities_1.Pub);
    const findPubName = yield pubRepository.findOneBy({
        name: data.name ? data.name : ''
    });
    const findPubSocialNumber = yield pubRepository.findOneBy({
        social_number: data.socialNumber ? data.socialNumber : ''
    });
    const findPub = yield pubRepository.findOneBy({
        name: data.socialNumber ? data.socialNumber : '',
        social_number: data.socialNumber ? data.socialNumber : ''
    });
    if (!findPubName && !findPubSocialNumber && !findPub) {
        throw new errors_1.AppError('Bar não encontrado', 404);
    }
    if (findPubName) {
        const findRegisteredClients = yield registerClientRepository.findOne({
            where: {
                pub: {
                    id: findPubName.id
                },
                client: {
                    id: clientId
                },
            },
            relations: {
                pub: true,
                client: true,
            }
        });
        const registerClient = registeredClients_schemas_1.registeredClientsSchemaResponse.parse(findRegisteredClients);
        return registerClient;
    }
    if (findPubSocialNumber) {
        const findRegisteredClients = yield registerClientRepository.findOne({
            where: {
                pub: {
                    id: findPubSocialNumber.id
                },
                client: {
                    id: clientId
                },
            },
            relations: {
                pub: true,
                client: true,
            }
        });
        const registerClient = registeredClients_schemas_1.registeredClientsSchemaResponse.parse(findRegisteredClients);
        return registerClient;
    }
    const findRegisteredClients = yield registerClientRepository.findOne({
        where: {
            pub: {
                id: findPub ? findPub.id : 0
            },
            client: {
                id: clientId
            }
        },
        relations: {
            pub: true,
            client: true,
        }
    });
    const registerClient = registeredClients_schemas_1.registeredClientsSchemaResponse.parse(findRegisteredClients);
    return registerClient;
});
exports.listRegisterClientUniqueForClientService = listRegisterClientUniqueForClientService;
