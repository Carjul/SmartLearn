const mongoose = require('mongoose')
const NoticiasStado = new mongoose.Schema({
    estado:{
        type: String,
        required: true
    },
    identificador:{
        type: String,
        required: true
    },
})


var NoticeState = mongoose.model('estados', NoticiasStado)
module.exports = NoticeState;