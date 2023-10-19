"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProductsSchema = exports.productsUpdateSchemaRequest = exports.productsSchemaResponse = exports.productsSchemaRequest = void 0;
const zod_1 = require("zod");
const productsSchemaRequest = zod_1.z.object({
    name: zod_1.z.string().max(150),
    value: zod_1.z.string().max(8),
    code: zod_1.z.string().max(10),
});
exports.productsSchemaRequest = productsSchemaRequest;
const productsUpdateSchemaRequest = zod_1.z.object({
    name: zod_1.z.string().max(150).optional(),
    value: zod_1.z.string().max(8).optional(),
    code: zod_1.z.string().max(10).optional(),
});
exports.productsUpdateSchemaRequest = productsUpdateSchemaRequest;
const productsSchemaResponse = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().max(150),
    value: zod_1.z.string().max(8),
    code: zod_1.z.string().max(10),
    photo_url: zod_1.z.string().nullish()
});
exports.productsSchemaResponse = productsSchemaResponse;
const listProductsSchema = zod_1.z.array(productsSchemaResponse);
exports.listProductsSchema = listProductsSchema;
