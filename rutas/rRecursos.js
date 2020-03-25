const express = require('express');
const recursosRouter = express.Router();
const mongoose = require('mongoose');


const Texto = require('../modelos/mTexto');
const Norma = require('../modelos/mNorma');
const Persona = require('../modelos/mPersona');
const TasaSancion = require('../modelos/mTasaSancion');

const RecursoSchema = require('../modelos/mRecurso');
const Recurso = mongoose.model('Recurso', RecursoSchema);

const cRecursos = require('../controladores/cRecursos');
const Auto = require('../middleware/Autorizacion');
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


recursosRouter.get('/recurso/:Id', Auto.esAutenticado, function (req, res, next) {
    req.Recurso = Recurso;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.post('/recurso', Auto.esAutenticado, Auto.esAutorizadoAñadir, VALIDA, function (req, res, next) {
    req.Recurso = Recurso;
    cRecursos.putRecurso(req, res, next);
});

recursosRouter.post('/recurso:Id', Auto.esAutenticado, Auto.esAutorizadoEditar, VALIDA, function (req, res, next) {
    req.Recurso = Recurso;
    cRecursos.updateRecurso(req, res, next);
});





/*** PERSONA *******************************************/


recursosRouter.get('/agente/persona', Auto.esAutenticado, function (req, res, next) {
    req.Recurso = Persona;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/agente/persona/:Id', Auto.esAutenticado, function (req, res, next) {
    req.Recurso = Persona;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.post('/agente/persona', Auto.esAutenticado, VALIDA, function (req, res, next) {
    req.Recurso = Persona;
    cRecursos.putRecurso(req, res, next);
});

recursosRouter.post('/agente/persona/:Id', Auto.esAutenticado, VALIDA, function (req, res, next) {
    req.Recurso = Persona;
    cRecursos.updateRecurso(req, res, next);
});


/*** TEXTO *************************************************/

recursosRouter.get('/texto', Auto.esAutenticado, function (req, res, next) {
    req.Recurso = Texto;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/texto/:Id', Auto.esAutenticado, function (req, res, next) {
    req.Recurso = Texto;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.post('/texto', Auto.esAutenticado, VALIDATEXTO, function (req, res, next) {
    req.Recurso = Texto;
    cRecursos.putRecurso(req, res, next);
});

recursosRouter.post('/texto/:Id', Auto.esAutenticado, VALIDATEXTO, function (req, res, next) {
    req.Recurso = Texto;
    cRecursos.updateRecurso(req, res, next);
});



recursosRouter.get('/legal/norma/:Id', Auto.esAutenticado, Auto.esAutorizadoEditar, function (req, res, next) {
    req.Recurso = Norma;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/legal/norma', Auto.esAutenticado, Auto.esAutorizadoAñadir, function (req, res, next) {
    req.Recurso = Norma;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.post('/legal/norma/:Id', Auto.esAutenticado, Auto.esAutorizadoEditar, VALIDANORMA, function (req, res, next) {
    req.Recurso = Norma;
    cRecursos.updateRecurso(req, res, next);
});


recursosRouter.post('/legal/norma', Auto.esAutenticado, Auto.esAutorizadoAñadir, VALIDANORMA, function (req, res, next) {
    req.Recurso = Norma;
    cRecursos.putRecurso(req, res, next);
});




/*** TASA SANCION ***********/

recursosRouter.get('/legal/tasaSancion/:Id', Auto.esAutenticado, Auto.esAutorizadoEditar, function (req, res, next) {
    req.Recurso = TasaSancion;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/legal/tasaSancion', Auto.esAutenticado, Auto.esAutorizadoAñadir, function (req, res, next) {
    req.Recurso = TasaSancion;
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.post('/legal/tasaSancion/:Id', Auto.esAutenticado, Auto.esAutorizadoEditar, VALIDA, function (req, res, next) {
    req.Recurso = TasaSancion;
    cRecursos.updateRecurso(req, res, next);
});


recursosRouter.post('/legal/tasaSancion', Auto.esAutenticado, Auto.esAutorizadoAñadir, VALIDA, function (req, res, next) {
    req.Recurso = TasaSancion;
    cRecursos.putRecurso(req, res, next);
});










/*** ENLACES *************************************************/

recursosRouter.post('/enlaces', esAutenticado, hEnlaces.nuevoEnlace);



module.exports = recursosRouter;