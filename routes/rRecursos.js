
const express = require('express');
const recursosRouter = express.Router();
const mongoose = require('mongoose');
const hAuto = require('../handlers/hAutorizacion.js');
const hEnlaces = require('../handlers/hEnlaces.js');
const hRecurso = require('../handlers/hRecursos.js');
const MetadataSchema = require('../models/mMetadata.js');
const TextoSchema = require('../models/mTexto.js');
const NormaSchema =  require('../models/mNorma.js');
const PersonaSchema = require('../models/mPersona.js');
const TasaSancionSchema = require('../models/mTasaSancion.js');

const {body, validationResult} = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');



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



/*** RECURSO METADATA**************************************/

recursosRouter.get('/recurso', hAuto.autenticado, function(req, res, next) {
    req.Recurso = mongoose.model('Recurso', MetadataSchema);
    hRecurso.getRecurso(req, res, next);
});


recursosRouter.get('/recurso/:Id', hAuto.autenticado,  function(req, res, next) {
    req.Recurso = mongoose.model('Recurso', MetadataSchema);
    hRecurso.getRecurso(req, res, next);
});


recursosRouter.post('/recurso', hAuto.autenticado, VALIDA,  function(req, res, next) {
    req.Recurso = mongoose.model('Recurso', MetadataSchema);
    hRecurso.creaRecurso(req, res, next);
});

recursosRouter.post('/recurso:Id', hAuto.autenticado, VALIDA,  function(req, res, next) {
    req.Recurso = mongoose.model('Recurso', MetadataSchema);
    hRecurso.updateRecurso(req, res, next);
});





/*** PERSONA *******************************************/


recursosRouter.get('/agente/persona', hAuto.autenticado, function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(PersonaSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.getRecurso(req, res, next);
});


recursosRouter.get('/agente/persona/:Id', hAuto.autenticado,  function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(PersonaSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.getRecurso(req, res, next);
});


recursosRouter.post('/agente/persona', hAuto.autenticado, VALIDA,  function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(PersonaSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.creaRecurso(req, res, next);
});

recursosRouter.post('/agente/persona/:Id', hAuto.autenticado, VALIDA,  function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(PersonaSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.updateRecurso(req, res, next);
});


/*** TEXTO *************************************************/

recursosRouter.get('/texto', hAuto.autenticado, function(req, res, next) {
    let RecursoSchema = MetadataSchema.add({url: String, procedencia: String, fecha: Date, pagina:Number });
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.getRecurso(req, res, next);
});


recursosRouter.get('/texto/:Id', hAuto.autenticado,  function(req, res, next) {
    let RecursoSchema = MetadataSchema.add({url: String, procedencia: String, fecha: Date, pagina:Number });
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.getRecurso(req, res, next);
});


recursosRouter.post('/texto', hAuto.autenticado, VALIDATEXTO,  function(req, res, next) {
   let RecursoSchema = MetadataSchema.add({ url: String, procedencia: String, fecha: Date,  pagina:Number });
   req.Recurso = mongoose.model('Recurso', RecursoSchema);
   hRecurso.creaRecurso(req, res, next);
});

recursosRouter.post('/texto/:Id', hAuto.autenticado, VALIDATEXTO,  function(req, res, next) {
    let RecursoSchema = MetadataSchema.add({ url: String, procedencia: String, fecha: Date, pagina:Number });
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.updateRecurso(req, res, next);
});



recursosRouter.get('/legal/norma/:Id',  hAuto.autenticado, hAuto.esPropietarioPolicy, function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(NormaSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.getNorma(req, res, next);
});


recursosRouter.get('/legal/norma', hAuto.autenticado, hAuto.esOIPolicy, function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(NormaSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.getNorma(req, res, next);
});


recursosRouter.post('/legal/norma/:Id', hAuto.autenticado, hAuto.esPropietarioPolicy, VALIDANORMA,  function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(NormaSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.updateRecurso(req, res, next);
});


recursosRouter.post('/legal/norma', hAuto.autenticado, VALIDANORMA,  function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(NormaSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.creaRecurso(req, res, next);
});




/*** IMPORTE ***********/

recursosRouter.get('/legal/tasaSancion/:Id',  hAuto.autenticado, hAuto.esPropietarioPolicy, function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(TasaSancionSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.getRecurso(req, res, next);
});


recursosRouter.get('/legal/tasaSancion', hAuto.autenticado, hAuto.esOIPolicy, function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(TasaSancionSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.getRecurso(req, res, next);
});


recursosRouter.post('/legal/tasaSancion/:Id', hAuto.autenticado, hAuto.esPropietarioPolicy, VALIDA,  function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(TasaSancionSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.updateRecurso(req, res, next);
});


recursosRouter.post('/legal/tasaSancion', hAuto.autenticado, VALIDA,  function(req, res, next) {
    let RecursoSchema = MetadataSchema.add(TasaSancionSchema);
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.creaRecurso(req, res, next);
});




/*** PROCEDIMIENTO *********************************/

recursosRouter.get('/procedimiento', hAuto.autenticado, hAuto.esOIPolicy, function(req, res, next) {
    let RecursoSchema = MetadataSchema.add({tareas:[{tareaId: mongoose.Schema.Types.ObjectId }]});
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.getRecurso(req, res, next);
});


recursosRouter.get('/procedimiento/:Id', hAuto.autenticado, hAuto.esPropietarioPolicy, function(req, res, next) {
    let RecursoSchema = MetadataSchema.add({tareas:[{tareaId: mongoose.Schema.Types.ObjectId }]});
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.getRecurso(req, res, next);
});


recursosRouter.post('/procedimiento', hAuto.autenticado, hAuto.esOIPolicy, VALIDA, function(req, res, next) {
    let RecursoSchema = MetadataSchema.add({tareas:[{tareaId: mongoose.Schema.Types.ObjectId }]});
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.creaRecurso(req, res, next);
});


recursosRouter.post('/procedimiento/:Id', hAuto.autenticado, hAuto.esPropietarioPolicy, VALIDA, function(req, res, next) {
    let RecursoSchema = MetadataSchema.add({tareas: [{tareaId: mongoose.Schema.Types.ObjectId }]});
    req.Recurso = mongoose.model('Recurso', RecursoSchema);
    hRecurso.updateRecurso(req, res, next);
});



/*** ENLACES *************************************************/

recursosRouter.post('/enlaces', hAuto.autenticado, hEnlaces.nuevoEnlace);



module.exports = recursosRouter;