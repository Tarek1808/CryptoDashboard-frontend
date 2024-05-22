import styles from '../styles/Wallets.module.css';
import MenuBar from './MenuBar';
import Header from './Header';


function News() {
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
            News
          </h1>
          <div className={styles.table}>
            News API
          </div>
        </div>
      </div>
      <p><a href="http://localhost:3001/">Login</a></p>
      <p><a href="http://localhost:3001/addWallet">AddWallet</a></p>
      <p><a href="http://localhost:3001/wallets">Wallets</a></p>
    </div>
  );
}

export default News;
