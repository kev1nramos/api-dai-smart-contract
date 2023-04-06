"use strict";
/**
 * Module dependencies.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_1 = __importDefault(require("./routes/v1"));
const middlewares_1 = require("./middlewares");
const morgan_1 = require("./config/morgan");
const logger_1 = require("./config/logger");
const app = (0, express_1.default)();
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan_1.Morgan.successHandler);
    app.use(morgan_1.Morgan.errorHandler);
}
// limit repeated failed requests to auth endpoints.
if (process.env.NODE_ENV === 'production') {
    app.use('/v1/auth', middlewares_1.RateLimit.authLimiter, middlewares_1.AuthApi.authApi);
}
app.get('/', (req, res) => {
    res.send('v0.1.0');
});
// v1 api routes
app.use('/v1', middlewares_1.RateLimit.authLimiter, middlewares_1.AuthApi.authApi, v1_1.default);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    logger_1.Logger.error('Occur an error calling an non-existing endpoint');
    next(new Error('404 Not found'));
});
exports.default = app;
//# sourceMappingURL=app.js.map