const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    content: String,
    content_draft: Object,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Document', schema)