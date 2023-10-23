import express from 'express';
import passport from 'passport';
import User from '../dao/models/userModel.js';

const authRouter = express.Router();

// Middleware para verificar el rol del usuario
function checkRole(role) {
  return async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        const user = await User.findById(req.user._id);
        if (user.roles === role) {
          return next();
        }
        res.status(403).json({ error: 'Acceso no autorizado' });
      } catch (error) {
        res.status(500).json({ error: 'Error al verificar el rol del usuario' });
      }
    } else {
      res.status(401).json({ error: 'Debe iniciar sesión' });
    }
  };
}

// Ruta para mostrar el formulario de inicio de sesión
authRouter.get('/login', (req, res) => {
  res.render('login'); // Asegúrate de que tengas una vista 'login.handlebars' en tu carpeta 'views'
});

// Ruta para procesar el registro de un nuevo usuario
authRouter.post('/register', async (req, res) => {
  try {
    const newUser = new User({ username: req.body.username, email: req.body.email });
    await User.register(newUser, req.body.password);
    res.redirect('/auth/login'); // Redirige a la página de inicio de sesión después del registro exitoso
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para procesar el inicio de sesión del usuario y verificar el rol
authRouter.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res) => {
  res.redirect('/api/products'); // Redirige a la página de productos después del inicio de sesión exitoso
});

// Ruta para cerrar sesión
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login'); // Redirige a la página de inicio de sesión después del cierre de sesión
});

export default authRouter;
