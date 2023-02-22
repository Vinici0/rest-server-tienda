const { Router } = require('express');
const { buscar } = require('../controllers/buscar');

const router = Router();


//El orden de los parámetros es importante
router.get('/:coleccion/:termino', buscar )




module.exports = router;