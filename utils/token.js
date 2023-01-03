// 引入nanoid, 生成密钥
const jwtSecretKey = '^*#@$%@#@#&@#$*';
// 引入jwt，封装token相关方法
const jwt = require('jsonwebtoken');

exports.jwtSecretKey = jwtSecretKey;
exports.createToken = function (userinfo, expriesIn) {
    return 'Bearer ' + jwt.sign(userinfo, jwtSecretKey, expriesIn ? { expriesIn } : undefined);
}



