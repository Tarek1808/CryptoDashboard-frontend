import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';
import wallets from '../reducers/wallets';
import value from '../reducers/value';

const store = configureStore({
  reducer: { user, wallets, value },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store} >
      <Head>
        <title>CryptoDashboard</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
