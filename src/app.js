import express from "express";
import { config } from "./config/config.js";
import { connectDB } from "./dao/dbManager.js";
import { engine } from 'express-handlebars';
import path from "path";
import {__dirname} from "./utils.js";
import { Server } from "socket.io";
import { viewsRouter} from "./routes/viewsRouter.js"


const app = express();
const port = config.server.port;
const httpServer =  app.listen(port,()=>console.log(`Server listening on port ${port}`));
const io = new Server(httpServer);


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

connectDB();

app.use(viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.get('/', (req, res) => {
    res.render('home');
});
  
app.get('/chat', (req, res) => {
    res.render('chat');
});


app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname, 'public')));



