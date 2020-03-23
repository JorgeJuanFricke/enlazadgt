const mongoose = require('mongoose');

const enlaceSchema = mongoose.Schema({

    sujeto: {
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        Tipo: {
            grupo: String,
            codigo: String,
            sigla: String
        },
        Nombre: {
            type: String,
            required: true
        },
        Alias: {
            type: String,
            required: true
        },
    },

    objeto: {
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        Tipo: {
            grupo: String,
            codigo: String,
            sigla: String
        },
        Nombre: {
            type: String,
            required: true
        },
        Alias: {
            type: String,
            required: true
        },

    },

})