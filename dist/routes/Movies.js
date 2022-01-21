"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Comments_controller_1 = require("src/controllers/Comments.controller");
const Movies_controller_1 = require("src/controllers/Movies.controller");
const router = express_1.Router();
const moviesController = new Movies_controller_1.MoviesController();
const commentController = new Comments_controller_1.CommentController();
router
    .route('/')
    .get(moviesController.GetMovies);
router
    .route('/comment')
    .post(commentController.CreateComment);
router
    .route('/comment/:movieID')
    .get(commentController.GetMovieComments);
router
    .route('/characters')
    .get(moviesController.GetCharacters);
exports.default = router;
