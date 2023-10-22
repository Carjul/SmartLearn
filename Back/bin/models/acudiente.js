
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  Acudienteschema = new Schema({
    nombres: String,
    celular: Number,
    correo: String,
    direccion: String,

});

var Acudientes = mongoose.model("Acudientes",  Acudienteschema);

module.exports = Acudientes;