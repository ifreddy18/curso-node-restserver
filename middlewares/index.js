const validateFiles = require('../middlewares/validate-files');
const validateInputs = require('../middlewares/validate-inputs');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');

module.exports = {
    ...validateFiles,
    ...validateInputs,
    ...validateJWT,
    ...validateRole,
};