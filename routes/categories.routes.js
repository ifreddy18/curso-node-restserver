const { Router } = require('express');
const { check } = require('express-validator');

// Helpers
const { categoryExistById } = require('../helpers');

// Middlewares
const {
    validateJWT,
    isAdmin,
    validateInputs
} = require('../middlewares');

// Controllers
const { 
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controllers');


// Rutas
const router = Router();

// Obtener todas las categorias - publico
router.get('/', getCategories );

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom( categoryExistById ),
    validateInputs
], getCategoryById );

// Crear una categoria - privado - user con token valido
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateInputs
], createCategory );

// Actualizar - privado - user con token valido
router.put('/:id', [
    validateJWT,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom( categoryExistById ),
    check('name', 'The name is required').not().isEmpty(),
    validateInputs
], updateCategory );

// Borrar categoria - Admin
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom( categoryExistById ),
    validateInputs
], deleteCategory );


module.exports = router;