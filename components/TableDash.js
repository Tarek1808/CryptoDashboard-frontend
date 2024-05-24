import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/TableWallets.module.css';

function TableDash() {
    
    const wallets = useSelector((state) => state.wallets.value);
    console.log("wallets", wallets)

    const tableData = wallets.map((item, index) => {
        if (item.holdings.length > 0) {
            const { crypto, quantity } = item.holdings[0]
            return (
                <tr key={index}>
                    <td>{crypto.name}</td>
                    <td>{quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.totalValue}</td>
                </tr>
            )
        } else return
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