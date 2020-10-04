const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    follow: {
        type: Array,
        default: []
    },
    permissions: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('user', schema)
