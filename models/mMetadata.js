const mongoose = require('mongoose');


const Tipo = require('./mTipo.js');
const Categoria =  require('./mCategoria.js');

const MetadataSchema = new mongoose.Schema({
    tipo: { type: String },
    nombre: String,
    etiqueta: {type: String},
    descripcion: String,
    oficina: String,
    autor: String,
    actualizadoPor: String,
    categoria: {type: String},
    derogado: Boolean,
    creadoEl: { type: Date, default: new Date()},
    enlaces: [
        {
            objetoId: {type: mongoose.Schema.Types.ObjectId, required: true},
            objetoTipo: {grupo:String, codigo:String, sigla:String},
            objetoNombre: String,
            objetoAlias: String,
            },

    ],
    referencias: [
        {
            sujetoId: {type: mongoose.Schema.Types.ObjectId, required: true},
            sujetoTipo:  {grupo:String, codigo:String, sigla:String},
            sujetoNombre: String,
            sujetoAlias: String,
        },

        ]

}, {
    timestamps: true}
);


MetadataSchema.index({tipo:1, nombre:1});



MetadataSchema.pre('save', function(next) {
    Tipo.findOne({codigo: this.tipo}, function(error, tipo) {
        if ((error) || !tipo) {return next(error)}
        //if (!tipo) {return next(new error("tipo no existe"))}
        return next();
    })
});


MetadataSchema.pre('save', function(next) {
    Categoria.findOne({categoria: this.categoria}, function(error, categoria) {
        if ((error) || !categoria) {return next(error)}
        //if (!categoria) {return next(new error("categoria no existe"))}
        return next();
    })
});

module.exports = MetadataSchema;