const express = require("express");
const {
    body
} = require("express-validator/check");

const Auto = require("../middleware/Autorizacion");
const cEnlaces = require('../controladores/cEnlaces');

const enlacesRouter = express.Router();

enlacesRouter.put("/:sujeto/:objeto", Auto.esAutorizadoAñadir, cEnlaces.putEnlace);
enlacesRouter.delete("/:sujeto/:objeto", Auto.esAutorizadoEditar, cEnlaces.deleteEnlace);


module.exports = enlacesRouter;