import styles from '../styles/Wallets.module.css';
import MenuBar from './MenuBar';
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
          <MenuBar />
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
    </div>
  );
}

export default Wallets;
