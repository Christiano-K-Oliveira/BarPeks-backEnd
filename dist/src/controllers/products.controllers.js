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
exports.uploadProductController = exports.deleteProductController = exports.updateProductController = exports.listProductUniqueController = exports.listProductsController = exports.createProductController = void 0;
const createProduct_service_1 = require("../services/products/createProduct.service");
const listProductUnique_service_1 = require("../services/products/listProductUnique.service");
const listProducts_service_1 = require("../services/products/listProducts.service");
const updateProduct_service_1 = require("../services/products/updateProduct.service");
const deleteProduct_service_1 = require("../services/products/deleteProduct.service");
const uploadProduct_service_1 = require("../services/products/uploadProduct.service");
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const productData = req.body;
    const newProduct = yield (0, createProduct_service_1.createProductService)(productData, pubId);
    return res.status(201).json(newProduct);
});
exports.createProductController = createProductController;
const listProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const products = yield (0, listProducts_service_1.listProductsService)(pubId);
    return res.status(200).json(products);
});
exports.listProductsController = listProductsController;
const listProductUniqueController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(req.params.id);
    const products = yield (0, listProductUnique_service_1.listProductUniqueService)(pubId);
    return res.status(200).json(products);
});
exports.listProductUniqueController = listProductUniqueController;
const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const productId = parseInt(req.params.id);
    const newProduct = yield (0, updateProduct_service_1.updateProductService)(productId, req.body, pubId);
    return res.status(200).json(newProduct);
});
exports.updateProductController = updateProductController;
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pubId = parseInt(res.locals.usuarioId);
    const productId = parseInt(req.params.id);
    yield (0, deleteProduct_service_1.deleteProductService)(productId, pubId);
    return res.status(204).send();
});
exports.deleteProductController = deleteProductController;
const uploadProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.params.id);
    const pubId = parseInt(res.locals.usuarioId);
    const photo = req.file;
    const product = yield (0, uploadProduct_service_1.uploadProductService)(productId, photo, pubId);
    return res.status(200).json(product);
});
exports.uploadProductController = uploadProductController;
