const Router = require("express");
const {MongoClient, ObjectId} = require("mongodb");
const config = require("config");

const router = new Router()

const client = new MongoClient(config.get('dbURL'));
client.connect()
const heroesCollections = client.db("heroes").collection("heros")
const imagesCollections = client.db("heroes").collection("images")

router.delete('/hero/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteHeroes = await heroesCollections.deleteOne({_id: ObjectId(id)});
        const deleteImages = await imagesCollections.deleteMany({hero: ObjectId(id)})
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.send({message: 'Server errors'})
    }
})

module.exports = router