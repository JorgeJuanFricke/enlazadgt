const mongoose = require('mongoose');

const SoftwareSchema = mongoose.Schema({
    version: String,
    licencia: Boolean,
    ultimaVersion: String,
    so: {Type: String,
    enum: ['WIN 7', 'WIN 10', 'LINUX', 'WIN XP'] }
});

module.exports = SoftwareSchema;