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
exports.ensureClientAccount = exports.ensurePubAccount = void 0;
const entities_1 = require("../entities");
const data_source_1 = require("../data-source");
const errors_1 = require("../errors");
const ensurePubAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pubRepository = data_source_1.AppDataSource.getRepository(entities_1.Pub);
    const usuarioId = parseInt(res.locals.usuarioId);
    const usuario = yield pubRepository.findOneBy({ id: usuarioId });
    const id = parseInt(req.params.id);
    if (!usuario) {
        throw new errors_1.AppError('Usuario não encontrado', 404);
    }
    if (usuario.id !== id) {
        throw new errors_1.AppError('Não autorizado, acesso somente a conta de mesma titularidade.', 403);
    }
    ;
    return next();
});
exports.ensurePubAccount = ensurePubAccount;
const ensureClientAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clientRepository = data_source_1.AppDataSource.getRepository(entities_1.Client);
    const usuarioId = parseInt(res.locals.usuarioId);
    const usuario = yield clientRepository.findOneBy({ id: usuarioId });
    const id = parseInt(req.params.id);
    if (!usuario) {
        throw new errors_1.AppError('Usuario não encontrado', 404);
    }
    if (usuario.id !== id) {
        throw new errors_1.AppError('Não autorizado, acesso somente a conta de mesma titularidade.', 403);
    }
    ;
    return next();
});
exports.ensureClientAccount = ensureClientAccount;
