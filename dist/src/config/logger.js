"use strict";
/**
 * Module dependencies.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
const enumerateErrorFormat = winston_1.default.format((info) => {
    if (process.env.NODE_ENV === 'development' && info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});
/**
 * Export Logger;
 */
exports.Logger = winston_1.default.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston_1.default.format.combine(enumerateErrorFormat(), winston_1.default.format.timestamp(), winston_1.default.format.json(), winston_1.default.format.printf((info) => `${JSON.stringify({ timestamp: info.timestamp, level: info.level, message: info.message })}`)),
    transports: [new winston_1.default.transports.Console()],
    exceptionHandlers: [new winston_1.default.transports.File({ filename: 'exceptions.log' })],
    rejectionHandlers: [new winston_1.default.transports.File({ filename: 'rejections.log' })],
});
//# sourceMappingURL=logger.js.map