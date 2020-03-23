const mongoose = require('mongoose');

const RelacionesSchema = mongoose.Schema({

    sujetoId: { type: mongoose.Schema.Types.ObjectId, required: true,
        ref: 'Tipo'} ,
    objetoId: { type: mongoose.Schema.Types.ObjectId, required: true,
        ref: 'Tipo'} ,
    nombre: String,
    funcional: Boolean,
    transitiva: Boolean,
    simetrica: Boolean,
    reflexiva: Boolean,

});

RelacionesSchema.index({sujetoId:1, objetoId:1, unique:true});
const Relacion = mongoose.model('Relacion', RelacionesSchema);

module.exports = Relacion;







