const productoService = require('../services/productService')

const getProductosEnStock = async (req, res) => {
    const productos = await productoService.getProductosEnStock();
    res.json(productos);
};

const getPriceForCliente = async (req, res) => {
    const { user_id, nombre_producto } = req.params;
    const precio = await productoService.getPriceForCliente(user_id, nombre_producto);
    res.json(precio);
};

module.exports = {
    getProductosEnStock,
    getPriceForCliente
};
