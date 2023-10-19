"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateData_middleware_1 = __importDefault(require("../middlewares/validateData.middleware"));
const pubs_schemas_1 = require("../schemas/pubs.schemas");
const pubs_controllers_1 = require("../controllers/pubs.controllers");
const ensureAuthIsValid_middleware_1 = __importDefault(require("../middlewares/ensureAuthIsValid.middleware"));
const ensureAccount_middleware_1 = require("../middlewares/ensureAccount.middleware");
const upload = require('../middlewares/uploadPhoto.middleware');
const pubsRoutes = (0, express_1.Router)();
pubsRoutes.post('', (0, validateData_middleware_1.default)(pubs_schemas_1.pubsSchemaRequest), pubs_controllers_1.createPubController);
pubsRoutes.get('', ensureAuthIsValid_middleware_1.default, pubs_controllers_1.listPubUniqueController);
pubsRoutes.patch('/:id', ensureAuthIsValid_middleware_1.default, ensureAccount_middleware_1.ensurePubAccount, (0, validateData_middleware_1.default)(pubs_schemas_1.pubsUpdateSchemaRequest), pubs_controllers_1.updatePubController);
pubsRoutes.delete('/:id', ensureAuthIsValid_middleware_1.default, ensureAccount_middleware_1.ensurePubAccount, pubs_controllers_1.deletePubController);
pubsRoutes.post('/recuperar-senha', pubs_controllers_1.sendEmailResetPasswordController);
pubsRoutes.patch('/recuperar-senha/:token', pubs_controllers_1.resetPasswordController);
pubsRoutes.patch('/upload/:id', (upload.single('file')), pubs_controllers_1.uploadPubController);
pubsRoutes.post('/plan', (req, res) => {
    const data = req.body;
    console.log(data);
});
exports.default = pubsRoutes;
