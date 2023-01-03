const schema_middle_ware = function (schema) {
    return function (req, res, next) {
        // 拿到要验证req上的什么数据
        const schema_keys = Object.keys(schema);
        // 进行验证，出现err则抛出错误
        schema_keys.forEach((key) => {
            if (req[key]) {
                const { error } = schema[key].validate(req[key]);
                if (error) throw new Error(error);
            }
        })
        // 验证通过便放行
        next();
    }
}

module.exports = schema_middle_ware;