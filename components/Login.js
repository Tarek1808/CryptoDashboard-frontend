import styles from '../styles/Login.module.css';
import { Modal } from 'antd';
import SignUp from './SignUp.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';

const BACKEND_ADDRESS = "http://localhost:3000"

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
                        data.result && dispatch(login({ data }));
                        setPassword('')
                        setUsername('')
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
