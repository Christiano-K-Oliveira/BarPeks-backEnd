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
exports.uploadPubController = exports.resetPasswordController = exports.sendEmailResetPasswordController = exports.deletePubController = exports.updatePubController = exports.listPubUniqueController = exports.createPubController = void 0;
const createPub_service_1 = require("../services/pubs/createPub.service");
const listPubUnique_service_1 = require("../services/pubs/listPubUnique.service");
const updatePub_service_1 = require("../services/pubs/updatePub.service");
const deletePub_service_1 = require("../services/pubs/deletePub.service");
const resetPassword_service_1 = require("../services/pubs/resetPassword.service");
const uploadPub_service_1 = require("../services/pubs/uploadPub.service");
const senEmailResetPassword_service_1 = require("../services/pubs/senEmailResetPassword.service");
const createPubController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubData = req.body;
    const newPub = yield (0, createPub_service_1.createPubService)(pubData);
    return res.status(201).json(newPub);
});
exports.createPubController = createPubController;
const listPubUniqueController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const pub = yield (0, listPubUnique_service_1.listPubUniqueService)(pubId);
    return res.status(200).json(pub);
});
exports.listPubUniqueController = listPubUniqueController;
const updatePubController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(req.params.id);
    const newPub = yield (0, updatePub_service_1.updatePubService)(pubId, req.body);
    return res.status(200).json(newPub);
});
exports.updatePubController = updatePubController;
const deletePubController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(req.params.id);
    yield (0, deletePub_service_1.deletePubService)(pubId);
    return res.status(204).send();
});
exports.deletePubController = deletePubController;
const sendEmailResetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield (0, senEmailResetPassword_service_1.sendEmailResetPasswordPubService)(email);
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
const uploadPubController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(req.params.id);
    const photo = req.file;
    const pub = yield (0, uploadPub_service_1.uploadPubService)(pubId, photo);
    return res.status(200).json(pub);
});
exports.uploadPubController = uploadPubController;
