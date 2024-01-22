const db = require('../utils/db');

const departmentModel = {
  insert: async (value) => {
    let sql = 'insert into department(area, name) values(?, ?)';
    return db(sql, value);
  },
  delete: async (value) => {
    let sql = 'delete from department where id = ?';
    return db(sql, value);
  },
  update: async (value) => {
    let sql = `update department set name = ? where id = ?`;
    return db(sql, value);
  },
  query: async (value) => {
    let sql = `select * from department where name = ?`;
    return db(sql, value);
  },
  queryAll: async (value) => {
    let sql = `
      set @name = ?;
      select * from department where name like concat('%', @name, '%')
    `;
    return db(sql, value);
  }
};

module.exports = departmentModel;
