const expressJWT = require('express-jwt');
const { jwtSecretKey } = require('../utils/token');
module.exports = expressJWT({ secret: jwtSecretKey }).unless({ path: [/^\/sign\//] });
