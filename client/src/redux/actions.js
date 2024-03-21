import axios from "axios"

export const SET_PREV_PAGE = "SET_PREV_PAGE";
export const SET_NEXT_PAGE = "SET_NEXT_PAGE";
export const SET_DOGS_FOR_STATE = "SET_DOG_FOR_STATE";
export const SET_DOGS_FOR_DOGS_EN_PAGINA = "SET_DOGS_FOR_DOGS_EN_PAGINA";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTRO_POR_TEMPERAMENTOS = "FILTRO_POR_TEMPERAMENTOS";
export const CHANGE_FILTRO = "CHANGE_FILTRO";
export const CAMBIAR_PAG_A_1 = "CAMBIAR_PAG_A_1";
export const SET_MAX_PAGES = "SET_MAX_PAGES";
export const GET_DETAILED_DOG = "GET_DETAILED_DOG";
export const DEFAULT_IMAGE = "DEFAULT_IMAGE";
export const SET_FILTRO_ANTERIOR = "SET_FILTRO_ANTERIOR";
export const SET_FILTRO_TEMPERAMENTO = "SET_FILTRO_TEMPERAMENTO";
export const LIMPIAR_ESTADO_EN_PAGINA = "LIMPIAR_ESTADO_EN_PAGINA";
export const CLEAR_DETAILED_DOG = "CLEAR_DETAILED_DOG";
export const LIMPIAR_ESTADO_DOG = "LIMPIAR_ESTADO_DOG";
export const SET_DOGS_ORDENADOS = "SET_DOGS_ORDENADOS";

//**********************paginado
export const paginado = (page) => {
  return function (dispatch, getState) {
    const { dogs } = getState();
    const endSlice = page * 8;
    const initialSlice = endSlice - 8;
    const slicingDogs = dogs.slice(initialSlice, endSlice);
    const paginasDisponibles = Math.ceil(dogs.length / 8);
    dispatch({ type: SET_MAX_PAGES, payload: paginasDisponibles });
    dispatch({ type: SET_DOGS_FOR_DOGS_EN_PAGINA, payload: slicingDogs });
  };
};
//************************
export const getDogsForHome = (page) =>{
    return async function(dispatch, getState){
        let ordenados
        const {dogs} = getState();
          if (!dogs) {
            const request = await axios.get("http://localhost:3001/dogs");
            const data = request.data;
            dispatch({ type: SET_DOGS_FOR_STATE, payload: data });
            dispatch(paginado(page));
          } else {
            dispatch(paginado(page));
            ordenados = [...dogs]
            dispatch({ type: SET_DOGS_ORDENADOS, payload: ordenados});
          }
    }
}

export const mostrarTodos = (page) =>{
    return async function(dispatch, getState){
        dispatch({type: CAMBIAR_PAG_A_1, payload:0})
        const request = await axios.get("http://localhost:3001/dogs");
        const data = request.data;
        dispatch({type:SET_DOGS_FOR_STATE, payload:data});
        dispatch({type: CAMBIAR_PAG_A_1, payload: 1});
    }
}

export const prevPage = () => {
    return {type: SET_PREV_PAGE}
}



export const nextPage = () => {
    return { type: SET_NEXT_PAGE }

}

export const getTemperaments = () =>{
    return async function(dispatch){
        const temperamentsReq = await axios.get("http://localhost:3001/temperaments");
        const temperamentsData = temperamentsReq.data
        dispatch({type: GET_TEMPERAMENTS, payload: temperamentsData })
    }
}


export const filtrarPorTemperamentos = (temp) => {
  return async function (dispatch, getState) {
    const { dogs} = getState();
    const filtro = dogs.filter((element) => {
      if (element) {
        if (element.temperament) {
          return element.temperament.includes(temp);
        } else if (element.temperaments) {
          return element.temperaments.some((temperament) =>
            temperament.name.includes(temp)
          );
        }
      }
      return false;
    });
    dispatch({ type: SET_DOGS_FOR_STATE, payload: filtro });
  };
};

export const setFiltroPorTemperamento = (filtro) => {
  return({type: SET_FILTRO_TEMPERAMENTO, payload: filtro})
}




export const changeHayFiltro = (arg1, arg2) => {
    return function(dispatch){
        dispatch({type: CHANGE_FILTRO, payload:{estado: arg1, tipoDeFiltro: arg2}})
    }
}

export const cambiarPaginaAUno = () => {
    return function(dispatch){
        dispatch({type: CAMBIAR_PAG_A_1, payload: 1})
    }
}

export const filtrarDogsSoloApi = (page) => {
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/dogs/api");
        const data = response.data
        dispatch({type: SET_DOGS_FOR_STATE, payload: data})
        dispatch(paginado(page))
    }

}

export const filtrarDogsSoloBdd = (page) => {
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/dogs/bdd");
        const data = response.data;
        dispatch({ type: SET_DOGS_FOR_STATE, payload: data });
        dispatch(paginado(page));
    } 

}
/////////////////////////////////////////////////////////ORDENAMIENTOS


export const ordenamientos = (ordType,page) => {
  return function (dispatch, getState) {
    const {filtroDeTemperamento, dogsOrdenados, dogs } = getState();
    switch (ordType) {
      case "alfAsc":
      if (filtroDeTemperamento !== "") {
        const sortAlfAsc = dogsOrdenados.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        dispatch({ type: SET_DOGS_FOR_STATE, payload: sortAlfAsc });
        dispatch(paginado(page));
      } else {
        const sortAlfAsc = dogs.sort((a, b) => a.name.localeCompare(b.name));
        dispatch({ type: SET_DOGS_FOR_STATE, payload: sortAlfAsc });
        dispatch(paginado(page));
      }
        break;

      case "alfDesc":
        if(filtroDeTemperamento !== ""){
          const sortAlfDesc = dogsOrdenados.sort((a, b) => b.name.localeCompare(a.name));
          dispatch({type: SET_DOGS_FOR_STATE, payload: sortAlfDesc});
          dispatch(paginado(page));
        } else {
          const sortAlfDesc = dogs.sort((a, b) => b.name.localeCompare(a.name));
          dispatch({type: SET_DOGS_FOR_STATE, payload: sortAlfDesc});
          dispatch(paginado(page));
        }
        break;

      case "pesoAsc":
        function extractingWeight(weightString){
          if(weightString && weightString.includes("-")){
            const peso = weightString.split(' - ');
            return Math.min(...peso.map(Number));
          } else {
            return Number(weightString)
          }
        }
        if(filtroDeTemperamento !== ""){
          const sortingPesoAsc = dogsOrdenados.sort((a, b) => extractingWeight(a.weight) - extractingWeight(b.weight));
          dispatch({type: SET_DOGS_FOR_STATE, payload: sortingPesoAsc});
          dispatch(paginado(page));
        } else {
           const sortingPesoAsc = dogs.sort((a, b) => extractingWeight(a.weight) - extractingWeight(b.weight));
           dispatch({ type: SET_DOGS_FOR_STATE, payload: sortingPesoAsc });
           dispatch(paginado(page));
        }
        break;

      case "pesoDesc":
        if(filtroDeTemperamento !== ""){
          const sortingPesoDesc = dogsOrdenados.sort((a, b) => extractingWeight(b.weight) - extractingWeight(a.weight));
          dispatch({type: SET_DOGS_FOR_STATE, payload: sortingPesoDesc});
          dispatch(paginado(page));
        } else {
           const sortingPesoDesc = dogs.sort((a, b) => extractingWeight(b.weight) - extractingWeight(a.weight));
           dispatch({ type: SET_DOGS_FOR_STATE, payload: sortingPesoDesc });
           dispatch(paginado(page));
        }
        break;
      default:
        break;
    }
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getDetailedDog = (id) => {
    return async function(dispatch){
        fetch(`http://localhost:3001/dogs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`error HTTP status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => dispatch({ type: GET_DETAILED_DOG, payload: data }))
      .catch((error) => {
        console.log("Error:", error);
      });
  };
}

export const searchDogsByName = (input,page) => {
    return async function(dispatch,getState){
        const request = axios.get(`http://localhost:3001/dogs/query/?name=${input}`);
        const data = (await request).data
        dispatch({ type: CAMBIAR_PAG_A_1 , payload: 1});
        dispatch({ type: SET_DOGS_FOR_DOGS_EN_PAGINA, payload: data });
       const {dogsEnPagina} = getState()
        const endSlice = page * 8;
        const initialSlice = endSlice - 8;
        const slicingDogs = data.slice(initialSlice, endSlice);
        const paginasDisponibles = Math.ceil(dogsEnPagina.length / 8);
        dispatch({ type: SET_MAX_PAGES, payload: paginasDisponibles });

    }
}

export const defaultImage = () => {
  return {type: DEFAULT_IMAGE, payload: "https://i.ibb.co/stVJs4r/29c9dd9b-0c22-4330-8d87-2498e00c5a8a.jpg"}
  }



export const limpiarEstadoEnPagina = () => {
  return{type:LIMPIAR_ESTADO_EN_PAGINA, payload: undefined}
}


export const clearDetailedDog = () => {
  return{ type: CLEAR_DETAILED_DOG, payload: []};
}

export const limpiarEstadoDog = () => {
  return{ type: LIMPIAR_ESTADO_DOG, payload: []};
}