var express = require('express');
var gdpRouter = express.Router();
const gdpController = require('../../controller/admin/gdpController.js');

gdpRouter.post('/gdp/add', gdpController.addGdp);

gdpRouter.delete('/gdp/delete', gdpController.deleteGdp);

gdpRouter.post('/gdp/update', gdpController.updateGdp);

gdpRouter.post('/gdps', gdpController.getGdpList);



module.exports = gdpRouter;
