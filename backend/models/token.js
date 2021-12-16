const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    token: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('token', tokenSchema);
