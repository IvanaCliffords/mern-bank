// const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'AltUser',
        required: true
    },
    transType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    preBalance: {
        type: Number,
        required: false
    },
    postBalance: {
        type: Number,
        required: false
    }

});
module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
