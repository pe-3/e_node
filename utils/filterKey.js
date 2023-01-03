module.exports = function filterKey(target, ...needkeys) {
    return needkeys.reduce((pre, key) => {
        pre[key] = target[key];
        return pre;
    }, ({}));
}