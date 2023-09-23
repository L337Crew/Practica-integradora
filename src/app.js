import express from "express";
import helmet from "helmet";
import { engine } from "express-handlebars";
import path from "path";
import {__dirname} from "./utils.js";
import { viewsRouter } from "./routes/viewsRouter.js";
import {productsRouter } from "./routes/productRouter.js"
import { cartsRouter } from "./routes/cartsRouter.js";
import { config } from "./config/config.js";


const app = express();
const port = config.server.port;
app.listen(port,()=>console.log(`Server listening on port ${port}`));


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//configuracion de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));


//routes
app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});




