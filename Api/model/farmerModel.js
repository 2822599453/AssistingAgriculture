const db = require('../utils/db');

const farmerModel = {
  insert: async (value) => {
    let sql = 'insert into farmer(name, gender, ID_card, phone, address) values(?, ?, ?, ?, ?)';
    return db(sql, value);
  },
  delete: async (value) => {
    let sql = 'delete from farmer where id = ?';
    return db(sql, value);
  },
  update: async (value) => {
    let sql = `update farmer set name = ?, gender = ?, ID_card = ?, phone = ?, address = ?  where id = ?`;
    return db(sql, value);
  },
  query: async (value) => {
    let sql = `select * from farmer where ID_card = ?`;
    return db(sql, value);
  },
  queryAll: async (value) => {
    let sql = `
      set @name = ?;
      set @ID_card = ?;
      select * from farmer where name like concat('%', @name, '%') and ID_card like concat('%', @ID_card, '%') limit ?, ?
    `;
    return db(sql, value);
  }
};

module.exports = farmerModel;
