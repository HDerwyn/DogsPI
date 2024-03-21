const { Dogs, Temperament } = require("../db")




const creatingDogController = async(dogObjForm) => {
  console.log(dogObjForm);
    try {
        const { name, image, height, weight, lifetime, temperament } =
          dogObjForm;

        const checkingName = await Dogs.findAll({ where: { name: name } });
        const urlPattern = new RegExp("^(http|https)://", "i");

      if(!isNaN(name)){
        throw new Error("El nombre contiene numeros, debe contener solo letras")
      } else if(checkingName.length > 0){
        throw new Error("La raza de perro que intentas crear ya existe en la base de datos")
      } else if(!urlPattern.test(image)){
        throw new Error("Por favor, introduce una URL válida")
      } else if(height > 40 || height < 0 || height === "-0"){
        throw new Error("Errores en el campo de Altura")
      } else if(weight > 40 || weight < 0 || weight === "-0"){
        throw new Error("Errores en el campo del Peso")
      } else if(lifetime > 20 || isNaN(lifetime)){
        throw new Error("Errores en el campo de años de vida");
      } else if(temperament.length === 0 || temperament.length > 5){
        throw new Error("Errores ene l campo de temperamentos")
      } else {
        
        const postingDog = await Dogs.create({
          name: name,
          image: image,
          height: height,
          weight: weight,
          lifetime: lifetime,
        });
        const temperamentMatching = await Temperament.findAll({
          where: {
            id: temperament,
          },
        });
  
        await postingDog.addTemperaments(temperamentMatching);
  
        return postingDog;

      }


        
    } catch (error) {
        console.log(error);
        throw error;
    }
    

}


module.exports = creatingDogController