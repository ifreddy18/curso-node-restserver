const { Router } = require('express');
const { check } = require('express-validator');

// Helpers
const { 
    isRoleValid,
    emailExist,
    userExistById 
} = require('../helpers/db-validators');

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs');

// Controllers
const { 
    usersGet, 
    usersPut, 
    usersPost, 
    usersDelete, 
    usersPatch 
} = require('../controllers/users.controllers');

// Rutas
const router = Router();

router.get('/', usersGet );

router.post('/', [
    check('name', 'The name is obligatory').not().isEmpty(),
    check('password', 'The password must contain at least 6 characters').isLength({ min: 6 }),
    check('email', 'This isn\'t a valid email').isEmail(),
    check('email').custom( emailExist ),
    // check('role', 'This isn\'t a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    validateInputs
], usersPost );

router.put('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom( userExistById ),
    check('role').custom( isRoleValid ),
    validateInputs
], usersPut );

router.delete('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom( userExistById ),
    validateInputs
], usersDelete );

router.patch('/', usersPatch );

module.exports = router;