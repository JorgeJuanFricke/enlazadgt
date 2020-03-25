// categoria

const mongoose = require("mongoose");

const TipoSchema = mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  sigla: String,
  url: {
    type: String,
    required: true
  },
  padre: {
    type: String
  },
  permiso: {
    ADMIN: Boolean,
    OAT: Boolean,
    OI: Boolean,
    EX: Boolean,
    SAN: Boolean,
  },
  tiposPermitidos: [String]
});

TipoSchema.index({
  codigo: 1
});
let Tipo = mongoose.model("Tipo", TipoSchema);
module.exports = Tipo;