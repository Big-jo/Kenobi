import {Response} from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import logger from '../shared/Logger';

export class Utility {

    static ErrorResponse(res: Response, error: Error | undefined, errMsg?: string) {
        logger.error(error?.message)
        if (!!errMsg) res.status(BAD_REQUEST).json({errMsg});
        else { res.status(INTERNAL_SERVER_ERROR).json({errMsg: error?.message}) }
    }
}