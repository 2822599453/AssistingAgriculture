

const storeModel = require('../../model/storeModel');

const storeService = {
  add: async ({ store_name, superintendent, business_line, address, code }) => {
    return storeModel.insert([store_name, superintendent, business_line, address, code]);
  },
  remove: async ({ id }) => {
    return storeModel.delete([id]);
  },
  update: async ({ store_name, superintendent, business_line, address, code, id}) => {
    return storeModel.update([store_name, superintendent, business_line, address, code, id]);
  },
  find: async ({ code }) => {
    return storeModel.query([code]);
  },
  findAll: async ({ store_name, business_line, code, pagenum, pagesize }) => {
    pagenum = (pagenum - 1) * pagesize;
    return storeModel.queryAll([store_name, business_line, code, pagenum, pagesize]);
  }
};

module.exports = storeService;
