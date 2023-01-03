// 连接数据库
// 导入mysql
const mysql = require('mysql');

// 创建连接池
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'big_event_database'
});

// 定义操作数据库的方法
function useSql(sqlStr, ...data) {
    return new Promise((resolve, reject) => {
        db.query(sqlStr, data, (err, data) => {
            if (err) {
                return reject(err.message, err);
            }
            resolve(data);
        });
    })
}
// 向外暴露查询方法，无法直接访问连接池对象
module.exports = useSql;