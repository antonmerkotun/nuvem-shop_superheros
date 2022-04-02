const Router = require("express");
const {cloudinary} = require('../cloudinary/cloudinary');


const router = new Router()

router.post('/images', async (req, res) => {
    try {
        const fileStr = req.body.data
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'images-hero',
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.send({message: 'Server errors'})
    }
})

module.exports = router