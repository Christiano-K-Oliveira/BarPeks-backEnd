"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const ensureAuthIsValidMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Token inválido." });
    }
    const splitToken = token.split(" ")[1];
    jsonwebtoken_1.default.verify(splitToken, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token inválido." });
        }
        res.locals.usuarioId = parseInt(decoded.sub);
        return next();
    });
};
exports.default = ensureAuthIsValidMiddleware;
