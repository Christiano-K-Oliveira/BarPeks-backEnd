"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordClientSchema = exports.clientsUpdateSchemaRequest = exports.clientsSchemaResponse = exports.clientsSchemaRequest = void 0;
const zod_1 = require("zod");
const clientsSchemaRequest = zod_1.z.object({
    name: zod_1.z.string().max(150),
    birth_date: zod_1.z.string(),
    cpf: zod_1.z.string().max(11),
    email: zod_1.z.string().email().max(80),
    password: zod_1.z.string().max(120),
    reset_password: zod_1.z.string().nullish(),
    telephone: zod_1.z.string().min(11).max(11),
});
exports.clientsSchemaRequest = clientsSchemaRequest;
const clientsUpdateSchemaRequest = zod_1.z.object({
    name: zod_1.z.string().max(150).optional(),
    birth_date: zod_1.z.string().optional(),
    cpf: zod_1.z.string().max(11).optional(),
    email: zod_1.z.string().email().max(80).optional(),
    password: zod_1.z.string().max(120).optional(),
    reset_password: zod_1.z.string().nullish().optional(),
    telephone: zod_1.z.string().min(11).max(11).optional(),
});
exports.clientsUpdateSchemaRequest = clientsUpdateSchemaRequest;
const clientsSchemaResponse = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().max(150),
    birth_date: zod_1.z.string(),
    cpf: zod_1.z.string().max(11),
    email: zod_1.z.string().email().max(80),
    telephone: zod_1.z.string().min(11).max(11),
    photo_url: zod_1.z.string().nullish()
});
exports.clientsSchemaResponse = clientsSchemaResponse;
const resetPasswordClientSchema = zod_1.z.object({
    reset_password: zod_1.z.string()
});
exports.resetPasswordClientSchema = resetPasswordClientSchema;
