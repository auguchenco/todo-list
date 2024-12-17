import DefaultPage from "../../components/defaultPage/DefaultPage";
import styles from "./home.styles.module.scss";
import { useState, useEffect } from "react";

const Home = () => {
  const welcomes = [
    { welcome: "Welcome!", flag: "🇬🇧 🇺🇸" }, // Inglés
    { welcome: "Bienvenido!", flag: "🇪🇸 🇲🇽" }, // Español
    { welcome: "Добро пожаловать!", flag: "🇷🇺" }, // Ruso
    { welcome: "Bem-vindo!", flag: "🇵🇹 🇧🇷" }, // Portugués
    { welcome: "Willkommen!", flag: "🇩🇪" }, // Alemán
    { welcome: "Benvenuto!", flag: "🇮🇹" }, // Italiano
    { welcome: "Välkommen!", flag: "🇸🇪" }, // Sueco
    { welcome: "Bienvenue!", flag: "🇫🇷" }, // Francés
    { welcome: "Hoş geldiniz!", flag: "🇹🇷" }, // Turco
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setI((i) => i + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DefaultPage>
      <div className={styles.welcome}>
        <h1 className={styles.message}>
          {welcomes[i % welcomes.length].welcome}
        </h1>
        <h1 className={styles.flag}>{welcomes[i % welcomes.length].flag}</h1>
      </div>
    </DefaultPage>
  );
};

export default Home;
