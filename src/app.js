import express from "express";
import helmet from "helmet";
import { engine } from "express-handlebars";
import path from "path";
import { __dirname } from "./utils.js";
import { viewsRouter } from "./routes/viewsRouter.js";
import { productsRouter } from "./routes/productRouter.js";
import { cartsRouter } from "./routes/cartsRouter.js";
import { config } from "./config/config.js";
import dotenv from "dotenv";
import MongoStore  from "connect-mongo";

// Importa las librerías necesarias para autenticación y sesiones
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { usersModel } from "./dao/models/usersModel.js"; // Importa el modelo de usuario
import { sessionsRouter } from "./routes/sessionsRouter.js";

dotenv.config();

const app = express();
const port = config.server.port;
app.listen(port, () => console.log(`Server listening on port ${port}`));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura sesiones y estrategia de autenticación local
app.use(session({
  store:MongoStore.create({
      mongoUrl:config.mongo.url
  }),
  secret:config.server.secretSession,
  resave:true,
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());

// Configurar estrategia de autenticación local con Passport
//passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

// Configuración de Handlebars (si lo necesitas)
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));

// Define el middleware checkRole
function checkRole(role) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.roles === role) {
      return next();
    }
    res.status(403).json({ error: 'Acceso no autorizado' });
  };
}

// Agrega la protección de ruta para /admin
app.get('/admin', checkRole('admin'), (req, res) => {
  res.render('adminPanel'); // Renderiza una vista específica para el panel de administración
});

// Rutas existentes
app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("api/sessions", sessionsRouter);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});


//app.use 