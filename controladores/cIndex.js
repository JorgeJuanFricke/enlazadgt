const mongoose = require('mongoose');
const Tipo = require('../modelos/mTipo.js');
const Categoria = require('../modelos/mCategoria.js');

const d3 = require("d3");

const {
    validationResult
} = require('express-validator/check');
const R = require('ramda');


exports.renderPagina = async (req, res, next) => {

    try {
        categorias = await Categoria.find({}, {
            _id: 1,
            codigo: 1,
            padre: 1,

        }).sort('padre');

        let treeCategorias = d3.stratify()
            .id(function (d) {
                return d.codigo
            })
            .parentId(function (d) {
                return d.padre
            })(categorias);

        tipos = await Tipo.find({}, {
                _id: 1,
                codigo: 1,
                padre: 1,
                url: 1
            })
            .sort('padre');

        let treeTipos = d3.stratify()
            .id(function (d) {
                return d.codigo
            })
            .parentId(function (d) {
                return d.padre
            })(tipos);

        return res.render('main', {
            tipo:"hjhjh",
            categoria:"kfkfkfk",
            treeTipos,
            treeCategorias,
            layout: null
        });


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}




exports.getListaRecursos = async (req, res, next) => {

    try {
        let tipo = req.query.tipo;
        let categoria = req.query.categoria;
        // let codigoCategoria = await Categoria.findById(req.query.categoria).exec();
        let recursos = await Recurso.aggregate([{
                $match: {
                    categoria: req.query.categoria,
                    tipo: req.query.tipo
                }
            },
            {
                $lookup: {
                    from: 'tipos',
                    localField: 'tipo',
                    foreignField: 'codigo',
                    as: 'tipo'
                }
            },
            {
                $unwind: '$tipo'
            }
        ]).exec();
        //let recursos = await Recurso.find({tipo: tipo, categoria: categoria}).populate("tipo");

        return res.json(recursos);

    } catch (err) {
        return res.json("ERROR", "error accediendo a recursos");
    }
};




exports.getRecursoyEnlaces = async (req, res, next) => {
    try {
        let recurso = await Recurso.aggregate([{
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: 'tipos',
                    localField: 'tipo',
                    foreignField: 'codigo',
                    as: 'tipo'
                }
            },
            {
                $unwind: '$tipo'
            }
        ]).exec();
        return res.json(recurso[0]);
    } catch (err) {
        return next(err);
    }

};





let getRecursoId = async function (req) {
    let Recurso = req.Recurso;
    return await Recurso.findById(req.params.id).exec();

};