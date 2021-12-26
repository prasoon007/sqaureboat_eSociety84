const mongoose = require('mongoose');

const StatusSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    author: String,
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('status', StatusSchema);