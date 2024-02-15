const populationModel = require('../../model/populationModel');

const populationService = {
  add: async ({ area, time}) => {
    return populationModel.insert([area, time]);
  },
  remove: async ({ id }) => {
    return populationModel.delete([id]);
  },
  update: async ({ area, time, id}) => {
    return populationModel.update([area, time, id]);
  },
  find: async ({ time }) => {
    return populationModel.query([time]);
  },
  findAll: async ({ time, pagenum, pagesize }) => {
    pagenum = (pagenum - 1) * pagesize;
    return populationModel.queryAll([ time, pagenum, pagesize]);
  }
};

module.exports = populationService;

const a = {
  
}
