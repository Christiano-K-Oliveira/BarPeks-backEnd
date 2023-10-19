"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateData_middleware_1 = __importDefault(require("../middlewares/validateData.middleware"));
const products_schemas_1 = require("../schemas/products.schemas");
const ensureAuthIsValid_middleware_1 = __importDefault(require("../middlewares/ensureAuthIsValid.middleware"));
const products_controllers_1 = require("../controllers/products.controllers");
const upload = require('../middlewares/uploadPhoto.middleware');
const productsRoutes = (0, express_1.Router)();
productsRoutes.post('', ensureAuthIsValid_middleware_1.default, (0, validateData_middleware_1.default)(products_schemas_1.productsSchemaRequest), products_controllers_1.createProductController);
productsRoutes.get('', ensureAuthIsValid_middleware_1.default, products_controllers_1.listProductsController);
productsRoutes.get('/:id', ensureAuthIsValid_middleware_1.default, products_controllers_1.listProductUniqueController);
productsRoutes.patch('/:id', ensureAuthIsValid_middleware_1.default, (0, validateData_middleware_1.default)(products_schemas_1.productsUpdateSchemaRequest), products_controllers_1.updateProductController);
productsRoutes.delete('/:id', ensureAuthIsValid_middleware_1.default, products_controllers_1.deleteProductController);
productsRoutes.patch('/upload/:id', ensureAuthIsValid_middleware_1.default, (upload.single('file')), products_controllers_1.uploadProductController);
exports.default = productsRoutes;
