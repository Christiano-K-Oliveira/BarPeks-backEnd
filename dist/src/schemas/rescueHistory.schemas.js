"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRescueHistoryForPubSchema = exports.searchUniqueRescueHistorySchema = exports.listRescueHistorySchema = exports.rescueHistorysUpdateSchemaRequest = exports.rescueHistorySchemaResponse = exports.rescueHistorySchemaRequest = void 0;
const zod_1 = require("zod");
const rescueHistorySchemaRequest = zod_1.z.object({
    status: zod_1.z.string().default('disponivel'),
    reward_name: zod_1.z.string().max(80),
    code_rescue: zod_1.z.string().max(10),
});
exports.rescueHistorySchemaRequest = rescueHistorySchemaRequest;
const rescueHistorysUpdateSchemaRequest = zod_1.z.object({
    status: zod_1.z.string().optional(),
    reward_name: zod_1.z.string().max(80).optional(),
});
exports.rescueHistorysUpdateSchemaRequest = rescueHistorysUpdateSchemaRequest;
const rescueHistorySchemaResponse = zod_1.z.object({
    id: zod_1.z.number(),
    status: zod_1.z.string(),
    date: zod_1.z.string(),
    reward_name: zod_1.z.string().max(80),
    code_rescue: zod_1.z.string().max(10),
    rescue_date: zod_1.z.string().max(20).nullish(),
    pub: zod_1.z.object({
        id: zod_1.z.number(),
        name: zod_1.z.string().max(150),
        social_number: zod_1.z.string().max(14)
    }),
    client: zod_1.z.object({
        id: zod_1.z.number(),
        name: zod_1.z.string().max(150),
        cpf: zod_1.z.string().max(11)
    })
});
exports.rescueHistorySchemaResponse = rescueHistorySchemaResponse;
const listRescueHistorySchema = zod_1.z.array(rescueHistorySchemaResponse);
exports.listRescueHistorySchema = listRescueHistorySchema;
const searchUniqueRescueHistorySchema = zod_1.z.object({
    name: zod_1.z.string().max(150).optional(),
    socialNumber: zod_1.z.string().min(11).max(14).optional()
});
exports.searchUniqueRescueHistorySchema = searchUniqueRescueHistorySchema;
const searchRescueHistoryForPubSchema = zod_1.z.object({
    code_rescue: zod_1.z.string().max(10),
});
exports.searchRescueHistoryForPubSchema = searchRescueHistoryForPubSchema;
