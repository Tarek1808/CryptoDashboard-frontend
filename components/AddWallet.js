import React from 'react';
import styles from '../styles/AddWallet.module.css';
import Menubar from './Menubar';
import AddBlockchain from './AddBlockchain';
import Header from './Header';


function AddWallet() {
    return (
        <div>
            <Menubar />
            <main className={styles.main}>
            <Header/>
                <h1 className={styles.title}>
                    Add Wallet
                
                </h1>
                <AddBlockchain />
            </main>
        </div>
    );
}

export default AddWallet;
