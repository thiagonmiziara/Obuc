/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import styles from "./WorkTable.module.css";
import BusinessIcon from "@material-ui/icons/Business";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const predios = [
  { id: Math.random(), name: "Predio 1" },
  { id: Math.random(), name: "Predio 2" },
  { id: Math.random(), name: "Predio 3" },
  { id: Math.random(), name: "Predio 4" },
  { id: Math.random(), name: "Predio 5" },
];

interface LocaisTrabalhoData {
  id: number;
  predio: string | undefined;
  localTrabalho: string;
}

export default function Home() {
  const [arrLocaisTrabalho, setArrLocaisTrabalho] = useState<
    LocaisTrabalhoData[]
  >([]);
  const [localTrabalho, setLocalTrabalho] = useState<string>("");
  const [selectedPredio, setSelectedPredio] = useState<number>(0);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localTrabalhoEditing, setLocalTrabalhoEditing] = useState<number>(0);

  const [updatedPredio, setUpdatedPredio] = useState<string>("");
  const [updatedLocalTrabalho, setUpdatedLocalTrabalho] = useState<string>("");

  useEffect(() => {
    const data = sessionStorage.getItem("arrLocaisTrabalho");
    if (data === null) return;

    setArrLocaisTrabalho(JSON.parse(data));
  }, []);

  const handleAddLocalTrabalho = () => {
    if (localTrabalho === "" || selectedPredio === 0) {
      toast.error("Preencha os campos Prédio e Local de Trabalho!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    const data = {
      id: selectedPredio,
      predio: predios.filter((predio) => predio.id === selectedPredio)[0].name,
      localTrabalho: localTrabalho,
    };

    setLocalTrabalho("");
    setSelectedPredio(0);
    setArrLocaisTrabalho([data, ...arrLocaisTrabalho]);

    sessionStorage.setItem(
      "arrLocaisTrabalho",
      JSON.stringify([data, ...arrLocaisTrabalho])
    );

    toast.success("Local Adicionado com sucesso!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  const handleRemoveLocalTrabalho = (id: number) => {
    const filteredLocalTrabalho = arrLocaisTrabalho.filter(
      (local) => local.id !== id
    );

    setArrLocaisTrabalho(filteredLocalTrabalho);

    if (filteredLocalTrabalho.length === 0) {
      sessionStorage.removeItem("arrLocaisTrabalho");
      return;
    }

    sessionStorage.setItem(
      "arrLocaisTrabalho",
      JSON.stringify(arrLocaisTrabalho)
    );
  };

  const handleUpdateLocalTrabalho = () => {
    const updateLocaisTrabalho = arrLocaisTrabalho.map((local) => {
      if (local.id === localTrabalhoEditing) {
        toast.warning("Atualizado com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        return {
          id: local.id,
          predio: updatedPredio,
          localTrabalho: updatedLocalTrabalho,
        };
      }
      return local;
    });

    setArrLocaisTrabalho(updateLocaisTrabalho);

    sessionStorage.setItem(
      "arrLocaisTrabalho",
      JSON.stringify(updateLocaisTrabalho)
    );

    setIsEditing(false);
    setLocalTrabalhoEditing(0);
    setUpdatedPredio("");
    setUpdatedLocalTrabalho("");
  };

  return (
    <section>
      <div className={styles.title}>
        <h1>Locais de trabalho</h1>
      </div>
      <div className={styles.container}>
        <ToastContainer />
        <div style={{ marginBottom: "1rem" }}>
          <form>
            <div className={styles.formGroup}>
              <div>
                <label htmlFor="predio">
                  Prédio
                  <select
                    className={styles.formSelect}
                    id="predio"
                    onChange={(e) =>
                      setSelectedPredio(parseFloat(e.target.value))
                    }
                  >
                    <option key="0" selected={selectedPredio === 0}>
                      Selecione uma opção
                    </option>
                    {predios.map((predio) => (
                      <option key={predio.id} value={predio.id}>
                        {predio.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div>
                <label htmlFor="localTrabalho">
                  Local de Trabalho
                  <input
                    type="text"
                    className={styles.formInput}
                    id="localTrabalho"
                    placeholder="Local de trabalho"
                    value={localTrabalho}
                    onChange={(e) => setLocalTrabalho(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <button
                  type="button"
                  className={styles.button}
                  onClick={(e) => handleAddLocalTrabalho()}
                >
                  <strong>+</strong>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="table-responsive-sm">
          <table className="table table-bordered table-hover">
            <thead className={styles.thead}>
              <tr>
                <td>
                  {" "}
                  <BusinessIcon style={{ marginBottom: "5px" }} /> Prédio
                </td>
                <td>
                  {" "}
                  <WorkOutlineIcon style={{ marginBottom: "5px" }} /> Local de
                  trabalho
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {arrLocaisTrabalho.map((local) =>
                isEditing && localTrabalhoEditing === local.id ? (
                  <tr key={local.id}>
                    <td>
                      <select
                        className={styles.formSelect}
                        id="predio"
                        onChange={(e) => setUpdatedPredio(e.target.value)}
                      >
                        {predios.map((predio) => (
                          <option
                            key={predio.id}
                            selected={selectedPredio === predio.id}
                            value={predio.name}
                          >
                            {predio.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        className={styles.formInput}
                        type="text"
                        defaultValue={local.localTrabalho}
                        onChange={(e) =>
                          setUpdatedLocalTrabalho(e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <a onClick={() => handleUpdateLocalTrabalho()}>
                        <DoneAllIcon />
                      </a>
                      <a
                        onClick={() => {
                          setIsEditing(false);
                          setLocalTrabalhoEditing(0);
                        }}
                      >
                        <CancelIcon
                          style={{ color: "#6b6b6b", marginLeft: "5px" }}
                        />
                      </a>
                    </td>
                  </tr>
                ) : (
                  <tr key={local.id}>
                    <td>{local.predio}</td>
                    <td>{local.localTrabalho}</td>
                    <td>
                      <a
                        onClick={() => {
                          setIsEditing(true);
                          setLocalTrabalhoEditing(local.id);
                        }}
                      >
                        <EditIcon />
                      </a>
                      <a  onClick={() => handleRemoveLocalTrabalho(local.id)}>
                        <DeleteOutlineIcon style={{color:"#6b6b6b"}} />
                      </a>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
