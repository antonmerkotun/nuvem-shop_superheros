const {Schema} = require('mongoose');
const mongoose = require("mongoose");

const heroSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nickName: {
        type: String,
        // required: true,
        unique: true
    },
    realName: {
        type: String,
        // required: true,
    },
    catchPhrase: {
        type: String,
        // required: true,
    },
    originDescription: {
        type: String,
        // required: true,
    },
    avatar: {
        type: String
    },
    superpowers: {
        type: Array
    }
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;