import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/TableWallets.module.css';
import { updateValue, updateTotalValue } from '../reducers/value';

function TableDash() {
    const dispatch = useDispatch()
    const wallets = useSelector((state) => state.wallets.value);
    console.log("wallets", wallets)

    const [cryptoData, setCryptoData] = useState([]);
    let [totalValue, setTotalValue] = useState(0)
    console.log("crypto data:", cryptoData)

    useEffect(() => {
        const cryptoMap = {};
        // on boucle sur chaque adresse et sur chaque crypto dans le wallet (actuellement on a qu'une crypto par wallet)
        // si la crypto est déjà dans le tableau cryptoData, on ajoute la quantité et la value aux valeurs existantes
        // si la crypto n'est pas dans cryptoData, on créé un nouvel élément dans le tableau et on initialise la quantité et value à 0
        wallets.forEach(wallet => {
            wallet.holdings.forEach(holding => {
                const { crypto, quantity } = holding;
                if (!cryptoMap[crypto.name]) {
                    cryptoMap[crypto.name] = {
                        name: crypto.name,
                        price: Number(crypto.price),
                        quantity: 0,
                        value: 0
                    };
                }
                cryptoMap[crypto.name].quantity += quantity;
                cryptoMap[crypto.name].value += quantity * crypto.price;
            });
        });
        console.log("cryptomap:", cryptoMap)
        // conversion en tableau car plus facilement exploitable
        const aggregatedData = Object.values(cryptoMap);
        setCryptoData(aggregatedData);

        // on boucle sur le tableau cryptoData pour calculer la value total des wallets et envoyer la valeur au reducer afin de l'afficher
        // on envoie également le nom et la quantité de chaque crypto pour avoir des données pour le graphe camembert de la page reporting
        let totalValueTemp = 0
        cryptoData.forEach(crypto => {
            const { name, quantity, value } = crypto
            totalValueTemp += value
            dispatch(updateValue({ name, quantity }))
        })
        setTotalValue(totalValueTemp)
        console.log("total value:", totalValue)
        dispatch(updateTotalValue(totalValue))
    }, [wallets]);

    // on map sur cryptoData pour avoir une ligne par crypto et non pas une ligne par wallet
    const tableData = cryptoData.map((crypto, index) => {
        const { name, quantity, price, value } = crypto
        return (
            <tr key={index}>
                <td>{name}</td>
                <td>{quantity.toFixed(6)}</td>
                <td>{price.toFixed(2)}</td>
                <td>{value.toFixed(2)}</td>
            </tr>
        )
    });

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Crypto</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        </div>
    );
}

export default TableDash;