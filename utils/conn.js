const mongoose = require('mongoose')
const { MONGO_URI } = require('./config')()

const conn = mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = conn
