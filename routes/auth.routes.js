const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs');

// Controllers
const { authLogin, googleSignIn } = require('../controllers/auth.controllers');


// Rutas
const router = Router();

router.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateInputs
], authLogin );

router.post('/google', [
    check('id_token', 'Google ID is required').not().isEmpty(),
    validateInputs
], googleSignIn );


module.exports = router;