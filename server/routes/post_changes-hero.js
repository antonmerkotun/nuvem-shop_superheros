const Router = require("express");
const {ObjectId, MongoClient} = require("mongodb");
const config = require("config");


const router = new Router()

const client = new MongoClient(config.get('dbURL'));
client.connect()
const heroesCollections = client.db("heroes").collection("heros")

router.patch('/changes/hero/:id', async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error)
        res.send({message: 'Server errors'})
    }
})

module.exports = router