const mongoose = require('mongoose');
const config = require('config');
const Hero = require('models/Hero');
const Image = require('models/Image');
const Superpowers = require('models/Superpowers');


mongoose.connect(config.get('dbURL'), function (err) {
    if (err) throw err

    console.log('Successfully connected')

    const hero = new Hero({
        _id: new mongoose.Types.ObjectId(),
        nickName: '',
        realName: '',
        catchPhrase: '',
        originDescription: '',
    })

    hero.save(function (err) {
        if (err) throw err;
        console.log('Hero successfully saved.')
    })


    const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        hero: hero._id,
        image: '',
        avatar: '',
    })

    image.save(function (err) {
        if (err) throw err
        console.log('Image successfully saved.')
    })


    const superpowers = new Superpowers({
        _id: new mongoose.Types.ObjectId(),
        hero: hero._id,
        superpowers: ''
    })
    superpowers.save(function (err) {
        if (err) throw err
        console.log('Superpowers successfully saved.')
    })
})
