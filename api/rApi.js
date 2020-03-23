
const express = require('express');
const mongoose = require('mongoose');
const Config = require('../configuracion.js');
const MetadataSchema = require('../models/mMetadata.js');
const hbs = require('hbs');
const apiRouter = express.Router();
const path = require('path');
let Recurso = mongoose.model('Recurso', MetadataSchema);
const Tipo = require('../models/mTipo.js');
const hApi = require('../api/hApi.js');
const hAuto = require('../handlers/hAutorizacion');


apiRouter.get('/enlaza/recursos',  function(req, res, next) {
    hApi.getListaRecursos(req, res, next);
});

apiRouter.get('/enlaza/:sujeto', hAuto.autenticado, function(req, res, next) {
    hApi.getEnlaza(req, res, next);
});

apiRouter.get('/tipos', function(req, res, next) {
    hApi.getTipos(req, res, next);
});


apiRouter.get('/categorias', function(req, res, next) {
    hApi.getCategorias(req, res, next);
});



apiRouter.get('/recursos', function(req, res, next) {
    hApi.getListaRecursos(req, res, next);
});


apiRouter.get('/recurso/:id', function(req, res, next) {
    hApi.getRecursoyEnlaces(req, res, next);
});






























apiRouter.post('/enlaza/:sujeto', hAuto.autenticado, function(req, res, next) {
    hApi.postEnlazaApi(req, res, next);
});







module.exports = apiRouter;


