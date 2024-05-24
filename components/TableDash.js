import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadWallets, removeWallet } from '../reducers/wallets';
import styles from '../styles/TableWallets.module.css';

function TableDash() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const wallets = useSelector((state) => state.wallets.value);

    useEffect(() => {
        if (user.data) {
            fetch(`http://localhost:3000/wallet/${user.data.token}`)
                .then(response => response.json())
                .then(data => {
                    dispatch(loadWallets(data.listWallets));
                });
        }
    }, [user.data, dispatch]);

    const handleDelete = (address) => {
        const token = user.data.token;
        fetch(`http://localhost:3000/users/${token}/removeWallet`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    fetch('http://localhost:3000/wallet', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ address }),
                    }).then(response => response.json())
                        .then(data => {
                            if (data.result) {
                                dispatch(removeWallet(address));
                            }
                        });
                }
            });
    };

    const tableData = wallets.map((item, index) => (
        <tr key={index}>
            <td>{item.crypto}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.totalValue}</td>
            <td><button className={styles.deleteButton} onClick={() => handleDelete(item.address)}>X</button></td>
        </tr>
    ));

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