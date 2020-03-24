const express = require("express");
const { body } = require("express-validator/check");

const Usuario = require("../modelos/mUsuario");
const cUsuarios = require("../controladores/cUsuarios");
const esAutenticado = require("../middleware/esAutenticado");

const UsuariosRouter = express.Router();

usuariosRouter.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("email no autorizado o incorrecto!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("la dirección email ya existe!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 }),
    body("nombre")
      .trim()
      .not()
      .isEmpty()
  ],
  cUsuarios.signup
);

usuariosRouter.post("/login", cUsuarios.login);

usuariosRouter.get("/status", isAuth, cUsuarios.getUserStatus);

usuariosRouter.patch(
  "/status",
  esAutenticado,
  [
    body("status")
      .trim()
      .not()
      .isEmpty()
  ],
  cUsuarios.updateUserStatus
);

module.exports = usuariosRuter;


/*
indexRouter.post("/login",
    passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }, function (req, res) {
      console.log("req.session.user" + req.session.user);
}));
*/

indexRouter.post('/login', function(req, res, next) {
  passport.authenticate("login", function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
          req.flash("error", info.message);
          return res.redirect(303, '/login');
      }
      req.logIn(user, function(err) {
         if (err) { return next(err); }
          //req.session.currentUser = req.user.email;
          return res.redirect(303, '/' );
      });
  })(req, res, next);
});




indexRouter.get("/logout", function(req, res) {
  req.logout();
  req.session.currentUser = null;
  res.redirect("/");
});

