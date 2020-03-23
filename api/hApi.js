
const mongoose = require('mongoose');
const Config = require('../configuracion.js');
const MetadataSchema = require('../models/mMetadata.js');
const Tipo = require('../models/mTipo.js');
const Relacion = require('../models/mRelaciones.js');
const Categoria = require('../models/mCategoria.js');
const Recurso = mongoose.model('Recurso', MetadataSchema);
const d3 = require('d3');




exports.getListaRecursos = async  (req,res,next) => {

    try {
        let tipo = req.query.tipo;
        let categoria = req.query.categoria;
        // let codigoCategoria = await Categoria.findById(req.query.categoria).exec();
        let recursos = await Recurso.aggregate([
            { $match: {categoria: req.query.categoria, tipo: req.query.tipo}},
            { $lookup: {from: 'tipos', localField: 'tipo', foreignField: 'codigo', as: 'tipo'}},
            { $unwind: '$tipo'}]
        ).exec( );
        //let recursos = await Recurso.find({tipo: tipo, categoria: categoria}).populate("tipo");

        return res.json(recursos);

    }
    catch(err) {
        return res.json("ERROR", "error accediendo a recursos");
    }
};




exports.getRecursoyEnlaces = async (req, res, next) => {
    try {
        let recurso = await Recurso.aggregate([
            {$match: {_id:  mongoose.Types.ObjectId(req.params.id) }},
            {$lookup: {from: 'tipos', localField: 'tipo', foreignField: 'codigo', as: 'tipo'}},
             { $unwind: '$tipo'}]
        ).exec();
        return res.json(recurso[0]);
    }
    catch(err){return next(err);}

};


exports.getTipos = async (req, res, next) => {
    try {

        let tipos = await Tipo.find({});
        return res.json(tipos);

    }
    catch {
        return next("error leyendo tipos");
    }
};




exports.getCategorias = async  (req,res,next) => {

    try {
        let categorias = await Categoria.find({});
        return res.json(categorias);

    }
    catch(err) {
        return next(err);
    }
};


exports.getRecursosRelacion = async  (req,res,next) => {
    try {
        let relacion = req.query.relacion;
        let categoria = req.query.categoria;
        let tipo  = await Relacion.findById(relacion, 'objetoId');
        let Recurso = mongoose.model('Recurso', MetadataSchema);
        let recursos = await Recurso.find({tipo: tipo.objetoId, categoria:categoria});
        console.log('recursos:' +  recursos);
        return res.json(recursos);
    }
    catch(err) {
        return next(err);
    }

};






exports.getEnlaza = async function(req, res, next) {

    try {
        let recurso = await Recurso.findById(req.params.sujeto).populate("tipo").exec();
        let categorias = await Categoria.find({}, {_id:1, codigo:1, padre:1, ancestros:1})
            .sort('padre').exec();
        let treeCategorias = d3.stratify()
            .id(function (d) {
                return d.codigo
            })
            .parentId(function (d) {
                return d.padre
            })(categorias);

        let relaciones = await Relacion.find({sujetoId: recurso.tipo}).exec()
        if (!relaciones || relaciones.length === 0) {
            return next('El tipo de recurso no tiene relaciones permitidas');
        }

        console.log("recurso"+recurso);
        console.log("relaciones"+relaciones);
        return res.render('vEnlaza', {layout: 'main-form', recurso, relaciones, treeCategorias});
    }

    catch {
        return next("Error preparando formulario Enlaza");
    }

};



exports.noImplementado = async (req, res) => {
    res.status(500).json({ message: 'característica no implementada' })
};


exports.postEnlaza =  async function(req, res, next) {
    /*
    TODO: validar relacion permitida ( no absolutamente necesario)
    */
    try {
        let relacion = await Relacion.findById(req.body.relacion).exec();
        let sujeto = req.params.sujeto;
        let recursos = req.body.recursos;
        recursos = typeof recursos == 'string' ? [recursos] : recursos;
        let enlaces = recursos.map(function(recurso, i) {
            return {sujetoId: sujeto,
                relacionId: relacion._id,
                relacionNombre: relacion.nombre,
                objetoId: recurso,
                autor:req.user.email}
        });
        console.log(enlaces);
        let resultado = await Enlace.insertMany(enlaces);
        return res.redirect(`/api/recurso/${sujeto}`);
    }
    catch(err) {
        return next(err);
    }
};


/***
 *
 *  {"$match": {"categoria": mongoose.Types.ObjectId(categoria)}},
 {
                "$lookup": {
                    "from": "categorias",
                    "localField": "categoria",
                    "foreignField": "_id",
                    "as": "recursocategorias"
                }
            },
 {"$match": { "recursocategorias.categoria": mongoose.Types.ObjectId(req.params.categoria) }}
**/

