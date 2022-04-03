const Router = require("express");
const {MongoClient, ObjectId} = require("mongodb");
const config = require("config");

const router = new Router()

const client = new MongoClient(config.get('dbURL'));
client.connect()
const imagesCollections = client.db("heroes").collection("images")

router.delete('/image/:id', async (req, res) => {
    try {
        const id = req.params.id
        await imagesCollections.deleteMany({_id: ObjectId(id)})
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.send({message: 'Server errors'})
    }
})

module.exports = router