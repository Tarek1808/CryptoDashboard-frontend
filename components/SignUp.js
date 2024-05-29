import { useState } from 'react';
import styles from '../styles/SignUp.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';

const BACKEND_ADDRESS = "https://crypto-dashboard-backend-gamma.vercel.app"


const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD_REGEX = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;

function SignUp() {
    const dispatch = useDispatch()
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMail, setErrorMail] = useState(false)



    const handleSubmit = () => {
        //on verifie la conception de l'adresse email
        if (!EMAIL_REGEX.test(email)) {
            setErrorMail(true);
            return;
        };
        //on verifie le mot de passe
        if (!PASSWORD_REGEX.test(password)) {
            setErrorPassword(true);
            return;
        };

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

        // res.json({ result:false, error: 'Invalid email adress'});
        // return;
    }




    return (
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
            {errorMail && (

                <p className={styles.error}>Invalid email address</p>

            )}
            <div className={styles.inputContainer}>
                <label className={styles.labelCaption}> Password </label>
                <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            {errorPassword && (
                <div>
                    <p className={styles.error}>Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 6 characters long.</p>
                </div>
            )}

            <button className={styles.button} onClick={() => handleSubmit()}>SIGN UP</button>
        </div>
    );
}

export default SignUp;