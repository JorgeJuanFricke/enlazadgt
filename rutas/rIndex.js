const express = require('express');
const Index = require('../controladores/cIndex');


const indexRouter = express.Router();



indexRouter.get('/recursos', (req, res, next) => Index.getListaRecursos(req, res, next));


indexRouter.get('/recurso/:id', (req, res, next) => Index.getRecursoyEnlaces(req, res, next));


indexRouter.get('/', (req, res, next) => Index.renderPagina(req, res, next));


indexRouter.get('/about', (req, res) => function (req, res) {

    return res.render('vAbout', {
        hola: 'hola'
    });
});

module.exports = indexRouter;