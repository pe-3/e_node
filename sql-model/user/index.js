const useSql = require('../index');
const {
    querById,
    querByName,
    add,
    update,
    del
} = require('./sql');
const filterKey = require('../../utils/filterKey');
// 1. 查找一个用户
exports.queryUser = function (key, isUname) {
    return new Promise(async function (resolve, reject) {
        try {
            const datas = await useSql(
                isUname ? querByName : querById,
                key
            );
            if (datas.length === 0) resolve();
            resolve(datas[0]);
        } catch (err) {
            reject(err);
        }
    });
}

// 2. 增加用户
exports.addUser = function (reginfo) {
    return new Promise(async function (resolve, reject) {
        try {
            const user = filterKey(reginfo, 'username', 'password');
            const res = await useSql(add, user);
            if (res.affectedRows !== 1) {
                return resolve(false);
            }
            resolve(true);
        } catch (error) {
            resolve(error);
        }
    })
}

// 3. 更新用户信息
exports.updateUser = function (userinfo, userid) {
    return new Promise(async function (resolve, reject) {
        try {
            const user = filterKey(userinfo, 'nickname', 'email', 'avatar');
            console.log(user);
            const res = await useSql(update, user, userid);
            if (res.affectedRows !== 1) {
                reject('修改失败', res);
            }
            resolve('修改成功');
        } catch (error) {
            reject(error);
        }
    })
}

// 4. 删除一个用户
exports.deleteUser = function (userid) {
    return new Promise(async function (resolve, reject) {
        try {
            const res = await useSql(del, userid);
            if (res.affectedRows !== 1) {
                reject('修改失败', res);
            }
            resolve('修改成功');
        } catch (error) {
            reject(error);
        }
    })
}

