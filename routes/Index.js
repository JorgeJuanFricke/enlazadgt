
const express = require('express');
const indexRouter = express.Router();
const Categoria = require('../models/mCategoria.js');
const Tipo = require('../models/mTipo.js');
const passport = require('passport');
const d3 = require('d3');






/*
indexRouter.post("/login",
    passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }, function (req, res) {
      console.log("req.session.user" + req.session.user);
}));
*/

indexRouter.post('/login', function(req, res, next) {
    passport.authenticate("login", function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            req.flash("error", info.message);
            return res.redirect(303, '/login');
        }
        req.logIn(user, function(err) {
           if (err) { return next(err); }
            //req.session.currentUser = req.user.email;
            return res.redirect(303, '/' );
        });
    })(req, res, next);
});




indexRouter.get("/logout", function(req, res) {
    req.logout();
    req.session.currentUser = null;
    res.redirect("/");
});





indexRouter.get('/', function(req, res, next) {

    let tipo = req.query.tipo || 'trámite';
    let categoria = req.query.categoria || 'conductores';

    Categoria
        .find({}, {_id:1, codigo:1, padre:1, ancestros:1})
        .sort('padre')
        .exec()
        .then((categorias)  => {
            let treeCategorias = d3.stratify()
                .id(function(d) { return d.codigo})
                .parentId(function(d) { return d.padre })(categorias);
            Tipo
                .find({}, {_id:1, codigo:1, padre:1, url:1})
                .sort('padre')
                .exec()
                .then((tipos) => {
                    let treeTipos = d3.stratify()
                        .id(function(d) { return d.codigo})
                        .parentId(function(d) { return d.padre })(tipos);

                    res.render('main', {tipo, categoria, treeTipos, treeCategorias, layout: null});

                })
        })
        .catch((error) => {return next(error)});

});





indexRouter.get('/about', function(req, res) {

    return res.render('vAbout', {hola: 'hola'});
});

module.exports = indexRouter;