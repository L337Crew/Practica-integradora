import mongoose from "mongoose";
import { productsCollection } from "../../constant/index.js";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: {
    type: String, required: true 
   },
  description: { 
   type: String, required: true 
   },
  code: {
    type: String, required: true 
   },
  price: {
    type: Number, required: true 
   },
  status: { 
   type: Boolean, required: true 
   },
  stock: { 
   type: Number, required: true 
   },
  category: {
    type: String, required: true 
   },
  thumbnails: [String],

});
productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productSchema);


/* crear un producto:
{
  "title": "Nombre del Producto",
  "description": "Descripción del producto",
  "code": "Código del producto",
  "price": 100,  // Precio del producto (debe ser un número)
  "status": true,  // Estado del producto (debe ser true o false)
  "stock": 10,  // Cantidad en stock (debe ser un número)
  "category": "Categoría del producto",
  "thumbnails": ["URL de la imagen 1", "URL de la imagen 2"]
}



*/ 
