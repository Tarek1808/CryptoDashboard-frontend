import styles from '../styles/Login.module.css';

function Login() {
    return (
        <div>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Login
                </h1>
                <p><a href="http://localhost:3001/">Login</a></p>
                <p><a href="http://localhost:3001/addWallet">AddWallet</a></p>
                <p><a href="http://localhost:3001/wallets">Wallets</a></p>
            </main>
        </div>
    );
}

export default Login;
