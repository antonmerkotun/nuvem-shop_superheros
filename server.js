const {cloudinary} = require('./cloudinary')
const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
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


//GET

    // app.get('/heroes', async function (req, res) {
    //     const findResult = await heroesCollections.find({}).toArray();
    //     res.send(findResult);
    // })

    // app.get('/heroes-photos', async function (req, res) {
    //     const findResult = await photosCollections.find({}).toArray();
    //     res.send(findResult);
    // })

    // app.get('/avatar', async function (req, res) {
    //     const findResult = await photosCollections.find({avatar: true}).toArray();
    //     res.send(findResult);
    // })

    // app.get('/api/images', async (req, res) => {
    //     const {resources} = await cloudinary.search
    //         .expression('folder:dev_setups')
    //         .sort_by('public_id', 'desc')
    //         .max_results(30)
    //         .execute();
    //     res.send(resources);
    // });


//POST

    // app.post('/add/hero', async function (req, res) {
    //     const newHeroData = req.body
    //     const findResult = await heroesCollections.insertOne(newHeroData);
    //     res.sendStatus(200);
    // })

    // app.post('/api/upload', async function (req, res) {
    //     const fileStr = req.body.data
    //     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    //         upload_preset: 'dev_setups',
    //     });
    //     res.sendStatus(200);
    // })


// PATCH

    app.patch('/changes/hero/:id', async function (req, res) {
        const id = req.params.id
        const body = req.body
        const findResult = await heroesCollections.replaceOne({_id: ObjectId(id)}, {
            nickName: body.nickName,
            realName: body.realName,
            catchPhrase: body.catchPhrase,
            originDescription: body.originDescription,
            superpowers: body.superpowers,
            avatar: body.avatar,
        });
        res.sendStatus(200);
    })

    app.patch('/reset/avatar/:id', async function (req, res) {
        const id = req.params.id
        const findResult = await photosCollections.updateMany({hero: ObjectId(id)}, {$set: {avatar: false}})
        const ssss = await photosCollections.find({hero: ObjectId(id)}).toArray();
        console.log(ssss)
        res.sendStatus(200);
    })

    app.patch('/set/avatar/:id', async function (req, res) {
        const id = req.params.id
        const findResult = await photosCollections.updateOne({_id: ObjectId(id)}, {$set: {avatar : true}})
        res.sendStatus(200);
    })


//DELETE

    // app.delete('/delete/hero/:id', async function (req, res) {
    //     const id = req.params.id
    //     const findResult = await heroesCollections.deleteOne({_id: ObjectId(id)});
    //     res.sendStatus(200);
    // })
    const PORT = process.env.PORT || 3005


    app.listen(PORT, () => {
        console.log(`Connected server to port ${PORT}`)
    });
});