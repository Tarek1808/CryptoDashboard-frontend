import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Popover, Switch } from 'antd';
import SwitchButton from './SwitchButton';


function Header() {
   
    const popoverContent = (
        
        <div className={styles.gear}>
            <h3>Settings</h3>
            <p>Account Info</p>
            <span>
                {SwitchButton}
                <p>DarkMode</p>
                </span>
            {/* <span><Switch 
            checked={field.value}
            onCheckedChange={field.onChange}/>
            <p>Dark Mode</p></span>
            <span><p>€</p>
            <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled
            arial-readonly/>
            <p>$</p></span> */}
        </div>
    );
        

    


    return (
        <div className={styles.container}>
            <h2 className={styles.textHeader}>Dashboard crypto</h2>
            <div className={styles.droite}>
                <span><Popover
                    className={styles.gear}
                    content={popoverContent}
                    
                    trigger='click'>
                    <FontAwesomeIcon
                        icon={faGear}
                        spin
                        size='xl' />               
                </Popover></span>
                <button className={styles.button}>Logout</button>
            </div>
        </div>

    )
};
export default Header;