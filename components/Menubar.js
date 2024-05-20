import styles from '../styles/AddWallet.module.css';

function Menubar() {
  return (
    <div className={styles.main}>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Dashboard</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Reporting</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>New</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Wallet</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <div className={styles.content}>
        <h1 className={styles.title}>Add Wallet</h1>
        <p><a href="http://localhost:3001/">Login</a></p>
        <p><a href="http://localhost:3001/addWallet">AddWallet</a></p>
        <p><a href="http://localhost:3001/wallets">Wallets</a></p>
      </div>
    </div>
  );
}

export { Menubar, MenubarMenu, MenubarTrigger }; // Exportez les composants individuels
