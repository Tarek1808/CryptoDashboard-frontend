import React, { useEffect, useState } from 'react';
import styles from '../styles/TableWallets.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadWallets, removeWallet } from '../reducers/wallets';

function TableWallets() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    console.log("user:", user)
    const wallets = useSelector((state) => state.wallets.value)
    console.log("wallets:", wallets)

    const [listWallets, setListWallets] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/wallet/${user.data.token}`)
            .then(response => response.json())
            .then(data => {
                console.log("data fetch get wallet", data)
                setListWallets(data.listWallets)
                dispatch(loadWallets(data.listWallets))
            })
    }, [])

    const handleDelete = (address) => {
        const token = user.data.token
        fetch(`http://localhost:3000/users/${token}/removeWallet`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    console.log("fetch remove wallet route put ok")
                    fetch('http://localhost:3000/wallet', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ address }),
                    }).then(response => response.json())
                        .then(data => {
                            if (data.result) {
                                console.log("fetch delete wallet ok")
                                dispatch(removeWallet(address))
                            } else {
                                console.log("erreur delete wallet")
                            }
                        });
                } else {
                    console.log("erreur remove wallet")
                }
            });
    }

    const tableData = wallets.map((item, index) => (
        <tr key={index}>
            <td>{item.blockchain}</td>
            <td>{item.address}</td>
            <td><button className={styles.deleteButton} onClick={() => handleDelete(item.address)}>X</button></td>
        </tr>
    ));
    // console.log("listWallets", listWallets)
    console.log("tableData", tableData)

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
