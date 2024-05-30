import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { clearWallets } from '../reducers/wallets';
import { logout } from '../reducers/user';
import { ConfigProvider,Button, Popover, Switch } from 'antd';
import logo from '../public/images/logo.png';
import styles from '../styles/Header.module.css';


function Header() {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    console.log("user depuis header", user)

    useEffect(() => {
        if (!user.token) {
            router.push('/')
        }
    }, [user])

    const popoverContent = (
        <div className={styles.popSetting}>
            <h3 className={styles.setting}>Settings</h3>
            <div className={styles.gear}>

                <button className={styles.AccInfo} onClick={() => router.push('/accountInfos')}>Account Informations</button>
                {/* <span>Light Mode     <Switch
                    defaultChecked
                    style={{ backgroundColor: '#EC7126' }}
                // onChange={onChange}
                /> */}
                {/* </span> */}
                <br />  <div className={styles.switchBloc}><p>€</p>
                <span className={styles.converter}> 
              
                    <Switch
                        defaultChecked
                        // onChange={onChange}
                        style={{ backgroundColor: '#EC7126' }}
                        aria-readonly /> 
                     
                </span>  <p>$</p></div>
            </div></div>
    );

    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearWallets())
    }

    return (
        <div className={`${styles.container} ${styles.backgroundGradient}`}>
            <div>
                <img src={logo.src} alt="Logo" className={styles.logo} />

            </div>
            <div className={styles.droite}>
                <ConfigProvider theme={{
                    token: { colorBgElevated: "rgba(0, 17, 55, 0.507)" },
                }}>
                    <span>
                        <Popover

                            content={popoverContent}
                            trigger='click'>
                            <button className={styles.buttonS}>Settings</button>
                            {/* <FontAwesomeIcon
                            icon={faGear}
                            size='xl' /> */}
                        </Popover>
                    </span>
                </ConfigProvider>
                <button className={styles.button} onClick={handleLogout}>Logout</button>
            </div>
        </div>


    );
}


export default Header;
