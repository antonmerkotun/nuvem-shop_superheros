const {Schema} = require('mongoose');
const mongoose = require("mongoose");

const superpowersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hero: {
        ref: "Hero",
        type: mongoose.Schema.Types.ObjectId,
    },
    superpowers: {
        type: String,
        required: true,
    }
});

const Superpowers = mongoose.model('Superpowers', superpowersSchema);

module.exports = Superpowers;