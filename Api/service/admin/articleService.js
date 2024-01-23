const articleModel = require('../../model/articleModel');
const baseUrl = require('../../utils/config');

const articleService = {
  add: async (
    { category_id, title, content, cover, is_publish, edit_time, department_id },
    file
  ) => {
    cover = `${baseUrl}:3000/article_uploads/${file.filename}`;
    return articleModel.insert([
      category_id,
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
  update: async ({ title, category_id, content, cover, is_publish, id }, file) => {
    if (file) {
      cover = `${baseUrl}:3000/article_uploads/${file.filename}`;
    }
    return articleModel.update([title, category_id, content, cover, is_publish, id]);
  },
  findOne: async ({ id }) => {
    return articleModel.queryOne([id]);
  },
  findAll: async ({ category_id, is_publish, name, flag, pagenum, pagesize }) => {
    pagenum = (pagenum - 1) * pagesize;
    return articleModel.queryAll([category_id, is_publish, name, flag, pagenum, pagesize]);
  }
};

module.exports = articleService;
