import styles from '../styles/Wallets.module.css';
import Menubar from './Menubar';
import Header from './Header';
import TableWallets from './TableWallets';

function Wallets() {
  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.menubar}>
          <Menubar />
        </div>
        <div className={styles.rightContent}>
          <h1 className={styles.title}>
            Wallets
          </h1>
          <div className={styles.table}>
            <TableWallets />
          </div>
        </div>
      </div>
      <p><a href="http://localhost:3001/">Login</a></p>
      <p><a href="http://localhost:3001/addWallet">AddWallet</a></p>
      <p><a href="http://localhost:3001/wallets">Wallets</a></p>
    </div>
  );
}

export default Wallets;
