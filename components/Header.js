import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';


function Header() {
    const handleToSetting = () => {
        console.log(handleToSetting);
        fetch('http://localhost:3001/')
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.textHeader}>Dashboard crypto</h2>
            <div className={styles.droite}>
               <span><FontAwesomeIcon
                    icon={faGear}
                
                    size='xl'
                    className='gear'
                    onClick={() => handleToSetting()}
                /></span>                 
                <button className={styles.button}>Logout</button>
            </div>
        </div>

    )
};
export default Header;