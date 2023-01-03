const express = require('express');

// 引入路由
const signs = require('./sign_in&up');

// 引入中间件
const schema_middle_ware = require('../mid_wares/schema');

// 引入验证规则对象
const sign_schema = require('./sign_in&up/schema');

// 挂载路由
// 1. 登陆注册模块
const sign = express.Router();
// 1.1 数据验证
sign.use(schema_middle_ware(sign_schema));
// 1.2 注册路由
signs.forEach(({ url, method, handler }) => {
    console.log(method)
    sign[method](url, handler);
});

// 2. ...

module.exports = [
    {
        router: sign,
        path: '/sign'
    }
]