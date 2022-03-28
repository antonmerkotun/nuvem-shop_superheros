const {cloudinary} = require('./cloudinary')
const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

const url = "mongodb+srv://antonmerkotun:1996178dD@superheros-shop.1qdta.mongodb.net/Superheros?retryWrites=true&w=majority";
const client = new MongoClient(url);


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
        const findResult = await heroesCollections.insertOne(newHeroData);
        res.sendStatus(200);
    })



    app.get('/api/images', async (req, res) => {
        const { resources } = await cloudinary.search
            .expression('folder:dev_setups')
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();

        // const publicIds = resources.map((file) => file.public_id);
        const publicIds = resources.map((file) => file.asset_id);
        console.log(publicIds)
        res.send(publicIds);
    });


    app.post('/api/upload', async function (req, res) {
        try {
            const fileStr = req.body.data
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'dev_setups',
            });
            // res.json()
            console.log(req.body.avatar)
        } catch (error) {
            console.error(error)
        }
        res.sendStatus(200);
    })


    //DELETE

    app.delete('/delete/hero/:id', async function (req, res) {
        const id = req.params.id
        const findResult = await heroesCollections.deleteOne({_id: ObjectId(id)});
        res.sendStatus(200);
    })
    const PORT = process.env.PORT || 3005

    app.listen(PORT, () => {
        console.log(`Connected server to port ${PORT}`)
    });
});