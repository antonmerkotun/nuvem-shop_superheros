const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require("body-parser");
const cors = require("cors");
const uploadImage = require('./routes/post_avatar');
const getHeroes = require('./routes/get_heroes');
const getHeroesPhotos = require('./routes/get_heroes-photos');
const deleteHero = require('./routes/delete_hero');
const postImage = require('./routes/post_images');
const createNewHero = require('./routes/create_new_hero')
const changesHero = require('./routes/post_changes-hero')


const app = express();
const PORT = config.get('serverPORT');
app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());


app.use(express.json());
app.use('/create', createNewHero);

app.use('/get', getHeroes);
app.use('/get', getHeroesPhotos)

app.use('/post', uploadImage);
app.use('/post', postImage);

app.use('/patch', changesHero);

app.use('/delete', deleteHero);

const start = async () => {
    try {
        await mongoose.connect(config.get('dbURL'));

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {

    }
}

start();

