import React from 'react';
import styles from '../styles/TableWallets.module.css';


function TableWallets() {

    const data = [
        {
            blockchain:"BTC",
            address:"XHFKSOfezou32nenerun23",
        },
        {
            blockchain:"SOL",
            address:"XHFKSOfezou32nenerun23",
        },
        {
            blockchain:"ETH",
            address:"XHFKSOfezou32nenerun23",
        },
    ]

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Blockchain</th>
                        <th>Address</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.blockchain}</td>
                            <td>{item.address}</td>
                            <td><button>X</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableWallets;
