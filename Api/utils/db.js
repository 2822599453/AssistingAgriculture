const mysql = require('mysql');
const pool = mysql.createPool({
  multipleStatements: true,// 允许每个query操作的时候执行多条sql语句
  host: '127.0.0.1',
  user: 'root',
  password: 'love1234560',
  database: 'assisting_agriculture'
});

function db(sql, value) {
  return new Promise((resolve, reject) => {
    pool.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = db;
