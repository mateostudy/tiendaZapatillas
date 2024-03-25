const Producto = require('../modelos/producto');

const getProductosEnStock = () => {
    return Producto.find({ stock: { $gt: 0 } });
};

async function getPriceForCliente(user_id, nombre_producto) {
    const productoEncontrado = await Producto.find({ nombre: nombre_producto }).lean().exec();
    if (productoEncontrado.length>0) {
        const producto = productoEncontrado[0];
        if (producto.marcas_especiales && producto.marcas_especiales.length > 0) {
            for (const marcaEspecial of producto.marcas_especiales) {
                if (marcaEspecial.user_id === user_id) {
                    return {
                        precio: marcaEspecial.valor,
                        marca: marcaEspecial.nombre
                    };
                }
                else{
                    return{
                        precio: producto.precio_base
                    }
                }
            }
        } else {
            return {
                precio: producto.precio_base
            };
        }
    } 
};

module.exports = {
    getProductosEnStock,
    getPriceForCliente
};
