
const dbValidator = require('./db-validators');
const googleVerify = require('./google-verify');
const generateJwt = require('./generate-jwt');


module.exports = {
    ...dbValidator,
    ...googleVerify,
    ...generateJwt
};
