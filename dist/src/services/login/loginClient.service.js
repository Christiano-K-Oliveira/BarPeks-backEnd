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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSocialMediaClientService = exports.loginClientService = void 0;
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginClientService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const clientRepository = data_source_1.AppDataSource.getRepository(entities_1.Client);
    const findClient = yield clientRepository.findOne({
        where: {
            email: loginData.email
        }
    });
    if (!findClient) {
        throw new errors_1.AppError('Credenciais inválidas!', 403);
    }
    const matchPassword = yield (0, bcryptjs_1.compare)(loginData.password, findClient.password);
    if (!matchPassword) {
        throw new errors_1.AppError('Credenciais inválidas!', 403);
    }
    const token = jsonwebtoken_1.default.sign({
        id: findClient.id,
        nome: findClient.name,
        email: findClient.email,
        photo_url: findClient.photo_url,
    }, process.env.SECRET_KEY, {
        expiresIn: '24h',
        subject: String(findClient.id)
    });
    return token;
});
exports.loginClientService = loginClientService;
const loginSocialMediaClientService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const clientRepository = data_source_1.AppDataSource.getRepository(entities_1.Client);
    const findClient = yield clientRepository.findOne({
        where: {
            email: loginData.email
        }
    });
    if (!findClient) {
        throw new errors_1.AppError('Cliente não encontrado', 404);
    }
    const token = jsonwebtoken_1.default.sign({
        id: findClient.id,
        nome: findClient.name,
        email: findClient.email,
        photo_url: findClient.photo_url,
    }, process.env.SECRET_KEY, {
        expiresIn: '24h',
        subject: String(findClient.id)
    });
    return token;
});
exports.loginSocialMediaClientService = loginSocialMediaClientService;
