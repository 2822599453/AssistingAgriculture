const storeModel = require('../../model/storeModel');

const storeService = {
  add: async ({ store_name, superintendent, business_line, address, code }) => {
    return storeModel.insert([store_name, superintendent, business_line, address, code]);
  },
  remove: async ({ id }) => {
    return storeModel.delete([id]);
  },
  update: async ({ store_name, superintendent, business_line, address, code, state, id }) => {
    return storeModel.update([store_name, superintendent, business_line, address, code, state, id]);
  },
  updateState: async ({ state, id }) => {
    return storeModel.update([state, id]);
  },
  find: async ({ code }) => {
    return storeModel.query([code]);
  },
  findAll: async ({ store_name, business_line, code, state, pagenum, pagesize }) => {
    pagenum = (pagenum - 1) * pagesize;
    return storeModel.queryAll([store_name, business_line, code, state, pagenum, pagesize]);
  }
};

module.exports = storeService;
