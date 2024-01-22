const departmentModel = require('../../model/departmentModel');
const baseUrl = require('../../utils/config');

const departmentService = {
  add: async ({ area, name }) => {
    return departmentModel.insert([area, name]);
  },
  remove: async ({ id }) => {
    return departmentModel.delete([id]);
  },
  update: async ({ name, id }) => {
    return departmentModel.update([name, id]);
  },
  find: async ({ name }) => {
    return departmentModel.query([name]);
  },
  findAll: async ({ name }) => {
    return departmentModel.queryAll([name]);
  }
};

module.exports = departmentService;
