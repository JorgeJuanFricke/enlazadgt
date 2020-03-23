const passport = require("passport");
const Usuario = require('../models/mUsuario.js');

module.exports = function() {
    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id, function(err, usuario) {
            done(err, usuario);
        });
    });
}

const LocalStrategy = require("passport-local").Strategy;

passport.use("login", new LocalStrategy(
    { usernameField: 'email',
      passwordField: 'password'}
    ,function(username, password, done) {
    Usuario.findOne({ email: username }, function(err, usuario) {
        if (err) { return done(err); }
        if (!usuario) {
          return done(null, false, {message: "el usuario no existe"});
            }
            usuario.checkPassword(password, function(err, isMatch) {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(null, usuario);
            } else {
                return done(null, false, {message:"password incorrecta"});
            }
        });
    });
}));