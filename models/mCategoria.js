// categoria

const mongoose = require('mongoose');


const CategoriaSchema = mongoose.Schema({
	codigo: {type: String, required: true, unique:true},
	padre: String,
	ancestros: [String],


});


CategoriaSchema.index({ancestros:1, codigo:1}, {unique:true});
CategoriaSchema.index({padre:1});
let Categoria = mongoose.model('Categoria', CategoriaSchema);
module.exports = Categoria;





