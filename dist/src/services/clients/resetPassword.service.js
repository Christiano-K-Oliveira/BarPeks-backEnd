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
exports.resetPasswordService = void 0;
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const resetPasswordService = (password, resetToken) => __awaiter(void 0, void 0, void 0, function* () {
    const clientRepository = data_source_1.AppDataSource.getRepository(entities_1.Client);
    const client = yield clientRepository.findOneBy({
        reset_password: resetToken
    });
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toLocaleDateString();
    if (!(client === null || client === void 0 ? void 0 : client.expires_reset_password)) {
        throw new errors_1.AppError('Token expirado');
    }
    const clientDate = client.expires_reset_password.split('/');
    const currentDate = today.split('/');
    if (+clientDate[2] - +currentDate[2] < 0) {
        throw new errors_1.AppError('Token expirado');
    }
    if (+clientDate[1] - +currentDate[1] < 0) {
        throw new errors_1.AppError('Token expirado');
    }
    if (+clientDate[0] - +currentDate[0] < 0) {
        throw new errors_1.AppError('Token expirado');
    }
    if (!client) {
        throw new errors_1.AppError('Cliente não encontrado', 404);
    }
    const newDataClient = Object.assign(Object.assign({}, client), { password: (0, bcryptjs_1.hashSync)(password, 10), reset_password: null });
    yield clientRepository.save(newDataClient);
});
exports.resetPasswordService = resetPasswordService;
