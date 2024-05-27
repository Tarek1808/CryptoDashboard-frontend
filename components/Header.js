import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Popover, Switch } from 'antd';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { clearWallets } from '../reducers/wallets';
import { logout } from '../reducers/user';

function Header() {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    console.log("user depuis header", user)

    useEffect(() => {
        if (!user.data.token) {
            router.push('/')
        }
    }, [user])

    const popoverContent = (
        <div>
            <h3 className={styles.setting}>Settings</h3>
            <div className={styles.gear}>

                <p>Account Info</p>
                <span>Dark Mode     <Switch
                    defaultChecked
                    style={{ backgroundColor: '#EC7126' }}
                // onChange={onChange}
                />
                </span>
                <br />
                <span>  €
                    <Switch
                        defaultChecked
                        // onChange={onChange}
                        style={{ backgroundColor: '#EC7126' }}
                        arial-readonly />  $
                </span>
            </div></div>
    );

    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearWallets())
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.textHeader} >Dashboard crypto</h2>
            <div className={styles.droite}>
                <span><Popover
                    
                    content={popoverContent}

                    trigger='click'>
                    <FontAwesomeIcon
                        icon={faGear}
                        // spin
                        size='xl' />
                </Popover></span>
                <button className={styles.button} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Header;