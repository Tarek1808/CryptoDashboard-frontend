import { useRouter } from 'next/router';
import styles from '../styles/Menubar.module.css';

function MenuBar() {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <div 
          className={`${styles.menuItem} ${isActive('/dashboard') ? styles.active : ''}`} 
          onClick={() => router.push('/dashboard')}
        >
          Dashboard
        </div>
        <div 
          className={`${styles.menuItem} ${isActive('/reporting') ? styles.active : ''}`} 
          onClick={() => router.push('/reporting')}
        >
          Reporting
        </div>
        <div 
          className={`${styles.menuItem} ${isActive('/news') ? styles.active : ''}`} 
          onClick={() => router.push('/news')}
        >
          News
        </div>
        <div 
          className={`${styles.menuItem} ${isActive('/wallets') ? styles.active : ''}`} 
          onClick={() => router.push('/wallets')}
        >
          Wallets
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
