
export default Dashboard;
import styles from '../styles/Wallets.module.css';
import MenuBar from './MenuBar';
import Header from './Header';
import React from 'react';
import TableDash from './TableDash';
import { useSelector } from 'react-redux';

function Dashboard() {
  const wallets = useSelector((state) => state.wallets.value);
  console.log("wallets", wallets)

  const value = useSelector((state) => state.value.value)
  const totalValueThisConnection = value.totalValue
  console.log("value", value)

  const user = useSelector((state) => state.user.value)
  const valueLastConnection = user.totalValue[user.totalValue.length - 1].value
  const dateLastConnection = user.totalValue[user.totalValue.length - 1].date
  const date = new Date(dateLastConnection);
    const formattedDate = date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const percentageChange = ((totalValueThisConnection-valueLastConnection)/totalValueThisConnection)*100

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
            <div className={styles.summary}>
              <h2>{totalValueThisConnection.toFixed(2)} $</h2>
              <p>{percentageChange.toFixed(2)}% since your last connection ({formattedDate})</p>
            </div>
            <TableDash />
          </div>
        </div>
      </div>
    </div>
  );
}
