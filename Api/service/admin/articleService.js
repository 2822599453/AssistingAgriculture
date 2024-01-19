const articleModel = require('../../model/articleModel');

const articleService = {
  add: async ({ level, level_name, parent_id, parent_name }) => {
    return articleModel.insert([level, level_name, parent_id, parent_name]);
  },
  remove: async ({ id }) => {
    return articleModel.delete([id]);
  },
  update: async ({ level_name, parent_name, parent_id, id }) => {
    return articleModel.update([level_name, parent_name, parent_id, id]);
  },
  find: async (value) => {
    return articleModel.query([value?.parent_id]);
  },
  findAll: async ({ category_id, is_publish, pagenum, pagesize }) => {
    pagenum = (pagenum - 1) * pagesize;
    console.log(category_id, is_publish, pagenum, pagesize)
    return articleModel.queryAll([category_id, is_publish, pagenum, pagesize]);
  }

};

module.exports = articleService;
