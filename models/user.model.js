const mongoose = require('mongoose');

const altUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    name: {
        type: String
    },
    balance: {
        type: Number,
        required: true
    }
});

module.exports = AltUser = mongoose.model('AltUser', altUserSchema);
