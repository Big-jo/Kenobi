"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const Logger_1 = tslib_1.__importDefault(require("src/shared/Logger"));
class Utility {
    static ErrorResponse(res, error, errMsg) {
        Logger_1.default.error(error === null || error === void 0 ? void 0 : error.message);
        if (!!errMsg)
            res.status(http_status_codes_1.BAD_REQUEST).json({ errMsg });
        else {
            res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).json({ errMsg: error === null || error === void 0 ? void 0 : error.message });
        }
    }
}
exports.Utility = Utility;
