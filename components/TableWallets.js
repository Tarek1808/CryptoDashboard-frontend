import React from 'react';
import styles from '../styles/TableWallets.module.css';

function TableWallets() {

    const data = [
        {
            blockchain: "BTC",
            address: "XHFKSOfezou32nenerun23",
        },
        {
            blockchain: "SOL",
            address: "XHFKSOfezou32nenerun23",
        },
        {
            blockchain: "ETH",
            address: "XHFKSOfezou32nenerun23",
        },
    ];

    const tableData = data.map((item, index) => (
        <tr key={index}>
            <td>{item.blockchain}</td>
            <td>{item.address}</td>
            <td><button className={styles.deleteButton}>X</button></td>
        </tr>
    ));

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
                <tbody>
                    {tableData}
                </tbody>
            </table>
        </div>
    );
}

export default TableWallets;
