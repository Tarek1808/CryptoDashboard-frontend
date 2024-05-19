import styles from '../styles/Wallets.module.css';

function Wallets() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Wallets
        </h1>
        <p><a href="http://localhost:3001/">Login</a></p>
        <p><a href="http://localhost:3001/addWallet">AddWallet</a></p>
        <p><a href="http://localhost:3001/wallets">Wallets</a></p>
      </main>
    </div >
  );
}

export default Wallets;
