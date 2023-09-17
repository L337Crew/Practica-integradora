import mongoose from "mongoose";
import {mongoConfig} from "./config.js";

export const connectDB = async()=>{
    try{
        await mongoose.connect(mongoConfig.url);
        console.log("Base de datos conectada");
    }catch(error){
        console.log(`Error al conectar la base de datos ${error.message}`);
    }
}
