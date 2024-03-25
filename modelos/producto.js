const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    stock: Number,
    precio_base: Number,
    marcas_especiales: [{
        nombre: String,
        valor: Number,
        user_id: String
    }]
});

module.exports = mongoose.model('Producto', productoSchema);
