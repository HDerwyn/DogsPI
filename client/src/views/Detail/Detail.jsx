import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailedDog, clearDetailedDog } from "../../redux/actions";
import styles from "./Detail.module.css";




const Detail = () => {

  const detailedDog = useSelector((state) => state.detailedDog);
  const defaultImage = useSelector((state) => state.defaultImage);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetailedDog(id));

  return()=>{
    dispatch(clearDetailedDog());
  }
  }, [dispatch, id]);

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImage;
  };

  const { name, image, temperament, temperaments, height, weight, lifetime } =
    detailedDog;

    console.log(detailedDog);

    const renderizandoTemperaments = () => {
      if (Array.isArray(temperaments)) {
        return (
          <ul>
            {temperaments.map((element, index) => (
              <li className={styles.li} key={index}>
                {element.name}
              </li>
            ))}
          </ul>
        );
      } else {
        return <p className={styles.li}>{temperament}</p>;
      }
    };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.detailContainer}>
        <h3>id: {id}</h3>
        <h2>Nombre: {name}</h2>
        <img className={styles.detailImage} src={image} alt={name}  onError={handleError} />
        <h4 className={styles.detailText}>Temperamento: {renderizandoTemperaments()}</h4>
        <h4 className={styles.detailText}>Altura: {height}</h4>
        <h4 className={styles.detailText}>Peso: {weight}</h4>
        <h4 className={styles.detailText}>Años de vida: {lifetime}</h4>
      </div>
    </div>
  );
};

export default Detail;
