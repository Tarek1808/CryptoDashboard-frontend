import styles from '../styles/Login.module.css';
import { Modal } from 'antd';
import SignUp from './SignUp.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import { updateData, updateTotalValue } from '../reducers/value';
import { loadWallets } from '../reducers/wallets.js';

const BACKEND_ADDRESS = "https://crypto-dashboard-backend-gamma.vercel.app"

function Login() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [signUpModalVisible, setSignUpModalVisible] = useState(false);

    const showSignUpModal = () => {
        setSignUpModalVisible(true);
    };

    const handleCancelSignUp = () => {
        setSignUpModalVisible(false);
    };

    const handleSignIn = () => {
        if (username !== '' && password !== '') {
            fetch(`${BACKEND_ADDRESS}/users/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        console.log("utilisateur connecté via sign in:", data)
                        const { token, username, email, wallets, totalValue } = data
                        dispatch(login({ token, username, email, wallets, totalValue }));
                        setPassword('')
                        setUsername('')
                        fetch(`${BACKEND_ADDRESS}/cryptos/price`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                        }).then(response => response.json())
                            .then(data => {
                                if (data.result) {
                                    console.log("prices updated")
                                }
                            })
                        fetch(`${BACKEND_ADDRESS}/cryptos/contentWallet/${data.token}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                        }).then(response => response.json())
                            .then(data => {
                                if (data.result) {
                                    console.log("wallet content updated")
                                }
                            })
                        fetch(`${BACKEND_ADDRESS}/wallet/${data.token}`)
                            .then(response => response.json())
                            .then(dataWallets => {
                                console.log("data fetch get wallet dashboard", dataWallets)
                                const wallets = dataWallets.listWallets
                                dispatch(loadWallets(wallets));

                                if (wallets.length < 0) return

                                const cryptoMap = {};
                                // on boucle sur chaque adresse et on prend la 1ère ligne (on a qu'une crypto par wallet)
                                // si la crypto est déjà dans le tableau cryptoData, on ajoute la quantité et la value aux valeurs existantes
                                // si la crypto n'est pas dans cryptoData, on créé un nouvel élément dans le tableau et on initialise la quantité et value à 0
                                wallets.forEach(wallet => {
                                    if (wallet.holdings.length < 0) return

                                    const { crypto, quantity } = wallet.holdings[0];
                                    if (!cryptoMap[crypto.name]) {
                                        cryptoMap[crypto.name] = {
                                            name: crypto.name,
                                            price: Number(crypto.price),
                                            quantity: 0,
                                            value: 0
                                        };
                                    }
                                    cryptoMap[crypto.name].quantity += quantity;
                                    cryptoMap[crypto.name].value += quantity * crypto.price;
                                });
                                console.log("cryptomap:", cryptoMap)
                                // conversion en tableau car plus facilement exploitable
                                const aggregatedData = Object.values(cryptoMap);
                                dispatch(updateData(aggregatedData));

                                // on boucle sur le tableau aggregatedData pour calculer la value total des wallets et envoyer la valeur au reducer afin de l'afficher
                                // on envoie également le nom et la quantité de chaque crypto pour avoir des données pour le graphe camembert de la page reporting
                                let totalValue = 0
                                aggregatedData.forEach(crypto => {
                                    totalValue += crypto.value
                                })
                                console.log("total value:", totalValue)
                                dispatch(updateTotalValue(totalValue))
                                fetch(`${BACKEND_ADDRESS}/users/${data.token}/updateTotalValue`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ totalValue }),
                                }).then(response => response.json())
                                    .then(data => {
                                        if (data.result) {
                                            console.log("wallet content updated")
                                        }
                                    })
                            });
                        router.push('/addWallet')
                    } else {
                        console.log("erreur sign in")
                    }
                });
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>Dashboard Crypto</header>
            <main className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.presentation}>
                        <h2>Welcome to Dashboard Crypto!</h2>
                        <p>Here you can manage your crypto assets...
                            Le Lorem Ipsum est simplement du faux texte employé dans la composition et la
                            mise en page avant impression. Le Lorem Ipsum est le faux texte standard de
                            l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla
                            ensemble des morceaux de texte pour réaliser un livre spécimen de polices de
                            texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la
                            bureautique informatique, sans que son contenu n'en soit modifié. Il a été
                            popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant
                            des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des
                            applications de mise en page de texte, comme Aldus PageMaker.

                            Le Lorem Ipsum est simplement du faux texte employé dans la composition et la
                            mise en page avant impression. Le Lorem Ipsum est le faux texte standard de
                            l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla
                            ensemble des morceaux de texte pour réaliser un livre spécimen de polices de
                            texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la
                            bureautique informatique, sans que son contenu n'en soit modifié. Il a été
                            popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant
                            des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des
                            applications de mise en page de texte, comme Aldus PageMaker.
                        </p>

                    </div>
                    <div className={styles.auth}>
                        <div className={styles.inputContainer}>
                            <label className={styles.labelCaption}>Username</label>
                            <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.labelCaption}>Password</label>
                            <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                        </div>
                        <button className={styles.button} onClick={() => handleSignIn()}>Sign In</button>
                        <hr className={styles.separator} />
                        <button className={styles.button} onClick={() => showSignUpModal()}>Sign Up</button>
                    </div>
                </div>

                <Modal onCancel={() => handleCancelSignUp()} open={signUpModalVisible} footer={null}>
                    <SignUp />
                </Modal>
            </main>
        </div>
    );
}

export default Login;
