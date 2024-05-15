const axios = require("axios");
const { Temperament } = require("../db")
const { API_KEY } = process.env




const cargaDeTemperaments = async() => {

const fetching = await axios.get(
  `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
);
const obj = fetching.data
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
let filteredArray = setToArray.filter((element) => element.trim() !== "");

let objForDb = filteredArray.map((element) => {
  return {
    name: element,
  };
});

Temperament.bulkCreate(objForDb)
  .then(() => console.log("Los Temperamentos se han cargado correctamente en la base de datos"))
  .catch((error) => console.log("ocurrio un error: ", error));

}


module.exports = cargaDeTemperaments;