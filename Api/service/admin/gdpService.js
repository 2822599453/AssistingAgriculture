const gdpModel = require('../../model/gdpModel');

const gdpService = {
  add: async ({ total, rate, type, time }) => {
    return gdpModel.insert([total, rate, type, time]);
  },
  remove: async ({ id }) => {
    return gdpModel.delete([id]);
  },
  update: async ({ total, rate, type, time, id}) => {
    return gdpModel.update([total, rate, type, time, id]);
  },
  find: async ({ time }) => {
    return gdpModel.query([time]);
  },
  findAll: async ({ type, time, pagenum, pagesize }) => {
    pagenum = (pagenum - 1) * pagesize;
    return gdpModel.queryAll([type, time, pagenum, pagesize]);
  }
};

module.exports = gdpService;
