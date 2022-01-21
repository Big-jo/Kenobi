import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';

import BaseRouter from './routes';
import logger from './shared/Logger';


// Init express
const app = express();


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.use('/api', BaseRouter);

// Optional fallthrough error handler
app.use(function onError(err: any, req: any, res: any, next: any) {
    logger.error(err.message);
    res.statusCode = 500;
});


/************************************************************************************
 *                              Default
 ***********************************************************************************/
app.all('*', (req: Request, res: Response) => {
    res.send('Welcome To Kenobi, Your one Star Wars Portal');
});



// Export express instance
export default app;
