
const Recurso = require('../models/mTasaSancion.js');
const Enlace = require('../models/mEnlace.js');

module.exports = function(recursoId) {
    Recurso.findById(recursoId, function (err, recurso) {
        if (err) throw err;
        if (!recurso) return {error: 'No se encuentra el recurso id:' + req.params.recursoId};
        Enlace.find({}, function (err, enlaces) {
            if (err) throw err;
            if (!enlaces) return {error: 'No tiene enlaces el recurso id:' + req.params.recursoId};

            if (!recurso)
                return {error: 'No se encuentra el recurso id:' + req.params.recursoId};

            else {
                let enlaces = enlaces.map(function (enlace) {
                    return {
                        relacion: enlace.propiedad,
                        recurso: enlace.recurso,

                    };
                });
            }
        });
        return {
            nombre: recurso.nombre,
            tipo: recurso.tipo,
            creado: recurso.creado,
            creadoPor: recurso.creado,
            enlaces: enlaces,
        }
    });
};

