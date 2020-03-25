
const express = require('express');
const mongoose = require('mongoose');
const Config = require('../configuracion.js');
const MetadataSchema = require('../modelos/mMetadata.js');
const hbs = require('hbs');
const adminRouter = express.Router();
const hAdmin = require('../admin/hAdmin');

adminRouter.get('/usuario/:id', function(req, res, next) {
    hAdmin.getUsuario(req, res, next);
});


adminRouter.patch('/usuario/:id', function(req, res, next) {
    hAdmin.updateUsuario(req, res, next);
});



module.exports = adminRouter;




