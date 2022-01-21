"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Comment_1 = require("../entities/Comment");
const http_status_codes_1 = require("http-status-codes");
const utility_1 = require("../utility/utility");
class CommentController {
    constructor() { }
    CreateComment(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const commentRepository = typeorm_1.getRepository(Comment_1.Comment);
                const { episodeId, comment, anonymous } = req.body;
                if (comment.length > 500)
                    utility_1.Utility.ErrorResponse(res, undefined, "Commet must be less than 500 characters");
                else {
                    const newComment = {
                        episodeId: episodeId,
                        ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                        comment: comment,
                        anonymous: anonymous,
                    };
                    const createdComment = commentRepository.create(newComment);
                    const savedComment = yield commentRepository.save(createdComment);
                    res.status(http_status_codes_1.CREATED).json(savedComment);
                }
            }
            catch (err) {
                utility_1.Utility.ErrorResponse(res, err);
            }
        });
    }
    GetMovieComments(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const commentRepository = typeorm_1.getRepository(Comment_1.Comment);
                const { movieID } = req.params;
                const result = yield commentRepository.find({ where: { episodeId: movieID }, order: { createdAt: 'DESC' } });
                res.status(http_status_codes_1.OK).json({ result });
            }
            catch (err) {
                utility_1.Utility.ErrorResponse(res, err);
            }
        });
    }
}
exports.CommentController = CommentController;
