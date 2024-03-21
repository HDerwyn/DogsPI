import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css"; // Asegúrate de importar tu archivo CSS

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.landing}>
      <h1 className={styles.title}>Dogs API by Derwyn</h1>
      <button className={styles.home} onClick={() => navigate("/home")}>
        HOME
      </button>
    </div>
  );
};

export default LandingPage;
