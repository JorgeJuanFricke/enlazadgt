const mongoose = require('mongoose');
const Tipo = require('../models/mTipo.js');
const Categoria = require('../models/mCategoria.js');
let config = require('../configuracion.js');
const d3 = require("d3");
const fetch = require('node-fetch');
const rp = require('request-promise');
const $ = require('cheerio');
const xml2js = require('xml2js');
const parseString = require('xml2js').parseString;
const {
    validationResult
} = require('express-validator/check');
const R = require('ramda');




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


