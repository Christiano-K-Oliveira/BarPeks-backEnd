"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUniqueRegisterClientSchema = exports.listRegisteredClientsSchema = exports.registeredClientsUpdateSchemaRequest = exports.registeredClientsSchemaResponse = exports.registeredClientsSchemaRequest = void 0;
const zod_1 = require("zod");
const registeredClientsSchemaRequest = zod_1.z.object({
    name: zod_1.z.string().max(150),
    cpf: zod_1.z.string().min(11).max(11),
    email: zod_1.z.string().email().max(80),
    telephone: zod_1.z.string().min(11).max(11),
    points: zod_1.z.string().max(6)
});
exports.registeredClientsSchemaRequest = registeredClientsSchemaRequest;
const registeredClientsUpdateSchemaRequest = zod_1.z.object({
    name: zod_1.z.string().max(150).optional(),
    cpf: zod_1.z.string().min(11).max(11).optional(),
    email: zod_1.z.string().email().max(80).optional(),
    telephone: zod_1.z.string().min(11).max(11).optional(),
    points: zod_1.z.string().max(6).optional(),
    link_qrcode: zod_1.z.string().max(10).optional(),
    old_points: zod_1.z.string().max(6).optional(),
});
exports.registeredClientsUpdateSchemaRequest = registeredClientsUpdateSchemaRequest;
const registeredClientsSchemaResponse = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().max(150),
    cpf: zod_1.z.string().min(11).max(11),
    email: zod_1.z.string().email().max(80),
    telephone: zod_1.z.string().min(11).max(11),
    points: zod_1.z.string().max(6),
    link_qrcode: zod_1.z.string().max(10).nullish(),
    old_points: zod_1.z.string().max(6).nullish(),
    pub: zod_1.z.object({
        id: zod_1.z.number(),
        name: zod_1.z.string(),
        photo_url: zod_1.z.string(),
    }),
    client: zod_1.z.object({
        id: zod_1.z.number(),
        name: zod_1.z.string(),
        photo_url: zod_1.z.string(),
    })
});
exports.registeredClientsSchemaResponse = registeredClientsSchemaResponse;
const listRegisteredClientsSchema = zod_1.z.array(registeredClientsSchemaResponse);
exports.listRegisteredClientsSchema = listRegisteredClientsSchema;
const searchUniqueRegisterClientSchema = zod_1.z.object({
    name: zod_1.z.string().max(150).optional(),
    socialNumber: zod_1.z.string().min(11).max(14).optional()
});
exports.searchUniqueRegisterClientSchema = searchUniqueRegisterClientSchema;
