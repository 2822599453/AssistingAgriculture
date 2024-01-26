const db = require('../utils/db');
const transform = require('../utils/transform');

const userModel = {
  insert: async (value) => {
    let sql =
      'insert into user(username, password, fullname, role, gender, phone, department_id) values(?, ?, ?, ?, ?, ?, ?)';
    return db(sql, value);
  },
  delete: async (value) => {
    let sql = 'delete from user where id = ?';
    return db(sql, value);
  },

  update: async (changeObj, filterObj) => {
    const { changeStr, filterStr, resultArr } = transform.updateSql(changeObj, filterObj);
    let sql = `update user set ${changeStr} where ${filterStr}`;
    // console.log(sql)
    // console.log(resultArr)
    return db(sql, resultArr);
  },
  queryOne: async (value) => {
    let sql = 'select * from user where username = ? and password = ?';
    return db(sql, value);
  },
  queryOneByUsername: async (value) => {
    let sql = 'select * from user where username = ?';
    return db(sql, value);
  },
  queryOneByDepartment_id: async (value) => {
    let sql = 'select * from user where department_id = ?';
    return db(sql, value);
  },
  queryAll: async (value) => {
    let sql = `
    set @fullname = ?;
    set @role = ?;
    set @gender = ?;
    set @name = ?;
    select user.*, department.name as department_name from user join department on user.department_id = department.id where (fullname like concat('%', @fullname, '%') or @fullname = '') and (role = @role or @role = '') and (gender = @gender or @gender = '') and (name like concat('%', @name, '%') or @name = '') limit ?, ?
  `;
    return db(sql, value);
  }
};

module.exports = userModel;
