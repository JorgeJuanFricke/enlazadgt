const mongoose = require('mongoose');
const MetadataSchema = require('./mMetadata');

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
        type: Number,
        required: true
    }

});
const TasaSancion = mongoose.model('TasaSancion', MetadataSchema.add(TasaSancionSchema));

module.exports = TasaSancion;