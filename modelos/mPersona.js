const mongoose = require('mongoose');
const RecursoSchema = require('./modelos/RecursoSchema');

const NormaSchema = mongoose.Schema({
    telefono1: String,
    telefono2: String,
    paginaWeb: String,
    Fax: String,
    email: String,
    dirección: String,
    Población: String,
    DP: String,

});

const Persona = mongoose.model('Persona', RecursoSchema.add(PersonaSchema));

module.exports = Persona;


