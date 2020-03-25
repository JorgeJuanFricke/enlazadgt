const mongoose = require('mongoose');
const Tipo = require('../modelos/mTipo.js');
const Categoria = require('../modelos/mCategoria.js');
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






let getRecursoId = async function (req) {
    let Recurso = req.Recurso;
    return await Recurso.findById(req.params.id).exec();

};



let nuevoRecurso = function (req) {
    // let [tipo, categoria] = getTipoYCategoria(req,res,next); no es necesario
    return new req.Recurso({
        oficina: config.oficina,
        autor: req.user.email,
        tipo: req.query.tipo,
        categoria: req.query.categoria,
        csrf: "martes2delacuarentena",
    });


};





let validaRecurso = function (req, res) {
    let recurso = new req.Recurso;
    let errores = validationResult(req).array();
    if (errores.length > 0) {
        // render con input usuario y mensajes
        req.session.flash = errores.map(function (error) {
            return error.msg
        });
        res.locals.flash = req.session.flash;
        return res.render('vRecurso', {
            layout: 'main-form',
            recurso: req.body
        });

    } else {
        Object.assign(recurso, req.body);
        return recurso;
    }

};




exports.getRecurso = async function (req, res, next) {
    try {
        let contexto = nuevoRecurso(req);
        if (req.params.id) {
            contexto = getRecursoId(req.params.id);
        }
        contexto.tipo = req.query.tipo;
        if (contexto.tipo === 'Norma') {
            contexto.leyes = getLeyes();
            contexto.urlTipo = req.originalUrl.split("?").shift();
        }
        contexto.urlTipo = req.originalUrl.split("?").shift();
        contexto.categoria = req.query.categoria;
        return res.render('vRecurso', {
            layout: 'main-form',
            recurso: contexto
        });
    } catch (err) {
        return next(err)
    }
};



exports.putRecurso = function (req, res, next) {
    try {
        let recurso = validaRecurso(req, res);
        if (recurso.tipo === 'Norma') {
            recurso = validaLeyBOE(req.body.codBOE);
        }
        recurso.actualizadoPor = req.user.email;
        recurso.save();
        let url = '/?tipo=' + recurso.tipo + '&categoria=' + recurso.categoria;
        return res.redirect(303, url);
    } catch (err) {
        return next(err)
    }
};

exports.updateRecurso = function (req, res, next) {

    try {
        let recurso = validaRecurso(req, res);
        if (recurso.tipo === 'Norma') {
            recurso = validaLeyBOE(req.body.codBOE);
        }
        recurso.actualizadoPor = req.user.email;
        Recurso.findByIdAndUpdate(req.params.Id, recurso, {
            new: true
        });
        return res.redirect(303, 'vRecurso');

    } catch (err) {
        return next(err);
    }

};