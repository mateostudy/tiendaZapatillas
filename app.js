const express = require('express');
const productoRoutes = require('./routes/productRoutes');
const mongoose = require('mongoose');
const Producto = require('./modelos/producto');

const app = express();
const PORT = process.env.PORT || 3000;

const uri = "mongodb://drenvio:moM5f3AodwLE5d0A@ac-aemgtkt-shard-00-00.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-01.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-02.unqyghm.mongodb.net:27017/?replicaSet=atlas-y8oxsk-shard-0&ssl=true&authSource=admin";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Conectado a MongoDB'); insertarDatosDePrueba(); })
    .catch(err => console.error('Error de conexión a MongoDB:', err));


app.use(express.json());
app.use('/api', productoRoutes);
async function insertarDatosDePrueba() {
    try {
        // Verificar si ya existen datos de prueba en la base de datos
        const productosExistentes = await Producto.find();
        if (productosExistentes.length > 0) {
            console.log('La base de datos ya contiene datos, no se insertarán datos de prueba.');
            return;
        }
        const productosPrueba = [
            {
                nombre: 'Zapatillas_Nike_Mateo',
                stock: 20,
                precio_base: 100,
                marcas_especiales: [
                    { nombre: 'Nike', valor: 90, user_id: 'user1' },
                    { nombre: 'Adidas', valor: 95, user_id: 'user2' },
                ]
            },
            {
                nombre: 'Zapatillas_Adidas_Mateo',
                stock: 15,
                precio_base: 90,
                marcas_especiales: [
                    { nombre: 'Adidas', valor: 85, user_id: 'user1' }
                ]
            },
            {
                nombre: 'Zapatillas_Sin_Stock',
                stock: 0,
                precio_base: 90,
                marcas_especiales: [
                    { nombre: 'Adidas', valor: 0, user_id: 'user1' }
                ]
            }
        ];

        await Producto.insertMany(productosPrueba);
        console.log('Datos de prueba insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos de prueba:', error);
    }
}

const eliminarProductosDePrueba = async () => {
    try {
        await Producto.deleteMany();
        console.log('Datos de prueba eliminados correctamente');
    } catch (error) {
        console.error('Error al eliminar datos de prueba:', error);
        throw error; // Puedes lanzar el error para manejarlo en un nivel superior si es necesario
    }
};
app.listen(PORT, () => {
    console.log(`Servidor de tienda de zapatillas esta realizando por el puerto ${PORT}`);
});