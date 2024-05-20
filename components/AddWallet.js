import React from 'react';
import styles from '../styles/AddWallet.module.css';
<<<<<<< HEAD
import Menubar from './Menubar';
import AddBlockchain from './AddBlockchain';
=======
import Header from './Header';

>>>>>>> 851cf625ae4b53e2f779706e7abe1b65008c7e6d

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
