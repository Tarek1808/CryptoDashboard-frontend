import React, { useEffect, useState } from 'react';
import styles from '../styles/TableWallets.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadWallets, removeWallet } from '../reducers/wallets';

const BACKEND_ADDRESS = "http://localhost:3000"

function TableWallets() {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.value)
    console.log("user:", user)
    const wallets = useSelector((state) => state.wallets.value)
    console.log("wallets:", wallets)

    useEffect(() => {
        if(user.data) {
        fetch(`${BACKEND_ADDRESS}/wallet/${user.data.token}`)
            .then(response => response.json())
            .then(data => {
                console.log("data fetch get wallet", data)
                dispatch(loadWallets(data.listWallets))
            })
        }
    }, [])

    const handleDelete = (address) => {
        const token = user.data.token
        fetch(`${BACKEND_ADDRESS}/users/${token}/removeWallet`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    console.log("fetch remove wallet route put ok")
                    fetch(`${BACKEND_ADDRESS}/wallet`, {
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
