var express = require('express');
var departmentRouter = express.Router();
const departmentController = require('../../controller/admin/departmentController.js');

departmentRouter.post('/department/add', departmentController.addDepartment);

departmentRouter.delete('/department/delete', departmentController.deleteDepartment);

departmentRouter.post('/department/update', departmentController.updateDepartment);

departmentRouter.post('/departments', departmentController.getDepartmentList);
// departmentRouter.get('/article/category/first', departmentController.getFirstCategory);
// departmentRouter.get('/article/category/second', departmentController.getSecondCategory);




module.exports = departmentRouter;
