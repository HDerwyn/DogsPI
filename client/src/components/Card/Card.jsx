import { useSelector } from "react-redux";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";

const Card = (props) => {

  
  const navigate = useNavigate();

  const defaultImage = useSelector((state) => state.defaultImage);

  const { id, name, image, temperaments, temperament, height, weight } = props.dogs;

  const handleError = (e) => {
    e.target.onerror = null; 
    e.target.src = defaultImage;
  };

  const renderizandoTemperaments = () => {
    if (Array.isArray(temperaments)) {
      return (
        <ul>
          {temperaments.map((element, index) => (
            <li className={styles.li} key={index}>{element.name}</li>
          ))}
        </ul>
      );
    } else {
      return <p className={styles.li}>{temperament}</p>;
    }
  };

  return (
    <div onClick={() => { navigate(`/detail/${id}`); }} className={styles.card}>
      <h3>id: {id}</h3>
      <h3>nombre: {name}</h3>
      <img src={image} alt={name} onError={handleError} />
      <div className={styles.li}>Temperamentos: {renderizandoTemperaments()}</div>
      <h3>altura: {height}</h3>
      <h3>peso: {weight}</h3>
    </div>
  );
};

export default Card;

