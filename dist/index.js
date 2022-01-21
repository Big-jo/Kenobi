"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Server_1 = tslib_1.__importDefault(require("./Server"));
const Logger_1 = tslib_1.__importDefault(require("./shared/Logger"));
const db_1 = require("./db");
db_1.intializeDB();
const redisPORT = Number(process.env.REDIS_PORT || 6379);
const port = Number(process.env.PORT || 3000);
Server_1.default.listen(port, () => {
    Logger_1.default.info('Express server started on port: ' + port);
});
