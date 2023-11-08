import { config } from "../config/config.js";
import { ProductManager } from "./filesystem/productManager.js";
import { CartManager } from "./filesystem/cartManager.js";
import { ProductManagerMongo } from "./mongo/productManagerMongo.js";
import { CartManagerMongo } from "./mongo/cartManagerMongo.js";
import { connectDB } from "../config/dbConection.js";
import { UserManagerMongo } from "./mongo/userManagerMongo.js";

//persistencia de archivos
// const productService = new ProductManager(config.fileSystem.productsFile);
// const cartService = new CartManager(config.fileSystem.cartFile);


//persistencia de mongoDB
connectDB();
const productService = new ProductManagerMongo();
const cartService = new CartManagerMongo();
const usersService = new UserManagerMongo();


export {productService, cartService, usersService}