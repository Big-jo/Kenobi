import { Request, Response } from "express";
import { getConnection, getRepository, In } from "typeorm";
import { User } from "../entities/User.entity";

import { Utility } from "../utility/utility";
import { BAD_REQUEST, OK } from "http-status-codes";
import { dateToNumber, genderFilter, genderSort, heightCalculator, heightSort, nameSort, toFeet } from "../shared/functions";
import { IUser } from "../interfaces/user.interface";
const convert = require('convert-length');

/**
 * Controller Class For Movies
 */
export class UserController {

    constructor() { }

    /**
     * 
     * @param req 
     * @param res 
     * 
     * Get Movies From External API
     */
    async CreateUser(req: Request, res: Response) {
        try {
            const userRepository = getRepository(User);
            const saved = await userRepository.save(req.body)

            delete saved.password;

            res.json(saved);
        } catch (err) {
            Utility.ErrorResponse(res, err);
        }
    }

    async FindUserByMatric(req: Request, res: Response) {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.find({matric_number: req.query.matric_number as string})

            res.json(user);
        } catch (err) {
            Utility.ErrorResponse(res, err);
        }
    }

}