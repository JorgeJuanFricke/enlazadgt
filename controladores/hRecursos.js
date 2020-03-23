
const mongoose = require('mongoose');
const MetadataSchema = require('../models/mMetadata.js');
const Tipo = require('../models/mTipo.js');
const Categoria = require('../models/mCategoria.js');
let config = require('../configuracion.js');
const d3 = require("d3");
const fetch = require('node-fetch');
const rp = require('request-promise');
const $ = require('cheerio');
const  xml2js = require('xml2js');
const parseString = require('xml2js').parseString;
const {validationResult} = require('express-validator/check');
const R = require('ramda');





let getRecursoId = async function(req) {
    let Recurso = req.Recurso;
    return await Recurso.findById(req.params.id).exec();

};



let nuevoRecurso = function (req) {
    // let [tipo, categoria] = getTipoyCategoria(req,res,next); no es necesario
    return new req.Recurso({
            oficina: config.oficina,
            autor: req.user.email,
            tipo: req.query.tipo,
            categoria: req.query.categoria,
            csrf: "ell csrf toquen va aqui",
        });


};





let validaRecurso = function(req, res) {
    let recurso = new req.Recurso;
    let errores = validationResult(req).array();
    if (errores.length > 0) {
        // render con input usuario y mensajes
        req.session.flash = errores.map(function (error) {
            return error.msg
        });
        res.locals.flash = req.session.flash;
        return res.render('vRecurso', {layout: 'main-form', recurso: req.body});

    } else {
        Object.assign(recurso, req.body);
        return recurso;
    }

};




let getLeyes = async function () {
   // obtener todas las leyes de las normas existentes
    // hacer con aggregate
   // return await Recurso.find({tipo: 'norma'}, {codley:1, tituloLey:1});

};





exports.getNorma = async function (req, res, next) {
    try {
        let contexto = nuevoRecurso(req);
        if (req.params.id) {
            contexto = getRecursoId(req.params.id);
        }
        contexto.tipo = req.query.tipo;
        contexto.leyes = getLeyes();
        contexto.urlTipo = req.originalUrl.split("?").shift();
        contexto.categoria = req.query.categoria;
        res.render('vRecurso', {layout: 'main-form', recurso: contexto});
    }
    catch (err) {return next(err)}
};




exports.getRecurso = async function (req, res, next) {
     try {
        let contexto = nuevoRecurso(req);
        if (req.params.id) {
            contexto = getRecursoId(req.params.id);
         }
        contexto.tipo = req.query.tipo;
        contexto.urlTipo = req.originalUrl.split("?").shift();
        contexto.categoria = req.query.categoria;
        return res.render('vRecurso', {layout: 'main-form', recurso: contexto});
    }
    catch (err) {return next(err)}
};






exports.creaNorma = function (req, res, next) {
    try {
        let recurso = validaRecurso(req, res);
        recurso = validaLeyBOE(req.body.codBOE);
        recurso.actualizadoPor = req.user.email;
        recurso.save();
        let url = '/?tipo=' + recurso.tipo + '&categoria=' + recurso.categoria;
        return res.redirect(303, url);
    }
    catch(err) {return next(err)}
};




exports.creaRecurso = function (req, res, next) {
    try {
        let recurso = validaRecurso(req, res);
        recurso.actualizadoPor = req.user.email;
        recurso.save();
        let url = '/?tipo=' + recurso.tipo + '&categoria=' + recurso.categoria;
        return res.redirect(303, url);
    }
    catch(err) {return next(err)}
};




exports.updateNorma =  function (req, res, next) {

    try {
        let recurso = validaRecurso(req, res);
        recurso = validaLeyBOE(req.body.codBOE);
        recurso.actualizadoPor = req.user.email;
        Recurso.findByIdAndUpdate(req.params.Id, recurso, {new: true});
        return res.redirect(303, 'vRecurso');

    }
    catch(err) {return next(err);}

};



exports.updateRecurso =  function (req, res, next) {

    try {
        let recurso = validaRecurso(req, res);
        recurso.actualizadoPor = req.user.email;
        Recurso.findByIdAndUpdate(req.params.Id, recurso, {new: true});
        return res.redirect(303, 'vRecurso');

    }
    catch(err) {return next(err);}

};




let validaLeyBOE = function(codBOE) {
    if (codBOE) {

        let url = 'http://www.boe.es/diario_boe/xml.php?id=' + codBOE.trim();
        const options = {
            proxy: `http://${usuario}:${password}@proxynet.trafico.es:8080`,
            method: 'GET',

            uri: url,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        rp(options)
            .then(function (data) {
                let ley = {};
                parseString(data, function (err, result) {
                    ley._doc.fechaActualizacion = result.documento.$;
                    ley._doc.titulo = result.documento.metadatos["0"].titulo["0"];
                    ley._doc.departamento = result.documento.metadatos["0"].departamento["0"];
                    ley._doc.rango = result.documento.metadatos["0"].rango["0"];
                    ley._doc.numeroOficial = result.documento.metadatos["0"].numero_oficial["0"];
                    ley._doc.fechaDisposicion = result.documento.metadatos["0"].fecha_disposicion["0"];
                    ley._doc.fechaPublicacion = result.documento.metadatos["0"].fecha_publicacion["0"];
                    ley._doc.fechaVigencia = result.documento.metadatos["0"].fecha_vigencia["0"];
                    ley._doc.origenLegislativo = result.documento.metadatos["0"].origen_legislativo["0"];
                    ley._doc.judicialmenteAnulada = result.documento.metadatos["0"].judicialmente_anulada["0"];
                    ley._doc.vigenciaAgotada = result.documento.metadatos["0"].vigencia_agotada["0"];
                    ley._doc.estatusDerogacion = result.documento.metadatos["0"].estatus_derogacion["0"];

                    return ley;
                });
            });

    }
};


