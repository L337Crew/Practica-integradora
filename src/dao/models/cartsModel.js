import mongoose from "mongoose";
import { cartsCollection } from "../../constant/index.js";

const cartSchema = new mongoose.Schema({
    products:{
        type:[],
        default:[]
    }
});

export const cartsModel = mongoose.model(cartsCollection,cartSchema);
