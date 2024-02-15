var express = require('express');
var populationRouter = express.Router();
const populationController = require('../../controller/admin/populationController.js');

populationRouter.post('/population/add', populationController.addPopulation);

populationRouter.delete('/population/delete', populationController.deletePopulation);

populationRouter.post('/population/update', populationController.updatePopulation);

populationRouter.post('/population', populationController.getPopulationList);



module.exports = populationRouter;
