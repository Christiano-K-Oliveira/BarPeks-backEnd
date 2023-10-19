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
exports.uploadClientController = exports.resetPasswordController = exports.sendEmailResetPasswordController = exports.deleteClientController = exports.updateClientController = exports.listClientUniqueController = exports.createClientController = void 0;
const createClient_service_1 = require("../services/clients/createClient.service");
const listClientUnique_service_1 = require("../services/clients/listClientUnique.service");
const updateClient_service_1 = require("../services/clients/updateClient.service");
const deleteClient_service_1 = require("../services/clients/deleteClient.service");
const resetPassword_service_1 = require("../services/clients/resetPassword.service");
const uploadClient_service_1 = require("../services/clients/uploadClient.service");
const sendEmailResetPassword_service_1 = require("../services/clients/sendEmailResetPassword.service");
const createClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientData = req.body;
    const newClient = yield (0, createClient_service_1.createClientService)(clientData);
    return res.status(201).json(newClient);
});
exports.createClientController = createClientController;
const listClientUniqueController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(res.locals.usuarioId);
    const client = yield (0, listClientUnique_service_1.listClientUniqueService)(clientId);
    return res.status(200).json(client);
});
exports.listClientUniqueController = listClientUniqueController;
const updateClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(req.params.id);
    const newClient = yield (0, updateClient_service_1.updateClientService)(clientId, req.body);
    return res.status(200).json(newClient);
});
exports.updateClientController = updateClientController;
const deleteClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(req.params.id);
    yield (0, deleteClient_service_1.deleteClientService)(clientId);
    return res.status(204).send();
});
exports.deleteClientController = deleteClientController;
const sendEmailResetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield (0, sendEmailResetPassword_service_1.sendEmailResetPasswordClientService)(email);
    return res.status(200).json({
        message: 'Token enviado'
    });
});
exports.sendEmailResetPasswordController = sendEmailResetPasswordController;
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { token } = req.params;
    yield (0, resetPassword_service_1.resetPasswordService)(password, token);
    return res.status(200).json({
        message: 'Senha atualizada com sucesso'
    });
});
exports.resetPasswordController = resetPasswordController;
const uploadClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(req.params.id);
    const photo = req.file;
    const client = yield (0, uploadClient_service_1.uploadClientService)(clientId, photo);
    return res.status(200).json(client);
});
exports.uploadClientController = uploadClientController;
