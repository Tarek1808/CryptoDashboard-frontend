import styles from '../styles/Wallets.module.css';
import Menubar from './Menubar';
import Header from './Header';
import TableWallets from './TableWallets';

function Wallets() {
  return (
    <div>
      <Header />
      <Menubar />
      <main className={styles.main}>
        <h1 className={styles.title}>
          <TableWallets />
        </h1>
        <p><a href="http://localhost:3001/">Login</a></p>
        <p><a href="http://localhost:3001/addWallet">AddWallet</a></p>
        <p><a href="http://localhost:3001/wallets">Wallets</a></p>
      </main>
    </div >
  );
}

export default Wallets;
