import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/TableWallets.module.css';

function TableDash() {
    const wallets = useSelector((state) => state.wallets.value);
    console.log("wallets", wallets)

    const value = useSelector((state) => state.value.value);

    // on map sur cryptoData pour avoir une ligne par crypto et non pas une ligne par wallet
    const tableData = value.cryptoData.map((crypto, index) => {
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