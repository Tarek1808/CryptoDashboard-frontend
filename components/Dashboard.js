
export default Dashboard;
import styles from '../styles/Wallets.module.css';
import MenuBar from './MenuBar';
import Header from './Header';
import React, { useState } from 'react';
import TableDash from './TableDash';

function Dashboard() {
  const [totalValue, setTotalValue] = useState(15555);
    const [percentageChange, setPercentageChange] = useState(10);
    const [lastUpdateDate, setLastUpdateDate] = useState('10/05/2024');
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
            Dashboard
          </h1>
          <div className={styles.table}>
            Tableau Dashboard
            <div className={styles.summary}>
                <h2>{totalValue} $</h2>
                <p>+{percentageChange}% since the {lastUpdateDate}</p>
            </div>
            <TableDash />
          </div>
        </div>
      </div>
      <p><a href="http://localhost:3001/">Login</a></p>
      <p><a href="http://localhost:3001/addWallet">AddWallet</a></p>
      <p><a href="http://localhost:3001/wallets">Wallets</a></p>
    </div>
  );
}
