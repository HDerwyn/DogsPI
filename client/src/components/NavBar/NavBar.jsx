import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getTemperaments,
  cambiarPaginaAUno,
  searchDogsByName,
  mostrarTodos,
  setFiltroPorTemperamento,
  paginado,
  limpiarEstadoDog,
  ordenamientos,
  filtrarDogsSoloApi,
  filtrarDogsSoloBdd,
} from "../../redux/actions";
import { useState } from "react";
import styles from "./NavBar.module.css";



const NavBar = () => {

  const dispatch = useDispatch();
  const [tempChange, setTempChange] = useState("");
  const [origenChange, setOrigenChange] = useState("");
  const [ordenamientosChange, setOrdenamientosChange] = useState("");
  const [buscarInput, setBuscarInput] = useState("");
  const navigate = useNavigate();

  const temperaments = useSelector((state) => state.temperaments);
  const page = useSelector((state) => state.page )
  const dogs = useSelector((state) => state.dogsEnPagina);





  useEffect(()=>{
    dispatch(getTemperaments())
  },[dispatch])

  const handleTempChange = (event) => {
    setTempChange(event.target.value);
    if(tempChange === ""){
      dispatch(mostrarTodos())
    }
    dispatch(cambiarPaginaAUno());
    dispatch(limpiarEstadoDog());
    dispatch(mostrarTodos())
    dispatch(setFiltroPorTemperamento(event.target.value));
  }

  const handleFiltroPorOrigen = (event) => {
    switch (event.target.value) {
      case "API":
        dispatch(filtrarDogsSoloApi(page));
        
        break;
      case "BDD":
        dispatch(filtrarDogsSoloBdd(page));
        console.log("entre en el case BDD");
        break;
      default:
        break;
    }
  }

  const handleOrdenamientos = (event) => {
    setOrdenamientosChange(event.target.value);
    console.log(event.target.value);
    dispatch(ordenamientos(event.target.value,page));
  }

  const mostrarTodosClick = (event) => {
    navigate(`/home`);
    dispatch(mostrarTodos(page));
    dispatch(setFiltroPorTemperamento(""));
    dispatch(paginado(page));
    setTempChange("");
  }

const handleBuscarInput = (event) =>{
  setBuscarInput(event.target.value)
}

const handleBuscarClick = () => {
  if(buscarInput.length < 3){

    alert("el minimo de caracteres para buscar deben ser 3")
    
  } else{
    
    dispatch(searchDogsByName(buscarInput,page));
    dispatch(cambiarPaginaAUno()); 

  }
}



  return (
    <div className={styles.navbar}>
      <div>
        <input onChange={handleBuscarInput} type="text" />
        <button  onClick={()=>{handleBuscarClick()}} className={styles.homeButton}>Buscar</button>
        <button  onClick={() => { navigate(`/formPage`); }} className={styles.homeButton}>Crear Perro</button>
      </div>

      <div>
        <select
          className={styles.select}
          onChange={handleTempChange}
          value={tempChange}
        >
          <option value="">Filtrar por Temperamento</option>
          {temperaments &&
            Array.isArray(temperaments) &&
            temperaments.map((temperaments, index) => {
              return (
                <option value={temperaments} key={index}>
                  {temperaments}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <select
          className={styles.select}
          onChange={handleFiltroPorOrigen}
          value={origenChange}
        >
          <option value="">Filtrar por Origen</option>
          <option value="API">API</option>
          <option value="BDD">Base de Datos</option>
        </select>
      </div>
      <div>
        <select
          className={styles.select}
          onChange={handleOrdenamientos}
          value={ordenamientosChange}
        >
          <option value="">Ordenamientos</option>
          <option value="alfAsc">Alfabetico Ascendente</option>
          <option value="alfDesc">Alfabetico Descendente</option>
          <option value="pesoAsc">Peso Ascendente</option>
          <option value="pesoDesc">Peso Descendente</option>
        </select>
      </div>
      <div>
        <button
          className={styles.homeButton}
          onClick={(event) => mostrarTodosClick(event)}
          value="todos"
        >
          mostrar todos
        </button>
        <div>
          <button
            className={styles.homeButton}
            onClick={() => {
              navigate(`/home`);
            }}
          >
            ir a Home
          </button>
        </div>
      </div>
    </div>
  );
};





export default NavBar;
