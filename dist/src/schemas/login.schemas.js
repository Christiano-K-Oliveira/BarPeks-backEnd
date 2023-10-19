"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginEmailSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.loginSchema = loginSchema;
const loginEmailSchema = zod_1.z.object({
    email: zod_1.z.string()
});
exports.loginEmailSchema = loginEmailSchema;
