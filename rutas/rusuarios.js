onst express = require("express");
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
  authController.signup
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
