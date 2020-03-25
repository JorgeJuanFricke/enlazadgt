const MetadataSchema = require('./mMetadata');
const mongoose = require('mongoose');


const TextoSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    procedencia: {
        type: String,
        required: true
    },
    creadoEl: {
        type: Date,
        required: true
    },
    pagina: Number

});
const Texto = mongoose.model('Texto', MetadataSchema.add(TextoSchema));

module.exports = Texto;