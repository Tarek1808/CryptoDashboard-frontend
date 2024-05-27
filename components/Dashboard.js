
export default Dashboard;
import styles from '../styles/Wallets.module.css';
import MenuBar from './MenuBar';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import TableDash from './TableDash';
import { useSelector, useDispatch } from 'react-redux';
import { loadWallets } from '../reducers/wallets';

const BACKEND_ADDRESS = "http://localhost:3000"

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const token = user.data.token
  const wallets = useSelector((state) => state.wallets.value);
  console.log("wallets", wallets)
  const value = useSelector((state) => state.value.value)

  const [refresh, setRefresh] = useState(false)
  const [totalValue, setTotalValue] = useState(value.totalValue.toFixed(2));
  const [percentageChange, setPercentageChange] = useState(10);
  const [lastUpdateDate, setLastUpdateDate] = useState('10/05/2024');

  useEffect(() => {
      fetch(`${BACKEND_ADDRESS}/wallet/${token}`)
        .then(response => response.json())
        .then(data => {
          console.log("data fetch get wallet dashboard", data)
          dispatch(loadWallets(data.listWallets));
        });
  }, [refresh]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/cryptos/contentWallet/${token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log("refresh ok")
        }
      })

    fetch(`${BACKEND_ADDRESS}/cryptos/price`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log("prices updated")
        }
      })
  }, [wallets])

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
              <h2>{totalValue} $</h2>
              <p>+{percentageChange}% since the {lastUpdateDate}</p>
            </div>
            <TableDash />
          </div>
          <button onClick={() => setRefresh(!refresh)}>Refresh</button>
        </div>
      </div>
    </div>
  );
}
