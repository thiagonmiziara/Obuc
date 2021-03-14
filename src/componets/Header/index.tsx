import styles from "./Header.module.css";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Controle de Locais de Trabalho</h1>
        </div>

        <div className={styles.container}>
          <div>
            <HomeOutlinedIcon
              style={{ color: "#ffff", width: "50px", height: "100px" }}
            />
            |
            <PermIdentityIcon
              style={{ color: "#ffff", width: "50px", height: "100px" }}
            />
          </div>
          <div className={styles.subtitle}>
            <h4>Usuário</h4>
            <p>Administrador</p>
          </div>
        </div>
      </header>
      
    </>
  );
};

export default Header;
