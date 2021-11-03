const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { generalSearch } = require('../controllers');

// Rutas
const router = Router();

router.get('/:collection/:query', generalSearch );

module.exports = router;
