var express = require('express');
var farmerRouter = express.Router();
const farmerController = require('../../controller/admin/farmerController.js');

farmerRouter.post('/farmer/add', farmerController.addFarmer);

farmerRouter.delete('/farmer/delete', farmerController.deleteFarmer);

farmerRouter.post('/farmer/update', farmerController.updateFarmer);

farmerRouter.post('/farmers', farmerController.getFarmerList);




module.exports = farmerRouter;
