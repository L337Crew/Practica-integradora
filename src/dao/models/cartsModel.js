import mongoose from "mongoose";
import { cartsCollection } from "../../constant/index.js";

const cartSchema = new mongoose.Schema({
    // ... otras propiedades ...

    // El campo 'products' es un arreglo de IDs de productos referenciados al modelo 'Product'
    products: [{
        type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId para referencia a los productos
        ref: 'Product', // Nombre del modelo de productos al que se hace referencia
    }],
});

export const cartsModel = mongoose.model(cartsCollection, cartSchema);
