"use strict";
/**
 * Module dependencies.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config({ path: (0, path_1.join)(process.cwd(), `.env.${process.env.NODE_ENV}`) });
const postgres_db_1 = require("./database/postgres.db");
const services_1 = require("./services");
const logger_1 = require("./config/logger");
const app_1 = __importDefault(require("./app"));
/**
 * Constants.
 */
let server;
/**
 * Start application.
 */
(() => {
    try {
        process.on('uncaughtException', (ex) => {
            logger_1.Logger.error('Unhandled error', ex);
        });
        server = app_1.default.listen('3000', () => __awaiter(void 0, void 0, void 0, function* () {
            // Start all apps inside
            logger_1.Logger.info(`Starting tessera-code-challenge app, in env: ${process.env.NODE_ENV}, listening to port ${process.env.PORT}`);
            postgres_db_1.PostgresDB.start();
            yield services_1.Web3Service.getLast24hBlocks();
            yield services_1.Web3Service.subscribe();
        }));
    }
    catch (error) {
        logger_1.Logger.error('The server crash...', error);
    }
})();
//# sourceMappingURL=index.js.map