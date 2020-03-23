const express = require('express');
const recursosRouter = express.Router();
const mongoose = require('mongoose');
const hAuto = require('../controladores/hAutorizacion.js');
const hEnlaces = require('../controladores/hEnlaces.js');
const hRecurso = require('../controladores/hRecursos.js');
const RecursoSchema = require('../modelos/mMetadata.js');
const TextoSchema = require('../modelos/mTexto.js');
const NormaSchema = require('../modelos/mNorma.js');
const PersonaSchema = require('../modelos/mPersona.js');
const TasaSancionSchema = require('../modelos/mTasaSancion.js');
const Recurso = mongoose.model('Recurso', RecursoSchema);
const Texto = mongoose.model('Texto', RecursoSchema.add({
            url: String,
            procedencia: String,
            fechaDcmto: Date
            pagina: Number
        });
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
            hRecurso.getRecurso(req, res, next);
        });


        recursosRouter.get('/recurso/:Id', hAuto.autenticado, function (req, res, next) {
            req.Recurso = Recurso;
            hRecurso.getRecurso(req, res, next);
        });


        recursosRouter.post('/recurso', hAuto.autenticado, VALIDA, function (req, res, next) {
            req.Recurso = Recurso;
            hRecurso.creaRecurso(req, res, next);
        });

        recursosRouter.post('/recurso:Id', hAuto.autenticado, VALIDA, function (req, res, next) {
            req.Recurso = Recurso;
            hRecurso.updateRecurso(req, res, next);
        });





        /*** PERSONA *******************************************/


        recursosRouter.get('/agente/persona', hAuto.autenticado, function (req, res, next) {
            req.Recurso = Persona;
            hRecurso.getRecurso(req, res, next);
        });


        recursosRouter.get('/agente/persona/:Id', hAuto.autenticado, function (req, res, next) {
            req.Recurso = Persona;
            hRecurso.getRecurso(req, res, next);
        });


        recursosRouter.post('/agente/persona', hAuto.autenticado, VALIDA, function (req, res, next) {
            req.Recurso = Persona;
            hRecurso.creaRecurso(req, res, next);
        });

        recursosRouter.post('/agente/persona/:Id', hAuto.autenticado, VALIDA, function (req, res, next) {
            req.Recurso = Persona;
            hRecurso.updateRecurso(req, res, next);
        });


        /*** TEXTO *************************************************/

        recursosRouter.get('/texto', hAuto.autenticado, function (req, res, next) {
            req.Recurso = Texto;
            hRecurso.getRecurso(req, res, next);
        });


        recursosRouter.get('/texto/:Id', hAuto.autenticado, function (req, res, next) {
            req.Recurso = Texto;
            hRecurso.getRecurso(req, res, next);
        });


        recursosRouter.post('/texto', hAuto.autenticado, VALIDATEXTO, function (req, res, next) {
            req.Recurso = Texto;
            hRecurso.creaRecurso(req, res, next);
        });

        recursosRouter.post('/texto/:Id', hAuto.autenticado, VALIDATEXTO, function (req, res, next) {
            req.Recurso = Texto;
            hRecurso.updateRecurso(req, res, next);
        });



        recursosRouter.get('/legal/norma/:Id', hAuto.autenticado, hAuto.esPropietarioPolicy, function (req, res, next) {
            req.Recurso = Norma;
            hRecurso.getNorma(req, res, next);
        });


        recursosRouter.get('/legal/norma', hAuto.autenticado, hAuto.esOIPolicy, function (req, res, next) {
            req.Recurso = Norma;
            hRecurso.getNorma(req, res, next);
        });


        recursosRouter.post('/legal/norma/:Id', hAuto.autenticado, hAuto.esPropietarioPolicy, VALIDANORMA, function (req, res, next) {
            req.Recurso = Norma;
            hRecurso.updateRecurso(req, res, next);
        });


        recursosRouter.post('/legal/norma', hAuto.autenticado, VALIDANORMA, function (req, res, next) {
            req.Recurso = Norma;
            hRecurso.creaRecurso(req, res, next);
        });




        /*** IMPORTE ***********/

        recursosRouter.get('/legal/tasaSancion/:Id', hAuto.autenticado, hAuto.esPropietarioPolicy, function (req, res, next) {
            req.Recurso = TasaSancion;
            hRecurso.getRecurso(req, res, next);
        });


        recursosRouter.get('/legal/tasaSancion', hAuto.autenticado, hAuto.esOIPolicy, function (req, res, next) {
            req.Recurso = TasaSancion;
            hRecurso.getRecurso(req, res, next);
        });


        recursosRouter.post('/legal/tasaSancion/:Id', hAuto.autenticado, hAuto.esPropietarioPolicy, VALIDA, function (req, res, next) {
            req.Recurso = TasaSancion;
            hRecurso.updateRecurso(req, res, next);
        });


        recursosRouter.post('/legal/tasaSancion', hAuto.autenticado, VALIDA, function (req, res, next) {
            req.Recurso = TasaSancion;
            hRecurso.creaRecurso(req, res, next);
        });










        /*** ENLACES *************************************************/

        recursosRouter.post('/enlaces', hAuto.autenticado, hEnlaces.nuevoEnlace);



        module.exports = recursosRouter;