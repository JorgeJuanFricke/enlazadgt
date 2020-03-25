const express = require("express");
const {
  body
} = require("express-validator/check");

const Usuario = require("../modelos/mUsuario");
const cUsuarios = require("../controladores/cUsuarios");
const Auto = require("../middleware/Autorizacion");

const usuariosRouter = express.Router();

usuariosRouter.put(
  "/signup",
  [
    body("email")
    .isEmail()
    .withMessage("email no autorizado o incorrecto!")
    .custom((value, {
      req
    }) => {
      return User.findOne({
        email: value
      }).then(userDoc => {
        if (userDoc) {
          return Promise.reject("la dirección email ya existe!");
        }
      });
    })
    .normalizeEmail(),
    body("password")
    .trim()
    .isLength({
      min: 5
    }),
    body("nombre")
    .trim()
    .not()
    .isEmpty()
  ],
  cUsuarios.signup
);

usuariosRouter.post("/login", cUsuarios.login);


usuariosRouter.post(
  "/permisos",
  Auto.esAutenticado, Auto.esAutorizadoEditar,
  [
    body("status")
    .trim()
    .not()
    .isEmpty()
  ],
  cUsuarios.updateUsuario
);

module.exports = usuariosRouter;






usuariosRouter.get("/logout", function (req, res) {

});