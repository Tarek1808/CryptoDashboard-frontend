import React, { useState } from 'react';
import styles from '../styles/AddWallet.module.css';

function WalletForm() {
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [newAddressIndex, setNewAddressIndex] = useState(0);

    const handleCryptoChange = (event) => {
        setSelectedCrypto(event.target.value);
        if (event.target.value!== '') {
            setAddresses([{ address: '', addMore: false }]);
        } else {
            setAddresses([]);
        }
    };

    const handleAddAddressClick = () => {
        setAddresses([...addresses, { address: '', addMore: true }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Adresses soumises:", addresses);
        // Traitez ici les données du formulaire
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="crypto-choice">Choisissez votre crypto-monnaie :</label>
            <select id="crypto-choice" name="crypto-choice" value={selectedCrypto} onChange={handleCryptoChange}>
                <option value="">Sélectionnez...</option>
                <option value="solana">Solana</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Etherium</option>
            </select>

            {addresses.map((address, index) => (
                <div key={index} className={styles.addressContainer}>
                    <input
                        type="text"
                        placeholder="Adresse..."
                        value={address.address}
                        onChange={(e) => {
                            const newAddresses = [...addresses];
                            newAddresses[index].address = e.target.value;
                            setAddresses(newAddresses);
                        }}
                    />
                    {address.addMore && (
                        <button onClick={() => handleAddAddressClick()} className={styles.addButton}>+</button>
                    )}
                </div>
            ))}

            <button type="submit" className={styles.submitBtn}>Soumettre</button>
        </form>
    );
}

export default WalletForm;
