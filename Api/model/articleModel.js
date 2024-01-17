const db = require('../utils/db');
const transform = require('../utils/transform')

const articleModel = {
  insert: async (value) => {
    let sql =
      'insert into user(username, password, fullname, role, gender, phone) values(?, ?, ?, ?, ?, ?)';
    return db(sql, value);
  },
  delete: async (value) => {
    let sql = 'delete from user where id = ?';
    return db(sql, value);
  },

  update: async (value) => {
    let sql = `update article_category set level_name = ?, parent_name = ? where id = ?`;
    return db(sql, value);
  },
  
  queryOneByUsername: async (value) => {
    let sql = 'select * from user where username = ?';
    return db(sql, value);
  },
  queryOne: async () => {
    let sql = 'select * from article_category where level = 1';
    return db(sql);
  },
  queryAll: async (value, flag) => {
    let sql = '';
    if (flag) {
      sql = 'select * from article_category where level = 2';
    } else {
      sql = `
        set @parent_id = ?;
        select * from article_category where (parent_id = @parent_id or @parent_id = '') and (parent_id is not null) limit ?,?
      `;
    }
    return db(sql, value);
  }
};

module.exports = articleModel;
