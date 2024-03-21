import Cards from "../../components/Cards/Cards"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getDogsForHome,
  prevPage,
  nextPage,
  filtrarPorTemperamentos,
  defaultImage,
  paginado,
} from "../../redux/actions";
import styles from "./Home.module.css"


const Home = () => {
  const dispatch = useDispatch();
  
  const page = useSelector((state) => state.page);
  const dogs = useSelector((state) => state.dogsEnPagina);
  const paginasDisponibles = useSelector((state) => state.paginasDisponibles)
  const filtroPorTemperamento = useSelector((state) => state.filtroDeTemperamento)


  const prevButton = () =>{
    if(page > 1)
    dispatch(prevPage());
    dispatch(paginado(page));
  }
  const nextButton = () =>{
    if(page < paginasDisponibles)
    dispatch(nextPage()); 
    dispatch(paginado(page)); 
  }
  
  useEffect(()=>{
    dispatch(defaultImage());
  },[dispatch])

  useEffect(() => {
    if(filtroPorTemperamento !== ""){
      console.log("despachando filtro por temperamento");
      dispatch(filtrarPorTemperamentos(filtroPorTemperamento));
      dispatch(getDogsForHome(page));
    } else {
      dispatch(getDogsForHome(page));
    }  
}, [dispatch, filtroPorTemperamento, page]);       


  return (
    <div className={styles.home}>
      <Cards dogs={dogs} />
      <div className={styles.paginaContainer}>
        <h2 className={styles.pagina}>pagina: {page}</h2>
        <h2 className={styles.pagina}> paginas disponibles: {paginasDisponibles}{" "}
        </h2>
        <button className={styles.button} onClick={() => {prevButton();}}>
          Anterior
        </button>
        <button className={styles.button} onClick={() => {nextButton();}}>
          Siquiente
        </button>
      </div>
    </div>
  );
};








export default Home;