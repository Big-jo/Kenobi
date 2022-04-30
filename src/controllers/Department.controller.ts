import { Request, Response } from "express";
import { getConnection, getRepository, In } from "typeorm";
import { User } from "../entities/User.entity";

import { Utility } from "../utility/utility";
import { BAD_REQUEST, OK } from "http-status-codes";
import { dateToNumber, genderFilter, genderSort, heightCalculator, heightSort, nameSort, toFeet } from "../shared/functions";
import { IUser } from "../interfaces/user.interface";
import { Department } from "../entities/department.entities";
import { TimeTable } from "../entities/timetable.entity";
const convert = require('convert-length');

/**
 * Controller Class For Movies
 */
export class DepartmentController {

    constructor() { }

    async createDepartment(req: Request, res: Response) {
        try {

            const departmentRepository = getRepository(Department);
            const timetableRepository = getRepository(TimeTable);

            const dept = await departmentRepository.save(req.body);

            res.json(dept)
        } catch (error) {
            Utility.ErrorResponse(res, error)
        }
    }

    async findDepartment(req: Request, res: Response) {
        try {
            const departmentRepository = getRepository(Department);
            const timetableRepository = getRepository(TimeTable);
            const queryID = parseInt(req.query.id as string);
            const query = {} as any;

            let dept;

            if (!!queryID) query['where'] = {id: queryID}

            console.log(query)

            dept = await departmentRepository.find( query );

            res.json(dept)
        } catch (error) {
            Utility.ErrorResponse(res, error)
        }
    }

    async getDepartmentsByCollege(req: Request, res: Response) {
        try {

            const departmentRepository = getRepository(Department);
            const timetableRepository = getRepository(TimeTable);

            const dept = await departmentRepository.find({ college: req.query.college as string });

            res.json(dept)
        } catch (error) {
            Utility.ErrorResponse(res, error)
        }
    }

    async createTimeTable(req: Request, res: Response) {
        try {

            const departmentRepository = getRepository(Department);
            const timetableRepository = getRepository(TimeTable);

            const serializedTable = JSON.stringify(req.body.table);

            delete req.body.table;

            const timeTable = {...req.body, table: serializedTable}

            let saved = await timetableRepository.save(timeTable);

            saved = { ...saved, table: JSON.parse(saved.table)};

            res.json(saved);
        } catch (error) {
            Utility.ErrorResponse(res, error);
        }
    }

    async findTableByDepartment(req: Request, res: Response) {
        try {
            const departmentRepository = getRepository(Department);
            const timetableRepository = getRepository(TimeTable);
            const deptQuery = parseInt(req.query.dept as string)
            const levelQuery = parseInt(req.query.level as string)

            const query = {'where': {}} as any;

            if (!!levelQuery) query['where']['level'] = levelQuery;
            if (!!deptQuery) query['where']['department'] = deptQuery;

            let timeTable = await timetableRepository.find(query);

            const newT = timeTable.map((t) => { return { ...t, table: JSON.parse(t.table)} })

            res.json(newT);
        } catch (error) {
            Utility.ErrorResponse(res, error)
        }
    }

    // private ParseTable(table: any) {
    //     if (table.length < 1) return [];

    //     return {...table, table: JSON.parse(table.table) }
    // }
}