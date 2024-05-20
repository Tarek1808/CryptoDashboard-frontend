import styles from '../styles/AddWallet.module.css';


function Menubar() {
  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <div className={styles.menuItem} onClick={() => {}}>Dashboard</div>
        <div className={styles.menuItem} onClick={() => {}}>Reporting</div>
        <div className={styles.menuItem} onClick={() => {}}>News</div>
        <div className={styles.menuItem} onClick={() => {}}>Wallet</div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Add Wallet</h1>
        <p><a href="http://localhost:3001/">Login</a></p>
        <p><a href="http://localhost:3001/addWallet">AddWallet</a></p>
        <p><a href="http://localhost:3001/wallets">Wallets</a></p>
      </div>
    </div>
  );
}

export default Menubar;