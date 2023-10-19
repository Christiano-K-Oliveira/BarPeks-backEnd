"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateData = (schema) => (req, res, next) => {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    next();
};
exports.default = validateData;
