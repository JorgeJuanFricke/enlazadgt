const Usuario = require('../models/mUsuario.js');
const mongoose = require('mongoose');
const Tipo = require('../models/mTipo.js');



exports.getTipo = async function(req, res, next) {
    try {

        let tipo = await Tipo.findOne({_id: req.params.id});
        return res.json(tipo);

    }
    catch(err) {
        return next(err);
    }

};


exports.updateTipo = async function(req, res, next) {
    try {

        let tipos = req.body.tiposPermitidos;
        let update = { $set: {tiposPermitidos:  tipos} };

        let doc1 = await Tipo.findOne({_id:req.params.id});
        doc1.tiposPermitidos = tipos;
        let doc2 = await doc1.save();
        return res.redirect('303', '/index');


    }
    catch(err) {
        return next(err);
    }
};



exports.getUsuario = function(tipo,  relaciones) {


};



exports.getPermitidas = async function(req, res, next) {
    try {

        let permitidas = Tipo.findById(req.params.tipo, {relaciones: 1}).exec();
        return res.json(permitidas);
    }
    catch (err){
       return next(err);
    }

};


exports.updateUsuario = async (email, nombre, password, admin, oi, oat) => {
    let body = {
        email:email,
        nombre:nombre,
        password:password,
        admin:admin,
        oi:oi,
        oat:oat
    };

   // Usuario.findOneAndUpdate({email:email}, body, {runValidators:true, upsert: true, new: true}).exec((error, usuario) => {


}


exports.listaUsuarios = (sujeto) => {

    //Usuario.find({}).exec((error, usuarios)

};


exports.borraUsuario = (email) => {

    //Usuario.findOneAndDelete({email:email}).exec();


}
