import Card from "../Card/Card"
import styles from "./Cards.module.css";




const Cards = (props) => {

  const {dogs} = props

  return (
    <div className={styles.container}>
      {dogs &&
        Array.isArray(dogs) &&
        dogs.map((dog, index) => {
          return <Card key={index} dogs={dog} />;
        })}
    </div>
  );
};





export default Cards;