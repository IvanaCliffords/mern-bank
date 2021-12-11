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
    }

});
module.exports = Transaction = mongoose.model('transaction', TransactionSchema);