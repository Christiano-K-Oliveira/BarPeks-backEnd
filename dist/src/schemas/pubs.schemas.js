"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordPubSchema = exports.resetPasswordPubSchema = exports.pubsUpdateSchemaRequest = exports.pubsSchemaResponse = exports.pubsSchemaRequest = void 0;
const zod_1 = require("zod");
const pubsSchemaRequest = zod_1.z.object({
    name: zod_1.z.string().max(150),
    social_number: zod_1.z.string().max(14),
    email: zod_1.z.string().email().max(80),
    password: zod_1.z.string().max(120),
    reset_password: zod_1.z.string().nullish(),
    telephone: zod_1.z.string().min(11).max(11),
    address: zod_1.z.string().max(150),
    state: zod_1.z.string().max(60),
    city: zod_1.z.string().max(60),
    postal_code: zod_1.z.string().max(8),
    is_active: zod_1.z.boolean().default(true)
});
exports.pubsSchemaRequest = pubsSchemaRequest;
const pubsUpdateSchemaRequest = zod_1.z.object({
    name: zod_1.z.string().max(150).optional(),
    social_number: zod_1.z.string().max(14).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().optional(),
    telephone: zod_1.z.string().min(11).max(11).optional(),
    address: zod_1.z.string().max(150).optional(),
    state: zod_1.z.string().max(60).optional(),
    city: zod_1.z.string().max(60).optional(),
    postal_code: zod_1.z.string().max(8).optional(),
});
exports.pubsUpdateSchemaRequest = pubsUpdateSchemaRequest;
const pubsSchemaResponse = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().max(150),
    social_number: zod_1.z.string().max(14),
    email: zod_1.z.string().email().max(80),
    telephone: zod_1.z.string().min(11).max(11),
    address: zod_1.z.string().max(150),
    state: zod_1.z.string().max(60),
    city: zod_1.z.string().max(60),
    postal_code: zod_1.z.string().max(8),
    photo_url: zod_1.z.string().nullish(),
});
exports.pubsSchemaResponse = pubsSchemaResponse;
const resetPasswordPubSchema = zod_1.z.object({
    reset_password: zod_1.z.string()
});
exports.resetPasswordPubSchema = resetPasswordPubSchema;
const passwordPubSchema = zod_1.z.object({
    password: zod_1.z.string().max(120)
});
exports.passwordPubSchema = passwordPubSchema;
