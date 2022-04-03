const Router = require('express')
const Hero = require('../mongoose/models/Hero')
const Image = require('../mongoose/models/Image')
const mongoose = require("mongoose")
const {cloudinary} = require("../cloudinary/cloudinary");

const router = new Router()

router.post('/new-hero', async (req, res) => {
    const {nickName, realName, catchPhrase, originDescription, superpowers} = req.body

    try {
        const fileStr = req.body.avatar
        const allImage = req.body.image
        const uploadAvatar = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });

        const hero = new Hero({
            _id: new mongoose.Types.ObjectId(),
            nickName,
            realName,
            catchPhrase,
            originDescription,
            avatar: uploadAvatar.url,
            superpowers,
        })
        await hero.save()


        if (allImage.length >= 1) {
            allImage.map(image => {
                cloudinary.uploader.upload(image, {
                    upload_preset: 'images-hero',
                })
                    .then(res => {
                        let images = new Image({
                            _id: new mongoose.Types.ObjectId(),
                            hero: hero._id,
                            url: res.url,
                        })
                        images.save()
                    })
            })
        }


        return res.json({message: "Hero created"})
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
        res.send({message: 'Server errors'})
    }
});

module.exports = router