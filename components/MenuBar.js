import styles from '../styles/Menubar.module.css';

function MenuBar() {
  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <div className={styles.menuItem} onClick={() => {}}>Dashboard</div>
        <div className={styles.menuItem} onClick={() => {}}>Reporting</div>
        <div className={styles.menuItem} onClick={() => {}}>News</div>
        <div className={styles.menuItem} onClick={() => {}}>Wallet</div>
      </div>
    </div>
  );
}

export default MenuBar;