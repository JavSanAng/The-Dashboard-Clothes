const mongoose = require('mongoose');

const ClothesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: true
    },
    Imagen: {
        type: String,
        required: true
    },
    Categoria: {
        type: String,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
        required: true
    },
    Talla: {
        type: String,
        enum: ['XS','S', 'M','L','XL'],
        required: true
    },
}, {timestamps:true});

const Product = mongoose.model('Product', ClothesSchema );
module.exports = Product;