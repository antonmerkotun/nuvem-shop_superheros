const {Schema} = require('mongoose');
const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hero: {
        ref: "Hero",
        type: mongoose.Schema.Types.ObjectId,
    },
    url: {
        type: String,
        // required: true,
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;