
const mongoose = require('mongoose');
const MetadataSchema = require('../models/mMetadata.js');
const Recurso = mongoose.model('Recurso', MetadataSchema);



exports.nuevoEnlace = async function(req, res, next) {
    try {
        // ENLACES

        let objeto = await Recurso.aggregate([
            {$match: {_id:  mongoose.Types.ObjectId(req.body.sujeto) }},
            {$lookup: {from: 'tipos', localField: 'tipo', foreignField: 'codigo', as: 'tipo'}},
            {$unwind: '$tipo'}]
        ).exec();

        let enlace = await Recurso.updateOne({_id: req.body.sujeto}, {
            $addToSet:
                {
                    enlaces: {
                        objetoId: objeto._id,
                        objetoTipo: {
                            codigo: objeto.tipo.codigo,
                            sigla: objeto.tipo.sigla,
                            grupo: objeto.tipo.padre,
                        },
                        objetoAlias: objeto.etiqueta,
                        objetoNombre: objeto.nombre,
                    }
                }
        }).exec();
        // REFERENCIAS

        let sujeto = await Recurso.aggregate([
            {$match: {_id:  mongoose.Types.ObjectId(req.body.sujeto) }},
            {$lookup: {from: 'tipos', localField: 'tipo', foreignField: 'codigo', as: 'tipo'}},
            {$unwind: '$tipo'}]
        ).exec();

        let referencia = await Recurso.updateOne({_id: req.body.recurso}, {
            $addToSet:
                {
                    referencias: {
                        sujetoId: sujeto._id,
                        sujetoTipo: {
                            codigo: sujeto.tipo.codigo,
                            sigla: sujeto.tipo.sigla,
                            grupo: sujeto.tipo.padre,
                        },
                        sujetoNombre: sujeto.nombre,
                    }
                }
        }).exec();
        console.log(enlace, referencia);
        return res.redirect(303, "/");
    } catch (err) {
        return next(err)
    }
};






exports.borraEnlace = async function(req, res, next) {
    try {
        let objeto = await Recurso.findById(req.body.recurso).exec();
        let enlace = await Recurso.updateOne({_id: req.body.sujeto}, {
           $pull: {
                enlaces: {
                    objetoId: req.body._id,
                    objetoTipo: objeto.tipo,
                    objetoAlias: objeto.alias,
                    objetoNombre: objeto.nombre,

                }
            }
        });
        // BORRA REFERENCIAS
        let sujeto = await Recurso.findById(req.body.sujeto).exec();
        let referencia = await Recurso.updateOne({_id: req.body.recurso}, {
            $pull: {
                referencias: {
                    sujetoId: sujeto._id,
                    sujetoTipo: sujeto.tipo,
                    sujetoAlias: sujeto.etiqueta,
                    sujetoNombre: sujeto.nombre,
            }
        }
        }).exec();
        console.log(enlace, referencia);
        return res.redirect(303, "/");

    } catch (err) {
            return next(err)
        }
 };