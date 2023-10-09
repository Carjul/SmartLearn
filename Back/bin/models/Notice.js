const mongoose = require('mongoose')
const NoticiasSchema = new mongoose.Schema({
    title : String,
    autor: String,
    idAutor:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'People'
        }    ],
    category: String,
    time: String,
    abstract: String,
    content: String,
    images: String,
    estado:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'estado'
        }
    ],
    observacion:String,
})

var Notice = mongoose.model('Notice', NoticiasSchema)
module.exports = Notice;