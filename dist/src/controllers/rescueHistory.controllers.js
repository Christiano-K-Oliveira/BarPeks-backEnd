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
exports.listSearchRescueHistoryForPubController = exports.deleteRescueHistoryForClientController = exports.listRescueHistoryForClientController = exports.createRescueHistoryForClientController = exports.updateRescueHistoryForPubController = exports.listRescueHistoryForPubController = void 0;
const listRescueHistoryForPub_service_1 = require("../services/rescueHistory/pubs/listRescueHistoryForPub.service");
const updateRescueHistoryForPub_service_1 = require("../services/rescueHistory/pubs/updateRescueHistoryForPub.service");
const createRescueHistory_service_1 = require("../services/rescueHistory/clients/createRescueHistory.service");
const listRescueHistory_service_1 = require("../services/rescueHistory/clients/listRescueHistory.service");
const deleteRescueHistory_service_1 = require("../services/rescueHistory/clients/deleteRescueHistory.service");
const listSearchHistoryForPub_service_1 = require("../services/rescueHistory/pubs/listSearchHistoryForPub.service");
const listRescueHistoryForPubController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const clientId = parseInt(req.params.id);
    const registerClient = yield (0, listRescueHistoryForPub_service_1.listRescueHistoryForPubService)(clientId, pubId);
    return res.status(200).json(registerClient);
});
exports.listRescueHistoryForPubController = listRescueHistoryForPubController;
const listSearchRescueHistoryForPubController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const clientId = parseInt(req.params.id);
    const data = {
        code_rescue: req.params.codeRescue
    };
    const registerClient = yield (0, listSearchHistoryForPub_service_1.listSearchRescueHistoryForPubService)(clientId, pubId, data);
    return res.status(200).json(registerClient);
});
exports.listSearchRescueHistoryForPubController = listSearchRescueHistoryForPubController;
const updateRescueHistoryForPubController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const rescueHistoryId = parseInt(req.params.id);
    const newRescueHistory = yield (0, updateRescueHistoryForPub_service_1.updateRescueHistoryForPubService)(rescueHistoryId, req.body, pubId);
    return res.status(200).json(newRescueHistory);
});
exports.updateRescueHistoryForPubController = updateRescueHistoryForPubController;
const createRescueHistoryForClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(res.locals.usuarioId);
    const pubId = parseInt(req.params.id);
    const registerClientData = req.body;
    const newRegisterClient = yield (0, createRescueHistory_service_1.createRescueHistoryService)(registerClientData, clientId, pubId);
    return res.status(201).json(newRegisterClient);
});
exports.createRescueHistoryForClientController = createRescueHistoryForClientController;
const listRescueHistoryForClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(res.locals.usuarioId);
    const rescueHistory = yield (0, listRescueHistory_service_1.listRescueHistoryService)(clientId);
    return res.status(200).json(rescueHistory);
});
exports.listRescueHistoryForClientController = listRescueHistoryForClientController;
const deleteRescueHistoryForClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(res.locals.usuarioId);
    const rescueHistoryId = parseInt(req.params.id);
    yield (0, deleteRescueHistory_service_1.deleteRescueHistoryService)(rescueHistoryId, clientId);
    return res.status(204).send();
});
exports.deleteRescueHistoryForClientController = deleteRescueHistoryForClientController;
