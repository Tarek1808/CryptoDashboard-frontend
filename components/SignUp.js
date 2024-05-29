import { useState } from 'react';
import styles from '../styles/SignUp.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';

const BACKEND_ADDRESS = "https://crypto-dashboard-backend-gamma.vercel.app"

function SignUp() {
    const dispatch = useDispatch()
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        fetch(`${BACKEND_ADDRESS}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    console.log("fetch signup :", data)
                    const { token, username, email, wallets, totalValue } = data
                    dispatch(login({ token, username, email, wallets, totalValue }));
                    setEmail('')
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
                    router.push('/addWallet')
                } else {
                    console.log("erreur sign up")
                }
            });
    };

    return (
        <div className={styles.modalContainer}>
            <div className={styles.container}>
                <p className={styles.title}>Create your CryptoDashboard account</p>
                <div className={styles.inputContainer}>
                    <label className={styles.labelCaption}>Username</label>
                    <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.labelCaption}>Email</label>
                    <input type="text" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.labelCaption}> Password </label>
                    <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button className={styles.button} onClick={() => handleSubmit()}>SIGN UP</button>
            </div>
        </div>
    );
}

export default SignUp;