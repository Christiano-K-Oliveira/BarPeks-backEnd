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
exports.loginSocialMediaPubController = exports.loginSocialMediaClientController = exports.loginClientController = exports.loginPubController = void 0;
const loginPub_service_1 = require("../services/login/loginPub.service");
const loginClient_service_1 = require("../services/login/loginClient.service");
const loginPubController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginPub = yield (0, loginPub_service_1.loginPubService)(req.body);
    return res.status(200).json({
        token: loginPub
    });
});
exports.loginPubController = loginPubController;
const loginClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginClient = yield (0, loginClient_service_1.loginClientService)(req.body);
    return res.status(200).json({
        token: loginClient
    });
});
exports.loginClientController = loginClientController;
const loginSocialMediaPubController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginPub = yield (0, loginPub_service_1.loginSocialMediaPubService)(req.body);
    return res.status(200).json({
        token: loginPub
    });
});
exports.loginSocialMediaPubController = loginSocialMediaPubController;
const loginSocialMediaClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginClient = yield (0, loginClient_service_1.loginSocialMediaClientService)(req.body);
    return res.status(200).json({
        token: loginClient
    });
});
exports.loginSocialMediaClientController = loginSocialMediaClientController;
