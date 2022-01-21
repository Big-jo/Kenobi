"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const Movies_1 = tslib_1.__importDefault(require("./Movies"));
const router = express_1.Router();
router.use('/movies', Movies_1.default);
exports.default = router;
