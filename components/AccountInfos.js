import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/AccountInfos.module.css';
import MenuBar from './MenuBar';
import Header from './Header';

function AccountInfos() {
  const dispatch = useDispatch();
  const { username, email, password } = useSelector((state) => state.user.value); // Accédez aux informations du compte

  // Initialiser les états avec des chaînes vides pour éviter le warning
  const [newEmail, setNewEmail] = React.useState(email || '');
  const [newPassword, setNewPassword] = React.useState(password || '');
  const [newUsername, setNewUsername] = React.useState(username || '');

  const handleSubmit = () => {
    // Envoyer une requête PUT à l'API pour mettre à jour les informations du compte
    // Utilisez les valeurs newEmail, newPassword et newUsername pour mettre à jour les informations
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
                 <label className={styles.labelCaption} htmlFor="username">  </label> 
                 <input type="text" className={styles.input} id="username" placeholder="Username" onChange={(e) => setNewUsername(e.target.value)} value={newUsername} />
                  </div> <div className={styles.inputContainer}>
                     <label className={styles.labelCaption} htmlFor="email">  </label> 
                     <input type="email" className={styles.input} id="email" placeholder="Email" onChange={(e) => setNewEmail(e.target.value)} value={newEmail} />
                      </div> <div className={styles.inputContainer}> 
                      <label className={styles.labelCaption} htmlFor="password">  </label>
                       <input type="password" className={styles.input} id="password" placeholder="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                        </div> 
                        <button className={styles.button} onClick={handleSubmit}> UPDATE </button> 
                        </div>
                         </div>
                          

  );
}
export default AccountInfos;
