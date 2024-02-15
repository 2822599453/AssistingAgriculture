const db = require('../utils/db');

const populationModel = {
  insert: async (value) => {
    let sql = 'insert into population(area, time) values(?, ?)';
    return db(sql, value);
  },
  delete: async (value) => {
    let sql = 'delete from population where id = ?';
    return db(sql, value);
  },
  update: async (value) => {
    let sql = `update population set area = ?, time = ? where id = ?`;
    return db(sql, value);
  },
  query: async (value) => {
    let sql = `select * from population where time = ?`;
    return db(sql, value);
  },
  queryAll: async (value) => {
    let sql = `
      set @time = ?;
      select * from population where (time = @time or @time = '') limit ?, ?
    `;
    return db(sql, value);
  }
};

module.exports = populationModel;
