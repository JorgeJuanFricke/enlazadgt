const mongoose = require('mongoose');
const MetadataSchema = require('./mMetadata');

const schema = mongoose.Schema;

let NormaSchema = schema({
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

NormaSchema = NormaSchema.add(MetadataSchema);

let Norma = mongoose.model('Norma', NormaSchema);

module.exports = Norma;