const categoryModel = require('../../model/categoryModel');

const categoryService = {
  add: async ({ level, level_name, parent_id, parent_name }) => {
    return categoryModel.insert([level, level_name, parent_id, parent_name]);
  },
  remove: async ({ id }) => {
    return categoryModel.delete([id]);
  },
  update: async ({ level_name, parent_name, parent_id, id }) => {
    return categoryModel.update([level_name, parent_name, parent_id, id]);
  },
  find: async (value) => {
    return categoryModel.query([value?.parent_id]);
  },
  findAll: async ({ parent_id, pagenum, pagesize }) => {
    pagenum = (pagenum - 1) * pagesize;
    return categoryModel.queryAll([parent_id, pagenum, pagesize]);
  }

};

module.exports = categoryService;
