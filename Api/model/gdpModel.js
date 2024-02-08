const db = require('../utils/db');

const gdpModel = {
  insert: async (value) => {
    let sql = 'insert into gdp(total, rate, type, time) values(?, ?, ?, ?)';
    return db(sql, value);
  },
  delete: async (value) => {
    let sql = 'delete from gdp where id = ?';
    return db(sql, value);
  },
  update: async (value) => {
    let sql = `update gdp set total = ?, rate = ?, type = ?, time = ? where id = ?`;
    return db(sql, value);
  },
  query: async (value) => {
    let sql = `select * from gdp where time = ?`;
    return db(sql, value);
  },
  queryAll: async (value) => {
    let sql = `
      set @type = ?;
      set @time = ?;
      select * from gdp where (type = @type or @type = '') and (time = @time or @time = '') limit ?, ?
    `;
    return db(sql, value);
  }
};

module.exports = gdpModel;
