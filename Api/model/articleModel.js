const db = require('../utils/db');

const articleModel = {
  insert: async (value) => {
    let sql =
      'insert into article_category(level, level_name, parent_id, parent_name) values(?, ?, ?, ?)';
    return db(sql, value);
  },
  delete: async (value) => {
    let sql = 'delete from article_category where id = ?';
    return db(sql, value);
  },

  update: async (value) => {
    let sql = `update article_category set level_name = ?, parent_name = ?, parent_id = ? where id = ?`;
    return db(sql, value);
  },
  query: async (value) => {
    let sql = ''
    // 有入参查二级分类，无就一级
    if(value[0]) {
      sql = 'select * from article_category where level = 2 and parent_id = ?';
      return db(sql, value);
    } else {
      sql = 'select * from article_category where level = 1';
      return db(sql);
    }
  },
  queryAll: async (value) => {
    let sql = `
        set @category_id = ?;
        set @is_publish = ?;
        select * from article where (category_id = @category_id or @category_id = '') and (is_publish = @is_publish or @is_publish = '') limit ?,?
      `;
    return db(sql, value);
  }
};

module.exports = articleModel;
