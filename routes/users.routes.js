const { Router } = require('express');
const { check } = require('express-validator');

// Helpers
const { 
    isRoleValid,
    emailExist,
    userExistById 
} = require('../helpers/db-validators');

// Middlewares
const {
    validateJWT,
    isAdmin,
    hasRole,
    validateInputs
} = require('../middlewares');

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
    // TODO: Cambiar condicion de role para que no sea obligatorio mandarlo
    check('role').custom( isRoleValid ),
    validateInputs
], usersPut );

router.delete('/:id', [
    validateJWT,
    // isAdmin,
    hasRole('USER_ROLE', 'SELLER_ROLE'),
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom( userExistById ),
    validateInputs
], usersDelete );

router.patch('/', usersPatch );

module.exports = router;