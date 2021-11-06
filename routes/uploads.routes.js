const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateInputs, existFiles } = require('../middlewares');

// Helpers
const { isValidCollection } = require('../helpers');

// Controllers
const { 
    uploads,
    updateImagen,
    getImagen, 
    updateImagenCloudinary 
} = require('../controllers');

// Rutas
const router = Router();

router.post('/', uploads);

router.put('/:collection/:id', [
    existFiles,
    check('id', 'This is not a valid ID').isMongoId(),
    check('collection').custom( c => isValidCollection( c, ['users', 'products'] )),
    validateInputs
], updateImagenCloudinary);

router.get('/:collection/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('collection').custom( c => isValidCollection( c, ['users', 'products'] )),
    validateInputs
], getImagen);


module.exports = router;