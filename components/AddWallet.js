import styles from '../styles/AddWallet.module.css';

function AddWallet() {
    return (
        <div>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Add Wallet
                </h1>
                <p><a href="http://localhost:3001/">Login</a></p>
                <p><a href="http://localhost:3001/addWallet">AddWallet</a></p>
                <p><a href="http://localhost:3001/wallets">Wallets</a></p>
            </main>
        </div >
    );
}

export default AddWallet;
