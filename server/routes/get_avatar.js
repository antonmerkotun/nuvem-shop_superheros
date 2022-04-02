const Router = require("express");
const {cloudinary} = require("../cloudinary/cloudinary");

const router = new Router()

router.get('/avatar', async (req, res) => {
    try {
        const {resources} = await cloudinary.search
            .expression('folder:dev_setups')
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();
        res.send(resources);
    } catch (error) {
        console.log(error)
        res.send({message: 'Server errors'})
    }
})

module.exports = router