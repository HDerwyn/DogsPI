import {
  SET_DOGS_FOR_STATE,
  SET_DOGS_FOR_DOGS_EN_PAGINA,
  SET_PREV_PAGE,
  SET_NEXT_PAGE,
  GET_TEMPERAMENTS,
  FILTRO_POR_TEMPERAMENTOS,
  CHANGE_FILTRO,
  CAMBIAR_PAG_A_1,
  SET_MAX_PAGES,
  GET_DETAILED_DOG,
  DEFAULT_IMAGE,
  SET_FILTRO_ANTERIOR,
  SET_FILTRO_TEMPERAMENTO,
  LIMPIAR_ESTADO_EN_PAGINA,
  CLEAR_DETAILED_DOG,
  LIMPIAR_ESTADO_DOG,
  SET_DOGS_ORDENADOS,
} from "./actions";



const initialState = {
  dogs: undefined,
  detailedDog:[],
  dogsParaFiltros: undefined,
  page: 1,
  paginasDisponibles:'',
  dogsEnPagina: undefined,
  temperaments: "",
  hayFiltro: {estado:false,
              tipoDeFiltro:""},
  defaultImage:"",
  filtroDeTemperamento:"",
  dogsOrdenados:[],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_DOGS_FOR_STATE:
      return{...state, dogs: action.payload};

    case SET_DOGS_FOR_DOGS_EN_PAGINA:
      return{...state, dogsEnPagina: action.payload};

    case SET_PREV_PAGE:
      return{...state, page: state.page - 1};

    case SET_NEXT_PAGE:
      return{...state, page: state.page + 1};

    case GET_TEMPERAMENTS:
      return{...state, temperaments: action.payload};

    case FILTRO_POR_TEMPERAMENTOS:
      return { ...state, dogsParaFiltros: action.payload };

    case CHANGE_FILTRO:
      return {...state, hayFiltro: {estado:action.payload.estado, tipoDeFiltro: action.payload.tipoDeFiltro}};

    case CAMBIAR_PAG_A_1:
      return {...state, page: action.payload};

    case SET_MAX_PAGES:
      return {...state, paginasDisponibles: action.payload};

    case GET_DETAILED_DOG:
      return {...state, detailedDog: action.payload};

    case SET_FILTRO_ANTERIOR:
      return {...state, filtroAnterior: action.payload};

    case DEFAULT_IMAGE:
      return {...state, defaultImage: action.payload};

    case SET_FILTRO_TEMPERAMENTO:
      return{...state, filtroDeTemperamento: action.payload};

    case LIMPIAR_ESTADO_EN_PAGINA:
      return {...state, dogsEnPagina: action.payload};

    case CLEAR_DETAILED_DOG:
      return {...state, detailedDog: action.payload}

    case LIMPIAR_ESTADO_DOG:
      return {...state, dogs: action.payload}

    case SET_DOGS_ORDENADOS:
      return {...state, dogsOrdenados: action.payload}

    default:
      return { ...state };
  }
};


export default rootReducer;