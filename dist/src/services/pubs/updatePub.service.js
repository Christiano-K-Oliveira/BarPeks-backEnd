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
exports.resetPasswordPubService = exports.updateResetPasswordPubService = exports.updatePubService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const pubs_schemas_1 = require("../../schemas/pubs.schemas");
const updatePubService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const pubRepository = data_source_1.AppDataSource.getRepository(entities_1.Pub);
    const findPub = yield pubRepository.findOneBy({
        id: id
    });
    if (!findPub) {
        throw new errors_1.AppError('Bar não encontrado', 404);
    }
    const newDataPub = Object.assign(Object.assign({}, findPub), data);
    yield pubRepository.save(newDataPub);
    const pub = pubs_schemas_1.pubsSchemaResponse.parse(newDataPub);
    return pub;
});
exports.updatePubService = updatePubService;
const updateResetPasswordPubService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const pubRepository = data_source_1.AppDataSource.getRepository(entities_1.Pub);
    const findPub = yield pubRepository.findOneBy({
        id: id
    });
    if (!findPub) {
        throw new errors_1.AppError('Bar não encontrado', 404);
    }
    const newDataPub = Object.assign(Object.assign({}, findPub), data);
    yield pubRepository.save(newDataPub);
});
exports.updateResetPasswordPubService = updateResetPasswordPubService;
const resetPasswordPubService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const pubRepository = data_source_1.AppDataSource.getRepository(entities_1.Pub);
    const findPub = yield pubRepository.findOneBy({
        id: id
    });
    if (!findPub) {
        throw new errors_1.AppError('Bar não encontrado', 404);
    }
    const newDataPub = Object.assign(Object.assign({}, findPub), data);
    yield pubRepository.save(newDataPub);
});
exports.resetPasswordPubService = resetPasswordPubService;
