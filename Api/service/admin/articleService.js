const articleModel = require('../../model/articleModel');
const baseUrl = require('../../utils/config');

const articleService = {
  add: async (
    { category_id, category_name, title, content, cover, is_publish, edit_time, department_id },
    file
  ) => {
    cover = `${baseUrl}:3000/article_uploads/${file.filename}`;
    return articleModel.insert([
      category_id,
      category_name,
      title,
      content,
      cover,
      is_publish,
      edit_time,
      department_id
    ]);
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
  findAll: async ({ category_id, is_publish, name, pagenum, pagesize }) => {
    pagenum = (pagenum - 1) * pagesize;
    return articleModel.queryAll([category_id, is_publish, name, pagenum, pagesize]);
  }
};

module.exports = articleService;
