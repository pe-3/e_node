const { queryUser, addUser } = require('../../sql-model/user');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../utils/token');
const filterKey = require('../../utils/filterKey');
module.exports = [
    {
        url: '/up',
        method: 'post',
        async handler(req, res) {
            // 1. 拿到注册信息
            const { username, password } = req.body;
            // 2. 查询用户是否存在
            const datas = await queryUser(username, true);
            if (datas) return res.fail('该用户存在，请重新注册');
            // 3. 进行注册
            // 3.1 将密码进行加密
            const encrypted = bcrypt.hashSync(password, 10);
            const success = await addUser({ username, password: encrypted });
            if (!success) return res.fail('注册失败，请稍后再试');
            // 4. 注册成功
            res.success('注册成功');
        }
    },
    {
        url: '/in',
        method: 'post',
        async handler(req, res) {
            // 1. 拿到登陆信息
            const { username, password } = req.body;
            // 2. 查询这个用户
            const user = await queryUser(username, true);
            if (!user) return res.fail('用户名或密码错误');
            // 3. 验证密码
            const isCorrect = bcrypt.compareSync(password, user.password);
            if (!isCorrect) return res.fail('用户名或密码错误');
            // 4. 生成token
            const safePayload = filterKey(user, 'id', 'username', 'nickname', 'avatar', 'email');
            const token = createToken(safePayload);
            res.success('登陆成功', { token });
        }
    }
]