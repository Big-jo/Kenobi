"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Comment = class Comment {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Comment.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Comment.prototype, "episodeId", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], Comment.prototype, "anonymous", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: "varchar", nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Comment.prototype, "ip_address", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: "varchar", length: 500 }),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "comment", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
Comment = tslib_1.__decorate([
    typeorm_1.Entity("Comment")
], Comment);
exports.Comment = Comment;
