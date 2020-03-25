const mongoose = require('mongoose');

const MetadataSchema = require('./mMetadata.js');

const Recurso = mongoose.model('Recurso', MetadataSchema);

module.exports = Recurso;

