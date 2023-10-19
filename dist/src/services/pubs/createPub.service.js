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
exports.createPubService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const pubs_schemas_1 = require("../../schemas/pubs.schemas");
const createPubService = (pubData) => __awaiter(void 0, void 0, void 0, function* () {
    const pubRepository = data_source_1.AppDataSource.getRepository(entities_1.Pub);
    const checkEmailExist = yield pubRepository.findOneBy({
        email: pubData.email,
        is_active: true,
    });
    if (checkEmailExist) {
        throw new errors_1.AppError('Este email já existe', 409);
    }
    const pub = pubRepository.create(pubData);
    yield pubRepository.save(pub);
    const pubResponse = pubs_schemas_1.pubsSchemaResponse.parse(pub);
    return pubResponse;
});
exports.createPubService = createPubService;
