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
exports.deleteRegisterClientService = void 0;
const data_source_1 = require("../../../data-source");
const errors_1 = require("../../../errors");
const entities_1 = require("../../../entities");
const deleteRegisterClientService = (id, registerClientId) => __awaiter(void 0, void 0, void 0, function* () {
    const registerClientRepository = data_source_1.AppDataSource.getRepository(entities_1.RegisteredClients);
    const findRegisterClient = yield registerClientRepository.findOneBy({
        id: id,
        pub: {
            id: registerClientId
        }
    });
    if (!findRegisterClient) {
        throw new errors_1.AppError('Registro de cliente não encontrado', 404);
    }
    yield registerClientRepository.remove(findRegisterClient);
});
exports.deleteRegisterClientService = deleteRegisterClientService;
