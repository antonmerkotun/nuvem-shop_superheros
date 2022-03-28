const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const path = require('path')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')))

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

const url = "mongodb+srv://antonmerkotun:1996178dD@superheros-shop.1qdta.mongodb.net/Superheros?retryWrites=true&w=majority";
const client = new MongoClient(url);
const PORT = process.env.PORT || 3005


client.connect(err => {
    const heroesCollections = client.db("Superheros-shop").collection("Superheros");
    const photosCollections = client.db("Superheros-shop").collection("photos");


    app.get('/heroes', async function (req, res) {
        const findResult = await heroesCollections.find({}).toArray();
        res.send(findResult);
    })

    app.get('/heroes-photos', async function (req, res) {
        const findResult = await photosCollections.find({}).toArray();
        res.send(findResult);
    })

    app.get('/avatar', async function (req, res) {
        const findResult = await photosCollections.find({avatar: true}).toArray();
        res.send(findResult);
    })

    //POST


    app.post('/add/hero', async function (req, res) {
        const newHeroData = req.body
        // const id = req.params.id
        console.log(newHeroData)
        const hero = await heroesCollections.insertOne(newHeroData);
        res.sendStatus(200);
    })

    app.listen(PORT, () => {
        console.log(`Connected server to port ${PORT}`)
    });
});