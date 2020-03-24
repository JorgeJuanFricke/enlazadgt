const express = require('express');
const recursosRouter = express.Router();
const mongoose = require('mongoose');


const TextoSchema = require('../modelos/mTexto');
const NormaSchema = require('../modelos/mNorma');
const PersonaSchema = require('../modelos/mPersona');
const TasaSancionSchema = require('../modelos/mTasaSancion');

const RecursoSchema = require('../modelos/mRecurso');
const Recurso = mongoose.model('Recurso', RecursoSchema);

const cRecursos = require('../controladores/cRecursos');
const esAutenticado = require('../middleware/esAutenticado');

const Texto = mongoose.model('Texto', RecursoSchema.add({
    url: String,
    procedencia: String,
    fechaDcmto: Date,
    pagina: Number
}));

const Norma = mongoose.model('Norma', RecursoSchema.add(NormaSchema));
const Tasa = mongoose.model('Tasa', RecursoSchema.add(tasaSancionPersonaSchema));
const Persona = mongoose.model('Persona', RecursoSchema.add(PersonaSchema));






const {
    body,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');



VALIDATEXTO = [
    body('nombre').not().isEmpty().withMessage("debe introducir un nombre"),
    body('url').not().isEmpty().withMessage("debe introducir la url del documento"),
    body('descripcion').not().isEmpty().withMessage("debe introducir una descripción"),

    sanitizeBody('nombre').escape(),
    sanitizeBody('url').escape(),
];


VALIDANORMA = [
    body('nombre').not().isEmpty().withMessage("debe introducir un nombre"),
    body('descripcion').not().isEmpty().withMessage("debe introducir una descripción"),
    body('codBOE').not().isEmpty().withMessage("debe introducir el código del BOE"),
    sanitizeBody('nombre').escape(),
    sanitizeBody('codBOE').escape(),

];

VALIDA = [
    body('nombre').not().isEmpty().withMessage("debe introducir un nombre"),

    sanitizeBody('nombre').escape(),
];


VALIDAIMPORTE = [
    body('nombre').not().isEmpty().withMessage("debe introducir un nombre"),
    body('euros').not().isEmpty().withMessage("debe introducir un importe"),
    sanitizeBody('nombre').escape(),
];



/*** RECURSO general **************************************/

recursosRouter.get('/recurso', esAutenticado, function (req, res, next) {
    req.Recurso = Recurso;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/recurso/:Id', esAutenticado, function (req, res, next) {
    req.Recurso = Recurso;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.post('/recurso', esAutenticado, esAutorizadoAñadir, VALIDA, function (req, res, next) {
    req.Recurso = Recurso;
    cRecursos.putRecurso(req, res, next);
});

recursosRouter.post('/recurso:Id', esAutenticado, esAutorizadoEditar, VALIDA, function (req, res, next) {
    req.Recurso = Recurso;
    cRecursos.updateRecurso(req, res, next);
});





/*** PERSONA *******************************************/


recursosRouter.get('/agente/persona', esAutenticado, function (req, res, next) {
    req.Recurso = Persona;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/agente/persona/:Id', esAutenticado, function (req, res, next) {
    req.Recurso = Persona;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.post('/agente/persona', esAutenticado, VALIDA, function (req, res, next) {
    req.Recurso = Persona;
    cRecursos.putRecurso(req, res, next);
});

recursosRouter.post('/agente/persona/:Id', esAutenticado, VALIDA, function (req, res, next) {
    req.Recurso = Persona;
    cRecursos.updateRecurso(req, res, next);
});


/*** TEXTO *************************************************/

recursosRouter.get('/texto', esAutenticado, function (req, res, next) {
    req.Recurso = Texto;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/texto/:Id', esAutenticado, function (req, res, next) {
    req.Recurso = Texto;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.post('/texto', esAutenticado, VALIDATEXTO, function (req, res, next) {
    req.Recurso = Texto;
    cRecursos.putRecurso(req, res, next);
});

recursosRouter.post('/texto/:Id', esAutenticado, VALIDATEXTO, function (req, res, next) {
    req.Recurso = Texto;
    cRecursos.updateRecurso(req, res, next);
});



recursosRouter.get('/legal/norma/:Id', esAutenticado, esAutorizadoEditar, function (req, res, next) {
    req.Recurso = Norma;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/legal/norma', esAutenticado, esAutorizadoAñadir, function (req, res, next) {
    req.Recurso = Norma;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.post('/legal/norma/:Id', esAutenticado, esAutorizadoEditar, VALIDANORMA, function (req, res, next) {
    req.Recurso = Norma;
    cRecursos.updateRecurso(req, res, next);
});


recursosRouter.post('/legal/norma', esAutenticado, esAutorizadoAñadir, VALIDANORMA, function (req, res, next) {
    req.Recurso = Norma;
    cRecursos.putRecurso(req, res, next);
});




/*** TASA SANCION ***********/

recursosRouter.get('/legal/tasaSancion/:Id', esAutenticado, esAutorizadoEditar, function (req, res, next) {
    req.Recurso = TasaSancion;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/legal/tasaSancion', esAutenticado, esAutorizadoAñadir, function (req, res, next) {
    req.Recurso = TasaSancion;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.post('/legal/tasaSancion/:Id', esAutenticado, esAutorizadoEditar, VALIDA, function (req, res, next) {
    req.Recurso = TasaSancion;
    cRecursos.updateRecurso(req, res, next);
});


recursosRouter.post('/legal/tasaSancion', esAutenticado, esAutorizadoAñadir, VALIDA, function (req, res, next) {
    req.Recurso = TasaSancion;
    cRecursos.putRecurso(req, res, next);
});










/*** ENLACES *************************************************/

recursosRouter.post('/enlaces', esAutenticado, hEnlaces.nuevoEnlace);



module.exports = recursosRouter;