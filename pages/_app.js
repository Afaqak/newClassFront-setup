import '../styles/globals.css';
import React from 'react';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store/store';
import { ThemeProvider } from 'next-themes';
import { PersistGate } from 'redux-persist/integration/react';
import Header from '../components/header';
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider
          attribute='class'
          enableSystem
        >
          <Header />
          <div className='flex flex-col w-full overflow-hidden'>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
