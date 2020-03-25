const mongoose = require('mongoose');
const MetadataSchema = require('./mMetadata');

const schema = mongoose.Schema;

let PersonaSchema = schema({

    telefono1: String,
    telefono2: String,
    paginaWeb: String,
    Fax: String,
    email: String,
    dirección: String,
    Población: String,
    DP: String,

});

const Persona = mongoose.model('Persona', MetadataSchema.add(PersonaSchema));

module.exports = Persona;