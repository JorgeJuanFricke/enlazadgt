const mongoose = require('mongoose');
const RecursoSchema = require("../models/mMetadata.js");
let Recurso = mongoose.model('Recurso', RecursoSchema);

class UsuarioNoAutorizado extends Error {
    constructor(message) {
        super(message);
        this.name = 'UsuarioNoAutorizado';
    }
}


exports.autenticadoToLogin = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect(303, "/login");
    }
};


exports.autenticado = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // SI AJAX res.json("error", "NO AUTENTICADO",);
        return next("no autenticado");
    }
};



exports.esPropietarioPolicy = function (req, res, next) {
    Recurso.findById(req.params.Id, function (err, recurso) {
        if (err) {return next("error buscando recurso")}
        if(!recurso) { return next("error body recurso no existe")}
        if (req.user.admin || (req.user.email === recurso.autor)) {
            return next();
        } else {
            return next("NO autorizado");
        }
    });
};


exports.esOIPolicy = function (req, res, next) {
    if(req.user.admin || req.user.oi) {
        return next();
    } else {
       return next("no autorizado")
    }
};



exports.esOATPolicy = function (req, res, next) {
    if(req.user.admin || req.user.oat) {
        return next();
    } else {
        return next("no autorizado");
    }

};


exports.esAdminPolicy = function (req, res, next) {
    if(req.user.admin) {
        return next();
    } else {
        return next("no autorizado")
    }

};




