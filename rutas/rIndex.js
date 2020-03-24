const express = require('express');
const Categoria = require('../modelos/mCategoria.js');
const Tipo = require('../modelos/mTipo.js');
const passport = require('passport');
const d3 = require('d3');


const indexRouter = express.Router();



indexRouter.get('/tipos', function (req, res, next) {
    cIndex.getTipos(req, res, next);
});


indexRouter.get('/categorias', function (req, res, next) {
    cIndex.getCategorias(req, res, next);
});



indexRouter.get('/recursos', function (req, res, next) {
    cIndex.getListaRecursos(req, res, next);
});


indexRouter.get('/recurso/:id', function (req, res, next) {
    cIndex.getRecursoyEnlaces(req, res, next);
});








indexRouter.post('/enlaza/:sujeto', hAuto.autenticado, function (req, res, next) {
    hApi.postEnlazaApi(req, res, next);
});




indexRouter.get('/', function (req, res, next) {

    let tipo = req.query.tipo || 'trámite';
    let categoria = req.query.categoria || 'conductores';

    Categoria
        .find({}, {
            _id: 1,
            codigo: 1,
            padre: 1,
            ancestros: 1
        })
        .sort('padre')
        .exec()
        .then((categorias) => {
            let treeCategorias = d3.stratify()
                .id(function (d) {
                    return d.codigo
                })
                .parentId(function (d) {
                    return d.padre
                })(categorias);
            Tipo
                .find({}, {
                    _id: 1,
                    codigo: 1,
                    padre: 1,
                    url: 1
                })
                .sort('padre')
                .exec()
                .then((tipos) => {
                    let treeTipos = d3.stratify()
                        .id(function (d) {
                            return d.codigo
                        })
                        .parentId(function (d) {
                            return d.padre
                        })(tipos);

                    res.render('main', {
                        tipo,
                        categoria,
                        treeTipos,
                        treeCategorias,
                        layout: null
                    });

                })
        })
        .catch((error) => {
            return next(error)
        });

});





indexRouter.get('/about', function (req, res) {

    return res.render('vAbout', {
        hola: 'hola'
    });
});

module.exports = indexRouter;