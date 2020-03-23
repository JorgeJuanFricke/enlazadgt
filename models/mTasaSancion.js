

const mongoose = require('mongoose');

const TasaSancionSchema = mongoose.Schema({
    codBoe: String,
    tituloLey: String,
    posicion: String,
    pagina: Number,
    fechaActualizacion: Date,
    departamento: String,
    rango: String,
    numeroOficial: String,
    fechaDisposicion: Date,
    fechaPublicacion: Date,
    fechaVigencia: Date,
    fechaDerogacion: Date,
    origenLegislativo: String,
    judicialmenteAnulada: Boolean,
    vigenciaAgotada: Boolean,
    estatusDerogacion: Boolean,
    euros: Number
});

module.exports = TasaSancionSchema;