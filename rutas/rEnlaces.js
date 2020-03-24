const express = require("express");
const {
    body
} = require("express-validator/check");

const Usuario = require("../modelos/mUsuario");
const cUsuarios = require("../controladores/cUsuarios");
const esAutenticado = require("../middleware/esAutenticado");

const enlacesRouter = express.Router();

enlacesRouter.put("/enlaces/:sujeto/:objeto", cEnlaces.putEnlace);
enlacesRouter.delete("/enlaces/:sujeto/:objeto", cEnlaces.deleteEnlace);





exports.enlacesRouter;