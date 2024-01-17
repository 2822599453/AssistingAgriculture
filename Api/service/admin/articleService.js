const articleModel = require('../../model/articleModel');

const articleService = {
  update: async ({level_name, parent_name, id}) => {
    return articleModel.update([[level_name, parent_name, id]]);
  },
  find: async () => {
    return articleModel.queryOne();
  },
  findAll: async ({ parent_id, pagenum, pagesize }, flag) => {
    pagenum = (pagenum - 1) * pagesize;
    return articleModel.queryAll([parent_id, pagenum, pagesize], flag);
  }
};

module.exports = articleService;
