import React, { useState } from 'react';
import styles from '../styles/WalletForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addWallet, loadWallets } from '../reducers/wallets';

function WalletForm() {

    const dispatch = useDispatch()
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [newWallet, setNewWallet] = useState([]);


    const [refreshWallets, setRefreshWallets] = useState(false)

    const [styleBox, setStyleBox] = useState({});
    // const [newAddressIndex, setNewAddressIndex] = useState(0);
    const user = useSelector((state) => state.user.value)
    const token = user.data.token
    // console.log("user:", user.data)

    useEffect(() => {
        if (user.data) {
            fetch(`http://localhost:3000/wallet/${token}`)
                .then(response => response.json())
                .then(data => {
                    console.log("data fetch get wallet addwallet", data)
                    dispatch(loadWallets(data.listWallets));
                });
        }
    }, [refreshWallets]);

    const handleCryptoChange = (event) => {
        setSelectedCrypto(event.target.value);
        if (event.target.value !== '') {

            setNewWallet([{ address: '', nameWallet: '', user: user.data._id }]);
            if (event.target.value === "Ethereum") {
                setStyleBox({ backgroundColor: 'rgb(74, 94, 196)' });

        } else if (event.target.value === "Solana") {
            setStyleBox({ backgroundColor: 'rgb(71, 172, 186)'});
        } else if (event.target.value === "Bitcoin") {
            setStyleBox({ backgroundColor: '#FF9900'})


        }
        else {
            setNewWallet([]);
            setStyleBox({ backgroundColor: '#ec7126'})
        }}
    };

    const handleAddAddressClick = (event) => {
        event.preventDefault();
        setNewWallet([...newWallet, { address: '', nameWallet: '', user: user.data.token }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Adresses soumises:", newWallet);
        const token = user.data.token
        newWallet.forEach(wallet => {
            const { nameWallet, address, user } = wallet
            fetch('http://localhost:3000/wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nameWallet, address, blockchain: selectedCrypto, user }),
            }).then(response => response.json())
                .then(response => {
                    if (response.result) {
                        console.log("fetch add wallet :", response)
                        console.log("user.data.token :", token)
                        console.log("address :", address)
                        fetch(`http://localhost:3000/users/${token}/addWallet`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ address }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                                    console.log("fetch add wallet route put")
                                    dispatch(addWallet({ nameWallet, address, blockchain: selectedCrypto }))
                                    setRefreshWallets(!refreshWallets)
                                } else {
                                    console.log("erreur add wallet")
                                }
                            });
                    } else {
                        console.log("erreur add wallet")
                    }
                });
        })
    };


    return (
        <form className={styles.form} style={styleBox}>
            {/* <label htmlFor="crypto-choice">Choisissez votre crypto-monnaie :</label> */}
            <select id="crypto-choice" name="crypto-choice" value={selectedCrypto} onChange={handleCryptoChange}>
                <option value="">Add Blockchain</option>
                <option className={styles.Sola} value="Solana">Solana</option>
                <option className={styles.Bitc} value="Bitcoin">Bitcoin</option>
                <option className={styles.Ethe} value="Ethereum">Ethereum</option>
            </select>

            {newWallet.map((wallet, index) => (
                <div key={index} className={styles.newWalletContainer}>
                    <input
                        type="text"
                        placeholder="Wallet address"
                        value={wallet.address}
                        onChange={(e) => {
                            const newAddresses = [...newWallet];
                            newAddresses[index].address = e.target.value;
                            setNewWallet(newAddresses);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Wallet name (optional)"
                        value={wallet.walletName}
                        onChange={(e) => {
                            const newAddresses = [...newWallet];
                            newAddresses[index].nameWallet = e.target.value;
                            setNewWallet(newAddresses);
                        }}
                    />
                    <button onClick={handleAddAddressClick} className={styles.addButton}>+</button>
                </div>
            ))}
            <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>Soumettre</button>
        </form>
    );
}

export default WalletForm;
