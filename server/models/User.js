const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true,
        unique: true,
        select: false
    },
    about: {
        type: String,
        require: true,
        lowercase: true
    },
    username: {
        type: String, 
        required: true,
        unique: true
    },
    joined_at: {
        type: Date,
        default: Date.now
    },
    following: [{
        type: String,
    }]
})

module.exports = mongoose.model('user', UserSchema);