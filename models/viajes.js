const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const viajesSchema = new Schema({
    direccion : String,
    medio : String
})

//Crear modelo
const Viajes = mongoose.model('Viajes', viajesSchema);
module.exports = Viajes;