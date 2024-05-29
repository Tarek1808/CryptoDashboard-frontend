import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/AccountInfos.module.css';
import MenuBar from './MenuBar';
import Header from './Header';
import { updateEmail } from '../reducers/user';

// const BACKEND_ADDRESS = "https://crypto-dashboard-backend-gamma.vercel.app"
const BACKEND_ADDRESS = "http://localhost:3000"

function AccountInfos() {
  const dispatch = useDispatch();
  const { username, email, password, token } = useSelector((state) => state.user.value); // Accédez aux informations du compte
  const [displayConfirmation, setDisplayConfirmation] = useState(false)

  // Initialiser les états avec des chaînes vides pour éviter le warning
  const [newEmail, setNewEmail] = React.useState(email || '');
  const [newPassword, setNewPassword] = React.useState(password || '');

  const handleSubmit = () => {
    fetch(`${BACKEND_ADDRESS}/users/update/${token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email:newEmail, password:newPassword }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log("nouvelles infos:", data)
          dispatch(updateEmail(data.email))
          setDisplayConfirmation(true)
        } else console.log("erreur update")
  })
  };

  return (
    <div> <div className={styles.header}>
      <Header />
    </div>
      <div className={styles.content}>
        <div className={styles.menubar}>
          <MenuBar />
        </div>
      </div>
      <div className={styles.accountInfoContainer}>
        <p className={styles.title}>Account Infos</p>
        <div className={styles.inputContainer}>
          <p>Username : {username}</p>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelCaption} htmlFor="email">  </label>
          <input type="email" className={styles.input} id="email" placeholder="Email" onChange={(e) => setNewEmail(e.target.value)} value={newEmail} />
        </div> <div className={styles.inputContainer}>
          <label className={styles.labelCaption} htmlFor="password">  </label>
          <input type="password" className={styles.input} id="password" placeholder="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
        </div>
        <div>
          {displayConfirmation && <p>Informations modified</p>}
        </div>
        <button className={styles.button} onClick={handleSubmit}> UPDATE </button>
      </div>
    </div>


  );
}
export default AccountInfos;
