import React from 'react';
import styles from '../styles/AddWallet.module.css';
import Menubar from './Menubar';
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
            
            </main>
        </div>
    );
}

export default AddWallet;
