const mongoose = require('mongoose');
const RecursoSchema = require('./modelos/RecursoSchema');

const TasaSancionSchema = mongoose.Schema({
    codBoe: String,
    títuloLey: String,
    posición: {
        sección: String,
        artículo: String,
        párrafo: String,
    },
    páginaPDF: Number,
    fechaActualización: Date,
    fechaVigencia: Date,
    fechaDerogación: Date,
    judicialmenteAnulada: Boolean,
    vigenciaAgotada: Boolean,
    estatusDerogación: Boolean,
    importe: {
        type: number,
        required: true
    }

});
const TasaSancion = mongoose.model('TasaSancion', RecursoSchema.add(TasaSancionSchema));

module.exports = TasaSancion;