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
    const pubRepository = data_source_1.AppDataSource.getRepository(entities_1.Pub);
    const pub = yield pubRepository.findOneBy({
        reset_password: resetToken
    });
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toLocaleDateString();
    if (!(pub === null || pub === void 0 ? void 0 : pub.expires_reset_password)) {
        throw new errors_1.AppError('Token expirado');
    }
    const pubDate = pub.expires_reset_password.split('/');
    const currentDate = today.split('/');
    if (+pubDate[2] - +currentDate[2] < 0) {
        throw new errors_1.AppError('Token expirado');
    }
    if (+pubDate[1] - +currentDate[1] < 0) {
        throw new errors_1.AppError('Token expirado');
    }
    if (+pubDate[0] - +currentDate[0] < 0) {
        throw new errors_1.AppError('Token expirado');
    }
    if (!pub) {
        throw new errors_1.AppError('Bar não encontrado', 404);
    }
    const newDataPub = Object.assign(Object.assign({}, pub), { password: (0, bcryptjs_1.hashSync)(password, 10), reset_password: null });
    yield pubRepository.save(newDataPub);
});
exports.resetPasswordService = resetPasswordService;
