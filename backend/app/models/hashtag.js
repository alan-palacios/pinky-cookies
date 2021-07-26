var mongoose = require('mongoose');

module.exports = mongoose.model('hashtags', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    count: {
        type: Number,
        required: true,
        default: 1
    },
}));