const productoService = require('../services/productService')

const getProductosEnStock = (req, res) => {
    const productos = productoService.getProductosEnStock();
    res.json(productos);
};

const getPriceForCliente = async (req, res) => {
    const { user_id, nombre_producto } = req.params;
    const precio = await productoService.getPriceForCliente(user_id, nombre_producto);
    res.json(precio);
   // console.log(precio);
};

module.exports = {
    getProductosEnStock,
    getPriceForCliente
};
