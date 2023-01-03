// 1. 查找的sql
exports.querById = 'select * from users where id = ?';
exports.querByName = 'select * from users where username = ?';
// 2. 添加的sql
exports.add = 'insert into users set ?';
// 3. 更新的sql
exports.update = 'update users set ? where id = ?';
// 4. 删除的sql
exports.del = "update users set status='1' where id = ?";

