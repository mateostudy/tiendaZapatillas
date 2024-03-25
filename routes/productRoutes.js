const express = require('express');
const router = express.Router();
const {getProductosEnStock, getPriceForCliente}= require('../controllers/productController');

router.get('/productos', getProductosEnStock);
router.get('/price/:user_id/:nombre_producto', getPriceForCliente);

module.exports = router;
