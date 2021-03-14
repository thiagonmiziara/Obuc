import styles from "./SideNav.module.css";
import SettingsIcon from "@material-ui/icons/Settings";

const SideNav = () => {
  return (
    <nav className={styles.container}>
        <h2 className={styles.subtitle}>
          <SettingsIcon
            style={{ width: "15px", height: "15px", marginRight: "8px", color: "#fff"}}
          />
          Adimistração
        </h2>
      <div className={styles.containerButton}>
        <button className={styles.button}>Administradores</button>
        <button className={styles.button}>Àreas</button>
        <button className={styles.button}>Locais de Trabalho</button>
        <button className={styles.button}>Habilidades</button>
        <button className={styles.button}>Log</button>
        <button className={styles.button}>Responsáveis</button>
      </div>
    </nav>
  );
};

export default SideNav;
