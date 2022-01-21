"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const express_1 = tslib_1.__importDefault(require("express"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const Logger_1 = tslib_1.__importDefault(require("./shared/Logger"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
if (process.env.NODE_ENV === 'production') {
    app.use(helmet_1.default());
}
app.use('/api', routes_1.default);
app.use(function onError(err, req, res, next) {
    Logger_1.default.error(err.message);
    res.statusCode = 500;
});
app.all('*', (req, res) => {
    res.send('Welcome To Kenobi, Your one Star Wars Portal');
});
exports.default = app;
