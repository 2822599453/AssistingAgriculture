var express = require('express');
var farmerRouter = express.Router();
const gdpController = require('../../controller/admin/gdpController.js');

farmerRouter.post('/gdp/add', gdpController.addGdp);

farmerRouter.delete('/gdp/delete', gdpController.deleteGdp);

farmerRouter.post('/gdp/update', gdpController.updateGdp);

farmerRouter.post('/gdps', gdpController.getGdpList);



module.exports = farmerRouter;
