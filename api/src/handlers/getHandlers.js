const {
  getAllDogsController,
  getDogByParamController,
  getDogsByQueryController,
  getTemperamentsController,
  getDogfromApiController,
  getDogfromBddController,
} = require("../controllers/getControllers");




const getDogsHandlers = async(req,res) => {

  try {
    const getDogs = await getAllDogsController()
    res.status(200).json(getDogs)
    
  } catch (error) {
    
    res.status(400).json({error:error.message})

  }
}


const getDogsParamsHandler = async(req,res) => {

  try {
    const { id } = req.params
    const getDogByParams = await getDogByParamController(id)
    res.status(200).json(getDogByParams)
    
  } catch (error) {
    
    res.status(400).json({error:error.message})
  }
}


const getDogsbyQueryHandler = async(req,res) => {

  try {
  
    const { name } = req.query
    const getDogsByQuery = await getDogsByQueryController(name)
    res.status(200).json(getDogsByQuery)
  } catch (error) {
    
    res.status(400).json({error:error.message})
  }


}

const getTemperamentsHandler = async(req,res) => {
  
  try {
    const getTemperaments = await getTemperamentsController()
    res.status(200).json(getTemperaments)
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

const getDogsFromApiHandler = async(req,res) => {
try {
  const getDogsFromApi = await getDogfromApiController()
  res.status(200).json(getDogsFromApi)
} catch (error) {
  res.status(400).json({error:error.message})
}
}

const getDogsFromBddHandler = async(req,res) => {
try {
  const getDogsFromBdd = await getDogfromBddController();
  res.status(200).json(getDogsFromBdd);
} catch (error) {
  res.status(400).json({ error: error.message });
}
}


module.exports = {
  getDogsHandlers,
  getDogsParamsHandler,
  getDogsbyQueryHandler,
  getTemperamentsHandler,
  getDogsFromApiHandler,
  getDogsFromBddHandler,
};