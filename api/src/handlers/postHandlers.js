const creatingDogController = require("../controllers/postControllers");



const postDogsHandler = async(req,res) => {
    try {
    
        const dogObjForm = req.body;
        const creatingDog = await creatingDogController(dogObjForm)
        res.status(200).json(creatingDog)

    } catch (error) {
    
        res.status(400).json({error:error.message})

    }
    


}



module.exports = postDogsHandler;