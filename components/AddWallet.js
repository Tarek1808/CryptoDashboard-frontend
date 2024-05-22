import React, { useState } from 'react';
import styles from '../styles/AddWallet.module.css';
import MenuBar from './MenuBar';
import WalletForm from './WalletForm';
import Header from './Header';
import { useRouter } from 'next/router';

function AddWallet() {
    const router = useRouter()
    const [blockchains, setBlockchains] = useState([0])

    const handleAddBlockchain = () => {
        setBlockchains([...blockchains, blockchains.length])
    }

    return (
        <div>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <div className={styles.menubar}>
                    <MenuBar />
                </div>
                <div className={styles.rightContent}>
                    <h1 className={styles.title}>
                        Add Wallet
                    </h1>
                    <div className={styles.blockchain}>
                        <div className={styles.table}>
                            {blockchains.map((index) => (
                                <WalletForm key={index} />
                            ))
                            }
                        </div>
                        <button onClick={() => handleAddBlockchain()}>+</button>
                    </div>


                </div>
                <div className={styles.links}>
                    <p onClick={()=> router.push('/')}>Login</p>
                    <p onClick={()=> router.push('/addWallet')}>AddWallet</p>
                    <p onClick={()=> router.push('/wallets')}>Wallets</p>
                </div>
            </div>
        </div>
    );
}

export default AddWallet;
