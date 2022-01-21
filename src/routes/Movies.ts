import { Request, Response, Router } from 'express';
import { CommentController } from '../controllers/Comments.controller';
import { MoviesController } from '../controllers/Movies.controller';

// Init shared
const router = Router();
const moviesController = new MoviesController();
const commentController = new CommentController();

/******************************************************************************
 *                     GET ALL MOVIES LIST
 ******************************************************************************/
router
    .route('/')
    .get(moviesController.GetMovies);

/******************************************************************************
 *                     CREATE A COMMENT FOR A MOVIE LISTING
 ******************************************************************************/
router
    .route('/comment')
    .post(commentController.CreateComment);


 /******************************************************************************
 *                     GET COMMENTS FOR A MOVIE LISTING
 ******************************************************************************/
  router
  .route('/comment/:movieID')
  .get(commentController.GetMovieComments);

  
 /******************************************************************************
 *                     GET CHARACTERS FROM A MOVIE LISTING
 ******************************************************************************/
  router
  .route('/characters')
  .get(moviesController.GetCharacters);


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
