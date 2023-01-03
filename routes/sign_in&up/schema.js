// 导入定义验证规则的包
const Joi = require('joi');

// 定义用户注册的验证规则
const sign_schema = Joi.object({
    username: Joi.string().alphanum().min(1).max(10).required(),
    password: Joi.string().pattern(/^[\S]{6,12}$/).required()
});

module.exports = {
    body: sign_schema
};