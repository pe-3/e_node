module.exports = function (req, res, next) {
    res.success = function (str, data) {
        return res.send({
            status: 0,
            msg: str,
            data
        });
    }
    res.fail = function (err, data) {
        return res.send({
            status: -1,
            msg: err.message ?? err,
            data
        });
    }
    next();
}