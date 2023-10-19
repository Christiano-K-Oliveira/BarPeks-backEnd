"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateData_middleware_1 = __importDefault(require("../middlewares/validateData.middleware"));
const login_schemas_1 = require("../schemas/login.schemas");
const login_controllers_1 = require("../controllers/login.controllers");
const loginRoutes = (0, express_1.Router)();
loginRoutes.post('/login-pub', (0, validateData_middleware_1.default)(login_schemas_1.loginSchema), login_controllers_1.loginPubController);
loginRoutes.post('/login-google-pub', (0, validateData_middleware_1.default)(login_schemas_1.loginEmailSchema), login_controllers_1.loginSocialMediaPubController);
loginRoutes.post('/login-facebook-pub', (0, validateData_middleware_1.default)(login_schemas_1.loginEmailSchema), login_controllers_1.loginSocialMediaPubController);
loginRoutes.post('/login-client', (0, validateData_middleware_1.default)(login_schemas_1.loginSchema), login_controllers_1.loginClientController);
loginRoutes.post('/login-google-client', (0, validateData_middleware_1.default)(login_schemas_1.loginEmailSchema), login_controllers_1.loginSocialMediaClientController);
loginRoutes.post('/login-facebook-client', (0, validateData_middleware_1.default)(login_schemas_1.loginEmailSchema), login_controllers_1.loginSocialMediaClientController);
exports.default = loginRoutes;
