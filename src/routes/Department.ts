import { Request, Response, Router } from 'express';
import { DepartmentController } from '../controllers/Department.controller';
import { UserController } from '../controllers/User.controller';

// Init shared
const router = Router();
const departmentController = new DepartmentController();

/******************************************************************************
 *                     CREATE DEPARTMENT
 ******************************************************************************/

router
    .route('/')
    .post(departmentController.createDepartment);

/******************************************************************************
 *                     FIND DEPARTMENT
 ******************************************************************************/

 router
 .route('/')
 .get(departmentController.findDepartment);

 /******************************************************************************
 *                     CREATE TIMETABLE
 ******************************************************************************/
  router
  .route('/timetable')
  .post(departmentController.createTimeTable);

   /******************************************************************************
 *                     FIND TIMETABLE
 ******************************************************************************/
    router
    .route('/timetable')
    .get(departmentController.findTableByDepartment);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
