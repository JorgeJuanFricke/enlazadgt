const mongoose = require('mongoose');
const RecursoSchema = require('./modelos/RecursoSchema');

const NormaSchema = mongoose.Schema({
    codBoe: String,
    tituloLey: String,
    posición: {
        sección: String,
        artículo: String,
        párrafo: String,
    },
    páginaPDF: Number,
    fechaActualizacion: Date,
    fechaVigencia: Date,
    fechaDerogacion: Date,
    judicialmenteAnulada: Boolean,
    vigenciaAgotada: Boolean,
    estatusDerogacion: Boolean,

});
const Norma = mongoose.model('Norma', RecursoSchema.add(NormaSchema));

module.exports = Norma;