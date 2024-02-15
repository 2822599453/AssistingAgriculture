const db = require('../utils/db');

const storeModel = {
  insert: async (value) => {
    let sql = 'insert into store(store_name, superintendent, business_line, address, code) values(?, ?, ?, ?, ?)';
    return db(sql, value);
  },
  delete: async (value) => {
    let sql = 'delete from store where id = ?';
    return db(sql, value);
  },
  update: async (value) => {
    let sql = `update store set store_name = ?, superintendent = ?, business_line = ?, address = ?, code = ?, state = ?  where id = ?`;
    return db(sql, value);
  },
  updateState: async (value) => {
    let sql = `update store set state = ? where id = ?`;
    return db(sql, value);
  },
  query: async (value) => {
    let sql = `select * from store where code = ?`;
    return db(sql, value);
  },
  queryAll: async (value) => {
    let sql = `
      set @store_name = ?;
      set @business_line = ?;
      set @code = ?;
      set @state = ?;
      select * from store where store_name like concat('%', @store_name, '%') and code like concat('%', @code, '%') and (business_line = @business_line or @business_line = '') and (state = @state or @state = '')  limit ?, ?
    `;
    return db(sql, value);
  }
};


module.exports = storeModel;
