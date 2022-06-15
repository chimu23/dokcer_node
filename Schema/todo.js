const mongoose = require('mongoose')
const con = require('../utils/conn')

const TodoSchema = new mongoose.Schema({
    content: String,
    done: Boolean
})

module.exports = con.model('Todo', TodoSchema)
