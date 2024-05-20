import { useState } from 'react';
import styles from '../styles/SignUp.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

function SignUp() {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password }),
        }).then(response => response.json())
            .then(data => {
                console.log("fetch signup :", data)
                data.result && dispatch(login({ token: data.token, username, email }));
                setEmail('')
                setPassword('')
                setUsername('')
            });
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Create your CryptoDashboard account</h3>
            <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
            <input type="text" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
            <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
            <button className={styles.button} onClick={() => handleSubmit()}>Sign up</button>
        </div>
    );
}

export default SignUp;
