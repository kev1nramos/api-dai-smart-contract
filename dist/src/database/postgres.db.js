"use strict";
/**
 * Module dependencies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDB = void 0;
const config_1 = require("../config");
const typeorm_config_1 = require("./typeorm.config");
const start = () => {
    typeorm_config_1.myDataSource
        .initialize()
        .then(() => config_1.Logger.info('Database has been initialized!'))
        .catch((error) => config_1.Logger.error('Error during database initialization: ', error));
};
/**
 * Export PostgresDB;
 */
exports.PostgresDB = {
    start,
};
//# sourceMappingURL=postgres.db.js.map