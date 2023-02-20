/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
// Typescript
/*
import React from 'react';
import '../styles/globals.scss';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
*/

// Javascript
import React, { useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
// import TagManager from 'react-gtm-module';
import store, { useAppDispatch } from '../redux/store';
import '../styles/globals.scss';
import ThemeProvider from '../context/ThemeProvider';
import { toggleLoading } from '../redux/reducers/elementsSlice';

// const tagManagerArgs = {
//   gtmId: process.env.NEXT_PUBLIC_GTM_ID
// }

export default function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(()=>{
  //   TagManager.initialize(tagManagerArgs);
  // }, []);



  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </div>
  );
}
