var express = require('express');
var storeRouter = express.Router();
const storeController = require('../../controller/admin/storeController.js');

storeRouter.post('/store/add', storeController.addStore);

storeRouter.delete('/store/delete', storeController.deleteStore);

storeRouter.post('/store/update', storeController.updateStore);

storeRouter.post('/stores', storeController.getStoreList);




module.exports = storeRouter;
