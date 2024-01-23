const db = require('../utils/db');

const articleModel = {
  insert: async (value) => {
    let sql =
      'insert into article(category_id, title, content, cover, is_publish, edit_time, department_id) values(?, ?, ?, ?, ?, ?, ?)';
    return db(sql, value);
  },
  delete: async (value) => {
    let sql = 'delete from article where id = ?';
    return db(sql, value);
  },

  update: async (value) => {
    let sql = `update article set title = ?, category_id = ?, content = ?, cover = ?, is_publish = ? where id = ?`;
    return db(sql, value);
  },
  queryOne: async (value) => {
    let sql = `select article.*, article_category.level_name as category_name from article 
      join article_category on article.category_id = article_category.id 
      where article.id = ?
    `
    return db(sql, value);
  },
  queryAll: async (value) => {
    let sql = `
        set @category_id = ?;
        set @is_publish = ?;
        set @name = ?;
        select article.id, title, is_publish, edit_time, department.name as department_name, article_category.level_name as category_name from article 
        join department on article.department_id = department.id 
        join article_category on article.category_id = article_category.id
        where (category_id = @category_id or @category_id = '') and (is_publish = @is_publish or @is_publish = '') and (name like concat('%', @name, '%') or @name = '') and parent_id = ?
        order by edit_time desc limit ?,?
      `;
    return db(sql, value);
  }
};

module.exports = articleModel;
