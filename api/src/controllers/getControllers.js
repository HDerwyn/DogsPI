const axios = require("axios");
const Sequelize = require("sequelize");
require("dotenv").config();
const {API_KEY} = process.env;
const { Dogs, Temperament } = require("../db");


const getAllDogsController = async() => {
  try {
    const bddDogs = await Dogs.findAll({
      include: [
        {
          model: Temperament,
          through: { attributes: [] },
          attributes: ["name"],
        },
      ],
    });
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const data = response.data;
    const mappingData = data.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image: element.image.url,
        temperament: element.temperament,
        height: element.height.metric,
        weight: element.weight.metric,
        lifetime: element.life_span,
        
      };
    });
    if (bddDogs) {
      return [...bddDogs, ...mappingData];
    } else {
      return mappingData;
    }
    
  } catch (error) {
    console.log(error);
  }
}


const getDogByParamController = async(id) => {
try {
  if(isNaN(id)){
    const databaseDog = await await Dogs.findByPk(id, {
      include: [
        {
          model: Temperament,
          through: { attributes: [] },
          attributes: ["name"],
        },
      ],
    });
    return databaseDog
  }
  const dogById = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`);
  const dogByIdData = dogById.data
  if(!dogByIdData.reference_image_id){
    const defaultDogImage = "https://i.ibb.co/stVJs4r/29c9dd9b-0c22-4330-8d87-2498e00c5a8a.jpg";
    return {
      id: dogByIdData.id,
      name: dogByIdData.name,
      image: defaultDogImage, 
      temperament: dogByIdData.temperament,
      height: dogByIdData.height.metric,
      weight: dogByIdData.weight.metric,
      lifetime: dogByIdData.life_span,
    };
  }
  const refImgId = dogByIdData.reference_image_id; 
  const dogByIdImg = await axios.get(`https://api.thedogapi.com/v1/images/${refImgId}`) 
  const dogImg = dogByIdImg.data.url
  

  return {
    id: dogByIdData.id,
    name: dogByIdData.name,
    image: dogImg,
    temperament: dogByIdData.temperament,
    height: dogByIdData.height.metric,
    weight: dogByIdData.weight.metric,
    lifetime: dogByIdData.life_span,
  };
  
} catch (error) {
  console.log(error.data);
}
}


const getDogsByQueryController = async(name) => {

   try {
     const lowerCaseName = name.toLowerCase();
     const bddDogs = await Dogs.findAll({
       where: {
         name: {
           [Sequelize.Op.iLike]: lowerCaseName,
         },
       },
       include: [
         {
           model: Temperament,
           through: { attributes: [] },
           attributes: ["name"],
         },
       ],
     });
     const searchDogs = await axios.get(
       `https://api.thedogapi.com/v1/breeds/search?q=${lowerCaseName}`
     );
     const dogsData = searchDogs.data;
     const mapDogs = await Promise.all(
       dogsData.map(async (element) => {
         const dogImg = await axios.get(
           `https://api.thedogapi.com/v1/images/${element.reference_image_id}`
         );
         const imgDataUrl = dogImg.data.url;
         return {
           id: element.id,
           name: element.name,
           image: imgDataUrl,
           temperament: element.temperament,
           height: element.height.metric,
           weight: element.weight.metric,
           lifetime: element.life_span,
         };
       })
     );
     
     if(bddDogs){
      return [...bddDogs,...mapDogs]
     }

     return mapDogs;
   } catch (error) {
     console.log(error);
     throw new Error("Error searching dog");
   }

}

const getTemperamentsController = async() => {

  const fetching = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const obj = fetching.data;
  let set = new Set();

  let mappedObject = obj.map((obj) => {
    return obj.temperament;
  });
  let arrayToString = mappedObject.join(", ");
  let stringSinComas = arrayToString.replace(/,/g, "");
  let stringToArray = stringSinComas.split(" ");

  for (let i = 0; i < stringToArray.length; i++) {
    set.add(stringToArray[i]);
  }
  let setToArray = Array.from(set);

  return setToArray;
} 

const getDogfromApiController = async() => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const data = response.data;
    const mappingData = data.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image: element.image.url,
        temperament: element.temperament,
        height: element.height.metric,
        weight: element.weight.metric,
        lifetime: element.life_span,
      };
    });
    return mappingData
  } catch (error) {
    console.log(error);
    throw new error
  }
}

const getDogfromBddController = async() => {
try {
  const bddDogs = await Dogs.findAll({
    include: [
      {
        model: Temperament,
        through: { attributes: [] },
        attributes: ["name"],
      },
    ],
  });
  return bddDogs
} catch (error) {
  console.log(error);
  throw new error
}
}






module.exports = {
  getAllDogsController,
  getDogByParamController,
  getDogsByQueryController,
  getTemperamentsController,
  getDogfromApiController,
  getDogfromBddController,
};