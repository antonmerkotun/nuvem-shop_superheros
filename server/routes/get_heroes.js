const Router = require("express");
const {MongoClient} = require("mongodb");
const config = require("config");

const router = new Router()

const client = new MongoClient(config.get('dbURL'));
client.connect()
const heroesCollections = client.db("heroes").collection("heros")

router.get('/heroes', async (req, res) => {
    try {
        const findResult = await heroesCollections.find({}).toArray();
        res.send(findResult);
    } catch (error) {
        console.log(error)
        res.send({message: 'Server errors'})
    }
})

module.exports = router