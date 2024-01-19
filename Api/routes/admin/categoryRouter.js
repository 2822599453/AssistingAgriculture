var express = require('express');
var categoryRouter = express.Router();
const categoryController = require('../../controller/admin/categoryController.js');


categoryRouter.post('/article/category/add', categoryController.addCategory);

categoryRouter.delete('/article/category/delete', categoryController.deleteCategory);

categoryRouter.post('/article/category/update', categoryController.updateCategory);

categoryRouter.post('/article/categorys', categoryController.getCategoryList);
categoryRouter.get('/article/category/first', categoryController.getFirstCategory);
categoryRouter.get('/article/category/second', categoryController.getSecondCategory);

module.exports = categoryRouter;
