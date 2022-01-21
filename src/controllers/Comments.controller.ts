import { getRepository, Repository } from "typeorm";
import { IComment } from "../interfaces/Comment.interface";
import { Comment as CommentEntity } from "../entities/Comment";
import { Request, Response } from "express";
import logger from "src/shared/Logger";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from "http-status-codes";
import { Utility } from "src/utility/utility";

export class CommentController {
    constructor() { }




    async CreateComment(req: Request, res: Response) {
        try {

            const commentRepository = getRepository(CommentEntity);

            const { episodeId, comment, anonymous } = req.body;
            
            // A validator middleware would work best
            if (comment.length > 500 ) Utility.ErrorResponse(res, undefined, "Commet must be less than 500 characters");
            else {
                const newComment: IComment = {
                    episodeId: episodeId,
                    //I wouldn't trust the 'x-forwarded-for' header, because it can be spoofed.
                    ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    comment: comment,
                    anonymous: anonymous,
                };
    
                const createdComment = commentRepository.create(newComment);
    
                const savedComment = await commentRepository.save(createdComment);
    
                res.status(CREATED).json(savedComment)
            }
        } catch (err) {
            Utility.ErrorResponse(res, err);
        }
    }


    /**
     * 
     * @param req 
     * @param res 
     * 
     * Get Comments Of A Movie Listing
     */
    async GetMovieComments(req: Request, res: Response) {
        try {

            const commentRepository = getRepository(CommentEntity);
            const {movieID} = req.params;

            const result = await commentRepository.find({where: {episodeId: movieID}, order: {createdAt: 'DESC'}})

            res.status(OK).json({result});
        } catch (err) {
            Utility.ErrorResponse(res, err);
        }
    }

}