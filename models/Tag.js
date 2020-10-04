const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    maker: String,
    description: String
})

module.exports = mongoose.model('tag', schema)
