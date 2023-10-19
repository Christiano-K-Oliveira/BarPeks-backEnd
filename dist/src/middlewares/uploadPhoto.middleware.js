"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const errors_1 = require("../errors");
module.exports = ((0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path_1.default.resolve('./src/tmp'));
        },
        filename: (_, file, callback) => {
            const time = new Date().getTime();
            callback(null, `${time}_${file.originalname}`);
        }
    }),
    fileFilter: (_, file, callback) => {
        // const extendsTypes = ['image/jpeg', 'image/jpg', 'image/png'].find(format => format == file.mimetype)
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            callback(null, true);
        }
        else {
            throw new errors_1.AppError('Somente nos formatos jpeg e png são permitidos', 400);
            // callback(null, false)
        }
    }
}));
