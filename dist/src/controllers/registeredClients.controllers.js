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
exports.listRegisterClientForValidatePointsController = exports.updateRegisterClientForClientController = exports.listRegisterClientUniqueForClientController = exports.deleteRegisterClientController = exports.updateRegisterClientController = exports.listRegisterClientUniqueController = exports.listRegisterClientController = exports.createRegisterClientController = void 0;
const createRegisterClient_service_1 = require("../services/registeredClients/pubs/createRegisterClient.service");
const listRegisterClient_service_1 = require("../services/registeredClients/pubs/listRegisterClient.service");
const listRegisterClientUnique_service_1 = require("../services/registeredClients/pubs/listRegisterClientUnique.service");
const updateRegisterClient_service_1 = require("../services/registeredClients/pubs/updateRegisterClient.service");
const deleteRegisterClient_service_1 = require("../services/registeredClients/pubs/deleteRegisterClient.service");
const listRegisterClientForClient_service_1 = require("../services/registeredClients/clients/listRegisterClientForClient.service");
const updateRegisterClientForClient_service_1 = require("../services/registeredClients/clients/updateRegisterClientForClient.service");
const listRegisterClientForValidatePoints_service_1 = require("../services/registeredClients/clients/listRegisterClientForValidatePoints.service");
const createRegisterClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const registerClientData = req.body;
    const newRegisterClient = yield (0, createRegisterClient_service_1.createRegisterClientService)(registerClientData, pubId);
    return res.status(201).json(newRegisterClient);
});
exports.createRegisterClientController = createRegisterClientController;
const listRegisterClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const registeredClients = yield (0, listRegisterClient_service_1.listRegisterClientService)(pubId);
    return res.status(200).json(registeredClients);
});
exports.listRegisterClientController = listRegisterClientController;
const listRegisterClientUniqueController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const data = {
        name: req.params.name,
        socialNumber: req.params.cpf
    };
    const registerClient = yield (0, listRegisterClientUnique_service_1.listRegisterClientUniqueService)(data, pubId);
    return res.status(200).json(registerClient);
});
exports.listRegisterClientUniqueController = listRegisterClientUniqueController;
const updateRegisterClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const registerClientId = parseInt(req.params.id);
    const newRegisterClient = yield (0, updateRegisterClient_service_1.updateRegisterClientService)(registerClientId, req.body, pubId);
    return res.status(200).json(newRegisterClient);
});
exports.updateRegisterClientController = updateRegisterClientController;
const deleteRegisterClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const registerClientId = parseInt(req.params.id);
    yield (0, deleteRegisterClient_service_1.deleteRegisterClientService)(registerClientId, pubId);
    return res.status(204).send();
});
exports.deleteRegisterClientController = deleteRegisterClientController;
const listRegisterClientUniqueForClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(res.locals.usuarioId);
    const registerClientData = {
        name: req.params.name,
        socialNumber: req.params.socialNumber,
    };
    const registerClient = yield (0, listRegisterClientForClient_service_1.listRegisterClientUniqueForClientService)(registerClientData, clientId);
    return res.status(200).json(registerClient);
});
exports.listRegisterClientUniqueForClientController = listRegisterClientUniqueForClientController;
const updateRegisterClientForClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(res.locals.usuarioId);
    const registerClientId = parseInt(req.params.id);
    const newRegisterClient = yield (0, updateRegisterClientForClient_service_1.updateRegisterClientForClientService)(registerClientId, req.body, clientId);
    return res.status(200).json(newRegisterClient);
});
exports.updateRegisterClientForClientController = updateRegisterClientForClientController;
const listRegisterClientForValidatePointsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const qrcode = req.params.qrcode;
    const clientId = parseInt(res.locals.usuarioId);
    const registerClient = yield (0, listRegisterClientForValidatePoints_service_1.listRegisterClientForValidatePointsService)(qrcode, clientId);
    return res.status(200).json(registerClient);
});
exports.listRegisterClientForValidatePointsController = listRegisterClientForValidatePointsController;
