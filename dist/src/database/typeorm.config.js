"use strict";
/**
 * Module dependencies.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
/**
 * Load the test environment file if we are running migrations
 * In  the tests environment
 */
const path = process.env.NODE_ENV === 'test' ? '.env.test' : process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production';
dotenv.config({ path });
/**
 * DataSourceConfig is responsable for the postgres setup with typeorm.
 */
exports.myDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/../models/*.entity{.ts,.js}'],
    migrationsTableName: 'typeorm-migrations',
    migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
});
/**
 * Export `DataSourceConfig`;
 */
// export const dataSource = new DataSource(dataSourceOptions);
//# sourceMappingURL=typeorm.config.js.map