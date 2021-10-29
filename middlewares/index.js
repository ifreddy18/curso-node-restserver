const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');
const validateInputs = require('../middlewares/validate-inputs');

module.exports = {
    ...validateJWT,
    ...validateRole,
    ...validateInputs
};