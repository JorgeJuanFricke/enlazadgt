
const express = require('express');
const mongoose = require('mongoose');
const Config = require('../configuracion.js');
const MetadataSchema = require('../models/mMetadata.js');
const hbs = require('hbs');
const adminRouter = express.Router();
const Tipo = require('../models/mTipo.js');
const hAdmin = require('../admin/hAdmin');
const hAuto = require('../handlers/hAutorizacion');


adminRouter.get('/usuario/:id',  hAuto.autenticado, hAuto.esAdminPolicy, function(req, res, next) {
    hAdmin.getUsuario(req, res, next);
});


adminRouter.post('/usuario/:id',  hAuto.autenticado, hAuto.esAdminPolicy, function(req, res, next) {
    hAdmin.updateUsuario(req, res, next);
});


adminRouter.get('/tipo/:id', hAuto.autenticado, hAuto.esAdminPolicy, function(req, res, next) {
    hAdmin.getTipo(req, res, next);
});


adminRouter.post('/tipo/:id', hAuto.autenticado, hAuto.esAdminPolicy, function(req, res, next) {
    hAdmin.updateTipo(req, res, next);
});


adminRouter.get('/permitidas/:tipo', hAuto.autenticado, hAuto.esAdminPolicy, function(req, res, next) {
    hAdmin.getPermitidas(req, res, next);
});



module.exports = adminRouter;




