import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/User.controller';

// Init shared
const router = Router();
const userController = new UserController();

/******************************************************************************
 *                     CREATE USER
 ******************************************************************************/
router
    .route('/')
    .post(userController.CreateUser);


router
    .route('/')
    .get(userController.FindUserByMatric)
/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
