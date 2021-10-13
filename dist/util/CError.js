"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CError = void 0;
class CError extends Error {
    constructor(message, code) {
        super(message);
        this.statusCode = code || 500;
    }
}
exports.CError = CError;
