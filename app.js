/**
 * @author guoxiaodong167@gmail.com
 * @file server 主文件
 */

const express = require('express');

// 1. 注册应用实例
const app = express();

// 2. 设置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('./mid_wares/res'));
app.use(require('./mid_wares/auth'));

// 3. 注册路由
const routes = require('./routes');
routes.forEach(({ path, router }) => { app.use(path, router) });

// 4. 设置错误处理中间件
app.use((err, req, res, next) => {
    console.log(err);
    res.fail(err);
})

app.listen(3007, function () {
    console.log('服务器运行在 http//127.0.0.1:3007');
});