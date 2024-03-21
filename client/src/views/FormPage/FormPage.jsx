import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./FormPage.module.css"


const FormPage = () => {

  const [objNewPerro, SetObjNewPerro] = useState({
    nombre: { name: "", error: false, errorMessage: "" },
    imagen: { img: "", error: false, errorMessage: "" },
    alturaMin: { altMin: "", error: false, errorMessage: "" },
    alturaMax: { altMax: "", error: false, errorMessage: "" },
    pesoMin: { pesMin: "", error: false, errorMessage: "" },
    pesoMax: { pesMax: "", error: false, errorMessage: "" },
    lifetime: { time: "", error: false, errorMessage: "" },
    temperamentos: { temp: [], error: false, errorMessage: "" },
  });

  const temperaments = useSelector((state) => state.temperaments);


  const handleSubmit = async (e) => {
    e.preventDefault();

     const hasErrors = Object.values(objNewPerro).some(field => field.error);

     const isEmpty = Object.values(objNewPerro).some(
       (field) =>
         field === undefined ||
         field.name === "" ||
         field.img === "" ||
         field.altMin === "" ||
         field.altMax === "" ||
         field.pesMin === "" ||
         field.pesMax === "" ||
         field.time === "" ||
         (Array.isArray(field.temp) && field.temp.length === 0)
     );



      if (hasErrors || isEmpty) {
        alert(
          "Existe un error en tu formulario, por favor corrige todos los errores para continuar"
        );
      } else {
        const nuevoPerro = {
          name: objNewPerro.nombre.name,
          image: objNewPerro.imagen.img,
          height: `${objNewPerro.alturaMin.altMin} - ${objNewPerro.alturaMax.altMax}`,
          weight: `${objNewPerro.pesoMin.pesMin} - ${objNewPerro.pesoMax.pesMax}`,
          lifetime: objNewPerro.lifetime.time,
          temperament: objNewPerro.temperamentos.temp,
        };
    
        try {
          const response = await axios.post(
            "http://localhost:3001/post",
            nuevoPerro
          );
          console.log("Formulario Enviado Exitosamente", response.data);
          alert("Perro creado exitosamente");
        } catch (error) {
          console.error(error);
          alert(`hay un mensaje de error: ${error.response.data.error}`)
        }
      };
     }

  ////////////////////////////////////////////////////////////VALIDACION PARA EL NOMBRE///////////////////////////////
  const handleNombreChange = (e) => {
    const newValue = e.target.value;

    if (newValue === '') {
    SetObjNewPerro({
      ...objNewPerro,
      nombre: {
        ...objNewPerro.nombre,
        name: newValue,
        error: true,
        errorMessage: "El nombre no puede estar vacío",
      },
    });
  }

    if (newValue.length < 3) {
      SetObjNewPerro({
        ...objNewPerro,
        nombre: {
          ...objNewPerro.nombre,
          name: newValue,
          error: true,
          errorMessage: "El nombre debe tener al menos 3 caracteres",
        },
      });
    } else if (!/^[a-zA-Z]+$/.test(newValue)) {
      SetObjNewPerro({
        ...objNewPerro,
        nombre: {
          ...objNewPerro.nombre,
          name: newValue,
          error: true,
          errorMessage: "El nombre solo puede contener letras",
        },
      });
    } else {
      SetObjNewPerro({
        ...objNewPerro,
        nombre: {
          ...objNewPerro.nombre,
          name: newValue,
          error: false,
          errorMessage: "",
        },
      });
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////VALIDACION PARA LA IMAGEN////////////////////////

  const handleImagenChange = (e) => {
    const newValue = e.target.value;

    const urlPattern = new RegExp("^(http|https)://", "i");

    if (!urlPattern.test(newValue)) {
      SetObjNewPerro({
        ...objNewPerro,
        imagen: {
          ...objNewPerro.imagen,
          img: newValue,
          error: true,
          errorMessage: "Por favor, introduce una URL válida",
        },
      });
    }
    // Validación: La URL no debe tener más de 30 caracteres
    else if (newValue.length > 100) {
      SetObjNewPerro({
        ...objNewPerro,
        imagen: {
          ...objNewPerro.imagen,
          img: newValue,
          error: true,
          errorMessage: "La URL no debe tener más de 100 caracteres",
        },
      });
    } else {
      SetObjNewPerro({
        ...objNewPerro,
        imagen: {
          ...objNewPerro.imagen,
          img: newValue,
          error: false,
          errorMessage: "",
        },
      });
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////VALIDACION PARA ALTURA MIN///////

  const handleAlturaMinChange = (e) => {
    const newValue = e.target.value;

    if (newValue < 0 || newValue === "-0") {
      SetObjNewPerro({
        ...objNewPerro,
        alturaMin: {
          ...objNewPerro.alturaMin,
          altMin: newValue,
          error: true,
          errorMessage: "La altura mínima no puede ser un número negativo",
        },
      });
    } else if (newValue > 40) {
      SetObjNewPerro({
        ...objNewPerro,
        alturaMin: {
          ...objNewPerro.alturaMin,
          altMin: newValue,
          error: true,
          errorMessage: "La altura mínima no puede exceder 40",
        },
      });
    } else if (isNaN(newValue)) {
      SetObjNewPerro({
        ...objNewPerro,
        alturaMin: {
          ...objNewPerro.alturaMin,
          altMin: newValue,
          error: true,
          errorMessage: "La altura mínima debe ser un número",
        },
      });
    } else {
      SetObjNewPerro({
        ...objNewPerro,
        alturaMin: {
          ...objNewPerro.alturaMin,
          altMin: newValue,
          error: false,
          errorMessage: "",
        },
      });
    }
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////VALIDACION PARA ALTURA MAX///////

  const handleAlturaMaxChange = (e) => {
    const newValue = e.target.value;

    if (newValue > 40) {
      SetObjNewPerro({
        ...objNewPerro,
        alturaMax: {
          ...objNewPerro.alturaMax,
          altMax: newValue,
          error: true,
          errorMessage: "La altura máxima no puede exceder 40",
        },
      });
    }
    else if (isNaN(newValue) || newValue === "-0") {
      SetObjNewPerro({
        ...objNewPerro,
        alturaMax: {
          ...objNewPerro.alturaMax,
          altMax: newValue,
          error: true,
          errorMessage: "La altura máxima debe ser un número",
        },
      });
    } else {
      SetObjNewPerro({
        ...objNewPerro,
        alturaMax: {
          ...objNewPerro.alturaMax,
          altMax: newValue,
          error: false,
          errorMessage: "",
        },
      });
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////VALIDACION PARA PESO MIN/////////

  const handlePesoMinChange = (e) => {
    const newValue = e.target.value;

    if (newValue < 0 || newValue === "-0") {
      SetObjNewPerro({
        ...objNewPerro,
        pesoMin: {
          ...objNewPerro.pesoMin,
          pesMin: newValue,
          error: true,
          errorMessage: "El peso mínimo no puede ser un número negativo",
        },
      });
    }
    else if (isNaN(newValue)) {
      SetObjNewPerro({
        ...objNewPerro,
        pesoMin: {
          ...objNewPerro.pesoMin,
          pesMin: newValue,
          error: true,
          errorMessage: "El peso mínimo debe ser un número",
        },
      });
    } else {
      SetObjNewPerro({
        ...objNewPerro,
        pesoMin: {
          ...objNewPerro.pesoMin,
          pesMin: newValue,
          error: false,
          errorMessage: "",
        },
      });
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////VALIDACION PARA PESO MAX/////////

  const handlePesoMaxChange = (e) => {
    const newValue = e.target.value;

    if (newValue > 50) {
      SetObjNewPerro({
        ...objNewPerro,
        pesoMax: {
          ...objNewPerro.pesoMax,
          pesMax: newValue,
          error: true,
          errorMessage: "El peso máximo no puede exceder 50",
        },
      });
    } else if (isNaN(newValue) || newValue === "-0") {
      SetObjNewPerro({
        ...objNewPerro,
        pesoMax: {
          ...objNewPerro.pesoMax,
          pesMax: newValue,
          error: true,
          errorMessage: "El peso máximo debe ser un número",
        },
      });
    } else {
      SetObjNewPerro({
        ...objNewPerro,
        pesoMax: {
          ...objNewPerro.pesoMax,
          pesMax: newValue,
          error: false,
          errorMessage: "",
        },
      });
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////VALIDACION PARA LIFETIME/////////

  const handleLifetimeChange = (e) => {
    const newValue = e.target.value;

    if (newValue > 20) {
      SetObjNewPerro({
        ...objNewPerro,
        lifetime: {
          ...objNewPerro.lifetime,
          time: newValue,
          error: true,
          errorMessage: "Los años de vida no pueden exceder 20",
        },
      });
    }
    else if (isNaN(newValue)) {
      SetObjNewPerro({
        ...objNewPerro,
        lifetime: {
          ...objNewPerro.lifetime,
          time: newValue,
          error: true,
          errorMessage: "Los años de vida deben ser un número",
        },
      });
    } else {
      SetObjNewPerro({
        ...objNewPerro,
        lifetime: {
          ...objNewPerro.lifetime,
          time: newValue,
          error: false,
          errorMessage: "",
        },
      });
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////VALIDACION PARA TEMPERAMENTOS

  const handleTemperamentosChange = (e) => {
    const newValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    if (newValues.length < 1) {
      SetObjNewPerro({
        ...objNewPerro,
        temperamentos: {
          ...objNewPerro.temperamentos,
          temp: newValues,
          error: true,
          errorMessage: "Debes seleccionar al menos un temperamento",
        },
      });
    }
    else if (newValues.length > 5) {
      SetObjNewPerro({
        ...objNewPerro,
        temperamentos: {
          ...objNewPerro.temperamentos,
          temp: newValues,
          error: true,
          errorMessage: "No puedes seleccionar más de 5 temperamentos",
        },
      });
    } else {
      SetObjNewPerro({
        ...objNewPerro,
        temperamentos: {
          ...objNewPerro.temperamentos,
          temp: newValues,
          error: false,
          errorMessage: "",
        },
      });
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={objNewPerro.nombre.name}
        onChange={handleNombreChange}
      />
      {objNewPerro.nombre.error && (
        <h5 className={styles.nameError}>{objNewPerro.nombre.errorMessage}</h5>
      )}
      <input
        type="text"
        placeholder="Imagen"
        value={objNewPerro.imagen.img}
        onChange={handleImagenChange}
      />
      {objNewPerro.imagen.error && (
        <h5 className={styles.nameError}>{objNewPerro.imagen.errorMessage}</h5>
      )}
      <input
        type="text"
        placeholder="Altura mínima"
        value={objNewPerro.alturaMin.altMin}
        onChange={handleAlturaMinChange}
      />
      {objNewPerro.alturaMin.error && (
        <h5 className={styles.nameError}>
          {objNewPerro.alturaMin.errorMessage}
        </h5>
      )}
      <input
        type="text"
        placeholder="Altura máxima"
        value={objNewPerro.alturaMax.altMax}
        onChange={handleAlturaMaxChange}
      />
      {objNewPerro.alturaMax.error && (
        <h5 className={styles.nameError}>
          {objNewPerro.alturaMax.errorMessage}
        </h5>
      )}
      <input
        type="text"
        placeholder="Peso mínimo"
        value={objNewPerro.pesoMin.pesMin}
        onChange={handlePesoMinChange}
      />
      {objNewPerro.pesoMin.error && (
        <h5 className={styles.nameError}>{objNewPerro.pesoMin.errorMessage}</h5>
      )}
      <input
        type="text"
        placeholder="Peso máximo"
        value={objNewPerro.pesoMax.pesMax}
        onChange={handlePesoMaxChange}
      />
      {objNewPerro.pesoMax.error && (
        <h5 className={styles.nameError}>{objNewPerro.pesoMax.errorMessage}</h5>
      )}
      <input
        type="text"
        placeholder="Años de vida"
        value={objNewPerro.lifetime.time}
        onChange={handleLifetimeChange}
      />
      {objNewPerro.lifetime.error && (
        <h5 className={styles.nameError}>{objNewPerro.lifetime.errorMessage}</h5>
      )}
      <select
        className={styles.select}
        multiple={true}
        value={objNewPerro.temperamentos.temp}
        onChange={handleTemperamentosChange}
      >
        {temperaments &&
          Array.isArray(temperaments) &&
          temperaments.map((temperament, index) => (
            <option key={index} value={index + 1}>
              {temperament}
            </option>
          ))}
      </select>
      {objNewPerro.temperamentos.error && (
        <h5 className={styles.nameError}>{objNewPerro.temperamentos.errorMessage}</h5>
      )}
      <button className={styles.button} type="submit">
        Crear perro
      </button>
    </form>
     );
};

export default FormPage;
