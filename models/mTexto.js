const mongoose = require('mongoose');

const TextoSchema = mongoose.Schema({
    pagina: Number,
    url: String,
    procedencia: String,
});

module.exports = TextoSchema;