import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Popover, Switch } from 'antd';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function Header() {
    const router = useRouter()

    const user = useSelector((state) => state.user.value)

    useEffect(() => {
        if (!user.data) {
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
                <button className={styles.button}>Logout</button>
            </div>
        </div>
    );
}

export default Header;