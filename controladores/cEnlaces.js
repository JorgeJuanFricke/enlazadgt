const mongoose = require('mongoose');
const RecursoSchema = require('../modelos/mRecurso.js');
const Recurso = mongoose.model('Recurso', RecursoSchema);
const Enlace = require('../modelos/enlaces')


exports.putEnlace = async function (req, res, next) {
    try {

        sujeto = getRecurso(req.params.sujeto);
        objeto = getRecurso(req.params.sujeto);
        //if sujeto.tipo.permitidos === objeto.tipo
        // else ERROR NO PERMITIDO
        enlace = Enlace({});
        enlace.sujeto.id = sujeto._id;
        enlace.sujeto.sigla = sujeto.tipo.sigla;
        enlace.sujeto.nombre = sujeto.nombre;
        enlace.objeto.id = objeto._id;
        enlace.objeto.sigla = objeto.tipo.sigla;
        enlace.findAndUpdate({
            sujetoId: sujeto._id,
            objetoId: objeto._id
        }, enlace, {
            upsert: true
        });
    } catch {

    }
};


exports.deleteEnlace = () => {

};




getRecurso = async (id) => {
    return await Recurso.aggregate([{
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'tipos',
                localField: 'tipo',
                foreignField: 'codigo',
                as: 'tipo'
            }
        },
        {
            $unwind: '$tipo'
        }
    ]).exec();
}