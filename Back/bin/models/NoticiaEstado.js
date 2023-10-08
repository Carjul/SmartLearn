const mongoose = require('mongoose')
const NoticiasStado = new mongoose.Schema({ 
description:{
        type: String,
        required: true
    }
})


var NoticeState = mongoose.model('estado', NoticiasStado)
module.exports = NoticeState;