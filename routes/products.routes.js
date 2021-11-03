const { Router } = require('express');
const { check } = require('express-validator');

// Helpers
const { productExistById, categoryExistById } = require('../helpers');

// Middlewares
const {
    validateJWT,
    isAdmin,
    validateInputs
} = require('../middlewares');

// Controllers
const { 
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers');

// Rutas
const router = Router();

// Obtener todos los productos - publico
router.get('/', getProducts );

// Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom( productExistById ),
    validateInputs
], getProductById );

// Crear un producto - privado - user con token valido
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'The category is required').not().isEmpty(),
    check('category').custom( categoryExistById ),
    validateInputs
], createProduct );

// Actualizar - privado - user con token valido
router.put('/:id', [
    validateJWT,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom( productExistById ),
    validateInputs
], updateProduct );

// Borrar producto - Admin
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom( productExistById ),
    validateInputs
], deleteProduct );

module.exports = router;