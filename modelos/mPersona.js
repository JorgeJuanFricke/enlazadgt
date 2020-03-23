const mongoose = require('mongoose');

const PersonaSchema = mongoose.Schema({
    juridica: Boolean,
    telefono1: String,
    telefono2: String,
    paginaWeb: String,
    Fax: String,
    email: String,
    direccion: String,
    Poblacion: String,
    DP: String,
});

module.exports = PersonaSchema;