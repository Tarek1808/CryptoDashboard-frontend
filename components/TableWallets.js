import React, { useEffect, useState } from 'react';
import styles from '../styles/TableWallets.module.css';
import { useSelector } from 'react-redux';

function TableWallets() {

    const user = useSelector((state) => state.user.value)

    const [listWallets, setListWallets] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/wallet/${user.data._id}`)
            .then(response => response.json())
            .then(data => {
                console.log("data fetch get wallet", data)
                setListWallets(data.listWallets)
            })
    }, [])

    const tableData = listWallets.map((item, index) => (
        <tr key={index}>
            <td>{item.blockchain}</td>
            <td>{item.address}</td>
            <td><button className={styles.deleteButton}>X</button></td>
        </tr>
    ));
    console.log("listWallets",listWallets)
    console.log("tableData",tableData)

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
