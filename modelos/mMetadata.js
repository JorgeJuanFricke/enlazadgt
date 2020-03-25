const Tipo = require('./mTipo');
const Categoria = require('./mCategoria');


const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const MetadataSchema = new Schema({
    tipo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },

    etiqueta: {
        type: String,
        required: true
    },
    descripcion: String,
    oficina: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    actualizadoPor: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    derogado: Boolean,
    creadoEl: {
        type: Date,
        default: new Date()
    },


}, {
    timestamps: true
});
MetadataSchema.index({
    tipo: 1,
    nombre: 1
});



MetadataSchema.pre('save', function (next) {
    Tipo.findOne({
        codigo: this.tipo
    }, function (error, tipo) {
        if ((error) || !tipo) {
            return next('tipo no existe')
        }
        return next();
    })
});


MetadataSchema.pre('save', function (next) {
    Categoria.findOne({
        categoria: this.categoria
    }, function (error, categoria) {
        if ((error) || !categoria) {
            return next('categoría no existe')
        }
        return next();
    })
});

module.exports = MetadataSchema;