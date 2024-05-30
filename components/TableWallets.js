import React from "react";
import styles from "../styles/TableWallets.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadWallets } from "../reducers/wallets";
import { updateData, updateTotalValue } from "../reducers/value";

const BACKEND_ADDRESS = "https://crypto-dashboard-backend-gamma.vercel.app";

function TableWallets() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  console.log("user:", user);
  const wallets = useSelector((state) => state.wallets.value);
  console.log("wallets:", wallets);

  const handleDelete = (address) => {
    const token = user.token;
    fetch(`${BACKEND_ADDRESS}/users/${token}/removeWallet`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("fetch remove wallet route put ok");
          fetch(`${BACKEND_ADDRESS}/wallet`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.result) {
                console.log("fetch delete wallet ok");
                fetch(`${BACKEND_ADDRESS}/wallet/${token}`)
                  .then((response) => response.json())
                  .then((dataWallets) => {
                    console.log("data fetch get wallet dashboard", dataWallets);
                    const { listWallets } = dataWallets;
                    dispatch(loadWallets(listWallets));

                    if (listWallets.length < 0) return;

                    const cryptoMap = {};
                    // on boucle sur chaque adresse et on prend la 1ère ligne (on a qu'une crypto par wallet)
                    // si la crypto est déjà dans le tableau cryptoData, on ajoute la quantité et la value aux valeurs existantes
                    // si la crypto n'est pas dans cryptoData, on créé un nouvel élément dans le tableau et on initialise la quantité et value à 0
                    listWallets.forEach((wallet) => {
                      if (wallet.holdings.length === 0) return;

                      const { crypto, quantity } = wallet.holdings[0];
                      if (!cryptoMap[crypto.name]) {
                        cryptoMap[crypto.name] = {
                          name: crypto.name,
                          price: Number(crypto.price),
                          quantity: 0,
                          value: 0,
                        };
                      }
                      cryptoMap[crypto.name].quantity += quantity;
                      cryptoMap[crypto.name].value += quantity * crypto.price;
                    });
                    console.log("cryptomap:", cryptoMap);
                    // conversion en tableau car plus facilement exploitable
                    const aggregatedData = Object.values(cryptoMap);
                    dispatch(updateData(aggregatedData));

                    // on boucle sur le tableau aggregatedData pour calculer la value total des wallets et envoyer la valeur au reducer afin de l'afficher
                    // on envoie également le nom et la quantité de chaque crypto pour avoir des données pour le graphe camembert de la page reporting
                    let totalValue = 0;
                    aggregatedData.forEach((crypto) => {
                      totalValue += crypto.value;
                    });
                    console.log("total value:", totalValue);
                    dispatch(updateTotalValue(totalValue));
                  });
              } else {
                console.log("erreur delete wallet");
              }
            });
        } else {
          console.log("erreur remove wallet");
        }
      });
  };

  const tableData = wallets?.map((item, index) => (
    <tr key={index}>
      <td className={styles.smallColumn}>{item.blockchain}</td>
      <td>{item.address}</td>
      <td className={styles.smallColumn}>
        <button
          className={styles.deleteButton}
          onClick={() => handleDelete(item.address)}
        >
          X
        </button>
      </td>
    </tr>
  ));
  console.log("tableData", tableData);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Blockchain</th>
            <th>Address</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
}

export default TableWallets;
