const mongoose = require('mongoose');
const RecursoSchema = require('./modelos/mRecurso');

const NormaSchema = mongoose.Schema({
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
const Texto = mongoose.model('Texto', RecursoSchema.add(TextoSchema));

module.exports = Texto;