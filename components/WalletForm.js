import React, { useState, useEffect } from 'react';
import styles from '../styles/WalletForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadWallets } from '../reducers/wallets';
import { updateData, updateTotalValue } from '../reducers/value';

const BACKEND_ADDRESS = "https://crypto-dashboard-backend-gamma.vercel.app"

function WalletForm() {

    const dispatch = useDispatch()
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [newWallet, setNewWallet] = useState([]);
    const [styleBox, setStyleBox] = useState({});
    // const [newAddressIndex, setNewAddressIndex] = useState(0);
    const user = useSelector((state) => state.user.value)
    // console.log("user:", user.data)

    const handleCryptoChange = (event) => {
        setSelectedCrypto(event.target.value);
        if (event.target.value !== '') {
            setNewWallet([{ address: '', nameWallet: '', user: user.token }]);
            if (event.target.value === "Ethereum") {
                setStyleBox({ backgroundColor: 'rgb(74, 94, 196)' });
            } else if (event.target.value === "Solana") {
                setStyleBox({ backgroundImage: 'linear-gradient(to bottom left,#13ebe7 , #2478bd, #D63CFA )' });
            } else if (event.target.value === "Bitcoin") {
                setStyleBox({ backgroundColor: '#FF9900' })
            }
        } else {
            setNewWallet([]);
            setStyleBox({ backgroundColor: '#ec7126' })
        }
    };

    const handleAddAddressClick = (event) => {
        event.preventDefault();
        setNewWallet([...newWallet, { address: '', nameWallet: '', user: user.token }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Adresses soumises:", newWallet);
        const token = user.token
        newWallet.forEach(wallet => {
            const { nameWallet, address, user } = wallet
            fetch(`${BACKEND_ADDRESS}/wallet`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nameWallet, address, blockchain: selectedCrypto, user }),
            }).then(response => response.json())
                .then(response => {
                    if (response.result) {
                        console.log("fetch add wallet :", response)
                        console.log("user.data.token :", token)
                        console.log("address :", address)
                        fetch(`${BACKEND_ADDRESS}/users/${token}/addWallet`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ address }),
                        }).then(response => response.json())
                            .then(data => {
                                if (data.result) {
                                    console.log("fetch add wallet route put")
                                    fetch(`${BACKEND_ADDRESS}/cryptos/contentWallet/${token}`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                    }).then(response => response.json())
                                        .then(data => {
                                            if (data.result) {
                                                console.log("wallet content updated")
                                                fetch(`${BACKEND_ADDRESS}/wallet/${token}`)
                                                    .then(response => response.json())
                                                    .then(dataWallets => {
                                                        console.log("data fetch get wallet dashboard", dataWallets)
                                                        const { listWallets } = dataWallets
                                                        dispatch(loadWallets(listWallets));
                                                        console.log("list wallets:", listWallets)
                                                        if (listWallets.length < 0) return

                                                        const cryptoMap = {};
                                                        // on boucle sur chaque adresse et on prend la 1ère ligne (on a qu'une crypto par wallet)
                                                        // si la crypto est déjà dans le tableau cryptoData, on ajoute la quantité et la value aux valeurs existantes
                                                        // si la crypto n'est pas dans cryptoData, on créé un nouvel élément dans le tableau et on initialise la quantité et value à 0
                                                        listWallets.forEach(wallet => {
                                                            if (wallet.holdings.length === 0 ) return

                                                            const { crypto, quantity } = wallet.holdings[0];
                                                            if (!cryptoMap[crypto.name]) {
                                                                cryptoMap[crypto.name] = {
                                                                    name: crypto.name,
                                                                    price: Number(crypto.price),
                                                                    quantity: 0,
                                                                    value: 0
                                                                };
                                                            }
                                                            cryptoMap[crypto.name].quantity += quantity;
                                                            cryptoMap[crypto.name].value += quantity * crypto.price;
                                                        });
                                                        console.log("cryptomap:", cryptoMap)
                                                        // conversion en tableau car plus facilement exploitable
                                                        const aggregatedData = Object.values(cryptoMap);
                                                        dispatch(updateData(aggregatedData));

                                                        // on boucle sur le tableau aggregatedData pour calculer la value total des wallets et envoyer la valeur au reducer afin de l'afficher
                                                        // on envoie également le nom et la quantité de chaque crypto pour avoir des données pour le graphe camembert de la page reporting
                                                        let totalValue = 0
                                                        aggregatedData.forEach(crypto => {
                                                            totalValue += crypto.value
                                                        })
                                                        console.log("total value:", totalValue)
                                                        dispatch(updateTotalValue(totalValue))
                                                    })
                                            }
                                        })
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
                <option value="Solana">Solana</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Ethereum">Ethereum</option>
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