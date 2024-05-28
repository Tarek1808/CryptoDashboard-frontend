import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { Modal } from 'antd';
import SignUp from './SignUp.js';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import backgroundImage from './images/background.jpg';
import logo from './images/logo.png';

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
            fetch('http://localhost:3000/users/signin', {
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
        <div className={styles.container} style={{ backgroundImage: `url(${backgroundImage.src})` }}>
            <div className={styles.logo}>
                <img src={logo.src} alt="Logo" />
            </div>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <div className={styles.presentation}>
                        <h2 className={styles.titlepresntation}>Welcome to  Crypto Dashboard!</h2>
                        <p className={styles.paragraphpresntation}>
                        CryptoDashboard revolutionizes cryptocurrency portfolio management. With intuitive charts, it provides real-time analysis of asset performance, empowering informed decision-making. Integrated news keeps you updated on market trends. Track changes since your last login for a precise view of investment evolution. Transform your cryptocurrency management approach with CryptoDashboard today!
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

                <Modal className={styles.customModal} onCancel={() => handleCancelSignUp()} open={signUpModalVisible} footer={null}>
                    <SignUp />
                </Modal>
            </div>
        </div>
    );
}

export default Login;
