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
exports.uploadProductService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const cloudinary_1 = require("cloudinary");
const updateProduct_service_1 = require("./updateProduct.service");
const node_fs_1 = require("node:fs");
const uploadProductService = (id, photo, pubId) => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    const productRepository = data_source_1.AppDataSource.getRepository(entities_1.Product);
    const product = yield productRepository.findOneBy({
        id: id
    });
    if (!product) {
        throw new errors_1.AppError('Produto não encontrado', 404);
    }
    if (!photo) {
        throw new errors_1.AppError('Foto não enviada', 403);
    }
    const upload = yield cloudinary_1.v2.uploader.upload(photo.path, { resource_type: 'image' }, (error, result) => { return result; });
    const updateProduct = yield (0, updateProduct_service_1.updateProductPhotoService)(product.id, { photo_url: upload.secure_url }, pubId);
    (0, node_fs_1.unlink)(photo.path, (error) => {
        if (error) {
            console.log(error);
        }
    });
    return updateProduct;
});
exports.uploadProductService = uploadProductService;
