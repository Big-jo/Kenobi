"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intializeDB = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Logger_1 = tslib_1.__importDefault(require("../src/shared/Logger"));
function intializeDB() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield typeorm_1.createConnection();
            Logger_1.default.info('Database successfully initialized');
        }
        catch (error) {
            Logger_1.default.error(error);
        }
    });
}
exports.intializeDB = intializeDB;
